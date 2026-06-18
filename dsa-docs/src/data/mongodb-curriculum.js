// ───────────────────────────────────────────────────
// MongoDB Labs — Complete Curriculum Data
// 16 Lessons · 8 Challenges · 10 Aggregation Labs · 6 Projects · Sample Databases
// ───────────────────────────────────────────────────

// ═══════════════════════════════════════════════════
//  MOCK MONGODB QUERY ENGINE
// ═══════════════════════════════════════════════════

export function createMongoEngine(databases) {
  return new MongoEngine(databases);
}

class MongoEngine {
  constructor(databases) {
    this.databases = databases;
    this.currentDb = "ecommerce";
  }

  useDb(name) {
    if (this.databases[name]) {
      this.currentDb = name;
      return true;
    }
    return false;
  }

  getDb(name) {
    return this.databases[name || this.currentDb];
  }

  collection(name) {
    const db = this.getDb();
    const coll = db && db.collections[name];
    if (!coll) return new MongoCollection([], name);
    return new MongoCollection(coll.documents, name);
  }

  getCollectionNames() {
    const db = this.getDb();
    return db ? Object.keys(db.collections) : [];
  }

  getCollectionInfo(name) {
    const db = this.getDb();
    if (!db || !db.collections[name]) return null;
    return db.collections[name];
  }
}

class MongoCollection {
  constructor(documents, name) {
    this._docs = JSON.parse(JSON.stringify(documents));
    this._name = name;
  }

  // ─── FIND ───

  find(filter = {}, projection = null) {
    const results = this._docs.filter(doc => matchFilter(doc, filter));
    if (projection) {
      return results.map(doc => applyProjection(doc, projection));
    }
    return JSON.parse(JSON.stringify(results));
  }

  findOne(filter = {}, projection = null) {
    const results = this.find(filter, projection);
    return results.length > 0 ? results[0] : null;
  }

  // ─── COUNT ───

  countDocuments(filter = {}) {
    return this._docs.filter(doc => matchFilter(doc, filter)).length;
  }

  // ─── CRUD ───

  insertOne(doc) {
    const newDoc = { ...doc, _id: doc._id || generateId() };
    this._docs.push(newDoc);
    return { acknowledged: true, insertedId: newDoc._id };
  }

  insertMany(docs) {
    const inserted = docs.map(doc => {
      const newDoc = { ...doc, _id: doc._id || generateId() };
      this._docs.push(newDoc);
      return newDoc._id;
    });
    return { acknowledged: true, insertedCount: docs.length, insertedIds: inserted };
  }

  updateOne(filter, update) {
    const idx = this._docs.findIndex(doc => matchFilter(doc, filter));
    if (idx === -1) return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
    applyUpdate(this._docs[idx], update);
    return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
  }

  updateMany(filter, update) {
    let count = 0;
    this._docs.forEach((doc, i) => {
      if (matchFilter(doc, filter)) {
        applyUpdate(this._docs[i], update);
        count++;
      }
    });
    return { acknowledged: true, matchedCount: count, modifiedCount: count };
  }

  deleteOne(filter) {
    const idx = this._docs.findIndex(doc => matchFilter(doc, filter));
    if (idx === -1) return { acknowledged: true, deletedCount: 0 };
    this._docs.splice(idx, 1);
    return { acknowledged: true, deletedCount: 1 };
  }

  deleteMany(filter) {
    const before = this._docs.length;
    this._docs = this._docs.filter(doc => !matchFilter(doc, filter));
    return { acknowledged: true, deletedCount: before - this._docs.length };
  }

  // ─── AGGREGATION ───

  aggregate(pipeline) {
    let data = JSON.parse(JSON.stringify(this._docs));
    const stageResults = [];

    for (const stage of pipeline) {
      const stageKey = Object.keys(stage)[0];
      const stageValue = stage[stageKey];
      const beforeCount = data.length;

      switch (stageKey) {
        case "$match":
          data = data.filter(doc => matchFilter(doc, stageValue));
          break;
        case "$project":
          data = data.map(doc => applyProjection(doc, stageValue));
          break;
        case "$group":
          data = applyGroup(data, stageValue);
          break;
        case "$sort":
          data = applySort(data, stageValue);
          break;
        case "$limit":
          data = data.slice(0, stageValue);
          break;
        case "$skip":
          data = data.slice(stageValue);
          break;
        case "$lookup":
          data = applyLookup(data, stageValue, this._docs);
          break;
        case "$unwind":
          data = applyUnwind(data, stageValue);
          break;
        case "$facet":
          data = applyFacet(data, stageValue);
          break;
        case "$bucket":
          data = applyBucket(data, stageValue);
          break;
        case "$addFields":
          data = data.map(doc => ({ ...doc, ...applyProjection(doc, stageValue) }));
          break;
        case "$count":
          data = [{ count: data.length }];
          break;
        case "$setWindowFields":
          data = applySetWindowFields(data, stageValue);
          break;
      }

      stageResults.push({
        stage: stageKey,
        input: beforeCount,
        output: Array.isArray(data) ? data.length : 1,
      });
    }

    return { results: data, stageResults };
  }
}

// ─── HELPER: Match filter ───

function matchFilter(doc, filter) {
  if (!filter || Object.keys(filter).length === 0) return true;
  if (filter === doc) return true;

  if (filter.$and) return filter.$and.every(f => matchFilter(doc, f));
  if (filter.$or) return filter.$or.some(f => matchFilter(doc, f));
  if (filter.$nor) return !filter.$nor.some(f => matchFilter(doc, f));

  return Object.entries(filter).every(([key, condition]) => {
    if (key === "$and" || key === "$or" || key === "$nor") return true; // handled above

    if (typeof condition === "object" && condition !== null && !Array.isArray(condition)) {
      if (key.includes(".")) {
        const parts = key.split(".");
        let val = doc;
        for (const p of parts) {
          if (val == null) return false;
          val = val[p];
        }
        return matchCondition(val, condition);
      }
      return matchCondition(getFieldValue(doc, key), condition);
    }

    const docVal = getFieldValue(doc, key);
    if (Array.isArray(condition)) {
      return condition.includes(docVal);
    }
    return docVal === condition;
  });
}

function getFieldValue(doc, path) {
  if (path.includes(".")) {
    let val = doc;
    for (const p of path.split(".")) {
      if (val == null) return undefined;
      val = val[p];
    }
    return val;
  }
  return doc[path];
}

function matchCondition(docVal, condition) {
  for (const [op, val] of Object.entries(condition)) {
    switch (op) {
      case "$eq": if (docVal !== val) return false; break;
      case "$ne": if (docVal === val) return false; break;
      case "$gt": if (!(docVal > val)) return false; break;
      case "$gte": if (!(docVal >= val)) return false; break;
      case "$lt": if (!(docVal < val)) return false; break;
      case "$lte": if (!(docVal <= val)) return false; break;
      case "$in": if (!(Array.isArray(val) && val.includes(docVal))) return false; break;
      case "$nin": if (Array.isArray(val) && val.includes(docVal)) return false; break;
      case "$exists":
        if (val && docVal === undefined) return false;
        if (!val && docVal !== undefined) return false;
        break;
      case "$regex":
        if (typeof val === "string") {
          if (!new RegExp(val, "i").test(String(docVal))) return false;
        } else if (val instanceof RegExp) {
          if (!val.test(String(docVal))) return false;
        }
        break;
      case "$gte": if (!(docVal >= val)) return false; break;
    }
  }
  return true;
}

// ─── HELPER: Projection ───

function applyProjection(doc, projection) {
  const result = {};
  const isInclusion = Object.values(projection).some(v => v === 1 || v === true);

  Object.entries(projection).forEach(([key, val]) => {
    if (key === "_id" && val === 0) return;
    if (val === 1 || val === true) {
      if (key.includes(".")) {
        const parts = key.split(".");
        let source = doc;
        for (let i = 0; i < parts.length - 1; i++) {
          if (source == null) break;
          source = source[parts[i]];
        }
        if (source != null) result[key] = source[parts[parts.length - 1]];
      } else {
        result[key] = doc[key];
      }
    } else if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      // Computed field with expression
      const computed = computeExpression(doc, val);
      if (computed !== undefined) result[key] = computed;
    }
  });

  if (isInclusion && projection._id !== 0 && doc._id !== undefined) {
    result._id = doc._id;
  }

  return result;
}

function computeExpression(doc, expr) {
  const [op, val] = Object.entries(expr)[0] || [];
  switch (op) {
    case "$concat": return val.map(v => typeof v === "string" ? v : computeExpression(doc, v)).join("");
    case "$toUpper": return computeExpression(doc, val)?.toUpperCase();
    case "$toLower": return computeExpression(doc, val)?.toLowerCase();
    case "$substr": return computeExpression(doc, val[0])?.substring(val[1], val[2]);
    case "$multiply": return val.reduce((a, b) => a * resolveField(doc, b), 1);
    case "$add": return val.reduce((a, b) => a + resolveField(doc, b), 0);
    case "$subtract": return resolveField(doc, val[0]) - resolveField(doc, val[1]);
    case "$divide": return resolveField(doc, val[0]) / resolveField(doc, val[1]);
    case "$round": return Math.round(resolveField(doc, val[0]) * Math.pow(10, val[1] || 0)) / Math.pow(10, val[1] || 0);
    case "$ifNull": return resolveField(doc, val[0]) ?? val[1];
    case "$literal": return val;
    case "$toString": return String(resolveField(doc, val));
    case "$toInt": return parseInt(resolveField(doc, val)) || 0;
    default: return resolveField(doc, val || expr);
  }
}

function resolveField(doc, val) {
  if (typeof val === "string" && val.startsWith("$")) return getFieldValue(doc, val.slice(1));
  if (typeof val === "object" && val !== null && !Array.isArray(val)) return computeExpression(doc, val);
  return val;
}

// ─── HELPER: Group ───

function applyGroup(data, groupSpec) {
  const _idExpr = groupSpec._id;
  const groups = new Map();

  data.forEach(doc => {
    let groupKey;
    if (_idExpr === null || _idExpr === undefined) {
      groupKey = JSON.stringify(null);
    } else if (typeof _idExpr === "string" && _idExpr.startsWith("$")) {
      groupKey = JSON.stringify(getFieldValue(doc, _idExpr.slice(1)));
    } else if (typeof _idExpr === "object") {
      groupKey = JSON.stringify(resolveGroupKey(doc, _idExpr));
    } else {
      groupKey = JSON.stringify(_idExpr);
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, { _id: groupKey, _doc: doc, _count: 0, _sums: {}, _mins: {}, _maxs: {}, _first: doc, _last: doc, _push: [], _addToSet: new Set() });
    }

    const g = groups.get(groupKey);
    g._count++;
    Object.entries(groupSpec).forEach(([key, val]) => {
      if (key === "_id") return;
      const op = Object.keys(val)[0];
      const field = val[op];
      const fieldVal = typeof field === "string" && field.startsWith("$") ? getFieldValue(doc, field.slice(1)) : resolveField(doc, field);

      switch (op) {
        case "$sum": g._sums[key] = (g._sums[key] || 0) + (typeof fieldVal === "number" ? fieldVal : 1); break;
        case "$avg":
          g._sums[`__avg_sum_${key}`] = (g._sums[`__avg_sum_${key}`] || 0) + (typeof fieldVal === "number" ? fieldVal : 0);
          g._sums[`__avg_cnt_${key}`] = (g._sums[`__avg_cnt_${key}`] || 0) + 1;
          break;
        case "$min":
          if (!(key in g._mins) || fieldVal < g._mins[key]) g._mins[key] = fieldVal;
          break;
        case "$max":
          if (!(key in g._maxs) || fieldVal > g._maxs[key]) g._maxs[key] = fieldVal;
          break;
        case "$first": if (g._count === 1) g._first = doc; break;
        case "$last": g._last = doc; break;
        case "$push": g._push.push(fieldVal); break;
        case "$addToSet": g._addToSet.add(JSON.stringify(fieldVal)); break;
      }
    });
  });

  const results = [];
  groups.forEach((g, key) => {
    const result = {};
    result._id = JSON.parse(key);

    Object.entries(groupSpec).forEach(([k, val]) => {
      if (k === "_id") return;
      const op = Object.keys(val)[0];
      switch (op) {
        case "$sum": result[k] = g._sums[k] || 0; break;
        case "$avg": {
          const sum = g._sums[`__avg_sum_${k}`] || 0;
          const cnt = g._sums[`__avg_cnt_${k}`] || 0;
          result[k] = cnt > 0 ? Math.round((sum / cnt) * 100) / 100 : 0;
          break;
        }
        case "$min": result[k] = g._mins[k]; break;
        case "$max": result[k] = g._maxs[k]; break;
        case "$first": result[k] = g._first[k] ?? getFieldValue(g._first, k); break;
        case "$last": result[k] = g._last[k] ?? getFieldValue(g._last, k); break;
        case "$push": result[k] = g._push; break;
        case "$addToSet": result[k] = [...g._addToSet].map(v => JSON.parse(v)); break;
      }
    });

    results.push(result);
  });

  return results;
}

