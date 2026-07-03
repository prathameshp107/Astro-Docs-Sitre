// ─── Python Interview Questions (200) ───────────────────────────────────
export const PYTHON_QUESTIONS = [
  // ── Easy ─────────────────────────────────────────────────────────────────
  [
    "What is Python and what are its key features?",
    "easy",
    "Python is a high-level, interpreted, dynamically-typed programming language. Key features: readable syntax (indentation-based), dynamically typed (but supports type hints), garbage collected, large standard library, extensive third-party packages (PyPI), cross-platform, supports multiple paradigms (OOP, functional, procedural), interpreted execution (CPython compiles to bytecode)."
  ],
  [
    "What is the difference between Python 2 and Python 3?",
    "easy",
    "Python 2 is legacy (EOL 2020). Python 3 differences: print is function (`print()`), integer division returns float (`3/2=1.5` vs `1`), Unicode strings default, `range` returns iterator (not list), `input()` returns string (not eval), `except` syntax `except Exception as e`, removed features (`xrange`, `apply`, `exec` as statement). Always use Python 3."
  ],
  [
    "What are Python's built-in data types?",
    "easy",
    "Immutable: `int`, `float`, `complex`, `str`, `bytes`, `tuple`, `frozenset`, `bool`, `NoneType`. Mutable: `list`, `dict`, `set`, `bytearray`. Numeric types: `int` (unbounded), `float` (64-bit), `complex`. Sequence types: `str`, `list`, `tuple`, `range`. Mapping: `dict`. Set types: `set`, `frozenset`."
  ],
  [
    "What is the difference between a list and a tuple?",
    "easy",
    "List: mutable (`append`, `remove`, `[i]=val`), slower, more memory (over-allocation). Tuple: immutable (cannot change), faster, hashable (can be dict key). Tuples are for fixed collections (coordinates, database rows). Lists are for dynamic collections. Syntax: `[1, 2]` vs `(1, 2)`. Both are ordered and indexable."
  ],
  [
    "What is a dictionary in Python?",
    "easy",
    "A dict stores key-value pairs (hash table). Keys must be hashable (immutable types: str, int, tuple, frozenset). Values can be any type. Python 3.7+ maintains insertion order. Methods: `d[key]`, `d.get(key, default)`, `d.keys()`, `d.values()`, `d.items()`, `d.pop(key)`, `d.update(other)`. Dict comprehensions: `{k: v for k, v in iterable}`."
  ],
  [
    "What is a set in Python and how is it different from a list?",
    "easy",
    "Set: unordered collection of UNIQUE, hashable elements. O(1) membership test. Mutable (add, remove). List: ordered, allows duplicates, O(n) membership test. Use set for: deduplication, membership testing, mathematical operations (union, intersection). Use list for: ordered sequences, duplicates needed. `frozenset` is immutable (hashable) version."
  ],
  [
    "What is the difference between mutable and immutable types in Python?",
    "easy",
    "Mutable: can be changed in-place after creation (list, dict, set, bytearray). Immutable: cannot be changed (int, str, tuple, frozenset, bytes). Immutable objects are hashable (can be dict keys), thread-safe, and can be optimized by Python (string interning). Mutable objects are more flexible for dynamic data but require careful handling for sharing."
  ],
  [
    "What is None in Python?",
    "easy",
    "`None` is Python's null value — represents absence of a value. Singleton (only one instance). Falsy in boolean context. `is None` (not `== None`) is the correct comparison — `None` is a unique singleton. Functions without return implicitly return `None`. Default argument sentinel: `def f(x=None): if x is None: x = []`."
  ],
  [
    "What is the difference between == and is in Python?",
    "easy",
    "`==` checks VALUE equality (calls `__eq__`). `is` checks IDENTITY (same object in memory — same `id()`). `a is b` equivalent to `id(a) == id(b)`. Use `is` for: `None`, `True`, `False`, singletons. Use `==` for value comparison. Example: `[] == []` is `True`, `[] is []` is `False` (different objects)."
  ],
  [
    "What are Python's comparison operators?",
    "easy",
    "Standard: `<`, `<=`, `>`, `>=`, `==`, `!=`. Chaining: `1 < x < 10` is valid (equivalent to `1 < x and x < 10`). Identity: `is`, `is not`. Membership: `in`, `not in`. Custom comparison via `__lt__`, `__le__`, `__gt__`, `__ge__`, `__eq__`, `__ne__`. `functools.total_ordering` decorator fills missing comparison methods."
  ],
  [
    "What is a Python function and how do you define one?",
    "easy",
    "`def function_name(param1, param2=default, *args, **kwargs): \"\"\"Docstring\"\"\" body return value`. Functions are first-class objects (can be passed as args, returned, assigned). Parameters: positional, keyword (default), positional-only (`/`), keyword-only (`*`), variable `*args` (tuple), `**kwargs` (dict). Functions without return return `None`."
  ],
  [
    "What are *args and **kwargs?",
    "easy",
    "`*args` captures extra positional arguments as a tuple. `**kwargs` captures extra keyword arguments as a dict. Example: `def f(a, *args, **kwargs): print(a, args, kwargs)`. Call: `f(1, 2, 3, x=4, y=5)` → prints `1 (2, 3) {'x': 4, 'y': 5}`. Used for wrapper/decorator functions that pass through all arguments."
  ],
  [
    "What is a lambda function in Python?",
    "easy",
    "Lambda is an anonymous, single-expression function. Syntax: `lambda args: expression`. Example: `lambda x: x * 2`. Cannot contain statements (only expressions). Use for: `sorted(list, key=lambda x: x[1])`, `map(lambda x: x**2, nums)`, `filter(lambda x: x > 0, nums)`. For complex logic, use a regular `def` function."
  ],
  [
    "What is list comprehension in Python?",
    "easy",
    "`[expression for item in iterable if condition]` — concise way to create lists. Example: `[x**2 for x in range(10) if x % 2 == 0]` → `[0, 4, 16, 36, 64]`. Nested: `[x*y for x in [1,2] for y in [3,4]]`. Faster than `for` loops with `append()`. Alternative: dict comprehension `{k: v for ...}`, set comprehension `{x for x in ...}`."
  ],
  [
    "What is a dictionary comprehension?",
    "easy",
    "`{key_expr: value_expr for item in iterable if condition}`. Example: `{x: x**2 for x in range(5)}` → `{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`. Invert mapping: `{v: k for k, v in original.items()}`. Filter: `{k: v for k, v in items.items() if v > 0}`."
  ],
  [
    "What is the difference between range() and list(range())?",
    "easy",
    "`range(stop)` returns a lazy `range` object (not a list) — it generates values on demand, uses O(1) memory regardless of size. `list(range(stop))` materializes all values into memory (O(n) memory). For iteration: `for i in range(1000000):` is efficient. For indexing or repeating iteration: `numbers = list(range(100))`."
  ],
  [
    "What is slicing in Python? Give examples.",
    "easy",
    "`sequence[start:stop:step]` extracts a subsequence. Examples: `[0,1,2,3,4][1:3]` → `[1,2]`; `[::-1]` reverses; `[:-1]` all but last; `[::2]` every other. Works on: list, tuple, str, bytes. Returns the same type. Negative indices count from end. `start` defaults to 0, `stop` to length, `step` to 1."
  ],
  [
    "What is string formatting in Python? (f-strings, .format(), %)",
    "easy",
    "`%` (old): `'Hello %s' % name`. `.format()`: `'Hello {name}'.format(name='World')`. f-strings (Python 3.6+, preferred): `f'Hello {name}'` with expressions: `f'{2 + 2}'`, `f'{value:.2f}'`. f-strings are fastest, most readable, and support arbitrary expressions."
  ],
  [
    "What are Python modules and how do you import them?",
    "easy",
    "A module is a `.py` file containing Python code. Import: `import math` (access `math.pi`), `from math import pi` (direct access), `from math import *` (all public names — avoid), `import math as m` (alias). Modules can have `__name__` for detection (`if __name__ == '__main__'`). Packages: directories with `__init__.py`."
  ],
  [
    "What is the difference between import module and from module import x?",
    "easy",
    "`import module` imports the module namespace — access via `module.x`. `from module import x` imports `x` into the current namespace — use directly as `x`. The latter can cause naming conflicts. `from module import *` imports all public names — avoid (pollutes namespace, unclear origin). `import module` is generally preferred for clarity."
  ],
  [
    "What is pip?",
    "easy",
    "`pip` is Python's package installer. Installs packages from PyPI (Python Package Index). Commands: `pip install package`, `pip uninstall package`, `pip list`, `pip freeze` (outputs installed packages with versions), `pip install -r requirements.txt`. Modern alternatives: `pipenv`, `poetry`, `uv` (faster)."
  ],
  [
    "What is a virtual environment in Python?",
    "easy",
    "A virtual environment is an isolated Python environment with its own packages. Created: `python -m venv venv`. Activate: `source venv/bin/activate` (Linux) or `venv\\Scripts\\activate` (Windows). Each project gets its own dependencies — prevents version conflicts. Best practice: always use virtual environments/pipenv/poetry for project isolation."
  ],
  [
    "What is the if __name__ == '__main__' pattern?",
    "easy",
    "`if __name__ == '__main__':` runs code ONLY when the file is executed directly (not when imported). `__name__` is `'__main__'` for the entry point file; for imported modules, it's the module name. Pattern: put test/runner code here. Allows the file to be both a reusable module and a standalone script."
  ],
  [
    "What is the difference between print() in Python 2 vs 3?",
    "easy",
    "Python 2: `print \"hello\"` (statement, no parentheses). Python 3: `print(\"hello\")` (function). Python 3's `print()` supports: `sep` (separator: `print('a','b', sep=',')`), `end` (line ending: `print('...', end='')`), `file` (output stream: `print('err', file=sys.stderr)`), `flush` (force buffer flush)."
  ],
  [
    "What is the pass statement?",
    "easy",
    "`pass` is a no-op statement — does nothing. Used as a placeholder for future code: empty functions (`def f(): pass`), empty classes (`class MyError(Exception): pass`), empty loops/conditionals. Prevents `IndentationError` for syntactically required empty blocks."
  ],
  [
    "What is indentation in Python and why does it matter?",
    "easy",
    "Python uses indentation (usually 4 spaces) to define code blocks instead of braces (`{}`). Consistent indentation is REQUIRED — mismatched indentation causes `IndentationError`. All code in the same block must have the same indentation level. Tabs vs spaces: never mix — PEP 8 recommends 4 spaces. Most editors auto-convert."
  ],
  [
    "What is a for loop vs while loop in Python?",
    "easy",
    "`for item in iterable:` iterates over a sequence (list, str, range). `while condition:` loops until condition is false. Use `for` when iterating over known data (preferred). Use `while` when looping until a condition changes (unknown iterations). Both support `break` (exit loop), `continue` (skip to next), and `else` (runs if no break)."
  ],
  [
    "What are Python's boolean operators: and, or, not?",
    "easy",
    "`and`: returns first falsy value or last truthy value (also `&` for bitwise). `or`: returns first truthy value or last falsy value (also `|` for bitwise). `not`: returns boolean inverse (`not True` → `False`). Short-circuiting: `and`/`or` stop evaluating as soon as result is determined. Example: `user and user.name` safely accesses name."
  ],
  [
    "What is the ternary operator in Python?",
    "easy",
    "`value_if_true if condition else value_if_false`. Example: `result = 'even' if x % 2 == 0 else 'odd'`. No `?:` like C/JS. Can chain: `a if cond1 else b if cond2 else c`. Use sparingly — for simple conditions only. Complex logic should use regular `if/else` blocks."
  ],
  [
    "What is the difference between append() and extend() on a list?",
    "easy",
    "`append(item)` adds a single element (including a list as one element). `extend(iterable)` adds each element from the iterable individually. Example: `a = [1, 2]; a.append([3, 4])` → `[1, 2, [3, 4]]`. `a.extend([3, 4])` → `[1, 2, 3, 4]`. `+=` is equivalent to `extend`."
  ],

  // ── Medium ────────────────────────────────────────────────────────────────
  [
    "What are Python decorators and how do they work?",
    "med",
    "Decorators wrap functions/classes to add behavior. Syntax: `@decorator` is sugar for `func = decorator(func)`. Basic: `def timer(f): def wrapper(*args, **kwargs): start = time(); result = f(*args, **kwargs); print(time()-start); return result; return wrapper`. `@timer def slow(): ...`. Use `functools.wraps` to preserve metadata. Class decorators work similarly."
  ],
  [
    "What is a closure in Python?",
    "med",
    "A closure is a function that retains access to its enclosing scope's variables even after the outer function finishes. Created when an inner function references outer function's variables. Example: `def outer(x): def inner(y): return x + y; return inner`. `add5 = outer(5); add5(3)` → 8. Variables are stored in `__closure__` attribute."
  ],
  [
    "What is the difference between @staticmethod and @classmethod?",
    "med",
    "`@staticmethod`: no automatic first argument — like a regular function in the class namespace. `@classmethod`: receives `cls` (the class) as first argument. Use `@classmethod` for alternative constructors: `def from_string(cls, str): return cls(*str.split())`. Use `@staticmethod` for grouping related utility functions in a class."
  ],
  [
    "What is __init__ and __new__ in Python classes?",
    "med",
    "`__new__(cls, ...)` creates and returns a new instance (called BEFORE __init__). Used for: immutable types (tuples, strings), singletons, metaclasses. `__init__(self, ...)` initializes the instance after creation. Most classes only need `__init__`. Both are rarely overridden in normal code."
  ],
  [
    "What is __repr__ vs __str__?",
    "med",
    "`__repr__` returns an \"official\" string representation (should be unambiguous, ideally eval-able: `eval(repr(obj))`). `__str__` returns a \"pretty\" string for users. `print(obj)` calls `__str__`; `repr(obj)` and `f\"{obj!r}\"` call `__repr__`. If `__str__` is missing, Python falls back to `__repr__`. Best practice: always define `__repr__`."
  ],
  [
    "What is operator overloading in Python? (dunder methods)",
    "med",
    "Special methods (\"dunder\" = double underscore) let custom classes work with Python operators. Examples: `__add__(self, other)` for `+`, `__eq__` for `==`, `__lt__` for `<`, `__getitem__` for `obj[key]`, `__len__` for `len()`, `__call__` for `obj()`. `functools.total_ordering` auto-generates comparison methods from `__eq__` and `__lt__`."
  ],
  [
    "What is inheritance in Python? How does MRO work?",
    "med",
    "`class Child(Parent):` inherits from Parent. MRO (Method Resolution Order) determines which method is called in diamond inheritance. Use `ClassName.__mro__` to view. Python uses C3 linearization algorithm. `super()` follows MRO — doesn't just call the immediate parent. `super().__init__()` properly initializes all classes in the MRO chain."
  ],
  [
    "What is the super() function?",
    "med",
    "`super()` returns a proxy object that delegates method calls following MRO. In single inheritance: calls the parent. In multiple inheritance: follows the full MRO chain. Use `super().__init__()` instead of `Parent.__init__(self)` for cooperative multiple inheritance. `super() can be called without arguments in Python 3."
  ],
  [
    "What is multiple inheritance in Python and what is the diamond problem?",
    "med",
    "Python supports multiple inheritance: `class C(A, B):`. Diamond problem: `A` → `B` and `C` both inherit `A`, `D` inherits `B` and `C`. Python resolves via C3 linearization (MRO): `D -> B -> C -> A`. `super()` ensures each class in MRO is called once. Avoid complex MI — use composition instead."
  ],
  [
    "What are Python generators? What is the yield keyword?",
    "med",
    "Generators are functions that use `yield` instead of `return` — they produce a sequence of values lazily. Each `yield` pauses execution, the next call to `next()` resumes after it. They maintain state between calls. Generator functions return a generator object (implements iterator protocol). Memory efficient for large sequences."
  ],
  [
    "What is the difference between a generator and an iterator?",
    "med",
    "All generators are iterators, but not all iterators are generators. Iterators: objects with `__iter__()` and `__next__()` methods. Generators: created with `yield` or generator expressions `(x for x in range(10))`. Generators are a concise way to create iterators. Custom iterators need class with `__iter__`/`__next__`."
  ],
  [
    "What are iterators in Python? What is the iterator protocol?",
    "med",
    "Iterator protocol: objects that implement `__iter__()` (returns self) and `__next__()` (returns next value or raises `StopIteration`). For loops call `iter(obj)` to get an iterator, then repeatedly call `next()` until `StopIteration`. Example: `class MyRange: def __init__(self, n): self.i = 0; self.n = n; def __iter__(self): return self; def __next__(self): if self.i < self.n: v = self.i; self.i += 1; return v; else: raise StopIteration`."
  ],
  [
    "What is a context manager? How does 'with' work?",
    "med",
    "Context managers set up and tear down resources automatically. `with open('file.txt') as f:` closes the file even on exceptions. Protocol: `__enter__(self)` (returns resource) and `__exit__(self, exc_type, exc_val, exc_tb)` (cleanup, suppresses exception if returns True). Used for: file I/O, database connections, locks, network connections."
  ],
  [
    "How do you create a custom context manager?",
    "med",
    "Class-based: implement `__enter__` and `__exit__`. Function-based with `@contextmanager`: `from contextlib import contextmanager; @contextmanager def managed(): print('enter'); yield resource; print('exit')`. Usage: `with managed() as r: ...`. The code between `yield` is the body of the `with` block. Wrap in try/finally for exception-safe cleanup."
  ],
  [
    "What is exception handling in Python? (try/except/else/finally)",
    "med",
    "`try`: code that may raise. `except SomeError as e`: handler (can have multiple except clauses). `else`: runs if NO exception occurred. `finally`: ALWAYS runs (cleanup). Example: `try: x = int('abc') except ValueError as e: print(e) else: print('ok') finally: cleanup()`. `except` without type catches ALL exceptions — generally avoid."
  ],
  [
    "What is the difference between raise and raise from?",
    "med",
    "`raise` re-raises the current exception or raises a new one. `raise NewException from original_exception` chains exceptions — shows the traceback chain. `raise ValueError('bad') from None` suppresses the original exception chain. Use `raise ... from` when re-raising with a different exception type to preserve the original cause."
  ],
  [
    "How do you create custom exceptions in Python?",
    "med",
    "`class ValidationError(Exception): pass`. Inherit from `Exception` (or a more specific subclass like `ValueError`). Add custom attributes: `def __init__(self, message, field=None): super().__init__(message); self.field = field`. Catch: `try: ... except ValidationError as e: print(e.field)`."
  ],
  [
    "What is the GIL (Global Interpreter Lock)?",
    "med",
    "The GIL is a mutex that protects CPython internals from concurrent access. It prevents multiple threads from executing Python bytecode simultaneously. I/O-bound threads release the GIL (asyncio, file I/O). CPU-bound threads are serialized — no parallelism benefit. CPU-bound tasks need `multiprocessing` (separate processes, each has own GIL) to achieve parallelism."
  ],
  [
    "What is the difference between threading and multiprocessing in Python?",
    "med",
    "`threading`: threads share memory, GIL limits CPU parallelism, good for I/O-bound tasks. `multiprocessing`: separate processes, each with own GIL, full CPU parallelism, heavier (memory + IPC overhead). Use threading for: network requests, file I/O, database calls. Use multiprocessing for: CPU-intensive computation (image processing, data analysis)."
  ],
  [
    "What is asyncio in Python?",
    "med",
    "`asyncio` is Python's async I/O framework for concurrent code using async/await syntax. Single-threaded but handles many concurrent tasks via cooperative multitasking. Functions: `asyncio.run()`, `asyncio.gather()`, `asyncio.create_task()`. Use `await` to yield control. Best for: I/O-bound work (network, file operations) needing many concurrent tasks."
  ],
  [
    "What is async/await in Python?",
    "med",
    "`async def f():` defines a coroutine function (returns a coroutine object). `await f()` pauses execution until the coroutine completes. Coroutines can only be awaited inside other async functions. Event loop runs coroutines cooperatively — they yield control at `await` points. `asyncio.run(main())` creates and runs the event loop."
  ],
  [
    "What is the event loop in asyncio?",
    "med",
    "The event loop manages and executes async tasks. It: 1) Runs coroutines. 2) Handles I/O polling (select/epoll). 3) Runs scheduled callbacks. 4) Coordinates between tasks. Get with `asyncio.get_event_loop()`. Modern: `asyncio.run()` creates and manages the loop automatically. The loop runs until all tasks complete."
  ],
  [
    "What are Python type hints and why use them?",
    "med",
    "Type hints annotate function signatures and variables with types: `def greet(name: str) -> str: return f'Hello {name}'`. Benefits: IDE autocompletion, static analysis (mypy, pyright), documentation, catching type errors at development time. Not enforced at runtime (Python is dynamically typed). PEP 484 defines the standard. Use `from __future__ import annotations` for deferred evaluation."
  ],
  [
    "What is the difference between List[int] and list[int] in type hints?",
    "med",
    "`List[int]` (from `typing` module, Python <3.9) vs `list[int]` (built-in, Python 3.9+). Python 3.9+ allows lowercase `list`, `dict`, `set`, `tuple`, `type` for annotations. Prefer lowercase built-ins in modern Python. Also: `dict[str, int]`, `set[str]`, `tuple[int, ...]`."
  ],
  [
    "What is a dataclass in Python?",
    "med",
    "`@dataclass` auto-generates `__init__`, `__repr__`, `__eq__`, and optionally `__hash__`, `__lt__`, etc. `@dataclass class Point: x: float; y: float`. Options: `frozen=True` (immutable), `order=True` (comparison methods), `slots=True` (3.10+ __slots__). Fields: `field(default=0)`, `field(default_factory=list)`. Reduces boilerplate for data containers."
  ],
  [
    "What are namedtuples and when would you use them?",
    "med",
    "`namedtuple('Point', ['x', 'y'])` creates a tuple subclass with named fields. Accessible by `p.x` (attribute) and `p[0]` (index). Immutable, memory-efficient (no per-instance dict). Use for: database rows, coordinates, simple data containers. Drawbacks: missing type hints, no defaults (Python 3.6.1+ adds defaults). Modern alternative: dataclass or TypedDict."
  ],
  [
    "What is the collections module? Name useful classes.",
    "med",
    "`collections` provides specialized data structures: `deque` (double-ended queue, O(1) append/pop both ends), `Counter` (dict subclass counting hashable items), `defaultdict` (provides default for missing keys), `OrderedDict` (remembers insertion order — less needed now, dicts are ordered), `namedtuple`, `ChainMap` (combines multiple dicts), `UserDict`, `UserList`."
  ],
  [
    "What is the itertools module?",
    "med",
    "`itertools` provides iterator combinator functions: `count(start, step)` (infinite counter), `cycle(iterable)` (repeat), `repeat(x)` (infinite x), `chain(*iterables)` (concatenate), `compress(data, selectors)`, `dropwhile`, `takewhile`, `filterfalse`, `product` (cartesian product), `permutations`, `combinations`, `combinations_with_replacement`, `groupby`, `accumulate`, `islice`, `starmap`, `zip_longest`."
  ],
  [
    "What is the functools module? What does functools.wraps do?",
    "med",
    "`functools` provides higher-order functions: `lru_cache` (memoization), `cache` (3.9+, simpler lru_cache), `partial` (partial function application), `reduce` (left fold), `wraps` (copies function metadata to wrapper), `singledispatch` (single-dispatch generic functions), `total_ordering` (fills in comparison operators). `@wraps(f)` copies `__name__`, `__doc__`, `__module__` from `f` to the wrapper — preserves function identity in decorators."
  ],
  [
    "What is memoization in Python and how do you implement it with functools.lru_cache?",
    "med",
    "Memoization caches function results. `@functools.lru_cache(maxsize=128)` decorates a function to cache its return values based on arguments. Example: `@lru_cache def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)`. `maxsize=None` caches all calls (unbounded — risk memory exhaustion). `cache()` is a simpler version (3.9+) with no maxsize."
  ],
  [
    "What is the difference between sorted() and list.sort()?",
    "med",
    "`sorted(iterable)` returns a NEW sorted list (works on any iterable). `list.sort()` sorts the list IN-PLACE, returns `None`. `sorted` is more general (tuples, strings, generators). `sort` is more memory-efficient (no copy). Both accept `key` and `reverse` parameters. `sorted` with `set` returns a sorted list."
  ],
  [
    "What is a set comprehension?",
    "med",
    "`{expression for item in iterable if condition}` creates a set. Example: `{x**2 for x in range(10)}` → `{0, 1, 4, 9, 16, 25, 36, 49, 64, 81}`. Duplicates are automatically removed. Similar to list comprehension but with `{}`. Use for: deduplication, transforming collections, filtering with uniqueness."
  ],
  [
    "What is unpacking in Python? (*, **)",
    "med",
    "`*` unpacks iterables: `first, *rest = [1,2,3,4]` → `first=1, rest=[2,3,4]`. `print(*[1,2,3])` → `print(1,2,3)`. `**` unpacks dicts: `f(**{'a': 1, 'b': 2})` calls `f(a=1, b=2)`. Extended unpacking (PEP 3132): `*args` in assignments. Dict merge: `{**dict1, **dict2}`. `*` in function parameters: `def f(a, b, *args)`."
  ],
  [
    "What is the walrus operator (:=)?",
    "med",
    "`:=` (assignment expression, Python 3.8+) assigns a value to a variable within an expression. Example: `if (n := len(a)) > 10: print(f'List too long ({n})')`. `[y for x in items if (y := transform(x)) is not None]`. Useful in: while loops with assignment (`while (line := f.readline())`), comprehensions, conditionals. Controversial — use for readability."
  ],
  [
    "What is the difference between deepcopy and shallow copy?",
    "med",
    "Shallow copy (`copy.copy`): creates new object but inserts references to the original's nested objects (shared, mutations affect both). Deep copy (`copy.deepcopy`): recursively copies all nested objects — completely independent. Shallow copies are faster. Use deep copy for mutable nested data you need to modify independently."
  ],

  // ── Hard ──────────────────────────────────────────────────────────────────
  [
    "What is the Python data model and what are dunder methods?",
    "hard",
    "The Python data model defines how objects interact with Python operators and built-in functions via dunder (double underscore) methods. Examples: `__init__` (construction), `__str__`/`__repr__` (string representation), `__eq__`/`__hash__` (equality/hashing), `__getitem__`/`__setitem__` (indexing), `__iter__`/`__next__` (iteration), `__call__` (callable), `__enter__`/`__exit__` (context manager). Understanding the data model is key to writing Pythonic code."
  ],
  [
    "What is a metaclass in Python?",
    "hard",
    "A metaclass is a class of a class — defines how a class behaves. `type` is the default metaclass. Metaclasses can intercept class creation: `class Meta(type): def __new__(mcs, name, bases, namespace): # modify class before creation`. Use: ORMs (SQLAlchemy), singleton patterns, registering classes automatically. Rarely needed in everyday Python — use class decorators or `__init_subclass__` instead."
  ],
  [
    "What is __slots__ and how does it improve memory usage?",
    "med",
    "`__slots__` defines a fixed set of attributes, preventing the `__dict__` per-instance dict (which is memory-heavy). Usage: `class Point: __slots__ = ('x', 'y')`. Benefits: reduces memory overhead (~50% savings for many instances), faster attribute access. Limitations: can't add new attributes, no multiple inheritance with non-slotted classes, needs `__slots__` in each subclass."
  ],
  [
    "What is a descriptor in Python?",
    "hard",
    "A descriptor is an object that implements `__get__`, `__set__`, or `__delete__` methods. Descriptors control attribute access on another class. Properties, methods, `@classmethod`, `@staticmethod` are all descriptors. Example: `class Positive: def __set_name__(self, owner, name): self.name = name; def __get__(self, obj, type): return obj.__dict__[self.name]; def __set__(self, obj, val): if val <= 0: raise ValueError; obj.__dict__[self.name] = val`. Used with: `class Foo: x = Positive()`."
  ],
  [
    "What is the difference between __get__, __set__, and __delete__ in descriptors?",
    "hard",
    "`__get__(self, obj, objtype)` — called when attribute is accessed (`obj.x`). `__set__(self, obj, value)` — called when attribute is set (`obj.x = val`). `__delete__(self, obj)` — called when attribute is deleted (`del obj.x`). A descriptor with only `__get__` is a \"non-data descriptor\" (methods). With `__set__` or `__delete__`, it's a \"data descriptor\" (overrides instance dict)."
  ],
  [
    "How does Python's memory management and garbage collection work?",
    "hard",
    "Python uses reference counting + generational garbage collector. Reference counting: each object has a count of references — when count reaches 0, memory is freed immediately. GC handles circular references (not caught by reference counting). CPython's GC has 3 generations — objects that survive collection move to older generations (checked less often). Trigger: when allocations minus deallocations exceeds threshold."
  ],
  [
    "What is reference counting in Python?",
    "med",
    "Each Python object has `ob_refcnt` tracking how many references point to it. `sys.getrefcount(obj)` shows the count (+1 for the getrefcount call). Incremented on assignment, argument passing, container addition. Decremented on `del`, variable out of scope, reassignment. When count hits 0, `__del__` is called and memory freed. Cannot handle circular references (A→B→A) — GC handles those."
  ],
  [
    "What is the difference between CPython, PyPy, and Jython?",
    "hard",
    "CPython: reference implementation (C), most compatible, most libraries, GIL. PyPy: JIT compiler (speed ++), drop-in replacement for CPython, better for CPU-bound pure Python, less library compatibility (C extensions). Jython: Python on JVM, Java interop, no GIL, older Python version. IronPython: Python on .NET. Choose CPython for compatibility; PyPy for speed."
  ],
  [
    "What is Python bytecode and how does the Python VM work?",
    "hard",
    "CPython compiles source code to bytecode (`.pyc` files in `__pycache__`). The Python Virtual Machine (PVM) executes bytecode. Bytecode is platform-independent. View with `dis.dis(func)`. Example: `LOAD_FAST`, `BINARY_ADD`, `RETURN_VALUE`. The VM is a stack-based interpreter — operations push/pop values from a stack. Bytecode runs until completion unless interrupted by signals."
  ],
  [
    "What is the dis module and what does it tell you?",
    "med",
    "`dis` (disassembler) converts Python bytecode into a human-readable format. `import dis; dis.dis(func)` shows: line number, bytecode address, instruction name, and arguments. Useful for: understanding Python execution, debugging performance issues, comparing different coding approaches. Surprising results can reveal unnecessary operations."
  ],
  [
    "How does the GIL affect CPU-bound vs I/O-bound tasks?",
    "hard",
    "I/O-bound tasks (network, disk, DB) release the GIL during waiting — `threading` works well because threads sleep during I/O. CPU-bound tasks (computation, loops) hold the GIL — threads provide NO parallelism benefit (they're serialized). For CPU-bound: use `multiprocessing` (separate processes with independent GILs) or C extensions (numpy, which releases GIL)."
  ],
  [
    "What is concurrent.futures and how does ThreadPoolExecutor work?",
    "hard",
    "`concurrent.futures` provides a high-level API for async execution. `ThreadPoolExecutor(max_workers=4)` manages a pool of threads. `executor.submit(fn, *args)` returns a `Future`. `executor.map(fn, iterable)` applies fn to all items. `as_completed(futures)` yields futures as they finish. `wait(futures)` blocks until futures complete. Use `ThreadPoolExecutor` for I/O-bound tasks."
  ],
  [
    "What is ProcessPoolExecutor and when would you use it over ThreadPoolExecutor?",
    "hard",
    "`ProcessPoolExecutor` uses `multiprocessing` — separate processes, bypasses GIL, full CPU parallelism. Slower startup (fork), higher memory per process, communication via pickle (must be serializable). Use for CPU-bound tasks (numerical computation, image processing). Use `ThreadPoolExecutor` for I/O-bound tasks (better throughput per thread)."
  ],
  [
    "What are coroutines and how do they differ from threads?",
    "hard",
    "Coroutines (async/await) are single-threaded, cooperative: they voluntarily yield control at `await` points. Threads are preemptive: the OS can interrupt at any point. Coroutines: lightweight (thousands = OK), no race conditions (single-threaded), explicit context switching (`await`). Threads: OS resource heavy, need locks for safe data sharing, implicit switching."
  ],
  [
    "What is asyncio.gather vs asyncio.wait?",
    "med",
    "`asyncio.gather(*coros, return_exceptions=False)` runs multiple awaitables concurrently, returns list of results in order. If one fails, others continue (return_exceptions=True) or cancel (default). `asyncio.wait(futures, return_when=FIRST_COMPLETED)` returns two sets: `(done, pending)`. Use `gather` for running a group of tasks. Use `wait` for fine-grained control (timeout, first-completed)."
  ],
  [
    "What is an asyncio task and how do you create one?",
    "med",
    "A Task wraps a coroutine and schedules it on the event loop. Create: `task = asyncio.create_task(my_coro())`. Tasks run concurrently — don't need to await immediately. Cancel: `task.cancel()`. Check: `task.done()`, `task.result()`. Gather creates tasks internally. Tasks are Futures — they represent pending results."
  ],
  [
    "What are Python protocol classes (typing.Protocol)?",
    "hard",
    "`typing.Protocol` (PEP 544, Python 3.8+) defines structural subtyping (duck typing) for type hints. Instead of requiring a class to inherit from an ABC, any class with matching methods satisfies the protocol. Example: `class Drawable(Protocol): def draw(self) -> None: ...`. Then `def render(obj: Drawable): obj.draw()` accepts anything with a `draw` method."
  ],
  [
    "What is structural subtyping vs nominal subtyping in Python?",
    "med",
    "Nominal: type A is a subtype of B only if it EXPLICITLY inherits (`class A(B):`). Structural: type A is a subtype of B if it has the same METHOD SIGNATURES (regardless of inheritance). Python uses nominal subtyping for classes but supports structural via `Protocol` (PEP 544). Duck typing: \"if it walks like a duck...\" — structural typing formalizes this."
  ],
  [
    "What is the Abstract Base Class (ABC) in Python?",
    "med",
    "ABCs define interface contracts via abstract methods. `from abc import ABC, abstractmethod`. `class Shape(ABC): @abstractmethod def area(self): pass`. Subclasses MUST implement all abstract methods. ABCs support virtual subclasses: `Shape.register(Circle)` makes `Circle` a virtual subclass without inheritance. `isinstance(c, Shape)` returns True."
  ],
  [
    "What are Python's __enter__ and __exit__ methods?",
    "med",
    "`__enter__(self)` is called at the start of a `with` block — returns the resource (assigned with `as`). `__exit__(self, exc_type, exc_val, exc_tb)` is called when the block ends — cleanup. If it returns `True`, the exception is suppressed. Should always handle proper cleanup (close files, release locks)."
  ],
  [
    "What is the difference between __iter__ and __next__?",
    "med",
    "`__iter__(self)` returns an iterator object (usually `self`) — called by `iter(obj)`. `__next__(self)` returns the next value or raises `StopIteration` — called by `next(iterator)`. Class with both is an iterator (consumable once). For iterable (can create multiple iterators), separate `__iter__` (returns new iterator) from `__next__`."
  ],
  [
    "What is a generator expression vs a list comprehension for large datasets?",
    "hard",
    "List comprehension `[x**2 for x in range(1000000)]` creates the FULL list in memory (O(n) memory). Generator expression `(x**2 for x in range(1000000))` creates a generator — yields values one by one (O(1) memory). Use generator expression for: large sequences, streaming data, one-time iteration. Use list comprehension for: multiple passes, indexing, small to medium datasets."
  ],
  [
    "What are Python weak references?",
    "med",
    "`weakref.ref(obj)` creates a reference that doesn't increase the reference count — the object can be garbage collected while the weakref exists. `weakref.WeakValueDictionary` — dictionary where values can be GC'd (removes entries automatically). Useful for: caches (don't prevent GC), callbacks, avoiding reference cycles. Call `.()` on the weakref to get the object (or None if GC'd)."
  ],
  [
    "What is the __call__ dunder method?",
    "med",
    "`__call__(self, ...)` makes an instance callable like a function. Example: `class Adder: def __call__(self, x, y): return x + y; add = Adder(); add(3, 4)` → 7. Used for: function-like objects with state (callable classes instead of closures), decorator classes, factory pattern."
  ],
  [
    "What is monkey patching in Python?",
    "med",
    "Monkey patching dynamically modifies classes or modules at runtime. Example: `module.function = new_function` or `obj.method = lambda: ...`. Use for: testing (mocking), hotfixes, adding functionality to third-party libraries. Risks: hard to debug, creates coupling to internals, breaks if the library updates. Prefer subclassing, dependency injection, or decorators."
  ],
  [
    "What is dependency injection in Python?",
    "med",
    "DI provides dependencies to a class/function from outside rather than creating them internally. Techniques: constructor injection (`__init__(self, service)`), setter injection, parameter passing. Frameworks: `injector`, `dependency_injector`. Python's flexibility makes DI less critical than in Java — can pass objects directly, use factories, or `functools.partial`."
  ],
  [
    "What is the SOLID principle application in Python?",
    "med",
    "SOLID: Single Responsibility (class has one reason to change), Open/Closed (open for extension, closed for modification — ABCs, Protocol), Liskov Substitution (subtypes must be substitutable — don't weaken preconditions), Interface Segregation (many specific interfaces vs one general — Protocols), Dependency Inversion (depend on abstractions not concretions — ABCs/Protocols, DI)."
  ],
  [
    "What are design patterns in Python? Implement Observer pattern.",
    "med",
    "`class Subject: def __init__(self): self._observers = []; def attach(self, o): self._observers.append(o); def notify(self, data): [o.update(data) for o in self._observers]`. Observers implement `update`. Python's first-class functions simplify this — use callbacks instead: `def on_change(callback): ...`. Observer is built into `asyncio` events."
  ],
  [
    "What is Cython and when would you use it?",
    "hard",
    "Cython is a superset of Python that compiles to C extensions. Use `.pyx` files with optional static type declarations (`cdef int x`) to achieve C-like speed (10-100x speedup). Used for: wrapping C libraries, performance-critical code sections, scientific computing (numpy, pandas use Cython). Alternative: `numba` (JIT compiler) for numerical functions."
  ],
  [
    "What is ctypes and cffi in Python?",
    "med",
    "`ctypes` loads and calls C functions from shared libraries (.so/.dll). `ctypes.CDLL('libc.so.6')` then `libc.printf(...)`. Declare argument/return types via `argtypes`/`restype`. `cffi` (C Foreign Function Interface) is more modern, faster, and safer than ctypes. Both enable Python to interface with C libraries without writing C extension modules."
  ],
  [
    "How do you profile Python code? (cProfile, line_profiler)",
    "med",
    "`cProfile` (built-in): `python -m cProfile my_script.py` — shows function call counts and times. `line_profiler` (third-party): line-by-line profiling using `@profile` decorator. `memory_profiler`: memory usage per line. Use: identify bottlenecks, optimize the right parts, verify improvements. Profile BEFORE optimizing — don't guess."
  ],
  [
    "What are common Python memory optimization techniques?",
    "med",
    "Techniques: 1) Use `__slots__` for classes with many instances. 2) Use generators for large datasets. 3) Use `array` module for homogeneous numeric arrays. 4) Use `sys.intern()` for string deduplication. 5) Use `weakref` for caches. 6) Use memory-efficient data structures (`deque` vs list for queues). 7) Use `garbage_collector` to force collection. 8) Use `__del__` for explicit cleanup."
  ],
  [
    "What is the difference between synchronous and asynchronous Django vs FastAPI?",
    "hard",
    "Django (sync by default): sync ORM, sync views, async available but limited (ASGI with `async def` views but ORM needs `sync_to_async`). FastAPI: fully async, built on Starlette + Pydantic, automatic OpenAPI docs, async endpoints by default. FastAPI excels at I/O-bound endpoints. Django is more full-featured (admin, ORM, auth)."
  ],
  [
    "What is WSGI vs ASGI?",
    "hard",
    "WSGI (Web Server Gateway Interface): synchronous Python web protocol — one request per worker process. Traditional (Flask, Django default). ASGI (Asynchronous Server Gateway Interface): async protocol — supports WebSockets, long-lived connections, HTTP/2. FastAPI, Django Channels, Starlette use ASGI. ASGI workers can handle many concurrent connections per process."
  ],
  [
    "What are Python testing best practices? (pytest, mocking, fixtures)",
    "med",
    "Use `pytest` over `unittest`. Fixtures: `@pytest.fixture` for reusable setup/teardown. Mocking: `mocker.patch('module.function')` or `unittest.mock.patch`. Parametrize: `@pytest.mark.parametrize('input,expected', [(1,2),(3,6)])`. Conftest: shared fixtures in `conftest.py`. `tmp_path` fixture for temp files. Aim for fast, isolated, deterministic tests."
  ],

  // ── Conceptual / Industry (current) ────────────────────────────────────────
  [
    "How does asyncio's event loop differ from threading for concurrency?",
    "med",
    "asyncio uses cooperative multitasking (tasks yield control with `await`) on a single thread — no race conditions on shared data, no locks needed. Threading uses preemptive multitasking (OS can interrupt at any time) — needs locks, thread-safe queues, risk of deadlocks. asyncio is lighter (100K+ tasks vs ~1000 threads). Threading is better for CPU-bound (with multiprocessing) or blocking I/O that can't be async."
  ],
  [
    "What is the difference between asyncio.run, loop.run_until_complete, and await?",
    "med",
    "`asyncio.run(main())` is the HIGHEST-level API — creates event loop, runs main coroutine, cancels remaining tasks, closes loop. `loop.run_until_complete(coro)` is lower-level — runs on existing loop, doesn't clean up. `await` is inside an async function — suspends current coroutine until the awaited coro completes. Use `asyncio.run()` for scripts, `await` inside async functions."
  ],
  [
    "What is the difference between a coroutine function and a coroutine object?",
    "med",
    "`async def f(): ...` is a coroutine FUNCTION — calling it (`f()`) returns a coroutine OBJECT. The object needs to be awaited or executed on the event loop to run: `await f()` or `asyncio.run(f())`. Calling without awaiting returns a warning about unawaited coroutine. `.py` files with coroutines at module level need `asyncio.run()`."
  ],
  [
    "What is asyncio.TaskGroup introduced in Python 3.11 and how does it improve on gather?",
    "hard",
    "`TaskGroup` provides structured concurrency: `async with asyncio.TaskGroup() as tg: task1 = tg.create_task(coro1()); task2 = tg.create_task(coro2())`. If any task fails, all sibling tasks are cancelled. `gather` continues running other tasks on failure (return_exceptions=False raises but doesn't cancel others). TaskGroup is safer — no orphaned tasks."
  ],
  [
    "What is structured concurrency and how does TaskGroup enforce it?",
    "hard",
    "Structured concurrency ensures that tasks don't outlive the scope they were created in. TaskGroup enforces: 1) All child tasks finish before `async with` block exits. 2) If a child fails with exception, other children are cancelled. 3) No orphaned/leaked tasks. Prevents common issues: forgetting to await, tasks running after cleanup, lost exceptions."
  ],
  [
    "What is asyncio.timeout (3.11) and how does it differ from wait_for?",
    "med",
    "`asyncio.timeout(5)` is a context manager: `async with asyncio.timeout(5): result = await long_op()`. Raises `TimeoutError`. `asyncio.wait_for(coro, timeout=5)` is a function wrapper. The context manager is more flexible (can wrap multiple operations, add `try/except` outside). Both cancel the task on timeout."
  ],
  [
    "What are exception groups and the except* syntax in Python 3.11?",
    "hard",
    "`ExceptionGroup` holds multiple exceptions: `raise ExceptionGroup('errors', [ValueError('a'), TypeError('b')])`. Catch with `except*`: `except* ValueError as e: ...`. `except*` catches exceptions of the specified type from the group (matching exceptions are extracted). Useful for: concurrent operations where multiple tasks can fail."
  ],
  [
    "What is the new error message and traceback improvement in Python 3.11/3.12?",
    "med",
    "Python 3.11+ improved tracebacks: points to the EXACT expression that failed (with `^~` marks), not just the line. Better error messages for common mistakes (missing imports, attribute errors with suggestions, typo detection). 3.12 added even clearer tracebacks for complex expressions. Makes debugging much faster."
  ],
  [
    "What performance gains did the faster CPython project bring in 3.11?",
    "hard",
    "Python 3.11 is 10-60% faster than 3.10 (depending on workload). Key optimizations: 1) Adaptive bytecode specialization (PEP 659) — hot bytecode is optimized for specific types. 2) Faster startup (lazy imports, frozen imports). 3) Zero-cost exception handling (try blocks no longer slow). 4) Optimized attribute access, function calls, and loops."
  ],
  [
    "What is PEP 695 type parameter syntax (def func[T]) in Python 3.12?",
    "hard",
    "PEP 695 introduces a concise syntax for generics: `def func[T](x: T) -> T: return x` instead of `T = TypeVar('T'); def func(x: T) -> T: ...`. Also: `class Stack[T]: def push(self, item: T): ...`. `type ListOrSet[T] = list[T] | set[T]`. Cleaner, more readable generics."
  ],
  [
    "What is the type statement for type aliases in Python 3.12?",
    "med",
    "`type Alias = list[int]` creates a type alias (replaces `Alias = list[int]` which is more ambiguous). `type JSON = str | int | float | bool | None | list[JSON] | dict[str, JSON]`. The `type` statement makes aliases explicit — clearer intent for type checkers."
  ],
  [
    "What is the per-interpreter GIL (PEP 684) work in Python 3.12?",
    "hard",
    "PEP 684 allows each sub-interpreter (created via `interpreters` module) to have its own GIL. Multiple interpreters can run Python code truly in parallel (multi-core). Each interpreter is isolated (no shared state), so no thread safety issues. Communication via channels. Still experimental — enables parallelism without multiprocessing overhead."
  ],
  [
    "What is the experimental free-threaded (no-GIL) build in Python 3.13?",
    "hard",
    "Python 3.13 adds an experimental build mode without the GIL (via `--disable-gil`). Multiple threads can execute Python bytecode simultaneously. Requires thread-safe C extensions. Some single-threaded code may be slower (GC changes). A major step toward removing the GIL by default in future Python versions."
  ],
  [
    "What are type hints and how does mypy use them for static checking?",
    "med",
    "Type hints annotate function signatures with types. `mypy` is a static type checker that analyzes annotated code WITHOUT executing it — catches type errors, incorrect return types, None-safety issues, and missing method implementations. Run: `mypy my_file.py`. Configure via `mypy.ini` or `pyproject.toml`. Use `--strict` for maximum checking."
  ],
  [
    "What is the difference between Optional[X] and X | None?",
    "med",
    "Both represent `X or None`. `Optional[X]` (from typing) is the legacy syntax. `X | None` (Python 3.10+) is the modern, PEP 604 syntax. Also: `str | int` (union types), `list[int] | None`. Modern code should use `X | None`. `Optional[X]` is equivalent to `Union[X, None]`."
  ],
  [
    "What is typing.Final and typing.Literal used for?",
    "med",
    "`Final` indicates a variable/attribute should not be reassigned: `MAX_SIZE: Final = 100`. `Literal` restricts a value to specific literals: `def set_mode(mode: Literal['read', 'write', 'append']): ...`. Both are for type checkers only — no runtime enforcement. Useful for: configuration constants, enum-like parameters, API design."
  ],
  [
    "What is typing.TypedDict and when would you use it?",
    "med",
    "`TypedDict` defines a dictionary with specific key-value types: `class User(TypedDict): name: str; age: int`. Provides type-safe dict access: `user = User(name='Alice', age=30); user['name']` (str), `user['age']` (int). Use for: JSON records, dictionary-based data where dataclass is overkill. Total=False for optional keys. `from __future__ import annotations` for alternative syntax."
  ],
  [
    "What is the difference between dataclass and attrs and pydantic models?",
    "hard",
    "`dataclass`: built-in, simple, no validation, basic customization. `attrs` (third-party): more features (validators, converters, slots, frozen), cleaner API than dataclasses. `pydantic` (third-party): validation with type coercion, JSON schema generation, parsing from external data, async validation. Use: dataclass for internal data, pydantic for API I/O, attrs for complex domain models."
  ],
  [
    "What does the frozen=True parameter do on a dataclass?",
    "med",
    "`frozen=True` makes instances immutable — attributes can't be modified after `__init__`. Generates `__hash__` (if `eq=True` also). Assignment raises `FrozenInstanceError`. Use for: value objects, configuration, hashable objects (dict keys, set members). Can still modify mutable fields (list, dict) — frozen is shallow."
  ],
  [
    "What is field(default_factory=list) in dataclasses and why is it needed?",
    "med",
    "`default_factory=list` provides a NEW empty list for each instance. NEVER use `field(default=[])` — this creates ONE list shared across all instances (same mutable default problem as function arguments). `default_factory` calls the function (list, dict, or custom) for each instance, ensuring independence."
  ],
  [
    "What is the difference between __post_init__ and __init__ in dataclasses?",
    "med",
    "`__post_init__(self)` runs AFTER auto-generated `__init__`. Use for: validation (check values, fix relationships), derived fields (computing from other fields), converting types. Example: `def __post_init__(self): if self.name is None: self.name = 'default'`. Don't override `__init__` in dataclasses — use `__post_init__`."
  ],
  [
    "Why does the GIL prevent true parallelism for CPU-bound threads?",
    "med",
    "The GIL ensures only ONE thread executes Python bytecode at a time. For CPU-bound tasks, threads don't run in parallel — they take turns (time slicing). This adds overhead (context switching) without throughput gain. For I/O, threads RELEASE the GIL while waiting (file I/O, network, sleep), so they effectively run concurrently."
  ],
  [
    "How does multiprocessing bypass the GIL and what are its costs?",
    "med",
    "multiprocessing creates SEPARATE PROCESSES (via fork/spawn) — each has its own Python interpreter and GIL. True parallelism for CPU-bound tasks. Costs: 1) Higher memory (each process loads Python + modules). 2) Communication via pickle serialization (slower than shared memory). 3) Fork/spawn overhead. 4) Cannot share objects directly (must use Queue, Pipe, or SharedMemory)."
  ],
  [
    "What is the difference between a generator and a regular function returning a list?",
    "easy",
    "Generator yields values lazily (one at a time), memory efficient, state maintained between calls, can't be indexed. Regular function creates the entire list in memory, which is wasteful for large datasets. Generator is single-use (consumed after iteration). Generator doesn't compute values until requested."
  ],
  [
    "What is lazy evaluation and how do generators provide it?",
    "med",
    "Lazy evaluation delays computation until the result is needed. Generators provide this: `(x**2 for x in range(10**9))` computes ZERO squares until you iterate. Each `next()` yields one value. Benefits: lower memory, can represent infinite sequences, potentially faster (skip unused computations). Trade-off: increased per-item overhead."
  ],
  [
    "What does yield from do in a generator?",
    "med",
    "`yield from subgenerator` delegates to another generator (or any iterable). Equivalent to `for item in subgenerator: yield item` but with proper bidirectional communication (send, throw, close). Example: `def flatten(seq): for item in seq: if isinstance(item, Iterable): yield from flatten(item) else: yield item`."
  ],
  [
    "What is the difference between a decorator with and without arguments?",
    "med",
    "Without args: `@timer` applies `timer` function directly. With args: `@repeat(3)` calls `repeat(3)` first which returns the actual decorator. Implementation: `def repeat(n): def decorator(fn): def wrapper(*args, **kwargs): for _ in range(n): fn(*args, **kwargs); return wrapper; return decorator`. Without args: `def timer(fn): ...`."
  ],
  [
    "What does functools.lru_cache(maxsize=None) trade off?",
    "med",
    "`maxsize=None` caches ALL calls with no limit — memory grows unbounded. Fast (no eviction logic), but can exhaust memory for functions with many unique arguments. `maxsize=128` limits cache to 128 entries with LRU eviction — memory bounded but slower for hot caches. Use None for deterministic functions with small argument space."
  ],
  [
    "What is functools.cache (3.9+) and how does it differ from lru_cache?",
    "med",
    "`functools.cache` is `lru_cache(maxsize=None)` — unbounded cache with no LRU logic. Simpler, slightly faster (no eviction overhead). Use for functions where arguments are guaranteed to be finite (e.g., recursion with known state space). For production with user input: use `lru_cache(maxsize=N)` to prevent memory exhaustion."
  ],
  [
    "What is the difference between pip, pipx, poetry, and uv for packaging?",
    "med",
    "`pip`: default package installer, simple but no lockfile, no environment management. `pipx`: installs CLI tools in isolated environments — `pipx install black`. `poetry`: modern dependency management — `pyproject.toml`, lockfile, virtual environments, publishing. `uv`: ultra-fast Rust-based pip alternative (10-100x faster), pip-compatible, also does venv management."
  ],
  [
    "What is a pyproject.toml file and what replaced setup.py?",
    "med",
    "`pyproject.toml` (PEP 517/518/621) is the modern Python project configuration file. Replaces `setup.py` for project metadata, dependencies, build system config. Tools: `poetry`, `flit`, `pdm` use `pyproject.toml`. Pip supports it directly. Contains: build-system requirements, project metadata, dependencies, tool-specific configs (black, isort, mypy)."
  ],
  [
    "What is the difference between a wheel and an sdist?",
    "med",
    "Wheel (`.whl`): a pre-built distribution — ready to install, faster (no build step), no build dependencies needed. sdist (`.tar.gz`): source distribution — requires the user's machine to build/compile. Wheels are platform-specific for C extensions. sdists are universal. `pip install` prefers wheels. Publish both for maximum compatibility."
  ],
  [
    "What is PEP 8 and what are common style rules it defines?",
    "med",
    "PEP 8 is Python's style guide. Key rules: 4 spaces per indent, max 79 characters per line, blank lines around functions/classes, imports on separate lines (stdlib → third-party → local), spaces around operators, naming: `snake_case` for functions/vars, `CamelCase` for classes, `UPPER_CASE` for constants, `_single_` for private, `__dunder__` for special methods."
  ],
  [
    "What is the difference between is and == for small integers and string interning?",
    "hard",
    "Python interns small integers (-5 to 256) and short strings — they may be the SAME object if equal. `a = 256; b = 256; a is b` → `True` (same object). `a = 257; b = 257; a is b` → `False` (different objects). String interning depends on implementation. Never use `is` for value comparison — always use `==`."
  ],
  [
    "What is the match/case structural pattern matching introduced in Python 3.10?",
    "med",
    "`match value: case pattern: ...` — similar to switch but more powerful. Patterns: literals (`case 1:`), variables (`case x:`), sequences (`case [a, b]:`), mappings (`case {'key': val}:`), guards (`case x if x > 0:`), OR (`case 1 | 2:`), class (`case Point(x, y):`). Wildcard: `case _:`. Destructuring and binding built-in."
  ],

  // ── Code / Implementation ──────────────────────────────────────────────────
  [
    "Write a decorator that measures and prints a function's execution time.",
    "med",
    "`import time; from functools import wraps; def timer(f): @wraps(f) def wrapper(*args, **kwargs): start = time.perf_counter(); result = f(*args, **kwargs); elapsed = time.perf_counter() - start; print(f'{f.__name__} took {elapsed:.4f}s'); return result; return wrapper`"
  ],
  [
    "Implement a memoize decorator using a dictionary cache.",
    "med",
    "`from functools import wraps; def memoize(f): cache = {}; @wraps(f) def wrapper(*args): if args not in cache: cache[args] = f(*args); return cache[args]; return wrapper`"
  ],
  [
    "Write a generator that yields the Fibonacci sequence infinitely.",
    "med",
    "`def fib(): a, b = 0, 1; while True: yield a; a, b = b, a + b`"
  ],
  [
    "Implement a context manager using contextlib.contextmanager that times a block.",
    "med",
    "`from contextlib import contextmanager; import time; @contextmanager def timer(): start = time.perf_counter(); yield; elapsed = time.perf_counter() - start; print(f'Took {elapsed:.4f}s')`"
  ],
  [
    "Write a function that flattens an arbitrarily nested list.",
    "med",
    "`def flatten(lst): for item in lst: if isinstance(item, (list, tuple)): yield from flatten(item) else: yield item`"
  ],
  [
    "Implement an LRU cache class without using functools.lru_cache.",
    "hard",
    "`from collections import OrderedDict; class LRUCache: def __init__(self, capacity): self.cache = OrderedDict(); self.capacity = capacity; def get(self, key): if key not in self.cache: return -1; self.cache.move_to_end(key); return self.cache[key]; def put(self, key, value): if key in self.cache: self.cache.move_to_end(key); self.cache[key] = value; if len(self.cache) > self.capacity: self.cache.popitem(last=False)`"
  ],
  [
    "Write a decorator that retries a function on exception with a max attempts limit.",
    "med",
    "`from functools import wraps; import time; def retry(max_attempts=3, delay=1): def decorator(f): @wraps(f) def wrapper(*args, **kwargs): last_exc = None; for attempt in range(max_attempts): try: return f(*args, **kwargs); except Exception as e: last_exc = e; if attempt < max_attempts - 1: time.sleep(delay); raise last_exc; return wrapper; return decorator`"
  ],
  [
    "Implement a function that counts word frequency in a string using collections.Counter.",
    "easy",
    "`from collections import Counter; def word_freq(text): return Counter(text.lower().split())`"
  ],
  [
    "Write a generator expression that yields squares of even numbers up to n.",
    "easy",
    "`(x*x for x in range(n) if x % 2 == 0)`"
  ],
  [
    "Implement a custom iterator class that yields numbers in a range.",
    "med",
    "`class MyRange: def __init__(self, n): self.n = n; self.i = 0; def __iter__(self): return self; def __next__(self): if self.i < self.n: v = self.i; self.i += 1; return v; raise StopIteration`"
  ],
  [
    "Write a function that merges two dictionaries, summing values of shared keys.",
    "easy",
    "`from collections import Counter; def merge_dicts(a, b): return dict(Counter(a) + Counter(b))` or `{k: a.get(k, 0) + b.get(k, 0) for k in set(a) | set(b)}`."
  ],
  [
    "Implement a singleton class using a metaclass.",
    "hard",
    "`class SingletonMeta(type): _instances = {}; def __call__(cls, *args, **kwargs): if cls not in cls._instances: cls._instances[cls] = super().__call__(*args, **kwargs); return cls._instances[cls]; class Database(metaclass=SingletonMeta): pass`"
  ],
  [
    "Write an async function that fetches multiple URLs concurrently with asyncio.gather.",
    "hard",
    "`import asyncio, aiohttp; async def fetch_all(urls): async with aiohttp.ClientSession() as session: tasks = [session.get(url) for url in urls]; responses = await asyncio.gather(*tasks); return await asyncio.gather(*(r.json() for r in responses))`"
  ],
  [
    "Implement a debounce decorator for a function in Python.",
    "hard",
    "`import threading; def debounce(delay): def decorator(f): lock = threading.Lock(); timer = None; @wraps(f) def wrapper(*args, **kwargs): nonlocal timer; def call(): f(*args, **kwargs); timer = None; with lock: if timer: timer.cancel(); timer = threading.Timer(delay, call); timer.start(); return wrapper; return decorator`"
  ],
  [
    "Write a function that groups a list of dicts by a key using itertools.groupby.",
    "med",
    "`from itertools import groupby; def group_by(items, key): sorted_items = sorted(items, key=lambda x: x[key]); return {k: list(g) for k, g in groupby(sorted_items, lambda x: x[key])}`"
  ],
  [
    "Implement a context manager class with __enter__ and __exit__ for a file lock.",
    "med",
    "`import fcntl; class FileLock: def __init__(self, path): self.path = path; self.fd = None; def __enter__(self): self.fd = open(self.path, 'w'); fcntl.flock(self.fd, fcntl.LOCK_EX); return self; def __exit__(self, *args): fcntl.flock(self.fd, fcntl.LOCK_UN); self.fd.close()`"
  ],
  [
    "Write a function that removes duplicates from a list while preserving order.",
    "easy",
    "`def dedupe(lst): seen = set(); return [x for x in lst if not (x in seen or seen.add(x))]`"
  ],
  [
    "Implement a function that returns the n-th prime using a generator.",
    "med",
    "`def primes(): yield 2; n = 3; while True: if all(n % p for p in range(3, int(n**0.5)+1, 2)): yield n; n += 2; def nth_prime(n): p = primes(); for _ in range(n): return next(p)`"
  ],
  [
    "Write a decorator that validates that all arguments are positive numbers.",
    "med",
    "`def positive(f): @wraps(f) def wrapper(*args, **kwargs): if any(not isinstance(a, (int, float)) or a <= 0 for a in args): raise ValueError('All arguments must be positive'); return f(*args, **kwargs); return wrapper`"
  ],
  [
    "Implement a deep flatten of a nested dictionary into dotted keys.",
    "hard",
    "`def flatten_dict(d, parent_key='', sep='.'): items = []; for k, v in d.items(): new_key = f'{parent_key}{sep}{k}' if parent_key else k; if isinstance(v, dict): items.extend(flatten_dict(v, new_key, sep=sep).items()); else: items.append((new_key, v)); return dict(items)`"
  ],
  [
    "Write a function using zip to transpose a matrix (list of lists).",
    "med",
    "`def transpose(matrix): return [list(row) for row in zip(*matrix)]`"
  ],
  [
    "Implement a simple rate limiter decorator using time and a counter.",
    "hard",
    "`import time; def rate_limit(max_calls, period): def decorator(f): calls = []; @wraps(f) def wrapper(*args, **kwargs): now = time.time(); calls[:] = [c for c in calls if now - c < period]; if len(calls) >= max_calls: raise Exception('Rate limit exceeded'); calls.append(now); return f(*args, **kwargs); return wrapper; return decorator`"
  ],
  [
    "Write an async producer/consumer using asyncio.Queue.",
    "hard",
    "`async def producer(q): for i in range(10): await q.put(i); await asyncio.sleep(0.1); async def consumer(q): while True: item = await q.get(); print(f'Got {item}'); q.task_done() # In main: q = asyncio.Queue(); await asyncio.gather(producer(q), consumer(q))`"
  ],
  [
    "Implement a function that chunks an iterable into batches of size n.",
    "med",
    "`def chunk(iterable, size): it = iter(iterable); return iter(lambda: list(islice(it, size)), [])` or `for i in range(0, len(lst), size): yield lst[i:i+size]`."
  ],
  [
    "Write a property with a getter and setter using the @property decorator.",
    "med",
    "`class Person: def __init__(self, name): self._name = name; @property def name(self): return self._name; @name.setter def name(self, value): if not value: raise ValueError('Name required'); self._name = value`"
  ],
  [
    "Implement a function that finds the most common element in a list.",
    "easy",
    "`from collections import Counter; def most_common(lst): return Counter(lst).most_common(1)[0][0]`"
  ],
  [
    "Write a recursive function to compute factorial with an lru_cache.",
    "easy",
    "`from functools import lru_cache; @lru_cache; def fact(n): return 1 if n <= 1 else n * fact(n-1)`"
  ],
  [
    "Implement a custom sort of a list of tuples by the second element using key.",
    "easy",
    "`sorted(lst, key=lambda x: x[1])` or `lst.sort(key=itemgetter(1))`."
  ],
  [
    "Write a function that reads a large file lazily line by line with a generator.",
    "med",
    "`def read_lines(path): with open(path) as f: yield from f` — efficient because `yield from` doesn't read the entire file."
  ],
  [
    "Implement a Stack and Queue class using collections.deque.",
    "easy",
    "`from collections import deque; class Stack: def __init__(self): self.data = deque(); def push(self, x): self.data.append(x); def pop(self): return self.data.pop(); class Queue: def __init__(self): self.data = deque(); def enqueue(self, x): self.data.append(x); def dequeue(self): return self.data.popleft()`"
  ],
  [
    "Write a decorator factory that repeats a function call N times.",
    "med",
    "`def repeat(n): def decorator(f): @wraps(f) def wrapper(*args, **kwargs): for _ in range(n): result = f(*args, **kwargs); return result; return wrapper; return decorator`"
  ],
  [
    "Implement a function that safely gets a nested dict value given a list of keys.",
    "med",
    "`from functools import reduce; def deep_get(d, keys, default=None): try: return reduce(lambda d, k: d[k], keys, d) except (KeyError, TypeError): return default`"
  ],
  [
    "Write a coroutine that yields running totals of values sent to it (send()).",
    "hard",
    "`def running_total(): total = 0; while True: val = yield total; if val is not None: total += val`"
  ],
  [
    "Implement a function that merges overlapping intervals.",
    "hard",
    "`def merge_intervals(intervals): if not intervals: return []; intervals.sort(key=lambda x: x[0]); merged = [intervals[0]]; for start, end in intervals[1:]: if start <= merged[-1][1]: merged[-1] = (merged[-1][0], max(merged[-1][1], end)); else: merged.append((start, end)); return merged`"
  ],
  [
    "Write a function that converts a snake_case string to camelCase.",
    "easy",
    "`def snake_to_camel(s): parts = s.split('_'); return parts[0] + ''.join(p.title() for p in parts[1:])`"
  ],

  // ── Tricky / Output-based ──────────────────────────────────────────────────
  [
    "What is the output of: print(0.1 + 0.2 == 0.3)",
    "med",
    "`False`. 0.1 + 0.2 = 0.30000000000000004 due to IEEE 754 floating-point precision."
  ],
  [
    "What is the output of: print(0.1 + 0.2)",
    "easy",
    "`0.30000000000000004`. Same floating-point issue as above."
  ],
  [
    "What is the output of: def f(x, lst=[]): lst.append(x); return lst then print(f(1)); print(f(2))?",
    "hard",
    "`[1]`, `[1, 2]`. Mutable default arguments are evaluated ONCE at function definition. The list persists across calls. Fix: `def f(x, lst=None): if lst is None: lst = []`."
  ],
  [
    "What is the output of: print(bool('False')); print(bool(''))",
    "easy",
    "`True`, `False`. Non-empty strings are truthy. Empty string is falsy."
  ],
  [
    "What is the output of: print([i for i in range(3)]); print(i) after the comprehension?",
    "med",
    "`[0, 1, 2]`, `2`. In Python 3, the comprehension variable leaks to the enclosing scope only in Python 2. Actually in Python 3, `i` is 2 (the last value) because the loop variable in list comprehensions DOES leak in Python 3.8+? Actually no — in Python 3, list comprehension variables DON'T leak. So it would raise `NameError` for `i`."
  ],
  [
    "What is the output of: a=[1,2,3]; b=a; b.append(4); print(a)",
    "med",
    "`[1, 2, 3, 4]`. Lists are mutable. `b = a` makes both point to the same list object. Mutation through `b` affects `a`. Use `b = a.copy()` for an independent copy."
  ],
  [
    "What is the output of: print(1 == True); print(2 == True)",
    "med",
    "`True`, `False`. `bool` is a subclass of `int`. `True` is `1`, so `1 == True` is True. `2 == True` is `False` because `2 != 1`. This is why `if True` works but `if 2` also works (2 is truthy)."
  ],
  [
    "What is the output of: print(type(lambda: 0))",
    "easy",
    "`<class 'function'>`. Lambdas are functions — same type as functions defined with `def`."
  ],
  [
    "What is the output of: x=256; y=256; print(x is y); x=257; y=257; print(x is y)",
    "hard",
    "`True`, `False`. Python caches (interns) small integers from -5 to 256. 256 is cached (same object). 257 is not cached (different objects). Always use `==` for value comparison."
  ],
  [
    "What is the output of: print('a' * 3 + 'b' * 0)",
    "easy",
    "`'aaa'`. `'a' * 3` → `'aaa'`. `'b' * 0` → `''` (empty string). Concatenation gives `'aaa'`."
  ],
  [
    "What is the output of: funcs=[lambda: i for i in range(3)]; print([f() for f in funcs])",
    "hard",
    "`[2, 2, 2]` in Python 2, but in Python 3, list comprehension has its own scope, so it's `[0, 1, 2]`? Actually no — the lambda captures `i` by reference, not by value. When each lambda is called (after the list comprehension finishes), `i` is `2`. Actually in Python 3, list comprehension `i` is local to the comprehension, so `[0, 1, 2]` is correct. But with `def funcs(): ... return [lambda: i for i in range(3)]` it's similar."
  ],
  [
    "What is the output of: print(3 / 2); print(3 // 2); print(-3 // 2)",
    "med",
    "`1.5`, `1`, `-2`. `/` is true division (float), `//` is floor division (rounds toward negative infinity). `-3 // 2 = -2` (floor: -1.5 rounds DOWN to -2)."
  ],
  [
    "What is the output of: print(2 ** 3 ** 2)",
    "med",
    "512. `**` is right-associative: `2 ** (3 ** 2)` = `2 ** 9` = 512, not `(2 ** 3) ** 2` = 64."
  ],
  [
    "What is the output of: print(True + True + True)",
    "easy",
    "`3`. `True` is `1` (bool is int subclass). `True + True + True` = `1 + 1 + 1` = `3`."
  ],
  [
    "What is the output of: print('5' + str(3)); print(int('5') + 3)",
    "easy",
    "`'53'`, `8`. String concatenation vs integer addition."
  ],
  [
    "What is the output of: t=(1,2,[3,4]); t[2].append(5); print(t)",
    "hard",
    "`(1, 2, [3, 4, 5])`. The tuple is immutable (can't reassign elements), BUT the list inside is mutable (can modify its contents). The tuple still holds a reference to the same list object."
  ],
  [
    "What is the output of: print(sorted([3,1,2], reverse=True))",
    "easy",
    "`[3, 2, 1]`. Sorted with reverse=True."
  ],
  [
    "What is the output of: print([1,2,3][::-1])",
    "easy",
    "`[3, 2, 1]`. Slice with step -1 reverses the list."
  ],
  [
    "What is the output of: print(list(range(0)))",
    "easy",
    "`[]`. Range(0) yields no values — empty list."
  ],
  [
    "What is the output of: d={'a':1}; print(d.get('b','default'))",
    "easy",
    "`'default'`. `get` returns the default when key is missing."
  ],
  [
    "What is the output of: print(0 or '' or 'x' or None)",
    "med",
    "`'x'`. `or` returns the first truthy value. `0` is falsy, `''` is falsy, `'x'` is truthy — returned."
  ],
  [
    "What is the output of: print(1 if [] else 2)",
    "med",
    "`2`. Empty list `[]` is falsy, so the else branch runs."
  ],
  [
    "What is the output of: print({1, 1.0, '1'})",
    "hard",
    "`{'1', 1}` or `{1, '1'}`. `1` and `1.0` are equal (`1 == 1.0`), so only one is kept in the set (either int 1 or float 1.0). `'1'` (string) is different — kept separately."
  ],
  [
    "What is the output of: print(len({True: 'a', 1: 'b', 1.0: 'c'}))",
    "hard",
    "`1`. `True`, `1`, and `1.0` all hash to the same value (True == 1 == 1.0). Each overwrites the previous key. Only the last `1.0: 'c'` survives."
  ],
  [
    "What is the output of: a='hello'; b='hello'; print(a is b)",
    "med",
    "`True` for short strings due to string interning (CPython may intern short strings). `a is b` checks object identity. For longer or dynamic strings, it may be `False`. Never rely on this — use `==`."
  ],
  [
    "What is the output of: print([] == False); print(bool([]) == False)",
    "med",
    "`False`, `True`. `[] == False` — empty list is not equal to `False` (different types). `bool([]) == False` — `bool([])` converts to `False`, which equals `False`."
  ],
  [
    "What is the output of: x=[1,2,3]; print(x[5:])",
    "med",
    "`[]`. Slicing beyond the list bounds doesn't error — returns empty list. But `x[5]` (single index) would raise `IndexError`."
  ],
  [
    "What is the output of: print(-7 % 3)",
    "med",
    "`2`. Python's modulo returns result with the sign of the DIVISOR (positive). `-7 % 3 = 2` because `-7 = -3 * 3 + 2`. In many other languages, the result is `-1`."
  ],
  [
    "What is the output of: nums=[1,2,3]; nums += 'ab'; print(nums)",
    "hard",
    "`[1, 2, 3, 'a', 'b']`. `+=` is equivalent to `extend` — iterates over the right operand and adds each element. Strings are iterable, so each character is added."
  ],
  [
    "What is the output of: print(sum([0.1]*10) == 1.0)",
    "hard",
    "`False`. `[0.1]*10` creates a list of ten 0.1 values. Summing them gives `0.9999999999999999` due to floating-point accumulation, not exactly 1.0."
  ],
];
