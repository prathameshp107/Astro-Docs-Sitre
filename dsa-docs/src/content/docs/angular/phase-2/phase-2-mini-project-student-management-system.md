---
title: "5. Mini Project: Student Management System"
description: "A complete working app using Routing, Forms, Services, and Validation."
sidebar:
  order: 5
---

## 5. Mini Project: Student Management System

A complete working app using Routing, Forms, Services, and Validation.

### Project Structure

```
student-management/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── student.model.ts
│   │   │   └── services/
│   │   │       └── student.service.ts
│   │   ├── features/
│   │   │   ├── students/
│   │   │   │   ├── student-list/
│   │   │   │   │   └── student-list.component.ts
│   │   │   │   ├── student-detail/
│   │   │   │   │   └── student-detail.component.ts
│   │   │   │   └── student-form/
│   │   │   │       └── student-form.component.ts
│   │   │   └── dashboard/
│   │   │       └── dashboard.component.ts
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── confirm-dialog/
│   │   ├── app.routes.ts
│   │   └── app.component.ts
│   └── main.ts
```

---

### Step 1: The Student Model

```typescript
// src/app/core/models/student.model.ts

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  cgpa: number;
  dateOfBirth: string;
  phone: string;
  address: string;
  enrolledDate: string;
  status: 'active' | 'inactive' | 'graduated';
  subjects: string[];
}

// Type for creating a new student (id is auto-generated)
export type CreateStudentDTO = Omit<Student, 'id' | 'enrolledDate'>;

// Type for updating (all fields optional except id)
export type UpdateStudentDTO = Partial<CreateStudentDTO> & { id: string };

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Information Technology'
] as const;

export type Department = typeof DEPARTMENTS[number];
```

---

### Step 2: The Student Service

```typescript
// src/app/core/services/student.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Student, CreateStudentDTO } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {

  // Using Angular Signals (Angular 16+) for reactive state
  private studentsSignal = signal<Student[]>(this.loadFromStorage());
  
  // Computed values update automatically when studentsSignal changes
  readonly students = this.studentsSignal.asReadonly();
  readonly totalCount = computed(() => this.studentsSignal().length);
  readonly activeCount = computed(() =>
    this.studentsSignal().filter(s => s.status === 'active').length
  );
  readonly avgCgpa = computed(() => {
    const list = this.studentsSignal();
    if (!list.length) return 0;
    return list.reduce((sum, s) => sum + s.cgpa, 0) / list.length;
  });

  // ── CRUD Operations ──────────────────────────────────────────────

  addStudent(dto: CreateStudentDTO): Student {
    const newStudent: Student = {
      ...dto,
      id: this.generateId(),
      enrolledDate: new Date().toISOString().split('T')[0]
    };
    
    this.studentsSignal.update(students => [...students, newStudent]);
    this.saveToStorage();
    return newStudent;
  }

  updateStudent(id: string, dto: Partial<CreateStudentDTO>): Student | null {
    let updated: Student | null = null;
    
    this.studentsSignal.update(students =>
      students.map(s => {
        if (s.id === id) {
          updated = { ...s, ...dto };
          return updated;
        }
        return s;
      })
    );
    
    if (updated) this.saveToStorage();
    return updated;
  }

  deleteStudent(id: string): boolean {
    const before = this.studentsSignal().length;
    this.studentsSignal.update(students => students.filter(s => s.id !== id));
    const deleted = this.studentsSignal().length < before;
    if (deleted) this.saveToStorage();
    return deleted;
  }

  getStudentById(id: string): Student | undefined {
    return this.studentsSignal().find(s => s.id === id);
  }

  searchStudents(query: string): Student[] {
    const q = query.toLowerCase();
    return this.studentsSignal().filter(s =>
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q)
    );
  }

  filterByDepartment(dept: string): Student[] {
    return this.studentsSignal().filter(s => s.department === dept);
  }

  // ── Private helpers ──────────────────────────────────────────────

  private generateId(): string {
    return `STU-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  }

  private saveToStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.studentsSignal()));
  }

  private loadFromStorage(): Student[] {
    try {
      const stored = localStorage.getItem('students');
      return stored ? JSON.parse(stored) : this.getSampleData();
    } catch {
      return this.getSampleData();
    }
  }

  private getSampleData(): Student[] {
    return [
      {
        id: 'STU-001',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@student.edu',
        rollNumber: 'CS2021001',
        department: 'Computer Science',
        semester: 6,
        cgpa: 8.7,
        dateOfBirth: '2002-05-15',
        phone: '9876543210',
        address: 'Pune, Maharashtra',
        enrolledDate: '2021-07-01',
        status: 'active',
        subjects: ['Angular', 'NodeJS', 'MongoDB']
      },
      {
        id: 'STU-002',
        firstName: 'Rahul',
        lastName: 'Patil',
        email: 'rahul.patil@student.edu',
        rollNumber: 'CS2021002',
        department: 'Computer Science',
        semester: 6,
        cgpa: 7.9,
        dateOfBirth: '2002-11-20',
        phone: '9765432109',
        address: 'Mumbai, Maharashtra',
        enrolledDate: '2021-07-01',
        status: 'active',
        subjects: ['Java', 'Spring Boot', 'MySQL']
      }
    ];
  }
}
```

---

### Step 3: Application Routes

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { studentResolver } from './core/resolvers/student.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(c => c.DashboardComponent)
  },
  {
    path: 'students',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/students/student-list/student-list.component')
            .then(c => c.StudentListComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/students/student-form/student-form.component')
            .then(c => c.StudentFormComponent),
        canActivate: [authGuard]
      },
      {
        path: ':id',
        resolve: { student: studentResolver },
        loadComponent: () =>
          import('./features/students/student-detail/student-detail.component')
            .then(c => c.StudentDetailComponent)
      },
      {
        path: ':id/edit',
        resolve: { student: studentResolver },
        loadComponent: () =>
          import('./features/students/student-form/student-form.component')
            .then(c => c.StudentFormComponent),
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard]
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
```