function resolveGroupKey(doc, expr) {
  const result = {};
  Object.entries(expr).forEach(([key, val]) => {
    if (typeof val === "string" && val.startsWith("$")) result[key] = getFieldValue(doc, val.slice(1));
    else result[key] = val;
  });
  return result;
}

// ─── HELPER: Sort ───

function applySort(data, sortSpec) {
  return [...data].sort((a, b) => {
    for (const [field, dir] of Object.entries(sortSpec)) {
      const aVal = getFieldValue(a, field);
      const bVal = getFieldValue(b, field);
      if (aVal < bVal) return -1 * dir;
      if (aVal > bVal) return 1 * dir;
    }
    return 0;
  });
}

// ─── HELPER: Lookup ───

function applyLookup(data, spec, sourceDocs) {
  const { from, localField, foreignField, as } = spec;
  // We need a separate copy of the "from" collection
  const fromDocs = JSON.parse(JSON.stringify(sourceDocs));
  return data.map(doc => {
    const localVal = getFieldValue(doc, localField);
    const matches = fromDocs.filter(fromDoc => getFieldValue(fromDoc, foreignField) === localVal);
    return { ...doc, [as]: matches };
  });
}

// ─── HELPER: Unwind ───

function applyUnwind(data, spec) {
  const field = typeof spec === "string" ? spec.slice(1) : spec.path.slice(1);
  const preserveNull = spec.preserveNullAndEmptyArrays || false;
  const includeIndex = spec.includeArrayIndex || null;
  const results = [];

  data.forEach(doc => {
    const arr = getFieldValue(doc, field);
    if (!Array.isArray(arr) || arr.length === 0) {
      if (preserveNull) {
        const newDoc = { ...doc };
        delete newDoc[field];
        if (includeIndex) newDoc[includeIndex] = null;
        results.push(newDoc);
      }
      return;
    }
    arr.forEach((item, idx) => {
      const newDoc = { ...doc, [field]: item };
      if (includeIndex) newDoc[includeIndex] = idx;
      results.push(newDoc);
    });
  });

  return results;
}

// ─── HELPER: Facet ───

function applyFacet(data, spec) {
  const result = {};
  Object.entries(spec).forEach(([facetName, pipeline]) => {
    let facetData = [...data];
    for (const stage of pipeline) {
      const key = Object.keys(stage)[0];
      switch (key) {
        case "$match": facetData = facetData.filter(d => matchFilter(d, stage.$match)); break;
        case "$group": facetData = applyGroup(facetData, stage.$group); break;
        case "$sort": facetData = applySort(facetData, stage.$sort); break;
        case "$limit": facetData = facetData.slice(0, stage.$limit); break;
        case "$skip": facetData = facetData.slice(stage.$skip); break;
        case "$bucket": facetData = applyBucket(facetData, stage.$bucket); break;
        case "$count": facetData = [{ count: facetData.length }]; break;
      }
    }
    result[facetName] = facetData;
  });
  return [result];
}

// ─── HELPER: Bucket ───

function applyBucket(data, spec) {
  const { groupBy, boundaries, default: defaultBucket, output } = spec;
  const buckets = [];
  for (let i = 0; i < boundaries.length - 1; i++) {
    buckets.push({ _id: `${boundaries[i]}-${boundaries[i + 1]}`, min: boundaries[i], max: boundaries[i + 1], docs: [] });
  }
  if (defaultBucket !== undefined) {
    buckets.push({ _id: "Other", docs: [] });
  }

  data.forEach(doc => {
    const val = resolveField(doc, groupBy);
    let placed = false;
    for (let i = 0; i < boundaries.length - 1; i++) {
      if (val >= boundaries[i] && val < boundaries[i + 1]) {
        buckets[i].docs.push(doc);
        placed = true;
        break;
      }
    }
    if (!placed && defaultBucket !== undefined) {
      buckets[buckets.length - 1].docs.push(doc);
    }
  });

  return buckets.filter(b => b.docs.length > 0 || b._id === "Other").map(b => {
    const result = { _id: b._id, count: b.docs.length };
    if (output) {
      Object.entries(output).forEach(([key, expr]) => {
        const op = Object.keys(expr)[0];
        const field = expr[op];
        const vals = b.docs.map(d => typeof field === "string" && field.startsWith("$") ? getFieldValue(d, field.slice(1)) : resolveField(d, field));
        switch (op) {
          case "$sum": result[key] = vals.reduce((a, v) => a + (typeof v === "number" ? v : 0), 0); break;
          case "$avg": result[key] = vals.length > 0 ? vals.reduce((a, v) => a + (typeof v === "number" ? v : 0), 0) / vals.length : 0; break;
          case "$min": result[key] = Math.min(...vals.filter(v => typeof v === "number")); break;
          case "$max": result[key] = Math.max(...vals.filter(v => typeof v === "number")); break;
          case "$push": result[key] = vals; break;
        }
      });
    }
    return result;
  });
}

// ─── HELPER: SetWindowFields ───

function applySetWindowFields(data, spec) {
  const { sortBy, output } = spec;
  let sorted = sortBy ? applySort(data, sortBy) : [...data];
  return sorted.map((doc, idx) => {
    const newDoc = { ...doc };
    Object.entries(output).forEach(([field, expr]) => {
      const op = Object.keys(expr)[0];
      switch (op) {
        case "$rank": newDoc[field] = idx + 1; break;
        case "$rowNumber": newDoc[field] = idx + 1; break;
        case "$denseRank": newDoc[field] = idx + 1; break;
        case "$sum": newDoc[field] = sorted.slice(0, idx + 1).reduce((a, d) => a + (resolveField(d, expr.$sum) || 0), 0); break;
        case "$avg": {
          const window = sorted.slice(0, idx + 1);
          newDoc[field] = window.reduce((a, d) => a + (resolveField(d, expr.$avg) || 0), 0) / window.length;
          break;
        }
      }
    });
    return newDoc;
  });
}

// ─── HELPER: Apply update ───

function applyUpdate(doc, update) {
  Object.entries(update).forEach(([op, val]) => {
    switch (op) {
      case "$set": Object.assign(doc, val); break;
      case "$unset": Object.keys(val).forEach(k => delete doc[k]); break;
      case "$inc": Object.entries(val).forEach(([k, v]) => doc[k] = (doc[k] || 0) + v); break;
      case "$mul": Object.entries(val).forEach(([k, v]) => doc[k] = (doc[k] || 0) * v); break;
      case "$push": Object.entries(val).forEach(([k, v]) => { if (!doc[k]) doc[k] = []; doc[k].push(v); }); break;
      case "$pull": Object.entries(val).forEach(([k, v]) => { if (Array.isArray(doc[k])) doc[k] = doc[k].filter(item => !matchFilter(item, v)); }); break;
    }
  });
}

let _idCounter = 1000;
function generateId() {
  return ++_idCounter;
}

// ═══════════════════════════════════════════════════
//  SAMPLE DATABASES
// ═══════════════════════════════════════════════════

