const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, 'server', 'index.cjs');
let content = fs.readFileSync(serverFile, 'utf8');

// Replace kestates.ae/images with phpstack-1577143-6149876.cloudwaysapps.com/images
content = content.replace(/https:\/\/kestates\.ae\/images\//g, "https://phpstack-1577143-6149876.cloudwaysapps.com/images/");

fs.writeFileSync(serverFile, content);
console.log("Updated image host to cloudwaysapps.");
