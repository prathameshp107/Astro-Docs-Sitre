---
title: "datetime Module"
description: "How to work with dates and times in Python — date, time, datetime, timedelta, formatting, and time zones."
sidebar:
  order: 3
---

# datetime Module

## Simple Analogy 🗓️

The `datetime` module is like a **smart calendar + clock** combined. Instead of manually counting days or parsing date strings, it handles all the complexity — leap years, time zones, date math.

---

## Core Types

```python
from datetime import date, time, datetime, timedelta

# date — just the date
d = date(2025, 12, 25)
print(d)            # 2025-12-25
print(d.year)       # 2025
print(d.month)      # 12
print(d.day)        # 25
print(d.weekday())  # 3 (Wednesday — Monday=0)

# time — just the time
t = time(14, 30, 45)
print(t)            # 14:30:45
print(t.hour)       # 14
print(t.minute)     # 30

# datetime — date + time
dt = datetime(2025, 12, 25, 14, 30, 45)
print(dt)           # 2025-12-25 14:30:45
```

---

## Getting Current Date/Time

```python
from datetime import datetime, date, timezone

# Current datetime
now = datetime.now()
print(now)  # 2025-06-23 10:30:15.123456

# Current date only
today = date.today()
print(today)  # 2025-06-23

# Current UTC time
utc_now = datetime.now(timezone.utc)
print(utc_now)  # 2025-06-23 05:00:15.123456+00:00
```

---

## Formatting and Parsing

```python
from datetime import datetime

# Format a datetime to a string
dt = datetime(2025, 12, 25, 14, 30)

formatted = dt.strftime("%Y-%m-%d %H:%M:%S")
print(formatted)          # 2025-12-25 14:30:00

formatted = dt.strftime("%A, %B %d, %Y")
print(formatted)          # Thursday, December 25, 2025

formatted = dt.strftime("%I:%M %p")
print(formatted)          # 02:30 PM

# Parse a string to datetime
date_str = "2025-12-25 14:30:00"
parsed = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print(parsed)  # 2025-12-25 14:30:00
```

### Common Format Codes

| Code | Meaning | Example |
|------|---------|---------|
| `%Y` | Year (4 digits) | 2025 |
| `%m` | Month (01-12) | 12 |
| `%d` | Day (01-31) | 25 |
| `%H` | Hour (00-23) | 14 |
| `%M` | Minute (00-59) | 30 |
| `%S` | Second (00-59) | 45 |
| `%A` | Weekday name | Thursday |
| `%B` | Month name | December |

---

## Timedelta — Date Math

```python
from datetime import datetime, timedelta

now = datetime.now()

# Add/subtract time
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
last_hour = now - timedelta(hours=1)
in_90_days = now + timedelta(days=90)

# Difference between two dates
start = datetime(2025, 1, 1)
end = datetime(2025, 12, 31)
diff = end - start
print(diff.days)       # 364
print(diff.total_seconds())  # 31449600.0

# Find next Friday
from datetime import timedelta
today = datetime.now()
days_ahead = 4 - today.weekday()  # Friday = 4
if days_ahead <= 0:
    days_ahead += 7
next_friday = today + timedelta(days=days_ahead)
```

---

## Time Zones

```python
from datetime import datetime, timezone, timedelta
# For full timezone support, install: pip install pytz
# Or use zoneinfo (Python 3.9+)
from zoneinfo import ZoneInfo

utc = datetime.now(timezone.utc)
print(utc)  # 2025-06-23 05:00:00+00:00

# Convert to another timezone (Python 3.9+)
ist = utc.astimezone(ZoneInfo("Asia/Kolkata"))
print(ist)  # 2025-06-23 10:30:00+05:30

est = utc.astimezone(ZoneInfo("America/New_York"))
print(est)  # 2025-06-23 01:00:00-04:00
```

---

## 🧠 In Simple Words

- **`date`** = day/month/year; **`time`** = hour/minute/second; **`datetime`** = both combined
- Use **`strftime()`** to format a date to a string; use **`strptime()`** to parse a string to a date
- **`timedelta`** = date math — add/subtract days, hours, weeks, etc.
- Compare dates with `<`, `>`, `==`; subtract them to get a `timedelta`
- For time zones, use **`zoneinfo.ZoneInfo`** (Python 3.9+) or install **`pytz`**
