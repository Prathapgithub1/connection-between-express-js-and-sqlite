const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dpPath = path.join(__dirname, "goodreads.db");
let db = null;
const instializingTheDateBase = async () => {
  try {
    db = await open({
      filename: dpPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB error ${error}`);
    process.exit(1);
  }
};

instializingTheDateBase();

app.get("/books/", async (request, response) => {
  const getQuery = `
    SELECT * FROM book ORDER BY book_id;
    `;
  const dbArray = await db.all(getQuery);
  response.send(dbArray);
});