export const MONGO_DATABASES = {
  ecommerce: {
    name: "E-Commerce",
    description: "Online store with users, products, orders, reviews, and categories.",
    collections: {
      users: {
        documentCount: 12,
        indexes: ["_id", "email"],
        documents: [
          { _id: 1, name: "Alice Johnson", email: "alice@example.com", age: 32, city: "New York", signupDate: new Date("2023-01-15"), isActive: true, tags: ["premium", "newsletter"] },
          { _id: 2, name: "Bob Smith", email: "bob@example.com", age: 28, city: "Los Angeles", signupDate: new Date("2023-02-20"), isActive: true, tags: ["newsletter"] },
          { _id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 45, city: "Chicago", signupDate: new Date("2023-03-10"), isActive: false, tags: ["premium"] },
          { _id: 4, name: "Diana Prince", email: "diana@example.com", age: 35, city: "New York", signupDate: new Date("2023-04-05"), isActive: true, tags: ["vip", "premium", "newsletter"] },
          { _id: 5, name: "Eve Davis", email: "eve@example.com", age: 29, city: "San Francisco", signupDate: new Date("2023-05-01"), isActive: true, tags: [] },
          { _id: 6, name: "Frank Miller", email: "frank@example.com", age: 41, city: "Boston", signupDate: new Date("2023-06-15"), isActive: false, tags: ["newsletter"] },
          { _id: 7, name: "Grace Wilson", email: "grace@example.com", age: 26, city: "Los Angeles", signupDate: new Date("2023-07-20"), isActive: true, tags: ["premium"] },
          { _id: 8, name: "Henry Taylor", email: "henry@example.com", age: 38, city: "Chicago", signupDate: new Date("2023-08-10"), isActive: true, tags: ["vip", "newsletter"] },
          { _id: 9, name: "Ivy Anderson", email: "ivy@example.com", age: 31, city: "Seattle", signupDate: new Date("2023-09-05"), isActive: true, tags: ["premium", "newsletter"] },
          { _id: 10, name: "Jack Thomas", email: "jack@example.com", age: 52, city: "Miami", signupDate: new Date("2023-10-01"), isActive: false, tags: [] },
          { _id: 11, name: "Karen White", email: "karen@example.com", age: 33, city: "New York", signupDate: new Date("2024-01-10"), isActive: true, tags: ["newsletter"] },
          { _id: 12, name: "Leo Martinez", email: "leo@example.com", age: 27, city: "Austin", signupDate: new Date("2024-02-14"), isActive: true, tags: ["premium", "vip"] },
        ],
      },
      products: {
        documentCount: 15,
        indexes: ["_id", "name", "category", "price"],
        documents: [
          { _id: 1, name: "Laptop Pro", category: "Electronics", price: 1299.99, stock: 25, rating: 4.5, tags: ["computer", "premium"] },
          { _id: 2, name: "Wireless Mouse", category: "Electronics", price: 29.99, stock: 100, rating: 4.2, tags: ["accessory"] },
          { _id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, stock: 50, rating: 4.7, tags: ["accessory", "premium"] },
          { _id: 4, name: "Desk Lamp", category: "Home", price: 45.00, stock: 60, rating: 4.0, tags: ["lighting"] },
          { _id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 35, rating: 4.3, tags: ["kitchen", "appliance"] },
          { _id: 6, name: "Running Shoes", category: "Sports", price: 89.99, stock: 50, rating: 4.6, tags: ["footwear", "running"] },
          { _id: 7, name: "Yoga Mat", category: "Sports", price: 24.99, stock: 80, rating: 4.1, tags: ["fitness"] },
          { _id: 8, name: "Notebook Set", category: "Stationery", price: 12.99, stock: 200, rating: 3.8, tags: ["office"] },
          { _id: 9, name: "Water Bottle", category: "Sports", price: 19.99, stock: 150, rating: 4.4, tags: ["hydration", "fitness"] },
          { _id: 10, name: "Bluetooth Speaker", category: "Electronics", price: 59.99, stock: 40, rating: 4.3, tags: ["audio", "wireless"] },
          { _id: 11, name: "Plant Pot Set", category: "Home", price: 34.99, stock: 45, rating: 4.0, tags: ["decor"] },
          { _id: 12, name: "Backpack", category: "Accessories", price: 49.99, stock: 70, rating: 4.2, tags: ["travel", "bags"] },
          { _id: 13, name: "Desk Organizer", category: "Office", price: 22.99, stock: 90, rating: 3.9, tags: ["office"] },
          { _id: 14, name: "LED Monitor 27\"", category: "Electronics", price: 349.99, stock: 20, rating: 4.6, tags: ["computer", "premium"] },
          { _id: 15, name: "Wireless Earbuds", category: "Electronics", price: 79.99, stock: 65, rating: 4.4, tags: ["audio", "wireless"] },
        ],
      },
      orders: {
        documentCount: 20,
        indexes: ["_id", "userId", "status"],
        documents: [
          { _id: 1, userId: 1, items: [{ productId: 1, qty: 1, price: 1299.99 }, { productId: 2, qty: 1, price: 29.99 }], total: 1329.98, date: new Date("2024-01-10"), status: "delivered", payment: "credit_card" },
          { _id: 2, userId: 2, items: [{ productId: 6, qty: 1, price: 89.99 }, { productId: 9, qty: 1, price: 19.99 }], total: 109.98, date: new Date("2024-01-12"), status: "delivered", payment: "paypal" },
          { _id: 3, userId: 3, items: [{ productId: 4, qty: 1, price: 45.00 }], total: 45.00, date: new Date("2024-01-15"), status: "shipped", payment: "credit_card" },
          { _id: 4, userId: 1, items: [{ productId: 6, qty: 1, price: 89.99 }], total: 89.99, date: new Date("2024-02-01"), status: "delivered", payment: "credit_card" },
          { _id: 5, userId: 4, items: [{ productId: 5, qty: 1, price: 79.99 }, { productId: 8, qty: 1, price: 12.99 }], total: 104.98, date: new Date("2024-02-05"), status: "processing", payment: "debit_card" },
          { _id: 6, userId: 5, items: [{ productId: 5, qty: 1, price: 79.99 }], total: 79.99, date: new Date("2024-02-10"), status: "shipped", payment: "paypal" },
          { _id: 7, userId: 2, items: [{ productId: 8, qty: 2, price: 12.99 }], total: 25.98, date: new Date("2024-02-15"), status: "processing", payment: "credit_card" },
          { _id: 8, userId: 6, items: [{ productId: 14, qty: 1, price: 349.99 }, { productId: 3, qty: 1, price: 89.99 }], total: 439.98, date: new Date("2024-03-01"), status: "delivered", payment: "credit_card" },
          { _id: 9, userId: 7, items: [{ productId: 10, qty: 1, price: 59.99 }, { productId: 15, qty: 1, price: 79.99 }], total: 139.98, date: new Date("2024-03-05"), status: "delivered", payment: "paypal" },
          { _id: 10, userId: 8, items: [{ productId: 7, qty: 1, price: 24.99 }], total: 24.99, date: new Date("2024-03-10"), status: "processing", payment: "debit_card" },
          { _id: 11, userId: 3, items: [{ productId: 11, qty: 2, price: 34.99 }], total: 69.98, date: new Date("2024-03-15"), status: "shipped", payment: "credit_card" },
          { _id: 12, userId: 9, items: [{ productId: 12, qty: 1, price: 49.99 }, { productId: 7, qty: 1, price: 24.99 }], total: 74.98, date: new Date("2024-03-20"), status: "delivered", payment: "paypal" },
          { _id: 13, userId: 10, items: [{ productId: 2, qty: 3, price: 29.99 }], total: 89.97, date: new Date("2024-04-01"), status: "delivered", payment: "credit_card" },
          { _id: 14, userId: 4, items: [{ productId: 15, qty: 1, price: 79.99 }, { productId: 10, qty: 1, price: 59.99 }], total: 139.98, date: new Date("2024-04-05"), status: "shipped", payment: "debit_card" },
          { _id: 15, userId: 11, items: [{ productId: 1, qty: 1, price: 1299.99 }], total: 1299.99, date: new Date("2024-04-10"), status: "delivered", payment: "credit_card" },
          { _id: 16, userId: 12, items: [{ productId: 13, qty: 2, price: 22.99 }, { productId: 8, qty: 3, price: 12.99 }], total: 84.95, date: new Date("2024-04-15"), status: "processing", payment: "paypal" },
          { _id: 17, userId: 5, items: [{ productId: 14, qty: 1, price: 349.99 }], total: 349.99, date: new Date("2024-04-20"), status: "delivered", payment: "credit_card" },
          { _id: 18, userId: 8, items: [{ productId: 6, qty: 1, price: 89.99 }, { productId: 9, qty: 2, price: 19.99 }], total: 129.97, date: new Date("2024-05-01"), status: "shipped", payment: "paypal" },
          { _id: 19, userId: 7, items: [{ productId: 3, qty: 1, price: 89.99 }], total: 89.99, date: new Date("2024-05-05"), status: "processing", payment: "credit_card" },
          { _id: 20, userId: 1, items: [{ productId: 10, qty: 1, price: 59.99 }], total: 59.99, date: new Date("2024-05-10"), status: "delivered", payment: "paypal" },
        ],
      },
    },
  },
  social: {
    name: "Social Media",
    description: "Social media platform with users, posts, comments, likes, and followers.",
    collections: {
      users: {
        documentCount: 8,
        indexes: ["_id", "username", "email"],
        documents: [
          { _id: 1, username: "alice_dev", name: "Alice Johnson", email: "alice@social.com", bio: "Full-stack developer", followersCount: 1250, joinDate: new Date("2023-01-01") },
          { _id: 2, username: "bob_creative", name: "Bob Smith", email: "bob@social.com", bio: "Creative designer", followersCount: 890, joinDate: new Date("2023-02-15") },
          { _id: 3, username: "charlie_writes", name: "Charlie Brown", email: "charlie@social.com", bio: "Writer & blogger", followersCount: 3400, joinDate: new Date("2023-03-10") },
          { _id: 4, username: "diana_photo", name: "Diana Prince", email: "diana@social.com", bio: "Photographer", followersCount: 5600, joinDate: new Date("2023-01-20") },
          { _id: 5, username: "eve_music", name: "Eve Davis", email: "eve@social.com", bio: "Musician", followersCount: 12000, joinDate: new Date("2022-11-05") },
          { _id: 6, username: "frank_tech", name: "Frank Miller", email: "frank@social.com", bio: "Tech blogger", followersCount: 2100, joinDate: new Date("2023-04-01") },
          { _id: 7, username: "grace_fit", name: "Grace Wilson", email: "grace@social.com", bio: "Fitness coach", followersCount: 7800, joinDate: new Date("2022-12-10") },
          { _id: 8, username: "henry_travel", name: "Henry Taylor", email: "henry@social.com", bio: "Travel photographer", followersCount: 15000, joinDate: new Date("2022-10-20") },
        ],
      },
      posts: {
        documentCount: 15,
        indexes: ["_id", "userId", "tags"],
        documents: [
          { _id: 1, userId: 1, content: "Just built a new React app with server components! 🚀", tags: ["react", "webdev"], likes: 45, comments: 12, createdAt: new Date("2024-01-10") },
          { _id: 2, userId: 2, content: "New logo design for a local coffee shop ☕", tags: ["design", "freelance"], likes: 78, comments: 23, createdAt: new Date("2024-01-12") },
          { _id: 3, userId: 3, content: "My latest article on the future of AI in education", tags: ["writing", "ai", "education"], likes: 120, comments: 45, createdAt: new Date("2024-01-15") },
          { _id: 4, userId: 4, content: "Golden hour at the Grand Canyon 📸", tags: ["photography", "travel"], likes: 340, comments: 28, createdAt: new Date("2024-01-20") },
          { _id: 5, userId: 5, content: "New single dropping next week! 🎵", tags: ["music", "newrelease"], likes: 890, comments: 120, createdAt: new Date("2024-02-01") },
          { _id: 6, userId: 6, content: "Reviewing the new MacBook Pro M3 for developers", tags: ["tech", "review"], likes: 230, comments: 67, createdAt: new Date("2024-02-05") },
          { _id: 7, userId: 7, content: "Morning yoga routine for beginners 🧘", tags: ["fitness", "yoga"], likes: 410, comments: 89, createdAt: new Date("2024-02-10") },
          { _id: 8, userId: 8, content: "Exploring hidden gems in Tokyo 🇯🇵", tags: ["travel", "japan"], likes: 670, comments: 54, createdAt: new Date("2024-02-15") },
          { _id: 9, userId: 1, content: "Tips for debugging Node.js applications", tags: ["nodejs", "debugging", "webdev"], likes: 89, comments: 34, createdAt: new Date("2024-03-01") },
          { _id: 10, userId: 3, content: "Book review: Clean Code by Robert Martin", tags: ["books", "programming"], likes: 156, comments: 42, createdAt: new Date("2024-03-05") },
          { _id: 11, userId: 2, content: "My design process from sketch to final product", tags: ["design", "process"], likes: 198, comments: 56, createdAt: new Date("2024-03-10") },
          { _id: 12, userId: 4, content: "Street photography collection - New York City", tags: ["photography", "nyc"], likes: 520, comments: 45, createdAt: new Date("2024-03-15") },
          { _id: 13, userId: 7, content: "Healthy meal prep ideas for the week", tags: ["fitness", "nutrition", "mealprep"], likes: 310, comments: 78, createdAt: new Date("2024-03-20") },
          { _id: 14, userId: 5, content: "Behind the scenes of recording my new album", tags: ["music", "behindthescenes"], likes: 450, comments: 98, createdAt: new Date("2024-04-01") },
          { _id: 15, userId: 6, content: "Comparing cloud providers: AWS vs Azure vs GCP", tags: ["cloud", "aws", "azure", "gcp"], likes: 280, comments: 95, createdAt: new Date("2024-04-05") },
        ],
      },
    },
  },
};

// ═══════════════════════════════════════════════════
//  MONGODB LESSONS (16 Lessons)
// ═══════════════════════════════════════════════════

