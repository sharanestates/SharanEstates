const xlsx = require('xlsx');

try {
    const workbook = xlsx.readFile('AGENTS_PACK_LINKS.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log(`Found ${data.length} records.`);
    if (data.length > 0) {
        console.log("First 3 records:");
        console.log(JSON.stringify(data.slice(0, 3), null, 2));
    }
} catch (e) {
    console.error("Error reading excel file:", e);
}