---

### Step 4: Student List Component

```typescript
// src/app/features/students/student-list/student-list.component.ts
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      
      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat">
          <span class="stat-value">{{ studentService.totalCount() }}</span>
          <span class="stat-label">Total Students</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ studentService.activeCount() }}</span>
          <span class="stat-label">Active</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ studentService.avgCgpa() | number:'1.2-2' }}</span>
          <span class="stat-label">Avg CGPA</span>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <input
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch($event)"
          placeholder="Search by name, email, roll number..."
          class="search-input"
        >
        
        <select [(ngModel)]="selectedDept" (change)="onDeptFilter()">
          <option value="">All Departments</option>
          <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
        </select>
        
        <button class="btn-primary" (click)="addStudent()">+ Add Student</button>
      </div>

      <!-- Student Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th (click)="sortBy('rollNumber')">Roll No ↕</th>
            <th (click)="sortBy('firstName')">Name ↕</th>
            <th>Department</th>
            <th>Semester</th>
            <th (click)="sortBy('cgpa')">CGPA ↕</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of displayedStudents(); trackBy: trackStudent">
            <td>{{ student.rollNumber }}</td>
            <td>
              <div class="student-name">
                <div class="avatar">{{ student.firstName[0] }}{{ student.lastName[0] }}</div>
                <div>
                  <div class="name">{{ student.firstName }} {{ student.lastName }}</div>
                  <div class="email">{{ student.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ student.department }}</td>
            <td>Sem {{ student.semester }}</td>
            <td>
              <span class="cgpa-badge" [class]="getCgpaClass(student.cgpa)">
                {{ student.cgpa }}
              </span>
            </td>
            <td>
              <span class="status-badge" [class]="student.status">
                {{ student.status | titlecase }}
              </span>
            </td>
            <td>
              <button (click)="viewStudent(student.id)" title="View">👁</button>
              <button (click)="editStudent(student.id)" title="Edit">✏️</button>
              <button (click)="confirmDelete(student)" title="Delete" class="btn-danger">🗑</button>
            </td>
          </tr>
          
          <tr *ngIf="displayedStudents().length === 0">
            <td colspan="7" class="empty-state">No students found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StudentListComponent {
  
  searchQuery = '';
  selectedDept = '';
  sortField: keyof Student = 'rollNumber';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'];
  
  // Computed: applies search + filter + sort reactively
  displayedStudents = computed(() => {
    let list = this.studentService.students();
    
    if (this.searchQuery) {
      list = list.filter(s =>
        `${s.firstName} ${s.lastName} ${s.email} ${s.rollNumber}`
          .toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    if (this.selectedDept) {
      list = list.filter(s => s.department === this.selectedDept);
    }
    
    return [...list].sort((a, b) => {
      const aVal = String(a[this.sortField]);
      const bVal = String(b[this.sortField]);
      return this.sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  });

  constructor(
    public studentService: StudentService,
    private router: Router
  ) {}

  onSearch(query: string): void {
    this.searchQuery = query;
  }

  onDeptFilter(): void { /* signal-based, auto-updates */ }

  sortBy(field: keyof Student): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  viewStudent(id: string)   { this.router.navigate(['/students', id]); }
  editStudent(id: string)   { this.router.navigate(['/students', id, 'edit']); }
  addStudent()              { this.router.navigate(['/students', 'new']); }

  confirmDelete(student: Student): void {
    const confirmed = confirm(`Delete ${student.firstName} ${student.lastName}?`);
    if (confirmed) {
      this.studentService.deleteStudent(student.id);
    }
  }

  getCgpaClass(cgpa: number): string {
    if (cgpa >= 8.5) return 'cgpa-excellent';
    if (cgpa >= 7.0) return 'cgpa-good';
    if (cgpa >= 5.5) return 'cgpa-average';
    return 'cgpa-poor';
  }

  trackStudent(index: number, student: Student): string {
    return student.id;  // Helps Angular optimize re-renders
  }
}
```

