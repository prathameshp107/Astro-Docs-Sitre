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

![Angular Forms Architecture](/DSA-Notes-Problems/assets/angular/phase-2-4-angular-forms-architecture.svg)

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
