import sqlite from "sqlite3";
import { users } from "../mocks/users.mock";
import { posts } from "../mocks/posts.mock";
import { TABLES } from "../constants/tables";
import { parseString } from "../utils/parse-string";
import { parseDate } from "../utils/parse-date";

const db = new sqlite.Database("src/database/db.sqlite");

db.serialize(() => {
  Object.values(TABLES).forEach((table) => {
    db.run(`
      DELETE FROM ${table}
    `);
  });

  users.forEach((user) => {
    db.run(`
      INSERT INTO ${TABLES.USERS} (
        id, username, password, auth_token
      ) VALUES (
        ${user.id},
        ${parseString(user.username)},
        ${parseString(user.password)},
        ${parseString(user.auth_token)}
      )
    `);
  });

  posts.forEach((post) => {
    db.run(`
      INSERT INTO ${TABLES.POSTS} (
        id, user_id, content, is_private, created_at
      ) VALUES (
        ${post.id},
        ${post.user_id},
        ${parseString(post.content)},
        ${post.is_private},
        ${parseDate(post.crated_at)}
      )
    `);
  });
});

db.close();
