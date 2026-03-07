const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Notes routes security", () => {
  it("should reject unauthenticated requests to /notes", async () => {
    const res = await request(app).get("/notes");

    expect(res.status).to.equal(401);
  });
});