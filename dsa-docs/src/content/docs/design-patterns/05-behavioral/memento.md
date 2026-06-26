---
title: "Memento"
description: "Capture and externalize an object's internal state so the object can be restored to this state later, without violating encapsulation."
sidebar:
  order: 9
---

## Memento

> **Save and restore an object's state without exposing its internal details.**

### Real-World Analogy

> **Ctrl+Z (undo) in a text editor** — the editor saves snapshots of your document. Each snapshot is a memento. Pressing undo restores a previous snapshot.

---

## The Pattern

```mermaid
sequencediagram
    participant Client
    participant Originator as Originator<br/>(TextEditor)
    participant Caretaker as Caretaker<br/>(History)
    participant Memento as Memento<br/>(Snapshot)

    Note over Originator: writing: Hello
    Client->>Originator: write(Hello)
    Client->>Originator: save()
    Originator->>Memento: create snapshot
    Memento-->>Originator: memento
    Originator->>Caretaker: push(memento)

    Note over Originator: writing: Hello World
    Client->>Originator: write(World)
    Client->>Originator: save()
    Originator->>Memento: create snapshot
    Memento-->>Originator: memento
    Originator->>Caretaker: push(memento)

    Note over Originator: writing: Hello World!!!
    Client->>Caretaker: pop()
    Caretaker-->>Client: memento
    Client->>Originator: restore(memento)
    Note over Originator: restored: Hello World
```

---

## ✅ Example

```js
// Originator — the object whose state we save
class TextEditor {
  constructor() {
    this.content = '';
    this.cursorPosition = 0;
  }

  write(text) {
    this.content += text;
    this.cursorPosition = this.content.length;
  }

  save() {
    return new EditorMemento(this.content, this.cursorPosition);
  }

  restore(memento) {
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
  }

  show() {
    console.log(`Content: "${this.content}" (cursor at ${this.cursorPosition})`);
  }
}

// Memento — stores state (immutable)
class EditorMemento {
  constructor(content, cursorPosition) {
    this._content = content;
    this._cursorPosition = cursorPosition;
  }

  getContent() {
    return this._content;
  }

  getCursorPosition() {
    return this._cursorPosition;
  }
}

// Caretaker — manages history
class History {
  constructor() {
    this.snapshots = [];
  }

  push(memento) {
    this.snapshots.push(memento);
  }

  pop() {
    return this.snapshots.pop();
  }
}

// Usage
const editor = new TextEditor();
const history = new History();

editor.write('Hello ');
history.push(editor.save());

editor.write('World');
history.push(editor.save());

editor.write('!!!');
editor.show(); // "Hello World!!!" (cursor at 14)

editor.restore(history.pop());
editor.show(); // "Hello World" (cursor at 11)

editor.restore(history.pop());
editor.show(); // "Hello " (cursor at 6)
```

---

## When to Use

- You need **undo/redo** functionality
- You need to save **checkpoints** of an object's state
- You want to avoid exposing the object's internal structure

## When NOT to Use

- The state is very large (memory heavy)
- The object changes infrequently
- You don't need undo functionality

---

## In Simple Words

- Take a **snapshot** of an object's state, store it, restore it later
- The snapshot doesn't expose **how** the object stores its data
- Three roles: **Originator** (creates snapshots), **Memento** (the snapshot), **Caretaker** (manages history)
- Powers **undo/redo** in editors, games, and apps
