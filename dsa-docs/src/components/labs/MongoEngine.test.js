import { describe, it, expect } from "vitest";
import { createMongoEngine } from "../../data/mongodb-curriculum.js";

const mockDatabases = {
  ecommerce: {
    name: "ecommerce",
    collections: {
      products: {
        documents: [
          { _id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
          { _id: 2, name: "Phone", category: "Electronics", price: 800, stock: 0 },
          { _id: 3, name: "Shirt", category: "Apparel", price: 40, stock: 100 },
        ]
      }
    }
  }
};

describe("MongoEngine", () => {
  it("should retrieve documents using find with empty query", () => {
    const engine = createMongoEngine(mockDatabases);
    const results = engine.collection("products").find({});
    expect(results.length).toBe(3);
    expect(results[0].name).toBe("Laptop");
  });

  it("should filter documents using matchFilter logic", () => {
    const engine = createMongoEngine(mockDatabases);
    const results = engine.collection("products").find({ category: "Electronics" });
    expect(results.length).toBe(2);
    expect(results.every(r => r.category === "Electronics")).toBe(true);
  });

  it("should aggregate fields using $match and $group", () => {
    const engine = createMongoEngine(mockDatabases);
    const pipeline = [
      { $match: { category: "Electronics" } },
      { $group: { _id: "$category", totalStock: { $sum: "$stock" } } }
    ];
    const { results } = engine.collection("products").aggregate(pipeline);
    expect(results.length).toBe(1);
    expect(results[0]._id).toBe("Electronics");
    expect(results[0].totalStock).toBe(10);
  });
});
