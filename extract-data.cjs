const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\edb3abab-8c64-4b38-a7d6-b6ff6ddb333c\\.system_generated\\steps\\697\\content.md', 'utf8');

// The property images on K Estates use patterns like:
// src="https://phpstack...cloudwaysapps.com//images/properties/emaar-oasis (1).webp"
// OR via Next.js: /_next/image/?url=...
// The gallery images on the detail page use /Images/ paths (note capital I)

// Extract gallery images (the /Images/ ones, not logos)
const galleryRegex = /\/Images\/[^"'\s>)]+\.(webp|jpg|png|jpeg)/gi;
const galleryImages = [...new Set((content.match(galleryRegex) || []))].filter(
    img => !img.includes('LOGO') && !img.includes('logo') && !img.includes('k-white') && !img.includes('awards')
);

console.log("Gallery Images:");
galleryImages.forEach(img => {
    const fullUrl = "https://kestates.ae" + img;
    console.log(fullUrl);
});

// Extract description
const descStart = content.indexOf('DESCRIPTION');
if (descStart !== -1) {
    let chunk = content.substring(descStart, descStart + 3000);
    chunk = chunk.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    // Cut at "Payment Plan" or "PAYMENT" or similar
    const cutPoints = ['Payment Plan', 'PAYMENT', 'KEY DETAILS'];
    for (const cp of cutPoints) {
        const idx = chunk.indexOf(cp);
        if (idx > 0) chunk = chunk.substring(0, idx).trim();
    }
    console.log("\n--- DESCRIPTION ---");
    console.log(chunk.substring(12).trim()); // skip "DESCRIPTION " prefix
}

// Extract metadata using the K Estates HTML pattern: 
// <span class="!font-mediem">Location: </span> The Oasis
const metaRegex = /font-mediem[^>]*>(\w[\w\s]*?)(?::\s*)?<\/span>\s*(?:<!--[^>]*-->)?\s*([^<]+)/gi;
let metaMatch;
console.log("\n--- METADATA ---");
while ((metaMatch = metaRegex.exec(content)) !== null) {
    const key = metaMatch[1].trim();
    const val = metaMatch[2].trim();
    if (key && val && !key.includes('{') && val.length < 100) {
        console.log(`${key}: ${val}`);
    }
}

// Extract price
const priceRegex = /AED\s*[\d,]+/g;
const prices = content.match(priceRegex);
if (prices) {
    console.log("Prices found:", [...new Set(prices)].join(', '));
}
