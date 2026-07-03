---
title: "Access Modifiers in TypeScript"
description: "Access modifiers (public, private, protected) control visibility of class members in TypeScript."
sidebar:
  order: 8
---

### 3.8 Access Modifiers

#### Simple Words First 🟡
Access modifiers are like the **security level of a room**:
- **public** = Anyone can enter (default)
- **private** = Only people inside this room can access it
- **protected** = This room and children rooms (subclasses) can access it

```typescript
class BankAccount {
  public accountHolder: string;    // Anyone can read/write
  private balance: number;         // Only this class can access
  protected bankName: string;      // This class and subclasses

  constructor(holder: string, initialBalance: number) {
    this.accountHolder = holder;
    this.balance = initialBalance;
    this.bankName = "State Bank";
  }

  // Public method to safely access private balance
  public getBalance(): number {
    return this.balance;
  }

  // Public method to modify private balance with validation
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ₹${amount}. New balance: ₹${this.balance}`);
    }
  }
}

const account = new BankAccount("Rohit", 10000);
account.accountHolder = "Rohit Kumar";  // ✅ Public — can change
// account.balance = 99999;             // ❌ Error! Private — cannot access directly
account.deposit(5000);                  // ✅ Using the public method
console.log(account.getBalance());      // ✅ Using the public getter

// ──── Shorthand Constructor (Angular uses this!) ────
class UserService {
  constructor(
    private apiUrl: string,         // Creates AND assigns private property
    public readonly version: string // Creates AND assigns public readonly property
  ) {}
}
```