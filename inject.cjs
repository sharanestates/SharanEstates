const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, 'server', 'index.cjs');
const extractedFile = path.join(__dirname, 'extracted_properties.js');

const serverContent = fs.readFileSync(serverFile, 'utf8');
const extractedContent = fs.readFileSync(extractedFile, 'utf8');

// Find the start of the Off-Plan section
const startMarker = '  // ═══════════════════════════════════════════\n  //  OFF-PLAN — VILLAS (3)';
const startIndex = serverContent.indexOf(startMarker);

// Find the end of the fallbackProperties array
const fallbackEndMarker = '\n];\n\nconst fallbackInquiries = [';
const endIndex = serverContent.indexOf(fallbackEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const before = serverContent.substring(0, startIndex);
    const after = serverContent.substring(endIndex);
    
    const newContent = before + extractedContent + after;
    fs.writeFileSync(serverFile, newContent);
    console.log('Successfully injected extracted properties.');
} else {
    console.error('Could not find markers', startIndex, endIndex);
}
