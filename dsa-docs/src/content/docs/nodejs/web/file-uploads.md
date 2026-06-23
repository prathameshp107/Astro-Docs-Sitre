---
title: "File Uploads"
description: "Multipart form data, multer, storage configuration, file validation, size limits, and security best practices."
sidebar:
  order: 4
---

## File Uploads

File uploads are handled differently from regular JSON data. They use **multipart/form-data** encoding. In Node.js, the go-to library is **Multer**.

### How Multipart Uploads Work

```html
<!-- HTML form — must have enctype="multipart/form-data" -->
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="avatar" accept="image/*" />
  <input type="text" name="userId" />
  <button type="submit">Upload</button>
</form>
```

### Multer Basics

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// File filter — accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, GIF, and WebP files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1,                   // Max 1 file per request
  },
  fileFilter,
});

// Single file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('File:', req.file);
  console.log('Body:', req.body);
  
  res.json({
    success: true,
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      path: req.file.path,
    },
  });
});
```

### Memory Storage (for processing before saving)

```javascript
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  // req.file.buffer contains the file as a Buffer
  const buffer = req.file.buffer;
  
  // Resize, compress, or transform the image
  const processed = await sharp(buffer)
    .resize(800, 800, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toBuffer();
  
  // Upload to cloud storage
  const result = await s3.upload({
    Bucket: 'my-app-uploads',
    Key: `avatars/${req.file.originalname}`,
    Body: processed,
    ContentType: 'image/jpeg',
  }).promise();
  
  res.json({ url: result.Location });
});
```

### Multiple File Uploads

```javascript
// Multiple files, same field name
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  console.log(`Uploaded ${req.files.length} files`);
  res.json({ files: req.files.map(f => f.filename) });
});

// Multiple fields
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 5 },
]);

app.post('/profile', cpUpload, (req, res) => {
  console.log('Avatar:', req.files['avatar'][0]);
  console.log('Gallery:', req.files['gallery'].length, 'files');
  res.json({ success: true });
});
```

### Error Handling for Uploads

```javascript
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// Wrap multer to handle errors gracefully
app.post('/upload', (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors (file too large, too many files)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File is too large (max 5MB)' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Custom error (e.g., file filter rejection)
      return res.status(400).json({ error: err.message });
    }
    
    // Success
    res.json({ file: req.file });
  });
});
```

### Upload to Cloud Storage (S3)

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

const s3 = new S3Client({ region: 'us-east-1' });

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const ext = path.extname(req.file.originalname);
    const key = `uploads/${crypto.randomUUID()}${ext}`;
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }));
    
    const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
    res.json({ success: true, url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});
```

### 🚨 Security Best Practices

```javascript
// 1. Validate file types by magic bytes, not just extension!
const fileType = require('file-type');

async function validateFile(buffer) {
  const type = await fileType.fromBuffer(buffer);
  if (!type || !['image/jpeg', 'image/png'].includes(type.mime)) {
    throw new Error('Invalid file type');
  }
}

// 2. Scan for malware (in production, use ClamAV or similar)
// 3. Set restrictive permissions on upload directories
// 4. Never trust file.originalname — sanitize it
const sanitizeFilename = (name) => {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
};

// 5. Limit file size at multer level AND at the reverse proxy (Nginx)
```

### Key Takeaways

- Use **Multer** for handling multipart/form-data uploads
- Configure **diskStorage** for local saves, **memoryStorage** for cloud uploads
- Always validate: **file type**, **file size**, and **file count**
- Handle multer errors separately from application errors
- Use `crypto.randomUUID()` or `Date.now()` + random for unique filenames
- Never trust user-provided filenames — sanitize or replace them
- In production, upload to **cloud storage** (S3, GCS, Cloudinary) — not local disk