export const MONGO_LESSONS = [
  {
    id: "intro-nosql",
    chapter: 1,
    title: "Introduction to NoSQL",
    level: "Beginner",
    tags: ["NoSQL", "MongoDB", "Databases"],
    database: "ecommerce",
    conceptExplanation: `NoSQL databases are designed for flexible, scalable data storage. Unlike SQL databases with rigid schemas, NoSQL allows you to store data in various formats.

**Types of NoSQL Databases:**
• Document Stores (MongoDB) — JSON-like documents
• Key-Value Stores (Redis) — Simple key-value pairs
• Column-Family Stores (Cassandra) — Columns grouped by families
• Graph Databases (Neo4j) — Nodes and relationships

**Why MongoDB?**
• Flexible schema — documents can have different fields
• Horizontal scaling — sharding across clusters
• Rich query language — CRUD, aggregation, geospatial
• JSON/BSON — intuitive for developers
• High performance — indexing, in-memory operations

**SQL vs NoSQL Comparison:**
• SQL: Tables → Rows → Columns (rigid schema)
• MongoDB: Collections → Documents → Fields (dynamic schema)

**Real-World Usage:**
• Real-time analytics and logging
• Content management systems
• Mobile app backends
• IoT data storage
• Product catalogs with varying attributes`,
    keyRules: [
      "NoSQL databases sacrifice ACID compliance for scalability and flexibility",
      "MongoDB stores data as BSON (Binary JSON) documents",
      "Collections are analogous to SQL tables, Documents to rows",
      "Documents in the same collection can have different fields",
      "MongoDB uses a distributed architecture with replica sets for high availability",
      "Choose embedding over referencing for frequent read operations",
    ],
    task: `Explore the MongoDB database structure:
1. Connect to the ecommerce database
2. List all available collections
3. Find all documents in the users collection
4. Count the total number of products`,
    starterQuery: `// MongoDB Query Playground
// Try these queries:

// Find all users
db.users.find({})
`,
    solutionQuery: `// List all collections
show collections

// Find all users
db.users.find({})

// Count all products
db.products.countDocuments({})`,
    hint: "• Use db.collectionName.find({}) to get all documents\n• An empty filter {} matches all documents\n• db.collectionName.countDocuments({}) counts documents\n• show collections lists all collections in the database",
  },
  {
    id: "documents-collections",
    chapter: 2,
    title: "Documents & Collections",
    level: "Beginner",
    tags: ["Documents", "Collections", "BSON"],
    database: "ecommerce",
    conceptExplanation: `In MongoDB, data is stored as documents in collections.

**Documents:**
• JSON-like structures with key-value pairs
• Fields can hold strings, numbers, arrays, nested objects
• Each document has a unique _id field (ObjectId)
• Documents can have different fields in the same collection

**Collections:**
• Groups of related documents
• Created implicitly when first document is inserted
• No schema enforcement by default
• Can have indexes for performance

**Document Example:**
{
  "_id": ObjectId("abc123"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 32,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "tags": ["premium", "newsletter"]
}

**BSON vs JSON:**
MongoDB stores data as BSON (Binary JSON), which supports additional data types like Date, ObjectId, Binary, and Decimal128.`,
    keyRules: [
      "Every document has an _id field (primary key)",
      "Field names are strings, values can be any BSON type",
      "Collections are created when you first insert a document",
      "Array fields allow storing related data within a document",
      "Embedded documents enable denormalized data modeling",
      "Use dot notation to access nested fields: 'address.city'",
    ],
    task: `Explore the document structure:
1. Find one document from the users collection to see its structure
2. Find only the name and email fields of all users (projection)
3. Find users who have tags containing "premium"
4. Display the first user with address fields`,
    starterQuery: `// Explore document structure
db.users.findOne({})
`,
    solutionQuery: `// Find one document to see structure
db.users.findOne({})

// Project only name and email
db.users.find({}, { name: 1, email: 1 })

// Find users with premium tag
db.users.find({ tags: "premium" })

// First user with full details
db.users.findOne({ _id: 1 })`,
    hint: "• findOne() returns a single document\n• Use projection { field: 1 } to include specific fields\n• Array fields can be queried directly: { tags: \"premium\" }\n• _id: 0 in projection excludes the _id field",
  },
  {
    id: "crud-operations",
    chapter: 3,
    title: "CRUD Operations",
    level: "Beginner",
    tags: ["CRUD", "Insert", "Update", "Delete"],
    database: "ecommerce",
    conceptExplanation: `CRUD operations are the foundation of MongoDB interactions.

**Create:**
• insertOne({ field: "value" }) — Insert a single document
• insertMany([{...}, {...}]) — Insert multiple documents

**Read:**
• find({filter}) — Find documents matching filter
• findOne({filter}) — Find the first matching document

**Update:**
• updateOne({filter}, {$set: {field: value}}) — Update first match
• updateMany({filter}, {$inc: {field: 1}}) — Update all matches

**Update Operators:**
• $set — Set field value
• $unset — Remove field
• $inc — Increment numeric field
• $push — Add to array
• $pull — Remove from array

**Delete:**
• deleteOne({filter}) — Delete first match
• deleteMany({filter}) — Delete all matches

**Real-World Usage:**
• User registration (insertOne)
• Product catalog updates (updateMany)
• Cart management (updateOne with $push)
• Data cleanup (deleteMany)`,
    keyRules: [
      "insertOne/insertMany return an object with insertedId/insertedIds",
      "update operations use operators like $set, $inc, $push",
      "deleteOne deletes the first document matching the filter",
      "deleteMany deletes all documents matching the filter",
      "Always specify a filter to avoid updating/deleting all documents",
    ],
    task: `Practice CRUD operations:
1. Find all active users (isActive: true)
2. Find all products with stock less than 30
3. Count products in the Electronics category
4. Find orders that are "delivered"`,
    starterQuery: `// CRUD Practice
db.users.find({ isActive: true })
`,
    solutionQuery: `-- Note: The mock engine supports find, insert, update, delete operations.
-- Below are the practice queries.

// Active users
db.users.find({ isActive: true })

// Low stock products (< 30)
db.products.find({ stock: { $lt: 30 } })

// Count electronics
db.products.countDocuments({ category: "Electronics" })

// Delivered orders
db.orders.find({ status: "delivered" })`,
    hint: "• { field: value } matches exact value\n• { field: { $lt: value } } matches less than\n• countDocuments() returns the count\n• Multiple conditions can be combined implicitly",
  },
  {
    id: "query-operators",
    chapter: 4,
    title: "Query Operators",
    level: "Beginner",
    tags: ["Query", "Operators", "Filtering", "$gt", "$lt"],
    database: "ecommerce",
    conceptExplanation: `MongoDB provides powerful query operators for flexible filtering.

**Comparison Operators:**
• $eq — Equal to
• $ne — Not equal to
• $gt — Greater than
• $gte — Greater than or equal
• $lt — Less than
• $lte — Less than or equal
• $in — In array
• $nin — Not in array

**Logical Operators:**
• $and — All conditions must be true
• $or — At least one condition must be true
• $nor — None of the conditions true
• $not — Negates a condition

**Element Operators:**
• $exists — Field exists
• $type — Field is of specified type

**Example Queries:**
db.products.find({ price: { $gt: 50 } })
db.users.find({ age: { $gte: 25, $lte: 40 } })
db.products.find({ $or: [{ category: "Electronics" }, { price: { $lt: 30 } }] })
db.users.find({ email: { $exists: true } })`,
    keyRules: [
      "Operators are prefixed with $ symbol",
      "Use $and/$or/$nor for combining multiple conditions",
      "$in and $nin accept arrays of values",
      "$exists checks if a field exists in a document",
      "Comparison operators can be combined on the same field",
      "Use $regex for pattern matching (like SQL LIKE)",
    ],
    task: `Practice using query operators:
1. Find products with price greater than 100
2. Find users aged between 25 and 40 (inclusive)
3. Find products in Electronics OR Home categories
4. Find users who are active AND have premium tag
5. Find products with rating >= 4.5`,
    starterQuery: `// Query operators practice
db.products.find({ price: { $gt: 100 } })
`,
    solutionQuery: `// Products with price > 100
db.products.find({ price: { $gt: 100 } })

// Users aged 25-40
db.users.find({ age: { $gte: 25, $lte: 40 } })

// Electronics or Home
db.products.find({ $or: [{ category: "Electronics" }, { category: "Home" }] })

// Active AND premium
db.users.find({ isActive: true, tags: "premium" })

// Rating >= 4.5
db.products.find({ rating: { $gte: 4.5 } })`,
    hint: "• { field: { $gt: val } } for greater than\n• Combine range: { field: { $gte: min, $lte: max } }\n• $or: [{cond1}, {cond2}]\n• Multiple fields in filter = implicit $and",
  },
  {
    id: "projection",
    chapter: 5,
    title: "Projection",
    level: "Beginner",
    tags: ["Projection", "Fields", "Select"],
    database: "ecommerce",
    conceptExplanation: `Projection controls which fields are returned in query results.

**Syntax:**
db.collection.find(filter, projection)

**Include fields:**
db.users.find({}, { name: 1, email: 1 })
— Returns only name and email (and _id by default)

**Exclude fields:**
db.users.find({}, { password: 0, __v: 0 })
— Returns all fields except password and __v

**Include with _id exclusion:**
db.users.find({}, { name: 1, email: 1, _id: 0 })
— Returns only name and email, no _id

**Computed fields in $project (aggregation):**
db.orders.aggregate([
  { $project: {
    total: 1,
    year: { $year: "$date" },
    totalWithTax: { $multiply: ["$total", 1.08] }
  }}
])`,
    keyRules: [
      "1 = include, 0 = exclude — can't mix include/exclude (except _id)",
      "_id is included by default, set _id: 0 to exclude",
      "Projection happens after filtering",
      "In aggregation, $project can create computed fields",
      "Use projection to reduce network transfer and improve performance",
    ],
    task: `Practice projections:
1. Find all products showing only name, price, and category
2. Find all users showing only name and email (exclude _id)
3. Find products in Sports category, show only name and price
4. Find orders but exclude the items array from results`,
    starterQuery: `// Projection practice
db.products.find({}, { name: 1, price: 1, category: 1 })
`,
    solutionQuery: `// Products with name, price, category
db.products.find({}, { name: 1, price: 1, category: 1 })

// Users with name, email, no _id
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Sports products, show name and price
db.products.find({ category: "Sports" }, { name: 1, price: 1, _id: 0 })

// Orders without items array
db.orders.find({}, { items: 0 })`,
    hint: "• { field: 1 } includes field, { field: 0 } excludes\n• _id: 0 removes _id from results\n• Mixing include and exclude gives error (except _id)\n• Projection improves query performance",
  },
  {
    id: "sorting-pagination",
    chapter: 6,
    title: "Sorting & Pagination",
    level: "Beginner",
    tags: ["Sort", "Limit", "Skip", "Pagination"],
    database: "ecommerce",
    conceptExplanation: `Sort and pagination control the order and number of results.

**Sorting:**
db.products.find({}).sort({ price: 1 })  — Ascending
db.products.find({}).sort({ price: -1 })  — Descending

**Multiple Sort Fields:**
db.products.find({}).sort({ category: 1, price: -1 })
— Sort by category ascending, then price descending

**Pagination:**
db.products.find({}).limit(5)  — First 5 results
db.products.find({}).skip(5).limit(5)  — Next 5 results

**Chaining Methods:**
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .skip(0)
  .limit(3)

**Important:** .sort(), .skip(), .limit() can be chained in any order, MongoDB applies sort first, then skip, then limit internally.`,
    keyRules: [
      "1 = ascending, -1 = descending",
      "Sort is applied before skip and limit",
      "skip + limit = pagination: skip((page-1) * pageSize).limit(pageSize)",
      "sort without index can be slow on large collections",
      "Use a consistent sort field to avoid pagination issues",
    ],
    task: `Practice sorting and pagination:
1. Sort products by price from lowest to highest
2. Sort products by price from highest to lowest
3. Find the 3 most expensive products
4. Skip the first 5 products and show the next 5
5. Sort users by age descending, show the top 3 oldest`,
    starterQuery: `// Sort products by price ascending
db.products.find({}).sort({ price: 1 })
`,
    solutionQuery: `// Price ascending
db.products.find({}).sort({ price: 1 })

// Price descending
db.products.find({}).sort({ price: -1 })

// 3 most expensive
db.products.find({}).sort({ price: -1 }).limit(3)

// Pagination: skip 5, limit 5
db.products.find({}).skip(5).limit(5)

// 3 oldest users
db.users.find({}).sort({ age: -1 }).limit(3)`,
    hint: "• sort({ field: 1 }) asc, sort({ field: -1 }) desc\n• limit(n) returns at most n documents\n• skip(n) skips the first n documents\n• Chain methods: find({}).sort().skip().limit()",
  },
  {
    id: "embedded-documents",
    chapter: 7,
    title: "Embedded Documents",
    level: "Intermediate",
    tags: ["Embedded", "Nested", "Subdocuments"],
    database: "ecommerce",
    conceptExplanation: `MongoDB allows embedding documents inside other documents, creating nested data structures.

**Embedded Document Example:**
{
  _id: 1,
  name: "Alice Johnson",
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
    coordinates: { lat: 40.7128, lng: -74.006 }
  }
}

**Querying Embedded Fields (Dot Notation):**
db.users.find({ "address.city": "New York" })

**Updating Embedded Fields:**
db.users.updateOne(
  { _id: 1 },
  { $set: { "address.city": "Brooklyn" } }
)

**Projecting Embedded Fields:**
db.users.find({}, { "address.city": 1, name: 1 })

**Use embedding when:**
• Data is frequently read together
• Embedded data doesn't grow unboundedly
• You need atomic updates of related data
• One-to-one or one-to-few relationships`,
    keyRules: [
      "Use dot notation (quoted) to access nested fields: 'address.city'",
      "Embedding improves read performance (single query instead of JOIN)",
      "Avoid unbounded arrays that grow over time (comments, likes)",
      "Embedded documents have no _id of their own",
      "Update embedded fields with $set and dot notation",
      "Maximum document size is 16MB in MongoDB",
    ],
    task: `Practice with embedded documents:
1. Find orders with items containing productId 1
2. Find all users with city "New York" (using dot notation)
3. Find products that have "premium" in their tags array
4. Show users who have "newsletter" tag`,
    starterQuery: `// Query embedded fields
db.orders.find({ "items.productId": 1 })
`,
    solutionQuery: `// Orders with productId 1 in items
db.orders.find({ "items.productId": 1 })

// Users in New York
db.users.find({ "city": "New York" })

// Products with premium tag
db.products.find({ tags: "premium" })

// Users with newsletter tag
db.users.find({ tags: "newsletter" })`,
    hint: "• Use dot notation: \"nested.field\": value\n• Arrays can be queried directly: { tags: \"value\" }\n• For objects inside arrays: { \"array.field\": value }\n• Dot notation requires quotes in find()",
  },
  {
    id: "arrays",
    chapter: 8,
    title: "Arrays",
    level: "Intermediate",
    tags: ["Arrays", "$push", "$pull", "Array Operators"],
    database: "ecommerce",
    conceptExplanation: `MongoDB provides powerful operators for working with arrays.

**Querying Arrays:**
db.products.find({ tags: "premium" })  — Array contains value
db.products.find({ tags: { $all: ["premium", "wireless"] } })  — Contains all
db.products.find({ tags: { $size: 2 } })  — Array has exactly 2 elements
db.products.find({ "tags.0": "premium" })  — First element matches

**Array Update Operators:**
• $push — Add element to array
• $pull — Remove elements matching condition
• $addToSet — Add if not already present
• $pop — Remove first (-1) or last (1) element
• $each — Add multiple elements

**Positional Operator ($):**
db.orders.updateOne(
  { _id: 1, "items.productId": 2 },
  { $set: { "items.$.qty": 5 } }
)
— Updates the matched element in the array`,
    keyRules: [
      "$all matches arrays containing all specified values",
      "$size matches arrays with exact length",
      "$push adds to array, $pull removes from array",
      "$addToSet adds only unique values",
      "Positional operator $ updates the matched array element",
      "Array indexes start at 0",
    ],
    task: `Practice array operations:
1. Find products with both "premium" and "computer" tags ($all)
2. Find tags and their lengths for each product
3. Find products with exactly 2 tags ($size)
4. Find orders where at least one item has qty > 1`,
    starterQuery: `// Array queries
db.products.find({ tags: { $all: ["premium", "computer"] } })
`,
    solutionQuery: `// Products with both premium AND computer tags
db.products.find({ tags: { $all: ["premium", "computer"] } })

// Products with exactly 2 tags
db.products.find({ tags: { $size: 2 } })

// Orders with items qty > 1
db.orders.find({ "items.qty": { $gt: 1 } })`,
  },
  {
    id: "relationships",
    chapter: 9,
    title: "Relationships (References)",
    level: "Intermediate",
    tags: ["References", "Relationships", "Linking"],
    database: "ecommerce",
    conceptExplanation: `In MongoDB, relationships are typically handled through embedding or referencing.

**Referencing (Manual References):**
Documents reference each other by ID:
{
  _id: 1,
  name: "Alice Johnson",
  orders: [1, 2, 4]  // Array of order IDs
}

{
  _id: 1,
  userId: 1,  // Reference to user
  total: 1329.98
}

**$lookup (Aggregation — Similar to SQL JOIN):**
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }
])

**Embedding vs Referencing:**
• Embed: Data is read together, small, rarely changes alone
• Reference: Data is large, frequently changes, needs independent access

**One-to-One:** Embed or reference (based on access patterns)
**One-to-Many:** Reference from the "many" side or embed an array
**Many-to-Many:** Array of references on both sides or junction collection`,
    keyRules: [
      "Use ObjectId references for relationships (like foreign keys)",
      "$lookup joins collections in aggregation pipelines (like SQL LEFT JOIN)",
      "Denormalization (embedding) improves read performance",
      "Normalization (referencing) improves write performance and data consistency",
      "Design schema based on your application's access patterns",
      "Application-side joins are common — your code resolves references",
    ],
    task: `Practice using references and $lookup:
1. Find the first order and examine its userId reference
2. (Use aggregation) Lookup user data for orders
3. Find all orders by a specific user (userId: 1)
4. Count how many orders each user has placed`,
    starterQuery: `// References and $lookup
db.orders.findOne({})
`,
    solutionQuery: `// See the userId reference in orders
db.orders.findOne({})

// Find orders by user 1
db.orders.find({ userId: 1 })

// Count orders per user (using group in aggregation)
db.orders.aggregate([
  { $group: { _id: "$userId", orderCount: { $sum: 1 } } },
  { $sort: { orderCount: -1 } }
])`,
    hint: "• References use IDs to link documents\n• userId in orders references _id in users\n• $lookup joins data from another collection\n• Application often resolves references in code",
  },
  {
    id: "aggregation-framework",
    chapter: 10,
    title: "Aggregation Framework",
    level: "Intermediate",
    tags: ["Aggregation", "Pipeline", "$group", "$project"],
    database: "ecommerce",
    conceptExplanation: `The Aggregation Pipeline is MongoDB's most powerful data processing tool.

**Pipeline Stages:**
db.orders.aggregate([
  { $match: { status: "delivered" } },    // Filter documents
  { $group: {                               // Group documents
    _id: "$payment",
    totalRevenue: { $sum: "$total" },
    orderCount: { $sum: 1 }
  }},
  { $sort: { totalRevenue: -1 } }          // Sort results
])

**Key Stages:**
• $match — Filter documents (like find)
• $project — Reshape/select fields
• $group — Group by a field (like GROUP BY)
• $sort — Sort results
• $limit — Limit results
• $skip — Skip results
• $lookup — Join collections
• $unwind — Deconstruct arrays
• $facet — Multiple pipelines
• $bucket — Bucket documents

**Accumulators in $group:**
$sum, $avg, $min, $max, $first, $last, $push, $addToSet`,
    keyRules: [
      "Pipeline stages execute in order, each stage's output is the next stage's input",
      "Use $match early to reduce documents before $group",
      "$project can create computed fields with expressions",
      "$unwind deconstructs arrays into multiple documents",
      "$lookup performs left-outer join with another collection",
      "$facet runs multiple sub-pipelines on the same input",
    ],
    task: `Practice the aggregation framework:
1. Group orders by payment type and count them
2. Calculate total revenue for each payment method
3. Find the average order value
4. Group products by category and calculate average price`,
    starterQuery: `// Aggregation pipeline
db.orders.aggregate([
  { $group: { _id: "$payment", count: { $sum: 1 } } }
])
`,
    solutionQuery: `// Orders by payment type
db.orders.aggregate([
  { $group: { _id: "$payment", count: { $sum: 1 } } }
])

// Revenue by payment
db.orders.aggregate([
  { $group: { _id: "$payment", totalRevenue: { $sum: "$total" } } }
])

// Average order value
db.orders.aggregate([
  { $group: { _id: null, avgValue: { $avg: "$total" } } }
])

// Products: avg price by category
db.products.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } }
])`,
    hint: "• Pipeline: [{stage1}, {stage2}, ...]\n• $group: { _id: \"$field\", acc: { $sum: 1 } }\n• _id: null groups all documents\n• Use $match before $group for efficient pipelines",
  },
  {
    id: "indexes",
    chapter: 11,
    title: "Indexes",
    level: "Intermediate",
    tags: ["Indexes", "Performance", "Query Optimization"],
    database: "ecommerce",
    conceptExplanation: `**What are Indexes?**
Indexes are special data structures that store a small portion of the collection's data in an easy-to-traverse form. They dramatically improve query performance by reducing the number of documents MongoDB must scan.

**Without Index:** Collection scan — MongoDB scans every document
**With Index:** Index scan — MongoDB scans only the indexed values

**Types of Indexes:**
• Single Field Index — Index on a single field: db.collection.createIndex({ field: 1 })
• Compound Index — Index on multiple fields: db.collection.createIndex({ field1: 1, field2: -1 })
• Multikey Index — Index on array fields (created automatically)
• Text Index — Full-text search: db.collection.createIndex({ field: "text" })
• Hashed Index — For sharding and equality queries
• Geospatial Index — For location-based queries
• TTL Index — Auto-expire documents after a timeout

**Index Properties:**
• Unique Index — Ensures field uniqueness
• Sparse Index — Only indexes documents with the field
• Partial Index — Indexes only documents matching a filter expression

**Real-World Usage:**
• Speeding up login: Index on email field
• Product search: Compound index on (category, price)
• Date-range queries: Index on createdAt field
• Sorting large datasets: Index on sort fields`,
    keyRules: [
      "Indexes speed up reads but slow down writes (trade-off)",
      "Create indexes on fields used in filter, sort, and join conditions",
      "Compound indexes support prefix matching (field1, then field1+field2)",
      'Use .explain("executionStats") to analyze query performance',
      "Too many indexes hurt write performance and increase storage",
      "The _id field is indexed by default",
    ],
    task: `Learn about indexes:
1. Understand which fields in our sample data are indexed
2. Query users by email (indexed) and compare with query by name (unindexed)
3. Find products sorted by price — an indexed sort
4. Query orders by status — understand when an index helps`,
    starterQuery: `// Explore indexes
db.products.find({ price: { $gt: 50 } }).sort({ price: 1 })
`,
    solutionQuery: `// Find by email (indexed in our sample)
db.users.find({ email: "alice@example.com" })

// Sort by price (indexed in our sample)
db.products.find({}).sort({ price: -1 }).limit(5)

// Filter by status (indexed in our sample)
db.orders.find({ status: "delivered" })

// Compound query — category + price sort
db.products.find({ category: "Electronics" }).sort({ price: 1 })`,
    hint: "• Check indexes array in collection explorer to see which fields are indexed\n• Indexed fields: _id, email, name, category, price, userId, status, username, tags\n• Use sort() on indexed fields for best performance\n• Compound indexes work best when filter fields are prefixes of the sort fields",
  },
  {
    id: "schema-design-patterns",
    chapter: 12,
    title: "Schema Design Patterns",
    level: "Advanced",
    tags: ["Schema Design", "Data Modeling", "Patterns"],
    database: "ecommerce",
    conceptExplanation: `MongoDB Schema Design is the most critical skill for building performant applications. Unlike SQL where schema is predefined, MongoDB gives you the flexibility to model data based on access patterns.

**Key Design Principles:**
1. Data that is accessed together should be stored together
2. Design schema based on application access patterns, not data structure
3. Prefer embedding unless there's a compelling reason to reference

**Common Patterns:**

**1. Embedded Pattern (One-to-Few):**
  Embed related data directly in the parent document.
  Best for: Addresses, profile details, small arrays of related items.

**2. Referenced Pattern (One-to-Many / Many-to-Many):**
  Store references (IDs) to related documents.
  Best for: Orders by a user, products in a category.

**3. Bucket Pattern:**
  Group related data into time-based or size-based buckets.
  Best for: IoT sensor readings, logs, time-series data.

**4. Outlier Pattern:**
  Handle exceptional cases separately to avoid bloating normal documents.
  Best for: Social media power users, abnormal data volumes.

**5. Computed Pattern:**
  Pre-compute and store derived values (totals, counts, averages).
  Best for: Frequent aggregations, dashboard metrics.

**6. Polymorphic Pattern:**
  Documents with different fields stored in the same collection.
  Best for: Content management, product catalogs with varying attributes.

**Decision Flowchart:**
Is the related data frequently read together? → Embed
Is the related data growing unboundedly? → Reference
Do you need atomic updates on related data? → Embed
Is the relationship many-to-many? → Reference with arrays on both sides`,
    keyRules: [
      "Embedding is MongoDB's superpower — use it by default",
      "Avoid unbounded arrays that grow without limit (use pagination instead)",
      "The 16MB document size limit constrains embedding choices",
      "Access patterns should drive schema design decisions",
      "Use the Bucket Pattern for time-series data",
      "The Computed Pattern reduces expensive aggregation queries",
    ],
    task: `Analyze schema design patterns in our sample data:
1. Examine the embedding in orders.items (embedded pattern)
2. Examine the referencing between orders and users (referenced pattern)
3. Consider how the products collection uses polymorphic patterns (different categories have different relevant fields)
4. Use aggregation to compute order statistics (computed pattern)`,
    starterQuery: `// Examine embedded documents in orders
db.orders.findOne({ _id: 1 })
`,
    solutionQuery: `// Embedded: orders contain items array
db.orders.findOne({ _id: 1 })

// Referenced: orders reference users via userId
db.orders.find({ userId: 1 })

// Computed pattern: pre-aggregate order stats by user
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$total" }, orderCount: { $sum: 1 } } },
  { $sort: { totalSpent: -1 } }
])

// Check a product with its attributes (polymorphic-like)
db.products.findOne({ _id: 1 })`,
    hint: "• Embedded: orders.items shows products within each order\n• References: userId in orders links to _id in users\n• The Bucket Pattern groups documents into ranges\n• The Outlier Pattern is useful when 80% of documents fit one schema and 20% have extra fields",
  },
  {
    id: "performance-optimization",
    chapter: 13,
    title: "Performance Optimization",
    level: "Advanced",
    tags: ["Performance", "Optimization", "Query Tuning"],
    database: "ecommerce",
    conceptExplanation: `Performance optimization in MongoDB involves multiple dimensions: query optimization, indexing strategies, schema design, and hardware/resource management.

**1. Query Optimization:**
• Use .explain("executionStats") to analyze queries
• Check for COLLSCAN (collection scan) vs IXSCAN (index scan)
• Limit results with .limit() and use projections
• Avoid negative operators ($ne, $nin, $not) which are slow

**2. Indexing Strategies:**
• ESR Rule — Equality, Sort, Range (order fields in compound index)
• Equality fields first, then sort fields, then range fields
• Covered queries — all data comes from index (no document fetch)
• Use sparse indexes for fields that don't exist in all documents

**3. Aggregation Optimization:**
• Place $match and $limit as early as possible in the pipeline
• Use $project to reduce document size before $group
• Pre-aggregate with materialized views for frequent reports

**4. Write Performance:**
• Use bulk writes (insertMany, bulkWrite) instead of individual operations
• Consider write concern and journaling settings
• Shard collections that exceed 100GB or 100,000 ops/second

**5. Monitoring:**
• Use mongostat and mongotop for real-time metrics
• Monitor key metrics: page faults, disk I/O, connections, operation latency
• Set up the MongoDB Profiler to capture slow queries (> 100ms)`,
    keyRules: [
      "Always check .explain() before optimizing — guesswork is costly",
      "ESR Rule: Equality fields first, Sort fields second, Range fields last in compound indexes",
      "Covered queries are the fastest — all needed data comes from the index",
      "Batch writes for throughput — use bulkWrite() or insertMany()",
      "$match and $limit early in aggregation pipelines reduce processing",
      "Profile only slow queries to avoid performance overhead from profiling itself",
    ],
    task: `Practice performance optimization techniques:
1. Write a query that filters and sorts — practice query structure for performance
2. Use projection to limit returned fields
3. Chain $match and $sort in aggregation pipeline efficiently
4. Compare querying with filter only vs filter + projection`,
    starterQuery: `// Performance-optimized query
db.products.find({ category: "Electronics" }, { name: 1, price: 1 }).sort({ price: 1 })
`,
    solutionQuery: `// Efficient query: filter on indexed field, project needed fields, sort on indexed field
db.products.find({ category: "Electronics" }, { name: 1, price: 1, _id: 0 }).sort({ price: 1 })

// Limit results to reduce processing
db.orders.find({ status: "delivered" }, { _id: 0, userId: 1, total: 1, date: 1 }).sort({ total: -1 }).limit(5)

// Efficient aggregation: $match first, then $group, then $sort
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: "$payment", total: { $sum: "$total" } } },
  { $sort: { total: -1 } }
])

// Select only necessary fields with projection
db.users.find({ isActive: true }, { name: 1, city: 1, _id: 0 })`,
    hint: "• Filter early, project early — fewer fields processed = faster queries\n• Use limit() to cap result sets\n• In aggregation, put $match before $group\n• Query only the fields you need — don't use projection: {} unless you need all fields",
  },
  {
    id: "change-streams",
    chapter: 14,
    title: "Change Streams",
    level: "Advanced",
    tags: ["Change Streams", "Real-time", "Events", "CDC"],
    database: "ecommerce",
    conceptExplanation: `Change Streams allow applications to subscribe to real-time data changes in MongoDB. They provide a way to react to insert, update, delete, and replace operations as they happen.

**How Change Streams Work:**
• Based on the oplog (operations log)
• Open a cursor that watches for changes
• Receive change events in real-time (or near real-time)
• Can filter by operation type, document key, or custom pipeline

**Basic Usage:**
const changeStream = db.collection.watch([
  { $match: { "fullDocument.isActive": true } }
]);
changeStream.on("change", (change) => {
  console.log(change);
});

**Change Event Document:**
{
  operationType: "insert", // insert, update, replace, delete, invalidate
  fullDocument: { ... },
  documentKey: { _id: ObjectId(...) },
  ns: { db: "ecommerce", coll: "orders" },
  clusterTime: Timestamp(...)
}

**Use Cases:**
• Real-time dashboards and analytics
• Cache invalidation
• Cross-service data synchronization
• Audit logging
• Search index updates (e.g., sync to Elasticsearch)
• Sending notifications to users

**Resilience:**
• Resume tokens allow recovery after disconnection
• Can watch at collection, database, or deployment level
• Change streams are persistent and ordered`,
    keyRules: [
      "Change streams are built on the oplog — they require a replica set",
      "Use $match and $project pipeline filters to reduce event volume",
      "Resume tokens allow crashing consumers to pick up where they left off",
      "Change events include a resumeToken for checkpointing",
      "Operations on un-sharded collections are ordered; cross-shard ordering is not guaranteed",
      "Useful for event-driven architectures and CQRS patterns",
    ],
    task: `Learn about change streams conceptually:
1. Understand what operations generate change events
2. List the types of operations that can be watched
3. Think about real-time features that could be built with change streams
4. Read about the resume token mechanism`,
    starterQuery: `// Change streams are a server-side feature.
// In a real MongoDB deployment, you would run:
// db.orders.watch([{ $match: { operationType: "insert" } }])
// Below, simulate an insert and then query the collection
db.orders.findOne({ _id: 1 })
`,
    solutionQuery: `// See the current state of orders — imagine change streams
// would notify us in real-time when new orders come in

// Check the most recent orders (as if watching for inserts)
db.orders.find({}).sort({ date: -1 }).limit(3)

// Watch for active user changes (conceptual — would use change stream pipeline)
db.users.find({ isActive: true }).sort({ name: 1 })

// Audit log simulation — find all changes to user 1's orders
db.orders.find({ userId: 1 }).sort({ date: -1 })`,
    hint: "• Change streams require a replica set (not standalone)\n• Operation types: insert, update, replace, delete, drop, rename, invalidate\n• Use $match and $project in the watch pipeline to filter events\n• Resume tokens are BSON documents that track position in the oplog",
  },
  {
    id: "mongodb-atlas",
    chapter: 15,
    title: "MongoDB Atlas",
    level: "Intermediate",
    tags: ["Atlas", "Cloud", "Managed Service", "Deployment"],
    database: "ecommerce",
    conceptExplanation: `MongoDB Atlas is the official fully-managed cloud database service for MongoDB. It handles deployment, scaling, backups, monitoring, and security.

**Key Features:**

**1. Global Clusters:**
• Deploy across multiple cloud providers (AWS, Azure, GCP)
• Multi-region replication for low-latency global access
• Automatic failover and high availability

**2. Tier Options:**
• M0 (Free Tier) — 512MB storage, shared RAM (ideal for learning)
• M2/M5 — Shared clusters, good for small applications
• M10+ — Dedicated clusters for production workloads
• Serverless — Pay-per-use, auto-scaling to zero

**3. Built-in Tools:**
• Atlas Search — Full-text search powered by Lucene
• Atlas Data Lake — Query across S3, Azure Blob, and Atlas
• Atlas Charts — Visualize data without exporting
• Atlas Triggers — Serverless functions triggered by DB events
• Realm SDK — Mobile sync and device sync

**4. Security:**
• IP whitelisting and VPC peering
• Encryption at rest and in transit
• PrivateLink for private connectivity
• Database auditing and advanced threat detection

**5. Operational Excellence:**
• Automated backups with point-in-time recovery
• Performance Advisor — recommends indexes based on query patterns
• Real-time performance monitoring and alerts
• Online archive — automatically move cold data to cheaper storage

**Atlas vs Self-Managed:**
Atlas handles: provisioning, patching, backups, scaling, monitoring
Self-managed: full control, lower cost at scale, requires DevOps expertise`,
    keyRules: [
      "Atlas Free Tier (M0) is perfect for learning — 512MB forever free",
      "Atlas supports multi-cloud and multi-region deployments for high availability",
      "Use Atlas Search for full-text search capabilities built-in",
      "Performance Advisor proactively recommends index improvements",
      "Serverless instances are ideal for variable or unpredictable workloads",
      "Atlas Data Federation allows querying data across multiple sources",
    ],
    task: `Learn about MongoDB Atlas features:
1. Understand the different Atlas cluster tiers
2. Explore what tools Atlas provides beyond hosting
3. Learn about Atlas Search vs regular MongoDB queries
4. Understand the security features available`,
    starterQuery: `// Think of Atlas as the cloud platform for MongoDB.
// The same queries work on Atlas — your skills transfer directly.
// Practice with our local dataset.

db.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 }, total: { $sum: "$total" } } }
])
`,
    solutionQuery: `// Atlas supports all MongoDB queries. These queries work on Atlas too:

// Find popular products (analytics dashboard) — Atlas Charts can visualize this
db.products.find({}).sort({ rating: -1 }).limit(5)

// Customer order history — Atlas Search could index this for full-text
db.orders.aggregate([
  { $group: { _id: "$userId", orders: { $push: "$_id" }, totalSpent: { $sum: "$total" } } },
  { $sort: { totalSpent: -1 } }
])

// Real-time aggregation — Atlas Triggers could run this on data changes
db.orders.aggregate([
  { $match: { date: { $gte: new Date("2024-04-01") } } },
  { $group: { _id: "$payment", total: { $sum: "$total" } } }
])`,
    hint: "• Atlas Free Tier (M0) supports all the queries you've practiced here\n• Atlas Search adds Lucene-based full-text search capabilities\n• Atlas Charts can visualize query results without exporting data\n• Use Atlas Triggers to run serverless functions on database events",
  },
  {
    id: "transactions",
    chapter: 16,
    title: "Transactions",
    level: "Advanced",
    tags: ["Transactions", "ACID", "Atomicity", "Multi-document"],
    database: "ecommerce",
    conceptExplanation: `MongoDB supports multi-document ACID transactions, allowing you to perform multiple operations atomically across collections and documents.

**ACID Properties:**
• **Atomicity** — All operations succeed or all fail (no partial updates)
• **Consistency** — Data is always in a valid state
• **Isolation** — Concurrent transactions don't interfere
• **Durability** — Committed data survives failures

**When to Use Transactions:**
• Financial transfers (debit one account, credit another)
• Order processing (reserve inventory, create order, charge payment)
• Multi-collection updates that must be atomic
• Maintaining referential integrity across collections

**Transaction Syntax:**
const session = client.startSession();
try {
  session.startTransaction();
  await db.orders.insertOne(order, { session });
  await db.products.updateOne(
    { _id: productId },
    { $inc: { stock: -1 } },
    { session }
  );
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}

**Transaction Options:**
• readConcern — Level of read isolation
• writeConcern — Level of write durability
• readPreference — Primary or secondary reads
• maxCommitTimeMS — Maximum time for commit

**Key Considerations:**
• Transactions have a 60-second default timeout
• Maximum transaction size: 16MB of oplog entries
• WiredTiger storage engine required
• Avoid long-running transactions (keep them short)
• Not a replacement for good schema design — embedding is still preferred when possible`,
    keyRules: [
      "Transactions provide ACID guarantees across multiple documents and collections",
      "Use transactions for financial operations and critical data consistency",
      "Keep transactions short and focused — long transactions hurt performance",
      "Transactions require replica sets (available from MongoDB 4.0+)",
      "Not every multi-operation scenario needs a transaction — embedding is often sufficient",
      "Retry transaction logic on TransientTransactionError for robustness",
    ],
    task: `Learn about transaction scenarios:
1. Simulate an order creation that would use a transaction
2. Find a user and their orders — understand multi-collection relationships
3. Check inventory for a product — imagine checking stock before creating order
4. Understand how embedded documents reduce the need for transactions`,
    starterQuery: `// Transactions in MongoDB require a replica set.
// Here we simulate the operations that would be inside a transaction:

// 1. Check product stock
db.products.findOne({ _id: 1 }, { name: 1, stock: 1 })
`,
    solutionQuery: `// Step 1: Check product availability (in a real transaction, done atomically)
db.products.findOne({ _id: 1 }, { name: 1, stock: 1, price: 1 })

// Step 2: Check user exists (verification before order creation)
db.users.findOne({ _id: 1 })

// Step 3: View user's order history (all existing orders for this user)
db.orders.find({ userId: 1 }).sort({ date: -1 })

// Step 4: See how embedded items reduce need for transactions
// Order contains items array — the order and its items are one atomic write
db.orders.findOne({ _id: 1 })

// Step 5: View all orders and statuses — imagine updating status atomically
db.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 }, total: { $sum: "$total" } } }
])`,
    hint: "• Transactions wrap multiple operations in a session: session.startTransaction() / session.commitTransaction()\n• Use $inc for atomic stock updates (decrement on purchase)\n• Embedded documents in orders.items reduce the need for transactions\n• WiredTiger storage engine is required for transactions (default in MongoDB 3.2+)",
  },
];

