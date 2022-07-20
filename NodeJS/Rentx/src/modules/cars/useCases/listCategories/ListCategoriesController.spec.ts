import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import { AppDataSource } from "../../../../shared/infra/typeorm";

describe("List Categories", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    const id = uuid();
    const password = await hash("admin", 8);
    await AppDataSource.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
            values ('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'xxxxxx')
          `
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({ name: "Category supertest", description: "Category supertest" })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toBe("Category supertest");
  });
});
