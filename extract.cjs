const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\edb3abab-8c64-4b38-a7d6-b6ff6ddb333c\\.system_generated\\steps\\314\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Looking for the properties which are inside <div class="item ...">
// The structure is something like:
// <a class="img ..." href="/offplan/villas-in-dubai/4-bedroom/emaar-oasis/"><img src="https://..." alt="Emaar Oasis"/></a>
// FROM AED 12,500,000
// Location: The Oasis
// Type: Villas
// Handover: Q4 2027
// Bedrooms: 4-6

const regex = /<img class="min-w-full h-full object-cover" src="([^"]+)" alt="([^"]+)"\/>[\s\S]*?FROM <!-- --> <!-- -->([^<]+)<!-- -->[\s\S]*?<div class="!font-light !text-light-white[^>]*>([^<]+)<\/div>[\s\S]*?Type<!-- -->: <\/span> <!-- -->([^<]+)<\/div>[\s\S]*?Handover<!-- -->: <\/span> <!-- -->([^<]+)<\/div>[\s\S]*?Bedrooms<!-- -->: <\/span> <!-- -->([^<]+)<\/div>/g;

const properties = [];
let match;
while ((match = regex.exec(content)) !== null) {
    const [_, image, title, price, location, type, handover, bedrooms] = match;
    
    // Determine category from type
    let category = "villas";
    if (type.toLowerCase().includes("apartment")) category = "apartments";
    if (type.toLowerCase().includes("penthouse")) category = "penthouses";
    
    properties.push({
        title: title.trim(),
        price: price.trim(),
        image: image.trim(),
        location: location.trim(),
        category: category,
        handover: handover.trim(),
        bedrooms: bedrooms.trim(),
        typeRaw: type.trim()
    });
}

// Ensure unique titles
const uniqueProps = [];
const seen = new Set();
for (const p of properties) {
    if (!seen.has(p.title)) {
        seen.add(p.title);
        uniqueProps.push(p);
    }
}

// Generate the JS code for server/index.cjs
let jsCode = `// ═══════════════════════════════════════════\n//  OFF-PLAN — EXTRACTED FROM K ESTATES\n// ═══════════════════════════════════════════\n`;
let startId = 19; // Continuing from the Rent section ID

uniqueProps.forEach((p, i) => {
    // Generate a description
    const desc = `An exclusive off-plan property located in ${p.location}. This luxurious development offers premium ${p.typeRaw.toLowerCase()} with state-of-the-art amenities. Handover is scheduled for ${p.handover}.`;
    
    // Parse bedrooms roughly
    let minBeds = parseInt(p.bedrooms.charAt(0)) || 2;
    
    // Shuffle the order slightly by randomizing, but for now just output them sequentially
    jsCode += `  {
    id: ${startId + i},
    title: "${p.title}",
    price: "${p.price}",
    image: "${p.image.replace("https://phpstack-1577143-6149876.cloudwaysapps.com/", "https://kestates.ae/")}", 
    description: "${desc}",
    beds: ${minBeds}, baths: ${minBeds + 1}, size: "TBD Sq. Ft.",
    category: "${p.category}", type: "off-plan", location: "${p.location}", status: "Off-Plan",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "${p.price}", size: "TBD Sq. Ft.", beds: ${minBeds}, baths: ${minBeds + 1}, status: "Available" }] }
    ]
  },\n`;
});

fs.writeFileSync('C:\\Users\\ASUS\\Downloads\\SharanEstates-main\\SharanEstates-main\\extracted_properties.js', jsCode);
console.log(`Extracted ${uniqueProps.length} properties.`);
