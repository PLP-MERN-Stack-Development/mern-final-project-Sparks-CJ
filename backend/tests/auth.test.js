import request from "supertest";
import app from "../server.js";

describe("Auth Tests", () => {
  it("Registers user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email: "test@a.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
