import sqlite from "sqlite3";
import { TABLES } from "../constants/tables";

const db = new sqlite.Database("src/database/db.sqlite");

db.serialize(() => {
  Object.values(TABLES).forEach((table) => {
    db.run(`
      DROP TABLE IF EXISTS ${table}
    `);
  });

  db.run(`
      CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        auth_token TEXT
      );
    `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      is_private BOOLEAN NOT NULL DEFAULT FALSE,
      created_at DATE NOT NULL DEFAULT (DATE('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ${TABLES.FOLLOWS} (
      leader_id INTEGER NOT NULL,
      follower_id INTEGER NOT NULL,
      FOREIGN KEY(leader_id) REFERENCES users(id),
      FOREIGN KEY(follower_id) REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(post_id) REFERENCES posts(id)
    );
  `);
});

db.close();
