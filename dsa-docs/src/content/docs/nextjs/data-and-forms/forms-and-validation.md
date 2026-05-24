---
title: "Forms and Validation"
description: "return ( <input value={value} // React controls this onChange={(e) = setValue(e.target.value)} // Must update on change / ); }"
---

# Section 15: Forms and Validation

## 15.1 Controlled vs Uncontrolled Forms

### The Two Approaches

```
Controlled Forms:                 Uncontrolled Forms:
─────────────────────────────────────────────────────
React controls the value         DOM controls the value
State updates on every keystroke Read value only on submit
Good for: dynamic validation     Good for: file inputs, simple forms
More re-renders                  Fewer re-renders
```

```tsx
// Controlled — React owns the value
export function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}                           // React controls this
      onChange={(e) => setValue(e.target.value)}  // Must update on change
    />
  );
}

// Uncontrolled — DOM owns the value
export function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);     // Read when needed
  };

  return <input ref={inputRef} defaultValue="initial" />;
}
```

---

## 15.2 Form Lifecycle

![15.2 Form Lifecycle diagram](/DSA-Notes-Problems/assets/nextjs/data-and-forms-forms-and-validation-15-2-form-lifecycle.svg)

---

## 15.3 React Hook Form

React Hook Form is the industry standard for form management in React. It uses uncontrolled inputs internally for maximum performance.

```bash
npm install react-hook-form @hookform/resolvers zod
```

### Basic Login Form

```tsx
// components/forms/LoginForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

// TypeScript type inferred from schema
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,          // Connect inputs to RHF
    handleSubmit,      // Wrap your submit handler
    formState: {
      errors,          // Validation errors
      isSubmitting,    // true while submit is processing
      isValid,         // true if all fields pass validation
    },
    reset,             // Reset form to initial state
    watch,             // Watch field values reactively
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),  // Use Zod for validation
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setServerError(null);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        setServerError(error.message || "Login failed");
        return;
      }

      const result = await response.json();
      // Redirect or update auth state
      window.location.href = "/dashboard";
    } catch (error) {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          {...register("email")}   // Registers input with RHF
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p role="alert">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input id="rememberMe" type="checkbox" {...register("rememberMe")} />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      {serverError && (
        <div role="alert" style={{ color: "red" }}>
          {serverError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

---

## 15.4 Zod — Schema Validation

```typescript
// lib/validations.ts
import { z } from "zod";

// Registration schema
export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z.string(),

    age: z.coerce               // Coerce string → number (from form input)
      .number()
      .int()
      .min(18, "You must be at least 18 years old")
      .max(120),

    role: z.enum(["user", "moderator"]),

    website: z.string().url("Invalid URL").optional().or(z.literal("")),

    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],  // Field to attach error to
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Product schema
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description too short"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0),
  images: z.array(z.string().url()).min(1, "At least one image required"),
  isActive: z.boolean().default(true),
});

