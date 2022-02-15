"use strict";

const fsP = require('fs/promises');
const path = process.argv[2];

async function cat(path) {
  try {
    let content = await fsP.readFile(path, "utf8");
    console.log(content);
  } catch (err) {
    console.log("Error: ", err);
    // what is exit(1)? can we exit something else?
    process.exit(1);
  }
}

cat(path);