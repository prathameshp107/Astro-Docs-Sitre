---
title: CSV, JSON, and Binary Files
description: Learn how to work with CSV, JSON, and binary file formats in Python.
sidebar:
  order: 2
---

# CSV, JSON, and Binary Files

## Introduction

Beyond plain text, Python excels at working with structured data formats like CSV and JSON, as well as binary files.

## CSV Files

```python
import csv

# Reading CSV
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)  # ['Name', 'Age', 'City']

# Reading as dictionaries
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Name"], row["Age"])

# Writing CSV
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age", "City"])
    writer.writerow(["Alice", 30, "NYC"])
    writer.writerow(["Bob", 25, "LA"])

# Writing as dictionaries
with open("output.csv", "w", newline="") as f:
    fields = ["Name", "Age", "City"]
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerow({"Name": "Alice", "Age": 30, "City": "NYC"})
```

## JSON Files

```python
import json

# Python data
data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "SQL", "Docker"],
    "active": True,
    "address": None
}

# Writing JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Reading JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # Alice

# JSON string <-> Python
json_str = json.dumps(data)
parsed = json.loads(json_str)

# Pretty printing
print(json.dumps(data, indent=2, sort_keys=True))
```

## Binary Files

```python
# Write binary
with open("data.bin", "wb") as f:
    data = bytes([0x48, 0x65, 0x6C, 0x6C, 0x6F])
    f.write(data)

# Read binary
with open("data.bin", "rb") as f:
    content = f.read()
    print(content)  # b'Hello'
```

## Practice Exercises

**Exercise 1:** Write a program that reads a CSV file of student grades and calculates averages.

**Exercise 2:** Create a JSON configuration manager that loads, validates, and saves config files.

**Exercise 3:** Implement a program that converts CSV data to JSON format.
