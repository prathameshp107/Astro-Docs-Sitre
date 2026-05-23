---
title: "4. Angular Forms"
description: "---"
sidebar:
  order: 4
---

## 4. Angular Forms

### Two Approaches to Forms

| Feature | Template-Driven | Reactive |
|---|---|---|
| **Setup** | Easy, less code | More code upfront |
| **Logic location** | In HTML template | In TypeScript class |
| **Testing** | Harder (needs DOM) | Easy (pure TypeScript) |
| **Dynamic fields** | Tricky | Very easy |
| **Complex validation** | Gets messy | Clean and composable |
| **Use when** | Simple forms | Complex/dynamic forms |

---

### Forms Architecture Diagram

```svg
<svg viewBox="0 0 720 560" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="720" height="560" fill="#0f172a" rx="16"/>
  <text x="360" y="36" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="bold">Angular Forms Architecture</text>
  
  <!-- Divider -->
  <line x1="360" y1="55" x2="360" y2="540" stroke="#334155" stroke-width="1" stroke-dasharray="6,4"/>
  
  <!-- Template Driven - Left -->
  <text x="180" y="70" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold">Template-Driven Forms</text>
  
  <!-- HTML Template box -->
  <rect x="30" y="85" width="300" height="65" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="180" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">HTML Template</text>
  <text x="180" y="124" text-anchor="middle" fill="#94a3b8" font-size="10">ngModel directive binds input</text>
  <text x="180" y="140" text-anchor="middle" fill="#64748b" font-size="10">#form="ngForm" → template ref</text>
  
  <line x1="180" y1="150" x2="180" y2="175" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  <defs>
    <marker id="fa" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- NgForm box -->
  <rect x="60" y="175" width="240" height="55" rx="10" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
  <text x="180" y="198" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">NgForm (auto-created)</text>
  <text x="180" y="215" text-anchor="middle" fill="#64748b" font-size="10">Angular creates form model for you</text>
  <text x="180" y="228" text-anchor="middle" fill="#64748b" font-size="9">Implicit — you don't write it</text>
  
  <line x1="180" y1="230" x2="180" y2="255" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- NgModel boxes -->
  <rect x="30" y="255" width="140" height="48" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="100" y="274" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">NgModel</text>
  <text x="100" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">username field</text>
  
  <rect x="190" y="255" width="140" height="48" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="260" y="274" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">NgModel</text>
  <text x="260" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">password field</text>
  
  <!-- Validation state -->
  <rect x="40" y="335" width="280" height="70" rx="10" fill="#3a2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="180" y="357" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Validation State (auto-managed)</text>
  <text x="180" y="374" text-anchor="middle" fill="#94a3b8" font-size="10">valid / invalid / pristine / dirty</text>
  <text x="180" y="390" text-anchor="middle" fill="#94a3b8" font-size="10">touched / untouched / pending</text>
  
  <!-- Reactive Forms - Right -->
  <text x="540" y="70" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="bold">Reactive Forms</text>
  
  <!-- TypeScript Class box -->
  <rect x="390" y="85" width="300" height="65" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="540" y="107" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">TypeScript Class</text>
  <text x="540" y="124" text-anchor="middle" fill="#94a3b8" font-size="10">FormGroup / FormBuilder defined in code</text>
  <text x="540" y="140" text-anchor="middle" fill="#64748b" font-size="10">Full control over form structure</text>
  
  <line x1="540" y1="150" x2="540" y2="175" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- FormGroup box -->
  <rect x="420" y="175" width="240" height="55" rx="10" fill="#1a2a3a" stroke="#fb923c" stroke-width="2"/>
  <text x="540" y="198" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">FormGroup</text>
  <text x="540" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Container for all form controls</text>
  <text x="540" y="228" text-anchor="middle" fill="#64748b" font-size="9">Explicit — you create it in TypeScript</text>
  
  <line x1="540" y1="230" x2="540" y2="255" stroke="#64748b" stroke-width="2" marker-end="url(#fa)"/>
  
  <!-- FormControl boxes -->
  <rect x="390" y="255" width="140" height="48" rx="8" fill="#2a1a3a" stroke="#c084fc" stroke-width="1.5"/>
  <text x="460" y="274" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="bold">FormControl</text>
  <text x="460" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">username</text>
  
  <rect x="550" y="255" width="140" height="48" rx="8" fill="#2a1a3a" stroke="#c084fc" stroke-width="1.5"/>
  <text x="620" y="274" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="bold">FormControl</text>
  <text x="620" y="291" text-anchor="middle" fill="#94a3b8" font-size="9">password</text>
  
  <!-- Validators -->
  <rect x="400" y="335" width="280" height="70" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="540" y="357" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Validators (composable)</text>
  <text x="540" y="374" text-anchor="middle" fill="#94a3b8" font-size="10">Validators.required, minLength, pattern</text>
  <text x="540" y="390" text-anchor="middle" fill="#94a3b8" font-size="10">Custom validators | Cross-field validators</text>
  
  <!-- Common to both -->
  <rect x="160" y="435" width="400" height="60" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="360" y="457" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Common to Both Forms</text>
  <text x="360" y="474" text-anchor="middle" fill="#64748b" font-size="10">CSS classes: .ng-valid, .ng-invalid, .ng-pristine, .ng-dirty, .ng-touched</text>
  <text x="360" y="490" text-anchor="middle" fill="#64748b" font-size="10">State tracking | Error display | Submit handling</text>
</svg>
```

---

### 4.1 Template-Driven Forms

Good for simple login, contact, and search forms.

