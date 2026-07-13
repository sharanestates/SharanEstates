const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'brain', 'edb3abab-8c64-4b38-a7d6-b6ff6ddb333c', '.system_generated', 'logs', 'transcript.jsonl');

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    count++;
    try {
      const obj = JSON.parse(line);
      console.log(`Line ${count}: step_index=${obj.step_index}, type=${obj.type}`);
    } catch(e) {
      console.log(`Line ${count}: failed to parse`);
    }
    if (count >= 10) break;
  }
}

search();
