import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import { AppDataSource } from "../index";

async function create() {
  const id = uuid();
  const password = await hash("admin", 8);
  await AppDataSource.initialize();
  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
            values ('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'xxxxxx')
          `
  );
  await AppDataSource.destroy();
}

create().then(() => console.log("User admin created!"));
