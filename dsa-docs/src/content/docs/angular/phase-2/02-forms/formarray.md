---
title: "FormArray"
description: "Dynamic list of form controls."
sidebar:
  order: 6
---

## Introduction
FormArray manages a dynamic list of FormControl or FormGroup instances, useful for collections that users can add/remove.

## Example

```typescript
this.skills = new FormArray([
  new FormControl('Angular'),
  new FormControl('TypeScript')
]);

addSkill() {
  this.skills.push(new FormControl(''));
}

removeSkill(index: number) {
  this.skills.removeAt(index);
}
```

## Summary
FormArray handles dynamic collections of form controls with ease."
