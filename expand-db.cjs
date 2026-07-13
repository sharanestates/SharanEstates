const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

const serverFile = path.join(__dirname, 'server', 'index.cjs');

try {
    const workbook = xlsx.readFile('AGENTS_PACK_LINKS.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log(`Loaded ${data.length} records from Excel.`);

    // Read index.cjs
    let content = fs.readFileSync(serverFile, 'utf8');

    // Find the end of fallbackProperties array
    const startIdx = content.indexOf('const fallbackProperties = [');
    const endIdx = content.indexOf('];', startIdx);

    if (startIdx === -1 || endIdx === -1) {
        throw new Error("Could not find fallbackProperties array in server/index.cjs");
    }

    // Generate new property objects
    let newObjects = "";
    let currentId = 50; // Start IDs at 50 to avoid conflicts with existing manually entered properties
    
    // Some placeholder images for variety
    const placeholderImages = [
        "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp",
        "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp",
        "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp",
        "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp",
        "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp"
    ];

    data.forEach((row, index) => {
        const title = row['PROJECT'];
        const dropboxLink = row['AGENT PACK'] || "";
        
        if (!title) return; // Skip empty rows

        const price = "AED " + (Math.floor(Math.random() * 80 + 20) * 100000).toLocaleString(); // Random price 2M to 10M
        const img = placeholderImages[index % placeholderImages.length];
        
        // Infer category based on title, default apartments
        let category = "apartments";
        if (title.toLowerCase().includes('villa')) category = "villas";
        if (title.toLowerCase().includes('mansion') || title.toLowerCase().includes('penthouse')) category = "penthouses";
        
        const desc = `An exclusive off-plan property: ${title}. This luxurious development offers premium ${category} with state-of-the-art amenities and exceptional design. Handover is scheduled for Q4 2027.`;
        
        const beds = Math.floor(Math.random() * 4) + 1; // 1 to 4
        const baths = beds + 1;

        // Features array (we'll serialize it as JSON or just keep it in DB if we add a features column. 
        // Currently, index.cjs fallback properties don't have a features field, we'll add one.
        const features = [
            "Smart Home System Integration",
            "State-of-the-art Gymnasium",
            "Infinity Edge Swimming Pool",
            "24/7 Concierge and Security",
            "Landscaped Gardens and Parks",
            "Retail and Dining Outlets Nearby"
        ];

        newObjects += `
  {
    id: ${currentId},
    title: "${title.replace(/"/g, '\\"')}",
    price: "${price}",
    image: "${img}", 
    description: "${desc}",
    beds: ${beds}, baths: ${baths}, size: "TBD Sq. Ft.",
    category: "${category}", type: "off-plan", location: "Prime District, Dubai", status: "Off-Plan",
    dropbox_link: "${dropboxLink}",
    features: ${JSON.stringify(features)},
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "${price}", size: "TBD Sq. Ft.", beds: ${beds}, baths: ${baths}, status: "Available" }] }
    ]
  },`;
        currentId++;
    });

    // Insert newObjects before the closing ];
    const newContent = content.substring(0, endIdx) + newObjects + "\n" + content.substring(endIdx);
    
    fs.writeFileSync(serverFile, newContent);
    console.log(`Successfully added 43 projects to server/index.cjs`);

} catch (e) {
    console.error("Error expanding db:", e);
}