export const MONGO_CHALLENGES = [
  { id: "ch-find-users", title: "1. Find Active Users", difficulty: "Easy", tags: ["find", "filter"], database: "ecommerce", problem: "Find all active users (isActive: true) and return only their name, email, and city.", starterQuery: "db.users.find({ isActive: true }, { name: 1, email: 1, city: 1 })", solution: "db.users.find({ isActive: true }, { name: 1, email: 1, city: 1 })", hint: "Use find() with a filter object" },
  { id: "ch-product-search", title: "2. Product Price Search", difficulty: "Easy", tags: ["find", "$gt", "$lt"], database: "ecommerce", problem: "Find products with price between $20 and $100.", starterQuery: "db.products.find({ price: { $gte: 20, $lte: 100 } }, { name: 1, price: 1, category: 1 })", solution: "db.products.find({ price: { $gte: 20, $lte: 100 } }, { name: 1, price: 1, category: 1 })", hint: "Use $gte and $lte" },
  { id: "ch-order-analytics", title: "3. Order Analytics", difficulty: "Medium", tags: ["aggregate", "$group"], database: "ecommerce", problem: "Calculate total revenue by order status.", starterQuery: "db.orders.aggregate([{ $group: { _id: \"$status\", totalRevenue: { $sum: \"$total\" } } }, { $sort: { totalRevenue: -1 } }])", solution: "db.orders.aggregate([{ $group: { _id: \"$status\", totalRevenue: { $sum: \"$total\" } } }, { $sort: { totalRevenue: -1 } }])", hint: "Use $group with $sum" },
  { id: "ch-user-activity", title: "4. User Activity", difficulty: "Medium", tags: ["aggregate", "$group"], database: "ecommerce", problem: "Find top 3 users by order count.", starterQuery: "db.orders.aggregate([{ $group: { _id: \"$userId\", orderCount: { $sum: 1 } } }, { $sort: { orderCount: -1 } }, { $limit: 3 }])", solution: "db.orders.aggregate([{ $group: { _id: \"$userId\", orderCount: { $sum: 1 } } }, { $sort: { orderCount: -1 } }, { $limit: 3 }])", hint: "Group by userId" },
  { id: "ch-inventory", title: "5. Inventory Management", difficulty: "Medium", tags: ["find", "$or", "$lt"], database: "ecommerce", problem: "Find low stock (< 30) OR Electronics products.", starterQuery: "db.products.find({ $or: [{ stock: { $lt: 30 } }, { category: \"Electronics\" }] }, { name: 1, category: 1, stock: 1 })", solution: "db.products.find({ $or: [{ stock: { $lt: 30 } }, { category: \"Electronics\" }] }, { name: 1, category: 1, stock: 1 })", hint: "Use $or" },
  { id: "ch-sales-report", title: "6. Sales Report", difficulty: "Hard", tags: ["aggregate", "$match", "$group"], database: "ecommerce", problem: "Calculate avg order value by payment for delivered orders.", starterQuery: "db.orders.aggregate([{ $match: { status: \"delivered\" } }, { $group: { _id: \"$payment\", avgValue: { $avg: \"$total\" }, count: { $sum: 1 } } }])", solution: "db.orders.aggregate([{ $match: { status: \"delivered\" } }, { $group: { _id: \"$payment\", avgValue: { $avg: \"$total\" }, count: { $sum: 1 } } }])", hint: "$match before $group" },
  { id: "ch-social-feed", title: "7. Social Feed", difficulty: "Medium", tags: ["find", "sort"], database: "social", problem: "Top 5 posts by most likes.", starterQuery: "db.posts.find({}).sort({ likes: -1 }).limit(5)", solution: "db.posts.find({}).sort({ likes: -1 }).limit(5)", hint: "Sort by likes descending" },
  { id: "ch-segmentation", title: "8. Customer Segmentation", difficulty: "Hard", tags: ["aggregate", "$bucket"], database: "ecommerce", problem: "Segment users by age groups: 20-29, 30-39, 40-49, 50+.", starterQuery: "db.users.aggregate([{ $bucket: { groupBy: \"$age\", boundaries: [20, 30, 40, 50, 100], default: \"Other\", output: { count: { $sum: 1 } } } }])", solution: "db.users.aggregate([{ $bucket: { groupBy: \"$age\", boundaries: [20, 30, 40, 50, 100], default: \"Other\", output: { count: { $sum: 1 } } } }])", hint: "Use $bucket" },
];

