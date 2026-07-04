---
title: Command Pattern
description: Encapsulating requests as objects
sidebar:
  order: 6
---

# Command Pattern

## Introduction

The Command pattern turns a request into a **standalone object** that contains all information about the request.

## Implementation

```javascript
class Command {
  constructor(execute, undo) {
    this.execute = execute;
    this.undo = undo;
  }
}

class CommandManager {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) command.undo();
  }
}

// Usage
const manager = new CommandManager();

const addChar = new Command(
  () => console.log('Added character'),
  () => console.log('Undo add character')
);

manager.execute(addChar);
manager.execute(addChar);
manager.undo(); // Undo add character
```

## Summary

- Encapsulates actions as objects
- Enables undo/redo, queuing, logging
- Good for text editors, game actions, transaction systems

## Further Reading

- [Refactoring Guru: Command](https://refactoring.guru/design-patterns/command)