// Server-side validation (in API routes)
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ data: T } | { error: z.ZodError }> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error };
  }
  return { data: result.data };
}
```

---

## 15.5 Registration Form

```tsx
// components/forms/RegistrationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormData } from "@/lib/validations";

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const password = watch("password");  // Watch for password match indicator

  const onSubmit = async (data: RegistrationFormData) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // Handle response...
  };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = passwordStrength(password || "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name">Full Name</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      {/* Password with strength indicator */}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        {/* Strength bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                height: 4,
                flex: 1,
                borderRadius: 2,
                backgroundColor:
                  strength >= level
                    ? level <= 1 ? "red" : level <= 2 ? "orange" : level <= 3 ? "yellow" : "green"
                    : "#e5e7eb",
              }}
            />
          ))}
        </div>
        {errors.password && <span role="alert">{errors.password.message}</span>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span role="alert">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role")}>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
        {errors.role && <span role="alert">{errors.role.message}</span>}
      </div>

      {/* Terms */}
      <div>
        <input id="agreeToTerms" type="checkbox" {...register("agreeToTerms")} />
        <label htmlFor="agreeToTerms">I agree to the Terms of Service</label>
        {errors.agreeToTerms && (
          <span role="alert">{errors.agreeToTerms.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
```

---

## 15.6 Multi-Step Form

```tsx
// components/forms/MultiStepForm.tsx
"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Combined schema
const multiStepSchema = z.object({
  // Step 1: Personal
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email(),

  // Step 2: Account
  username: z.string().min(3, "At least 3 characters"),
  password: z.string().min(8),

  // Step 3: Preferences
  newsletter: z.boolean().default(false),
  plan: z.enum(["free", "pro", "enterprise"]),
});

type MultiStepData = z.infer<typeof multiStepSchema>;

// Step components use useFormContext
function Step1() {
  const { register, formState: { errors } } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Personal Information</h2>
      <input placeholder="First Name" {...register("firstName")} />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <input placeholder="Last Name" {...register("lastName")} />
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}

function Step2() {
  const { register, formState: { errors } } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Account Setup</h2>
      <input placeholder="Username" {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      <input type="password" placeholder="Password" {...register("password")} />
    </div>
  );
}

function Step3() {
  const { register } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Preferences</h2>
      <label>
        <input type="checkbox" {...register("newsletter")} />
        Subscribe to newsletter
      </label>
      <select {...register("plan")}>
        <option value="free">Free</option>
        <option value="pro">Pro ($9/mo)</option>
        <option value="enterprise">Enterprise (Custom)</option>
      </select>
    </div>
  );
}

const STEPS = [
  { title: "Personal", component: <Step1 /> },
  { title: "Account", component: <Step2 /> },
  { title: "Preferences", component: <Step3 /> },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const methods = useForm<MultiStepData>({
    resolver: zodResolver(multiStepSchema),
    mode: "onChange",
  });

  const { trigger, handleSubmit } = methods;

  const next = async () => {
    // Validate only current step's fields
    const fieldsToValidate: (keyof MultiStepData)[][] = [
      ["firstName", "lastName", "email"],
      ["username", "password"],
      ["plan"],
    ];
    
    const valid = await trigger(fieldsToValidate[currentStep]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: MultiStepData) => {
    console.log("Submitting:", data);
    // API call here
  };

  return (
    <FormProvider {...methods}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              background: i === currentStep ? "#3b82f6" : i < currentStep ? "#22c55e" : "#e5e7eb",
              color: i <= currentStep ? "white" : "#6b7280",
            }}
          >
            {i < currentStep ? "✓ " : ""}{step.title}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {STEPS[currentStep].component}

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {currentStep > 0 && (
            <button type="button" onClick={() => setCurrentStep((s) => s - 1)}>
              Back
            </button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <button type="button" onClick={next}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
```

---

## 15.7 Server-Side Validation with Server Actions

```tsx
// app/actions/contactAction.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

// Action result type
type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Parse FormData
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Validate with Zod
  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Send email, save to DB, etc.
  try {
    await saveContactMessage(result.data);
    return { success: true, message: "Message sent successfully!" };
  } catch {
    return { success: false, message: "Failed to send message. Try again." };
  }
}
```

```tsx
// app/contact/page.tsx — using useActionState
"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contactAction";

const initialState = { success: false, message: "", errors: {} };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        {state.errors?.name && (
          <span role="alert">{state.errors.name[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        {state.errors?.email && (
          <span role="alert">{state.errors.email[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
        {state.errors?.message && (
          <span role="alert">{state.errors.message[0]}</span>
        )}
      </div>

      {state.message && (
        <div
          role="alert"
          style={{ color: state.success ? "green" : "red" }}
        >
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

---

## 15.8 File Uploads

```tsx
// components/forms/FileUploadForm.tsx
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select a file")
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "File must be under 5MB"
    )
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "Only JPG, PNG, or WebP images allowed"
    ),
});

type UploadData = z.infer<typeof uploadSchema>;

export function FileUploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<UploadData>({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UploadData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file[0]);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,  // Don't set Content-Type — browser sets boundary automatically
    });

    const result = await response.json();
    console.log("Uploaded:", result.url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Image title" {...register("title")} />
      {errors.title && <span>{errors.title.message}</span>}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        {...register("file", {
          onChange: handleFileChange,
        })}
      />
      {errors.file && <span>{errors.file.message as string}</span>}

      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: 200 }} />
      )}

      <button type="submit">Upload</button>
    </form>
  );
}
```

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type on server (don't trust client!)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Convert to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate safe filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const filePath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    title,
  });
}
```

---

## 15.9 Validation Workflow

![15.9 Validation Workflow diagram](/DSA-Notes-Problems/assets/nextjs/data-and-forms-forms-and-validation-15-9-validation-workflow-2.svg)

---

## 15.10 Form Accessibility

```tsx
// Accessible form patterns
export function AccessibleForm() {
  const { register, formState: { errors } } = useForm();
  
  return (
    <form noValidate>
      {/* Always associate labels with inputs */}
      <div>
        <label htmlFor="username">
          Username
          <span aria-hidden="true" style={{ color: "red" }}>*</span>
        </label>
        <input
          id="username"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : "username-hint"}
          autoComplete="username"
          {...register("username")}
        />
        <p id="username-hint" style={{ fontSize: 12, color: "#6b7280" }}>
          3-20 characters, letters and numbers only
        </p>
        {errors.username && (
          <p id="username-error" role="alert" style={{ color: "red" }}>
            {errors.username.message as string}
          </p>
        )}
      </div>

      {/* Group related fields with fieldset + legend */}
      <fieldset>
        <legend>Contact Preferences</legend>
        <label>
          <input type="radio" value="email" {...register("contactPref")} />
          Email
        </label>
        <label>
          <input type="radio" value="phone" {...register("contactPref")} />
          Phone
        </label>
      </fieldset>

      {/* Loading state announcement */}
      <button
        type="submit"
        aria-busy={false}       // Set to true when submitting
        aria-live="polite"
      >
        Submit
      </button>

      {/* Live region for form-level messages */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {/* Success/error messages announced to screen readers */}
      </div>
    </form>
  );
}
```

---

## 15.11 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | Always validate on server even if validated client-side | Security — clients can be tampered |
| 2 | Use `noValidate` on `<form>` with RHF | Let React handle validation, not HTML5 |
| 3 | Show inline errors, not just form-level alerts | Better UX — user knows which field |
| 4 | Use `aria-invalid` and `aria-describedby` | Accessibility for screen readers |
| 5 | Disable submit while submitting | Prevent double-submission |
| 6 | Use `mode: "onBlur"` for validation | Validate when user leaves field, not every keystroke |
| 7 | Share Zod schemas between client and server | Single source of truth for validation |
| 8 | Preserve form values on validation error | Don't make users re-enter data |
| 9 | Rate-limit form submissions | Prevent spam/brute force |
| 10 | Use autocomplete attributes | Better UX, accessibility |

---

## 15.12 Common Mistakes

```tsx
// ❌ MISTAKE 1: Not validating on server
// Client validation can be bypassed with curl/Postman!

// ❌ MISTAKE 2: Using <form> action for JS-driven forms
// Use onSubmit={handleSubmit(onSubmit)} instead

// ❌ MISTAKE 3: Forgetting noValidate
<form>  {/* HTML5 validation fights with RHF */}
// ✅
<form noValidate>

// ❌ MISTAKE 4: Not using zodResolver correctly
const { register } = useForm({
  resolver: zodResolver(schema),  // ✅ This is correct
  // resolver: (data) => zodResolver(schema)(data)  ❌ Wrong
});

// ❌ MISTAKE 5: Accessing errors before checking
const errorMessage = errors.email.message;  // Crashes if no email error!
// ✅
const errorMessage = errors.email?.message;

// ❌ MISTAKE 6: Setting Content-Type with FormData
fetch("/api/upload", {
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },  // WRONG!
  body: formData,
});
// ✅ Let browser set Content-Type with boundary automatically
fetch("/api/upload", { method: "POST", body: formData });
```

---

## 15.13 Interview Questions — Forms & Validation

| Level | Question | Key Points |
|-------|----------|------------|
| 🟢 Beginner | Controlled vs uncontrolled components? | State vs ref, when to use each |
| 🟢 Beginner | What is React Hook Form? Why use it? | Performance, less re-renders, DX |
| 🟡 Intermediate | How does Zod differ from Yup? | TypeScript-first, better inference |
| 🟡 Intermediate | How do you handle server-side validation errors in RHF? | setError() method |
| 🟡 Intermediate | How do you build a multi-step form? | FormProvider, step-wise trigger() |
| 🔴 Advanced | How do you handle file uploads securely? | Validate type/size both sides, signed URLs |
| 🔴 Advanced | How do you implement optimistic form updates? | Update UI, rollback on failure |
| 🔴 Advanced | How do Server Actions differ from API routes for forms? | Direct server calls, no API route needed, useActionState |

---
