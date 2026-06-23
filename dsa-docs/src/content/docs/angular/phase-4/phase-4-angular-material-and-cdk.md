---
title: "7. Angular Material & CDK"
description: "Material components and CDK basics for building professional UIs."
sidebar:
  order: 6
---

## 7. Angular Material & CDK

### Simple Words First 🟡
Building UI from scratch is like **making every single brick by hand**. Angular Material gives you **pre-made, beautiful LEGO blocks** — buttons, cards, tables, dialogs — that look professional and work perfectly.

The **CDK (Component Dev Kit)** is the toolbox that builds those blocks. Even if you don't use Material's pre-built components, the CDK gives you powerful tools for accessibility, drag-and-drop, overlays, and more.

---

### Installing Angular Material

```bash
ng add @angular/material

# This adds:
# 1. Material components
# 2. A pre-built theme (indigo-pink, deeppurple-amber, etc.)
# 3. CDK
# 4. Animations module
```

```typescript
// app.config.ts — Standalone setup
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // Required for Material animations
    // ...
  ],
};
```

### Common Material Components

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [
    MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatTableModule, MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <!-- Button -->
    <button mat-raised-button color="primary">Primary</button>
    <button mat-icon-button color="accent">
      <mat-icon>favorite</mat-icon>
    </button>

    <!-- Card -->
    <mat-card>
      <mat-card-header>
        <mat-card-title>User Profile</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Some content here</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Edit</button>
      </mat-card-actions>
    </mat-card>

    <!-- Input with form field -->
    <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input matInput placeholder="Enter email" />
      <mat-icon matSuffix>email</mat-icon>
      <mat-hint>We'll never share your email</mat-hint>
    </mat-form-field>

    <!-- Data Table -->
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let user">{{ user.name }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['name']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name']"></tr>
    </table>
  `,
})
export class MaterialDemoComponent {
  dataSource = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];
}
```

### CDK Features

```typescript
// 1. Drag and Drop
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  imports: [DragDropModule],
  template: `
    <div cdkDropList (cdkDropListDropped)="onDrop($event)">
      <div *ngFor="let item of items" cdkDrag>{{ item }}</div>
    </div>
  `,
})
export class DragDropComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];

  onDrop(event: any): void {
    // Reorder items
    const item = this.items.splice(event.previousIndex, 1)[0];
    this.items.splice(event.currentIndex, 0, item);
  }
}

// 2. Clipboard
import { ClipboardModule } from '@angular/cdk/clipboard';

// 3. Overlay (for custom tooltips, dropdowns, etc.)
import { OverlayModule } from '@angular/cdk/overlay';

// 4. Accessibility
import { A11yModule } from '@angular/cdk/a11y';
```

### Using SnackBar (Notifications)

```typescript
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ ... })
export class NotificationComponent {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(): void {
    this.snackBar.open('Product saved!', 'Undo', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
```

### In Simple Words 🧠

- **Angular Material** gives you pre-built, beautiful, accessible UI components
- Install with `ng add @angular/material` — it sets up everything
- Import components individually for smaller bundles (tree-shaking)
- The **CDK** is the underlying toolkit — use it for drag-drop, clipboard, overlays, a11y
- Material components follow Google's Material Design guidelines
- All Material components are accessible by default