export const MONGO_PROJECTS = [
  {
    id: "project-ecommerce",
    title: "E-Commerce Backend",
    description: "Build a complete e-commerce database with users, products, and orders.",
    difficulty: "Intermediate",
    icon: "🛒",
    database: "ecommerce",
    milestones: [{ id: "m1", title: "Explore Collections" }, { id: "m2", title: "Query Active Users" }],
  },
  {
    id: "project-social",
    title: "Social Media Platform",
    description: "Design a social media database with users, posts, and engagement.",
    difficulty: "Intermediate",
    icon: "📱",
    database: "social",
    milestones: [{ id: "sm1", title: "Explore Social Data" }, { id: "sm2", title: "Popular Content" }],
  },
  {
    id: "project-analytics",
    title: "Analytics Dashboard",
    description: "Create a data analytics database for business metrics.",
    difficulty: "Advanced",
    icon: "📊",
    database: "ecommerce",
    milestones: [{ id: "a1", title: "Revenue by Category" }, { id: "a2", title: "Customer Segmentation" }],
  },
  {
    id: "project-blogging",
    title: "Blogging System",
    description: "Build a blogging platform database.",
    difficulty: "Advanced",
    icon: "📝",
    database: "ecommerce",
    milestones: [{ id: "b1", title: "Data Exploration" }, { id: "b2", title: "Analytics" }],
  },
  {
    id: "project-crm",
    title: "CRM System",
    description: "Design a customer relationship management database.",
    difficulty: "Intermediate",
    icon: "🤝",
    database: "ecommerce",
    milestones: [{ id: "c1", title: "Customer Overview" }, { id: "c2", title: "Order Analysis" }],
  },
  {
    id: "project-chat",
    title: "Chat Application",
    description: "Build a real-time chat database.",
    difficulty: "Advanced",
    icon: "💬",
    database: "social",
    milestones: [{ id: "ch1", title: "User Directory" }, { id: "ch2", title: "Content Analysis" }],
  },
];

