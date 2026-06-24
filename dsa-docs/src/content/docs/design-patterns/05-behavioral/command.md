---
title: "Command"
description: "Turn a request into a standalone object that contains all information about the request."
sidebar:
  order: 3
---

## Command

> **Encapsulate a request as an object.**

### Real-World Analogy

> A **waiter takes your order** on a notepad. The notepad (command) contains everything needed to prepare your food. The chef takes the order and executes it. You can also queue, undo, or reorder orders.

---

## The Pattern

```mermaid
sequencediagram
    participant Client as Client
    participant Invoker as Invoker<br/>(Remote)
    participant Command as Command
    participant Receiver as Receiver<br/>(Light)

    Client->>Invoker: execute(command)
    Invoker->>Command: execute
    Command->>Receiver: turnOn
    Receiver-->>Command: done
    Command-->>Invoker: done
    Note over Invoker: store in history

    Client->>Invoker: undo
    Invoker->>Command: undo
    Command->>Receiver: turnOff
    Receiver-->>Command: done
    Command-->>Invoker: done
```

---

## ✅ Example

```js
// Command interface
class Command {
  execute() { throw new Error('Override'); }
  undo() { throw new Error('Override'); }
}

// Concrete Commands
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

// Receiver
class Light {
  constructor(name) {
    this.name = name;
  }

  turnOn() {
    console.log(`${this.name} light is ON 💡`);
  }

  turnOff() {
    console.log(`${this.name} light is OFF`);
  }
}

// Invoker (with undo support)
class RemoteControl {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const livingRoomLight = new Light('Living Room');
const kitchenLight = new Light('Kitchen');

const remote = new RemoteControl();

remote.execute(new LightOnCommand(livingRoomLight));
remote.execute(new LightOnCommand(kitchenLight));
remote.execute(new LightOffCommand(livingRoomLight));

// "Living Room light is ON 💡"
// "Kitchen light is ON 💡"
// "Living Room light is OFF"

remote.undo(); // Living Room light is ON 💡
remote.undo(); // Kitchen light is OFF
```

---

## Real-World Examples

| Technology | Command Usage |
|-----------|---------------|
| **Redux** | Actions are command objects dispatched to reducers |
| **React useReducer** | Actions describe state changes |
| **Undo/Redo** | History stack of commands |
| **Task queues** | Each job is a command object |

---

## When to Use

- You need to **parameterize** objects with operations
- You need **queue, log, or schedule** operations
- You need **undo/redo** functionality
- You want to **decouple** the sender from the executor

---

## In Simple Words

- A **request becomes an object** — it can be stored, queued, or undone
- Separates **who** triggers the action from **what** happens
- Makes undo/redo **easy** — just keep a history of commands
- Useful for **menus, buttons, transactions, and macros**
