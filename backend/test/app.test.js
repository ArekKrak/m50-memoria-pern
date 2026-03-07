const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Notes routes security", () => {
  it("should reject unauthenticated requests to /notes", async () => {
    const res = await request(app).get("/notes");

    expect(res.status).to.equal(401);
  });

  it("should reject registration with a short password", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        email: "shortpass@test.com",
        password: "pass"
      });

    expect(res.status).to.equal(400);
  });

  it("should reject an invalid note ID", async () => {
    const res = await request(app).get("/notes/sandwich");

    expect(res.status).to.equal(400);
  });
});