// ═══════════════════════════════════════════════════
//  MONGODB INTERVIEW QUESTIONS
//  Topics: Basics, CRUD, Indexes, Aggregation, Schema Design,
//  Transactions, Replication, Sharding, Atlas
//  Companies: Amazon, Google, Meta, Microsoft, Uber, Netflix
// ═══════════════════════════════════════════════════

export const MONGO_INTERVIEW_CATEGORIES = [
  { id: "basics", title: "MongoDB Basics & CRUD", icon: "📘", description: "Fundamental MongoDB concepts — documents, collections, CRUD operations, query operators, and data types." },
  { id: "indexes", title: "Indexes & Performance", icon: "⚡", description: "Index types, query optimization, explain plans, covered queries, and the ESR rule." },
  { id: "aggregation", title: "Aggregation Framework", icon: "🔗", description: "Pipeline stages, accumulators, $lookup, $unwind, $facet, $bucket, and window functions." },
  { id: "schema-design", title: "Schema Design & Modeling", icon: "🏗️", description: "Embedding vs referencing, design patterns, polymorphic schemas, and data modeling." },
  { id: "transactions", title: "Transactions & ACID", icon: "🛡️", description: "Multi-document ACID transactions, session management, and concurrency control." },
  { id: "replication", title: "Replication & HA", icon: "🔄", description: "Replica sets, oplog, read/write concerns, election processes, and high availability." },
  { id: "sharding", title: "Sharding & Scalability", icon: "📊", description: "Horizontal scaling, shard keys, chunk distribution, and cluster architecture." },
  { id: "atlas", title: "MongoDB Atlas & Cloud", icon: "☁️", description: "Atlas features, cluster tiers, Search, Charts, Triggers, Data Federation, and security." },
];

