const fs = require('fs');
const https = require('https');

const url = "https://www.dropbox.com/scl/fi/wjal2kqhieajq0yzxw5lh/AGENTS_PACK_LINKS.xlsxu?rlkey=48mbu506g5yt5dn0cte112p26&dl=1";

https.get(url, (res) => {
    // Follow redirect if any
    if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redirectRes) => {
            const file = fs.createWriteStream("AGENTS_PACK_LINKS.xlsx");
            redirectRes.pipe(file);
            file.on('finish', () => {
                console.log("Downloaded successfully.");
                file.close();
            });
        });
    } else {
        const file = fs.createWriteStream("AGENTS_PACK_LINKS.xlsx");
        res.pipe(file);
        file.on('finish', () => {
            console.log("Downloaded successfully.");
            file.close();
        });
    }
}).on('error', (e) => {
    console.error(e);
});
