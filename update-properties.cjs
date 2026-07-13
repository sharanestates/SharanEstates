const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, 'server', 'index.cjs');
let serverContent = fs.readFileSync(serverFile, 'utf8');

// 1. Remove all RENT sections
const rentStart = serverContent.indexOf('  // ═══════════════════════════════════════════\n  //  RENT — VILLAS (3)');
const offplanStart = serverContent.indexOf('  // ═══════════════════════════════════════════\n  //  OFF-PLAN — EXTRACTED FROM K ESTATES');

if (rentStart !== -1 && offplanStart !== -1) {
  serverContent = serverContent.substring(0, rentStart) + serverContent.substring(offplanStart);
}

// 2. Change type: "buy" to type: "ready" in the fallback properties
serverContent = serverContent.replace(/type:\s*"buy"/g, 'type: "ready"');

fs.writeFileSync(serverFile, serverContent);
console.log('Successfully updated fallback properties in server/index.cjs');
