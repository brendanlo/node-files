"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const { write } = require("fs");
let readPath = process.argv[2];


// TODO: decompose check for URL
function urlCheck(readPath) {
  return readPath.startsWith("http");
}

async function outputContent(content, writePath) {
  if (writePath) {
    fsP.writeFile(writePath, content, "utf8");
  }
  else {
    console.log(content);
  }
}


function router(readPath) {
  let writePath;
  if (readPath === "--out") {
    readPath = process.argv[4];
    writePath = process.argv[3];
  }

  if (urlCheck(readPath)) {
    webCat(readPath, writePath);
  }
  else {
    cat(readPath, writePath);
  }
}


/**
 * Read a path and if it's a URL access website for contents, otherwise print
 * file contents to console
 * @param {String} path file path
 */
async function cat(readPath, writePath) {
  try {
    let content = await fsP.readFile(readPath, "utf8");
    outputContent(content, writePath);
  } catch (err) {
    console.log("Error: ", err);
    process.exit(1);
  }
}

/**
 * Request content from web path and print to console
 * @param {String} url web path to content
 */
async function webCat(readPath, writePath) {
  try {
    let response = await axios.get(readPath);
    outputContent(response.data, writePath);
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Error: Request failed with status code 404");
    } else {
      console.log(err.response);
    }
    process.exit(1);
  }
}

router(readPath);