```typescript
// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // ← Required for ngModel
  template: `
    <!-- 
      #loginForm="ngForm" → Creates a template reference to the NgForm directive
      (ngSubmit) → Fires when form is submitted (prevents default HTML submit)
    -->
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"                   <!-- ← name attribute is REQUIRED for ngModel -->
          [(ngModel)]="formData.email"   <!-- ← Two-way binding: update variable + view -->
          required                       <!-- ← HTML5 validation attribute -->
          email                          <!-- ← Angular email validator directive -->
          #emailField="ngModel"          <!-- ← Template reference to this control's NgModel -->
          class="form-control"
          [class.is-invalid]="emailField.invalid && emailField.touched"
        >

        <!-- Show error only after user has touched the field -->
        <div *ngIf="emailField.invalid && emailField.touched" class="error-msg">
          <span *ngIf="emailField.errors?.['required']">Email is required</span>
          <span *ngIf="emailField.errors?.['email']">Please enter a valid email</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          [(ngModel)]="formData.password"
          required
          minlength="8"                  <!-- ← Minimum length validator -->
          #passwordField="ngModel"
        >
        
        <div *ngIf="passwordField.invalid && passwordField.touched" class="error-msg">
          <span *ngIf="passwordField.errors?.['required']">Password is required</span>
          <span *ngIf="passwordField.errors?.['minlength']">
            Minimum {{ passwordField.errors?.['minlength'].requiredLength }} characters
          </span>
        </div>
      </div>

      <!-- Disable button if form is invalid -->
      <button type="submit" [disabled]="loginForm.invalid">
        Login
      </button>
      
      <!-- Debug: see form state -->
      <pre>{{ loginForm.value | json }}</pre>
    </form>
  `
})
export class LoginComponent {
  
  // This object is automatically updated by ngModel two-way binding
  formData = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form data:', this.formData);
      this.authService.login(this.formData.email, this.formData.password);
    }
  }
}
```

---

### 4.2 Reactive Forms

The professional's choice for complex forms.

#### FormControl, FormGroup, FormBuilder

```typescript
// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
    
      <!-- Username field -->
      <div class="field">
        <label>Username</label>
        <input formControlName="username" type="text">
        
        <div *ngIf="username.invalid && username.touched">
          <p *ngIf="username.errors?.['required']">Username required</p>
          <p *ngIf="username.errors?.['minlength']">Min 3 characters</p>
          <p *ngIf="username.errors?.['usernameTaken']">This username is taken</p>
        </div>
      </div>
      
      <!-- Nested group for address -->
      <div formGroupName="address">
        <input formControlName="street" placeholder="Street">
        <input formControlName="city" placeholder="City">
        <input formControlName="pincode" placeholder="PIN Code">
      </div>
      
      <!-- Passwords with cross-field validation -->
      <div formGroupName="passwords">
        <input formControlName="password" type="password" placeholder="Password">
        <input formControlName="confirm" type="password" placeholder="Confirm Password">
        
        <!-- Error on the GROUP, not individual control -->
        <p *ngIf="passwords.errors?.['mismatch'] && passwords.touched">
          Passwords do not match!
        </p>
      </div>
      
      <button [disabled]="registrationForm.invalid">Register</button>
    </form>
  `
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  //           ^ FormBuilder is a helper that reduces boilerplate

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      
      // Syntax: fb.control(initialValue, [syncValidators], [asyncValidators])
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)  // Only alphanumeric + underscore
      ], [
        this.checkUsernameAvailability.bind(this)  // Async validator (API call)
      ]],
      
      email: ['', [Validators.required, Validators.email]],
      
      // Nested FormGroup
      address: this.fb.group({
        street: ['', Validators.required],
        city:   ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),
      
      // Nested group with cross-field validator
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm:  ['', Validators.required]
      }, { validators: this.passwordMatchValidator })
      //   ^ Group-level validator
    });
  }

  // ── Convenience getters ──────────────────────────────────────────
  // Makes template cleaner: use 'username' instead of 'registrationForm.get("username")'
  get username() { return this.registrationForm.get('username')!; }
  get email()    { return this.registrationForm.get('email')!; }
  get passwords(){ return this.registrationForm.get('passwords') as FormGroup; }

  // ── Custom Sync Validator ────────────────────────────────────────
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm  = group.get('confirm')?.value;
    
    // Return null if valid, or an error object if invalid
    return password === confirm ? null : { mismatch: true };
  }

  // ── Custom Async Validator ───────────────────────────────────────
  // Returns an Observable — Angular waits for it to complete
  checkUsernameAvailability(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      debounceTime(400),  // Wait 400ms after user stops typing
      map(isTaken => isTaken ? { usernameTaken: true } : null)
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      console.log('Submitted:', formValue);
      this.userService.register(formValue);
    } else {
      // Mark all controls as touched to show all errors
      this.registrationForm.markAllAsTouched();
    }
  }
}
```

---

### Dynamic Forms — FormArray

When you don't know how many fields you'll have at design time.

```typescript
// Add/remove phone numbers, addresses, skills dynamically
@Component({
  template: `
    <form [formGroup]="resumeForm">
      <div formArrayName="skills">
        <div *ngFor="let skill of skills.controls; let i = index">
          
          <!-- Each item in FormArray needs its index -->
          <input [formControlName]="i" placeholder="Skill {{ i + 1 }}">
          <button (click)="removeSkill(i)">Remove</button>
          
        </div>
      </div>
      <button (click)="addSkill()">+ Add Skill</button>
    </form>
  `
})
export class ResumeComponent {
  resumeForm = this.fb.group({
    name: [''],
    skills: this.fb.array(['Angular', 'TypeScript'])  // Start with 2 items
  });

  // Getter for the FormArray
  get skills() {
    return this.resumeForm.get('skills') as FormArray;
  }

  addSkill(): void {
    // Push a new FormControl into the array
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
```

---
