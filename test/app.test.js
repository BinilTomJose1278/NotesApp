const request = require("supertest");
const mongoose = require("mongoose"); // Import mongoose
const app = require("../index"); // Import the app instance

describe("Express App", () => {
  // Test the home page (GET /)
  it("should return the home page on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Notes"); // Example check for the homepage title
  });

  // Test 404 for an unknown route
  it("should return 404 for an unknown route", async () => {
    const res = await request(app).get("/non-existing-route");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain("Page not Found!"); // Adjust based on actual content of your 404 page
  });

  // Test authentication redirect for dashboard (GET /dashboard)
  it("should redirect to login if not authenticated on GET /dashboard", async () => {
    const res = await request(app).get("/dashboard");
    expect(res.statusCode).toEqual(401); // Expecting a redirect to login
  });

  // Ensure Mongoose is properly disconnected after all tests
  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect Mongoose
  });
});
