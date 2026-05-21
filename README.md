# DSA-Notes-Problems

## Step-by-Step Guide for Managing Your DSA/Dev Docs:

### 1. Editing an Existing File
If you want to edit an existing file, just do the following:
- **Find the file**: Look in `dsa-docs/src/content/docs/[section]/filename.md`
- **Edit it directly**: You can open it in your IDE and make changes! The dev server will automatically reload!
- **That's it!** No extra steps needed!

### 2. Adding a New File to an Existing Section
If you have a new file to add to an existing section (like "Data Structures" or "JavaScript"):
1. **Put your new file in the correct source directory**: (e.g., `DSA-Notes-Problems/JavaScript/MyNewFile.md`)
2. **Option 1: Copy manually**
   - Copy the file to `dsa-docs/src/content/docs/[section]/my-new-file.md`
   - Add frontmatter to the top:
     ```
     ---
     title: "My New File Title"
     description: "Description of what this file covers"
     ---
     ```
   - (Optional) Update any asset links to use `/DSA-Notes-Problems/assets/[path]`
3. **Option 2: Use (or update) a script to copy it for you**
   - You can update `copy-remaining-files.js` or create a new script to copy it with frontmatter automatically!

### 3. Adding a Completely New Section
If you want to add a brand new section (like "Next.js" or "System Design"):
1. **Create the directory**: `dsa-docs/src/content/docs/[your-new-section]/`
2. **Add your files** inside this directory (with proper frontmatter!)
3. **Add the section to the sidebar** in `astro.config.mjs`! For example:
   ```js
   {
     label: "Your New Section",
     items: [{ autogenerate: { directory: "your-new-section" } }]
   }
   ```
4. **That's it!** The sidebar will automatically show all files in your new section!

### 4. Updating or Re-splitting Large Files
If you have another large file you want to split into concept-wise files, you can:
1. **Use (or modify) the `split-all-files.js` script**: It's a generic script that can split files by section headers!
2. **Update the script** to include your new file with the appropriate regex pattern!
3. **Run the script**!

### 5. Best Practices for New Files
Always remember:
- **Frontmatter**: Every new file needs frontmatter at the top with `title` and `description`!
- **Asset Links**: Use `/DSA-Notes-Problems/assets/[group]/[filename]` for images!
- **File Naming**: Use kebab-case (lowercase with hyphens) for filenames!
- **Sidebar**: Sections using `autogenerate` will automatically show all files in alphabetical order! If you want custom order, list them manually in `astro.config.mjs`!

---

## Steps to Customize Sidebar Order:

### 1. Edit `astro.config.mjs`
Open `dsa-docs/astro.config.mjs` and look for the `sidebar` section!

### 2. Replace `autogenerate` with a manual list
Instead of using `autogenerate: { directory: "section" }`, which sorts alphabetically, you can manually list all the files in your desired order!

### Example (for Data Structures):
```js
{
  label: "Data Structures",
  items: [
    { label: "Algorithm Basics", link: "/data-structures/algorithm-basics" },
    { label: "Time Complexity", link: "/data-structures/time-complexity" },
    { label: "Big-O Notation", link: "/data-structures/big-o-notation" },
    { label: "Arrays", link: "/data-structures/arrays" },
    // ... add all your files in the order you want!
  ],
},
```

### 3. Find the correct slugs for each file
The "slug" is the filename without `.md` (e.g., `algorithm-basics.md` → `algorithm-basics`). You can find all slugs by looking at the filenames in `dsa-docs/src/content/docs/[section]/`.

### 4. Save and Refresh
Save `astro.config.mjs` and the dev server will automatically restart with your new custom order!

## Quick Tip:
You can mix and match! For example:
- Use `autogenerate` for sections you don't care about the order
- Use manual lists for sections you want custom order (like React already is!)