export const MONGO_INTERVIEW_QUESTIONS = [
  // ─── Basics & CRUD ───
  { id: "iq-basics-1", category: "basics", company: null, difficulty: "Easy", question: "What is MongoDB and how does it differ from traditional SQL databases?", answer: "MongoDB is a NoSQL document database that stores data in JSON-like BSON documents. Unlike SQL databases with rigid table schemas, MongoDB has a flexible schema model where documents in the same collection can have different fields. MongoDB uses collections instead of tables and documents instead of rows. It supports horizontal scaling through sharding, built-in replication for high availability, and a rich query language including CRUD operations, aggregation pipelines, and geospatial queries." },
  { id: "iq-basics-2", category: "basics", company: null, difficulty: "Easy", question: "Explain the difference between MongoDB and MySQL.", answer: "MongoDB is a document-based NoSQL database while MySQL is a relational SQL database. Key differences: (1) MongoDB stores documents in BSON format vs MySQL stores rows in tables; (2) MongoDB has dynamic schemas vs MySQL has fixed schemas; (3) MongoDB supports embedded documents and arrays natively vs MySQL requires JOINs; (4) MongoDB scales horizontally via sharding vs MySQL primarily scales vertically; (5) MongoDB uses eventual consistency for some operations vs MySQL provides strong ACID guarantees; (6) MongoDB is better for hierarchical data storage and rapid application development." },
  { id: "iq-basics-3", category: "basics", company: "Amazon", difficulty: "Easy", question: "What is a document in MongoDB? How is it different from a row in SQL?", answer: "A document in MongoDB is a JSON-like BSON object containing key-value pairs. It is analogous to a row in SQL but with key differences: (1) Documents can have nested objects and arrays while SQL rows have flat columns; (2) Documents in the same collection can have different fields while SQL rows all share the same columns; (3) Documents support rich data types including dates, binary data, and ObjectIds; (4) Documents have a maximum size of 16MB; (5) Documents are stored in BSON format for efficient traversal." },
  { id: "iq-basics-4", category: "basics", company: null, difficulty: "Easy", question: "What are the different CRUD operations in MongoDB?", answer: "MongoDB CRUD operations: Create — insertOne(), insertMany(); Read — find(), findOne(); Update — updateOne(), updateMany(), replaceOne(); Delete — deleteOne(), deleteMany(). Each operation takes a filter document as the first argument to specify which documents to affect. Update operations use update operators like $set, $unset, $inc, $push, $pull. All write operations support ordered and unordered bulk writes for performance." },
  { id: "iq-basics-5", category: "basics", company: "Google", difficulty: "Easy", question: "What is the _id field in MongoDB and how is it generated?", answer: "The _id field is the primary key for every MongoDB document. It must be unique within a collection. If not provided during insertion, MongoDB automatically generates an ObjectId value. An ObjectId is a 12-byte value: 4 bytes for the timestamp (creation time), 5 bytes for a random value (machine ID + process ID + counter), and 3 bytes for an auto-incrementing counter. ObjectIds are generated client-side by the driver, allowing distributed generation without collisions. You can also use UUIDs or custom unique values as _id." },
  { id: "iq-basics-6", category: "basics", company: "Meta", difficulty: "Medium", question: "How do you handle relationships in MongoDB? Explain embedding vs referencing.", answer: "MongoDB handles relationships through embedding and referencing. Embedding stores related data directly within a document. Best for one-to-one and one-to-few relationships where data is frequently read together (e.g., order with order items). Referencing stores IDs pointing to related documents. Best for one-to-many and many-to-many relationships (e.g., user with many orders). Embedding provides faster reads (single query), atomic updates, but has a 16MB document limit and can cause data duplication. Referencing provides data consistency, smaller documents, but requires application-side joins or $lookup aggregation." },

  // ─── Indexes & Performance ───
  { id: "iq-indexes-1", category: "indexes", company: null, difficulty: "Easy", question: "What are indexes in MongoDB and why are they important?", answer: "Indexes are special data structures that store a small portion of the collection's data in an efficient traversal format. They dramatically improve query performance by reducing the number of documents MongoDB must scan (IXSCAN vs COLLSCAN). Without indexes, MongoDB must perform a collection scan, examining every document. Indexes use a B-tree data structure for efficient lookups. Types include single field, compound, multikey, text, geospatial, hashed, and TTL indexes. However, indexes slow down write operations and consume storage." },
  { id: "iq-indexes-2", category: "indexes", company: null, difficulty: "Medium", question: "What is the ESR rule for compound indexes?", answer: "The ESR rule guides the order of fields in compound indexes: Equality fields first, Sort fields second, Range fields last. Equality fields — fields that use exact matches (=). These benefit from being first because they narrow down results quickly. Sort fields — fields used in sort(). Placing them before range fields allows MongoDB to return sorted results without an in-memory sort. Range fields — fields using range queries ($gt, $lt, $gte, $lte). Placing them last allows the index to efficiently scan the range. Example: db.collection.createIndex({ status: 1, date: -1, amount: 1 }) for queries like db.orders.find({ status: 'active' }).sort({ date: -1 }).limit(10)." },
  { id: "iq-indexes-3", category: "indexes", company: "Amazon", difficulty: "Medium", question: "How does MongoDB choose which index to use for a query?", answer: "MongoDB's query planner evaluates multiple candidate indexes using the following process: (1) The planner creates multiple query plans using different indexes; (2) It runs a trial period where plans compete for a few work cycles; (3) The plan that returns results fastest wins and is cached for subsequent queries; (4) Index selection considers selectivity (how well the index filters documents), sort avoidance (whether the index can provide sorted results), and covered query potential (whether all needed fields exist in the index). Use .explain('executionStats') to see which index was selected." },
  { id: "iq-indexes-4", category: "indexes", company: "Google", difficulty: "Hard", question: "What is a covered query in MongoDB?", answer: "A covered query is one where all the fields required by the query (filter, projection, sort) are present in the index itself. MongoDB can satisfy the query entirely from the index without reading any documents. This is the fastest query type because it avoids document fetches (no IO). Requirements: (1) All fields in the query filter must be in the index; (2) All fields in the projection must be in the index; (3) All fields in the sort must be in the index; (4) If querying on _id, it must also be in the index. Use .explain() and look for 'IXSCAN' without 'FETCH' stage." },
  { id: "iq-indexes-5", category: "indexes", company: null, difficulty: "Medium", question: "What is the difference between single field, compound, and multikey indexes?", answer: "Single field index — indexes a single field, used for simple queries and sorts. Compound index — indexes multiple fields in a specified order, supports queries on any prefix of the indexed fields (e.g., index on {a:1, b:1} supports queries on 'a' alone and 'a' + 'b' but not 'b' alone). Multikey index — automatically created when indexing an array field; MongoDB indexes each element of the array separately, allowing efficient queries on array contents. A compound index can have at most one multikey index (you can't have two array fields in one compound index)." },

  // ─── Aggregation ───
  { id: "iq-agg-1", category: "aggregation", company: null, difficulty: "Medium", question: "What is the MongoDB Aggregation Pipeline and how does it work?", answer: "The Aggregation Pipeline is MongoDB's data processing framework. Documents pass through a series of stages where each stage transforms the data. Stages are processed sequentially, and the output of one stage becomes the input to the next. Key stages include: $match (filter), $project (reshape), $group (aggregate), $sort (order), $limit (cap), $skip (page), $lookup (join), $unwind (deconstruct arrays), $facet (multi-faceted search), $bucket (categorize), $addFields (compute new fields), $count (count), $setWindowFields (window functions). The pipeline supports accumulators like $sum, $avg, $min, $max, $push, $addToSet." },
  { id: "iq-agg-2", category: "aggregation", company: "Meta", difficulty: "Medium", question: "Explain $lookup in MongoDB aggregation. How is it similar to SQL JOIN?", answer: "$lookup performs a left outer join between two collections, similar to SQL LEFT JOIN. Syntax: { $lookup: { from: 'orders', localField: '_id', foreignField: 'userId', as: 'userOrders' } }. It matches documents where the localField in the input collection equals the foreignField in the 'from' collection, and adds the matching documents as an array to the 'as' field. Unlike SQL JOINs, $lookup does not flatten the results — matched documents are nested as an array. For a single matching document, use $unwind after $lookup to flatten. $lookup can be slow on large collections, so ensure indexes exist on both localField and foreignField." },
  { id: "iq-agg-3", category: "aggregation", company: "Uber", difficulty: "Hard", question: "How would you calculate the total revenue per user for the last 30 days using aggregation?", answer: "Pipeline: (1) $match — filter orders from the last 30 days; (2) $group — group by userId, sum the totals; (3) $lookup — join with users collection to get user details; (4) $unwind — flatten the user array; (5) $project — shape the output. Query: db.orders.aggregate([{ $match: { date: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } }, { $group: { _id: '$userId', totalRevenue: { $sum: '$total' }, orderCount: { $sum: 1 } } }, { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } }, { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }, { $project: { userId: '$_id', userName: '$user.name', totalRevenue: 1, orderCount: 1 } }, { $sort: { totalRevenue: -1 } }])" },
  { id: "iq-agg-4", category: "aggregation", company: null, difficulty: "Medium", question: "What is the difference between $project and $addFields in aggregation?", answer: "$project controls which fields are included or excluded in the output document. It can include fields (1), exclude fields (0), add computed fields, and rename fields. Only fields specified in $project are kept. $addFields adds new fields or modifies existing fields while keeping all original fields. If you want to add a computed field without removing existing fields, use $addFields. If you want to limit which fields are in the output, use $project. Both can use aggregation expressions for computed fields." },
  { id: "iq-agg-5", category: "aggregation", company: "Amazon", difficulty: "Hard", question: "How does $facet work and when would you use it?", answer: "$facet allows running multiple sub-pipelines on the same set of input documents simultaneously. Each sub-pipeline produces its own output array, and the results are combined into a single document with each facet as a field. Example: db.orders.aggregate([{ $facet: { byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }], byPayment: [{ $group: { _id: '$payment', total: { $sum: '$total' } } }], highValue: [{ $match: { total: { $gt: 500 } } }, { $count: 'count' }] } }]). Perfect for building dashboards that need multiple aggregations on the same data in a single pass." },

  // ─── Schema Design ───
  { id: "iq-schema-1", category: "schema-design", company: null, difficulty: "Easy", question: "What is the 16MB document size limit and how does it affect schema design?", answer: "MongoDB limits each document to 16MB. This constrains how much data you can embed in a single document. Design implications: (1) For one-to-few relationships (e.g., addresses, tags), embedding is fine; (2) For one-to-many relationships (e.g., orders by a user), use referencing if the array would grow large; (3) For time-series data, use the Bucket Pattern to group data into time-based documents under 16MB; (4) For large text content, use GridFS (which splits files into chunks stored as separate documents); (5) Monitor document growth for arrays that expand over time (like comments or likes)." },
  { id: "iq-schema-2", category: "schema-design", company: "Netflix", difficulty: "Medium", question: "How would you design a schema for a social media application with users, posts, comments, and likes?", answer: "Schema design: (1) Users collection — embed profile info, follower count as denormalized field; (2) Posts collection — embed content, author reference (userId), likes count (denormalized), comments count (denormalized); (3) Comments — could be embedded in posts if limited, or a separate comments collection referencing postId with pagination; (4) Likes — stored as an array of userIds in posts for small to medium engagement, or a separate likes collection for high-volume platforms. Key considerations: Denormalize counts to avoid expensive aggregation queries. Use references for unbounded arrays (comments can grow indefinitely). Create compound indexes on (postId, createdAt) for efficient comment retrieval." },
  { id: "iq-schema-3", category: "schema-design", company: null, difficulty: "Medium", question: "Explain the Bucket Pattern and when to use it.", answer: "The Bucket Pattern groups related data into time-based or size-based buckets. Instead of storing individual data points as separate documents, you store them in arrays within bucket documents. Example: For IoT sensor data, instead of one document per reading, create hourly buckets: { _id: 'sensor-1-2024-01-15-14', sensorId: 1, hour: ISODate('2024-01-15T14:00:00Z'), readings: [{ time: '14:01:00', value: 72.3 }, ...], avgValue: 71.8, minValue: 70.2, maxValue: 73.1, count: 120 }. Benefits: Reduces document count, improves index efficiency, enables pre-computed aggregations. Best for: Time-series data, logs, IoT readings, stock tick data." },

  // ─── Transactions ───
  { id: "iq-txn-1", category: "transactions", company: null, difficulty: "Medium", question: "Does MongoDB support ACID transactions? Explain.", answer: "Yes, MongoDB supports multi-document ACID transactions since version 4.0. ACID stands for: Atomicity — all operations in a transaction succeed or all fail; Consistency — data remains in a valid state; Isolation — transactions don't interfere with each other; Durability — committed data survives failures. MongoDB transactions work across multiple documents, collections, and databases within a replica set. Use sessions: const session = db.getMongo().startSession(); session.startTransaction(); then pass { session } to all operations. Commit with session.commitTransaction() or abort with session.abortTransaction(). Transactions have a 60-second default timeout and require the WiredTiger storage engine." },
  { id: "iq-txn-2", category: "transactions", company: null, difficulty: "Medium", question: "When should you use transactions vs when should you use embedded documents?", answer: "Use transactions when: (1) You need atomic multi-document updates across collections; (2) Performing financial operations (debit/credit); (3) Maintaining referential integrity across collections; (4) The operations cannot be modeled through embedding. Use embedding instead: (1) For one-to-few relationships where data is accessed together; (2) When the embedded data doesn't grow unboundedly; (3) When you need atomic updates on related data without transaction overhead; (4) For performance-critical paths (embedding is faster than transactions). Rule of thumb: Prefer embedding first. Only reach for transactions when embedding can't satisfy your consistency requirements." },

  // ─── Replication ───
  { id: "iq-repl-1", category: "replication", company: null, difficulty: "Medium", question: "How does MongoDB replication work? Explain replica sets.", answer: "Replication in MongoDB is implemented through replica sets. A replica set is a group of mongod instances that maintain the same data set. One node is the primary (accepts all writes), and the rest are secondaries (replicate data via oplog). If the primary fails, an election selects a new primary from the secondaries. Key features: (1) Automatic failover — if primary goes down, election happens in seconds; (2) Data redundancy — multiple copies prevent data loss; (3) Read scaling — secondaries can serve reads (with eventual consistency); (4) Maintenance — rolling upgrades with zero downtime; (5) A replica set needs at least 3 nodes or 2 nodes + an arbiter for majority voting." },
  { id: "iq-repl-2", category: "replication", company: "Microsoft", difficulty: "Medium", question: "What is the oplog in MongoDB and how does replication work?", answer: "The oplog (operations log) is a capped collection in the local database that records every write operation on the primary. Secondaries continuously copy and apply these operations to stay synchronized. Oplog details: (1) Each operation is idempotent (can be applied multiple times); (2) The oplog has a fixed size (default: 5% of free disk space, min 1GB, max 50GB); (3) Secondaries use the oplog to build their data set; (4) If a secondary falls too far behind (oplog entries are recycled), it must do a full resync; (5) Oplog entries are BSON documents containing operation type, namespace, document data, and timestamps. Monitor oplog window with rs.printReplicationInfo()." },

  // ─── Sharding ───
  { id: "iq-shard-1", category: "sharding", company: null, difficulty: "Hard", question: "What is sharding in MongoDB and how does it work?", answer: "Sharding is MongoDB's approach to horizontal scaling. It distributes data across multiple servers (shards), each holding a subset of the data. Components: (1) Shards — each shard is a replica set holding a portion of data; (2) Mongos — routing service that directs queries to the correct shard; (3) Config servers — store metadata about which data is on which shard. Data is distributed based on a shard key (a field or compound index). MongoDB uses chunk-based distribution where ranges of shard key values are grouped into chunks and balanced across shards. A good shard key has high cardinality, is evenly distributed, and supports common query patterns." },
  { id: "iq-shard-2", category: "sharding", company: "Uber", difficulty: "Hard", question: "How do you choose a good shard key? What makes a bad shard key?", answer: "A good shard key has: (1) High cardinality — many distinct values to distribute data evenly; (2) Even distribution — values are not clustered on a subset of shards; (3) Supports common query patterns — queries that include the shard key are targeted to specific shards (not broadcast to all). Bad shard key examples: (1) Monotonically increasing keys (like auto-increment IDs) — all new data goes to one shard; (2) Low-cardinality fields (like status with 3 values) — data can't split beyond 3 shards; (3) Fields that are never used in queries — forces broadcast operations. A common pattern is to use a hashed shard key for even distribution when you don't have a natural high-cardinality key." },

  // ─── Atlas ───
  { id: "iq-atlas-1", category: "atlas", company: null, difficulty: "Easy", question: "What is MongoDB Atlas and what features does it provide?", answer: "MongoDB Atlas is the official fully-managed cloud database service for MongoDB. Key features: (1) Multi-cloud support — deploy on AWS, Azure, GCP; (2) Global clusters — multi-region deployment for low latency; (3) Free Tier (M0) — 512MB forever free for learning; (4) Atlas Search — full-text search powered by Lucene; (5) Atlas Charts — data visualization without exporting; (6) Atlas Triggers — serverless functions triggered by database events; (7) Atlas Data Lake — query across S3, Azure Blob, and Atlas; (8) Performance Advisor — index recommendations; (9) Automated backups with PITR; (10) VPC peering and PrivateLink for security." },
  { id: "iq-atlas-2", category: "atlas", company: null, difficulty: "Medium", question: "What is Atlas Search and how is it different from regular MongoDB queries?", answer: "Atlas Search provides full-text search capabilities using the Lucene search engine (the same technology powering Elasticsearch). Differences from regular queries: (1) Full-text features — fuzzy matching, autocomplete, synonyms, stemming, relevance scoring; (2) Rich query types — compound queries, range, geo, wildcard; (3) Analyzers — language-specific text analysis, custom analyzers; (4) Indexing — creates Lucene indexes separate from MongoDB indexes; (5) Performance — optimized for text search and relevance ranking; (6) Integration — can combine with aggregation pipeline stages. Use $search stage in aggregation: db.collection.aggregate([{ $search: { text: { query: 'search term', path: 'field' } } }])." },

  // ─── Company-specific questions ───
  // Amazon
  { id: "iq-company-amazon-1", category: "basics", company: "Amazon", difficulty: "Medium", question: "How would you design a product catalog in MongoDB for Amazon-scale?", answer: "Product catalog schema: Use the Polymorphic Pattern since different product categories (electronics, books, clothing) have different attributes. Core product collection with common fields. Category-specific attributes via embedded documents or a flexible attributes map. Use embedding for variants (size, color). Indexes on name, category, price, tags. For search, use Atlas Search with custom analyzers. Consider denormalizing category names and popular ratings. Use a compound index on (category, price) for filtered product listing. Shard by category or productId depending on query patterns." },
  // Google
  { id: "iq-company-google-1", category: "indexes", company: "Google", difficulty: "Hard", question: "How would you optimize a MongoDB query that is running slow?", answer: "Optimization process: (1) Identify slow queries using db.system.profile or currentOp(); (2) Run .explain('executionStats') to check for COLLSCAN vs IXSCAN; (3) Check if the query uses appropriate indexes — create missing indexes following the ESR rule; (4) Look for in-memory sorts (SORT stage) — add index with sort field; (5) Check for large document fetches — use projection to limit fields; (6) For aggregation, move $match and $limit to the start; (7) Consider covered queries where all fields are in the index; (8) Check index usage with $indexStats; (9) Evaluate sharding if data exceeds 100GB; (10) Use $hint to force index selection if the query planner picks the wrong index." },
  // Meta
  { id: "iq-company-meta-1", category: "aggregation", company: "Meta", difficulty: "Hard", question: "How would you aggregate real-time engagement metrics for millions of social media posts?", answer: "For millions of posts per day: (1) Use pre-aggregation — maintain a materialized view collection with hourly engagement metrics (likes, shares, comments count); (2) Use $merge to update materialized views incrementally; (3) Use the Bucket Pattern to group engagement data into hourly buckets; (4) For real-time dashboards, use Change Streams to update cached metrics; (5) Create compound indexes on (postId, createdAt) and (userId, createdAt); (6) In aggregation, use $match to limit scope before $group; (7) Consider $facet for multi-dimensional dashboards; (8) For very large datasets, use the Computed Pattern to maintain running totals in a separate collection." },
  // Microsoft
  { id: "iq-company-ms-1", category: "replication", company: "Microsoft", difficulty: "Hard", question: "How would you ensure zero-downtime upgrades for a MongoDB replica set?", answer: "Zero-downtime upgrades: (1) Upgrade secondary nodes one at a time — step down the secondary, upgrade, rejoin; (2) Use rs.stepDown() on the primary to manually initiate a controlled election; (3) After upgrading all secondaries, step down the primary so it becomes a secondary and can be upgraded; (4) For the primary, run rs.stepDown(120, 10) to force it to step down and wait for a new primary to be elected; (5) Use a rolling upgrade procedure — upgrade each node sequentially; (6) Ensure write concern is set to 'majority' to prevent rollback; (7) Monitor the oplog window to ensure secondaries don't fall behind; (8) Test the upgrade in a staging environment first." },
  // Uber
  { id: "iq-company-uber-1", category: "sharding", company: "Uber", difficulty: "Hard", question: "How would you design a MongoDB sharding strategy for a real-time ride-hailing service?", answer: "For ride-hailing: (1) Shard key: Use a hashed shard key on rideId for even distribution; (2) Alternatively, use a compound shard key on (city, hashed(rideId)) for zone-based targeting; (3) Each city's data stays on specific shards, while ride IDs within cities are hashed for distribution; (4) Indexes: geospatial indexes for driver location, compound indexes on (driverId, status) and (riderId, createdAt); (5) Use zones and tag-aware sharding to keep specific cities on specific shards (if cities have different SLAs); (6) For geoqueries near a rider, use $near with a geospatial index; (7) Change streams for real-time driver location updates." },
  // Netflix
  { id: "iq-company-netflix-1", category: "schema-design", company: "Netflix", difficulty: "Hard", question: "How would you design the user watch history in MongoDB at Netflix scale?", answer: "Watch history schema: (1) Use the Bucket Pattern — store watch events in daily or weekly buckets per user; (2) Bucket document: { userId: ObjectId, weekStart: ISODate('2024-01-15'), totalWatchTime: 7200, entries: [{ showId: ObjectId, episodeId: ObjectId, watchedAt: ISODate(...), duration: 1800, completed: false, position: 1200 }, ...], deviceTypes: ['tv', 'mobile'] }; (3) This reduces document count from billions to millions; (4) Indexes: (userId, weekStart), (showId, watchedAt); (5) Use $merge to update weekly aggregates; (6) TTL index on weekStart for old data beyond retention period; (7) For recommendations, use aggregation with $unwind on entries; (8) Consider a separate collection for real-time watching progress (current position)." },
];
