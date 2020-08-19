const request = require("supertest");
const app = require("../app");
const { db } = require("../data/db");
const { students: studentsDefaultsTemplate } = require("../data/defaults");

function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
};

afterEach(() => {
  const studentsDefaults = [...studentsDefaultsTemplate];
  db.set("students", studentsDefaults).write();
});

describe("Testing GET api/students", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/students");
    const expectedCase = "application/json; charset=utf-8";

    expect(response.headers["content-type"]).toBe(expectedCase);
  });

  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/students");
    expect(response.statusCode).toBe(200);
  });

  test("Content is an array", async () => {
    const response = await request(app).get("/api/students");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Testing DELETE request on api/students", () => {
  test("Post new Student, DELETE new student", async () => {
    const newStudent = await request(app).post("/api/students").send({
      name: "TestName",
      lastname: "TestLastName",
      age: 22,
      class: "FBW101",
      location: "BER",
    });
    const removedStudent = await request(app).delete(
      `/api/students/${newStudent.body.name}`
    );
    expect(removedStudent.statusCode).toBe(200);
  });
  test("GET updated students aray", async () => {
    const response = await request(app).get(`/api/students/TestName`);
    expect(response.body).toEqual({ error: "Student Not Found" });
  });
});

describe("Testing POST api/students", () => {
  test("Content-Type -> JSON", async () => {
    const newStudent = await request(app).post("/api/students").send({
      name: "TestName",
      lastname: "TestLastName",
      age: 22,
      class: "FBW101",
      location: "BER",
    });

    let expectedCase = "application/json; charset=utf-8";
    expect(newStudent.headers["content-type"]).toBe(expectedCase);
    expect(newStudent.statusCode).toBe(200);
    const response = await request(app).get("/api/students/TestName");
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "TestName",
        lastname: "TestLastName",
        age: 22,
        class: "FBW101",
        location: "BER",
      })
    );
  });
});

describe("Testing GET api/students/:name", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/students/Rupert");
    let expectedCase = "application/json; charset=utf-8";
    expect(response.headers["content-type"]).toBe(expectedCase);
  });
  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/students/Rupert");
    expect(response.statusCode).toBe(200);
  });
  test("Content is an Object", async () => {
    const response = await request(app).get("/api/students/Rupert");
    expect(isObject(response.body)).toBe(true);
  });
});