---

### Step 5: Student Form Component (Add / Edit)

```typescript
// src/app/features/students/student-form/student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../core/services/student.service';
import { Student, DEPARTMENTS } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-page">
      <h2>{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h2>
      
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
        
        <!-- Personal Information Section -->
        <section class="form-section">
          <h3>Personal Information</h3>
          
          <div class="form-row">
            <div class="form-field">
              <label>First Name *</label>
              <input formControlName="firstName" placeholder="Enter first name">
              <span class="error" *ngIf="isInvalid('firstName', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('firstName', 'minlength')">Min 2 characters</span>
            </div>
            
            <div class="form-field">
              <label>Last Name *</label>
              <input formControlName="lastName" placeholder="Enter last name">
              <span class="error" *ngIf="isInvalid('lastName', 'required')">Required</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-field">
              <label>Email *</label>
              <input formControlName="email" type="email" placeholder="student@example.com">
              <span class="error" *ngIf="isInvalid('email', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('email', 'email')">Invalid email format</span>
            </div>
            
            <div class="form-field">
              <label>Phone *</label>
              <input formControlName="phone" placeholder="10-digit mobile number">
              <span class="error" *ngIf="isInvalid('phone', 'pattern')">Enter valid 10-digit number</span>
            </div>
          </div>
          
          <div class="form-field">
            <label>Date of Birth *</label>
            <input formControlName="dateOfBirth" type="date" [max]="maxDobDate">
            <span class="error" *ngIf="isInvalid('dateOfBirth', 'required')">Required</span>
            <span class="error" *ngIf="studentForm.errors?.['underAge']">Must be at least 15 years old</span>
          </div>
        </section>
        
        <!-- Academic Information Section -->
        <section class="form-section">
          <h3>Academic Information</h3>
          
          <div class="form-row">
            <div class="form-field">
              <label>Roll Number *</label>
              <input formControlName="rollNumber" placeholder="e.g., CS2021001"
                     [readonly]="isEditMode">
              <span class="error" *ngIf="isInvalid('rollNumber', 'required')">Required</span>
              <span class="error" *ngIf="isInvalid('rollNumber', 'pattern')">Invalid format</span>
            </div>
            
            <div class="form-field">
              <label>Department *</label>
              <select formControlName="department">
                <option value="">Select Department</option>
                <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
              </select>
              <span class="error" *ngIf="isInvalid('department', 'required')">Required</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-field">
              <label>Semester *</label>
              <select formControlName="semester">
                <option *ngFor="let sem of [1,2,3,4,5,6,7,8]" [value]="sem">Semester {{ sem }}</option>
              </select>
            </div>
            
            <div class="form-field">
              <label>CGPA (0-10) *</label>
              <input formControlName="cgpa" type="number" step="0.01" min="0" max="10">
              <span class="error" *ngIf="isInvalid('cgpa', 'min') || isInvalid('cgpa', 'max')">
                CGPA must be between 0 and 10
              </span>
            </div>
          </div>
          
          <div class="form-field">
            <label>Status</label>
            <div class="radio-group">
              <label *ngFor="let s of ['active', 'inactive', 'graduated']">
                <input type="radio" formControlName="status" [value]="s">
                {{ s | titlecase }}
              </label>
            </div>
          </div>
        </section>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" (click)="cancel()" class="btn-secondary">Cancel</button>
          <button type="submit" [disabled]="studentForm.invalid || isSubmitting" class="btn-primary">
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Student' : 'Add Student') }}
          </button>
        </div>
        
        <!-- Debug panel (remove in production) -->
        <details>
          <summary>Debug: Form State</summary>
          <pre>Valid: {{ studentForm.valid }}</pre>
          <pre>Errors: {{ studentForm.errors | json }}</pre>
          <pre>Value: {{ studentForm.value | json }}</pre>
        </details>
      </form>
    </div>
  `
})
export class StudentFormComponent implements OnInit {
  
  studentForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  editStudentId: string | null = null;
  departments = DEPARTMENTS;
  maxDobDate = new Date(Date.now() - 15 * 365.25 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];  // 15 years ago

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    
    // Check if we're editing (resolver passes student in route data)
    const existingStudent = this.route.snapshot.data['student'] as Student;
    if (existingStudent) {
      this.isEditMode = true;
      this.editStudentId = existingStudent.id;
      this.studentForm.patchValue(existingStudent);  // patchValue fills only the fields that exist
    }
  }

  private buildForm(): void {
    this.studentForm = this.fb.group({
      firstName:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName:    ['', [Validators.required, Validators.maxLength(50)]],
      email:       ['', [Validators.required, Validators.email]],
      phone:       ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      dateOfBirth: ['', Validators.required],
      rollNumber:  ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{7}$/)]],
      department:  ['', Validators.required],
      semester:    [1,  Validators.required],
      cgpa:        [0,  [Validators.required, Validators.min(0), Validators.max(10)]],
      address:     [''],
      status:      ['active'],
      subjects:    [[]]
    }, { validators: this.ageValidator });
  }

  // Group-level validator: check student age from dateOfBirth
  private ageValidator(group: FormGroup) {
    const dob = group.get('dateOfBirth')?.value;
    if (!dob) return null;
    
    const ageMs = Date.now() - new Date(dob).getTime();
    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    
    return ageYears >= 15 ? null : { underAge: true };
  }

  // Helper: is a specific field invalid and touched?
  isInvalid(fieldName: string, errorType: string): boolean {
    const control = this.studentForm.get(fieldName);
    return !!(control?.invalid && control?.touched && control?.errors?.[errorType]);
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();  // Show all errors
      return;
    }

    this.isSubmitting = true;
    const formValue = this.studentForm.value;

    if (this.isEditMode && this.editStudentId) {
      this.studentService.updateStudent(this.editStudentId, formValue);
      this.showSuccess('Student updated successfully!');
    } else {
      this.studentService.addStudent(formValue);
      this.showSuccess('Student added successfully!');
    }

    this.isSubmitting = false;
    this.router.navigate(['/students']);
  }

  cancel(): void {
    if (this.studentForm.dirty) {
      const confirmed = confirm('Discard unsaved changes?');
      if (!confirmed) return;
    }
    this.router.navigate(['/students']);
  }

  private showSuccess(msg: string): void {
    // In a real app, use a toast/notification service
    alert(msg);
  }
}
```

---

### Step 6: App Component with Navigation

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-layout">
      
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <div class="logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">StudentMS</span>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            📊 Dashboard
          </a>
          <a routerLink="/students" routerLinkActive="active" class="nav-item">
            👥 Students
          </a>
          <a routerLink="/students/new" class="nav-item btn-add">
            ➕ Add Student
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background: #f1f5f9;
    }
    .sidebar {
      width: 240px;
      background: #1e293b;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { font-size: 28px; }
    .logo-text { color: #38bdf8; font-size: 18px; font-weight: 700; }
    .nav-menu { display: flex; flex-direction: column; gap: 4px; }
    .nav-item {
      padding: 12px 16px;
      border-radius: 8px;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s;
    }
    .nav-item:hover { background: #334155; color: #fff; }
    .nav-item.active { background: #0284c7; color: #fff; }
    .main-content { flex: 1; padding: 32px; overflow-y: auto; }
  `]
})
export class AppComponent {}
```

---
