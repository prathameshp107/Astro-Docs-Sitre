---
title: "Quick Reference Cheat Sheet"
description: "// ─── FIND ───────────────────────────────── db.col.find() // all docs db.col.find({ field: \"value\" }) // with filter db.col.findOne({ field: \"value\" }) /"
sort: 8
---

## 8. Quick Reference Cheat Sheet

### CRUD Commands

```js
// ─── INSERT ───────────────────────────────
db.col.insertOne({ field: "value" })
db.col.insertMany([{ ... }, { ... }])

// ─── FIND ─────────────────────────────────
db.col.find()                           // all docs
db.col.find({ field: "value" })         // with filter
db.col.findOne({ field: "value" })      // first match
db.col.find({}, { field1: 1, _id: 0 }) // projection
db.col.find().sort({ field: -1 })       // sort desc
db.col.find().limit(10).skip(20)        // pagination
db.col.countDocuments({ status: "ok" }) // count

// ─── UPDATE ───────────────────────────────
db.col.updateOne({ filter }, { $set: { field: val } })
db.col.updateMany({ filter }, { $set: { field: val } })
db.col.updateOne({ filter }, { $inc: { count: 1 } })
db.col.updateOne({ filter }, { $push: { arr: item } })
db.col.updateOne({ filter }, { $pull: { arr: item } })
db.col.updateOne({ filter }, { $unset: { field: "" } })
db.col.findByIdAndUpdate(id, { $set: {...} }, { new: true })

// ─── DELETE ───────────────────────────────
db.col.deleteOne({ _id: ObjectId("...") })
db.col.deleteMany({ status: "inactive" })
db.col.findByIdAndDelete(id)
```

### Query Operators

```js
// Comparison
{ age: { $gt: 18 } }           // greater than
{ age: { $gte: 18, $lte: 30 }} // between
{ status: { $ne: "banned" } }  // not equal
{ role: { $in: ["a","b"] } }   // in list
{ role: { $nin: ["x","y"] } }  // not in list

// Logical
{ $and: [{...}, {...}] }        // all true
{ $or:  [{...}, {...}] }        // any true
{ field: { $not: {...} } }      // negate

// Element
{ field: { $exists: true } }   // field exists
{ field: { $type: "string" } } // type check

// Array
{ arr: { $all: ["a","b"] } }   // contains all
{ arr: { $elemMatch: {...} } }  // element matches
```

### Aggregation Stages

```js
db.col.aggregate([
  { $match:   { status: "active" } },
  { $group:   { _id: "$field", total: { $sum: "$amount" } } },
  { $sort:    { total: -1 } },
  { $limit:   10 },
  { $skip:    0 },
  { $project: { field: 1, _id: 0 } },
  { $lookup:  { from: "other", localField: "id", foreignField: "_id", as: "data" } },
  { $unwind:  "$arrayField" },
  { $addFields: { newField: { $sum: "$arr" } } },
  { $count:   "totalCount" }
])
```

### Mongoose Quick Reference

```js
// Model CRUD
Model.create(data)
Model.find(filter).select('f1 f2').sort({f:-1}).limit(10).skip(0)
Model.findById(id)
Model.findOne(filter)
Model.findByIdAndUpdate(id, {$set:data}, {new:true, runValidators:true})
Model.findByIdAndDelete(id)
Model.countDocuments(filter)
Model.exists(filter)

// Populate
.populate('field', 'name email')
.populate({ path: 'field', select: 'name', populate: { path: 'nested' } })

// Schema Options
{ type: String, required: true, unique: true, trim: true, lowercase: true }
{ type: Number, min: 0, max: 100, default: 0 }
{ type: String, enum: ['a', 'b', 'c'] }
{ type: Schema.Types.ObjectId, ref: 'ModelName' }
{ timestamps: true }  // schema option — auto createdAt & updatedAt

// Middleware
schema.pre('save', function(next) { ... next(); })
schema.post('save', function(doc, next) { ... next(); })
```

---

*🍃 These notes cover everything from MongoDB basics to production-level advanced topics. Use them as a reference while building projects, preparing for interviews, or learning from scratch.*

*Happy coding!* 🚀