"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const path = process.argv[2];

// TODO: decompose check for URL
function checkForUrl() {}
/**
 * Read a path and if it's a URL access website for contents, otherwise print
 * file contents to console
 * @param {String} path file path
 */
async function cat(path) {
  try {
    if (path.startsWith("http")) {
      webCat(path);
    } else {
      let content = await fsP.readFile(path, "utf8");
      console.log(content);
    }
  } catch (err) {
    console.log("Error: ", err);
    // what is exit(1)? can we exit something else?
    process.exit(1);
  }
}

/**
 * Request content from web path and print to console
 * @param {String} url web path to content
 */
async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Error: Request failed with status code 404");
    } else {
      console.log(err.response);
    }
    process.exit(1);
  }
}

cat(path);