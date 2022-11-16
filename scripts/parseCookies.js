const path = require('path')
const fs = require('fs').promises

async function parseCookies() {
    const StringCookies = await fs.readFile(path.join(__dirname, 'cookies.json'), 'utf8')
    return JSON.parse(StringCookies)
    
}

module.exports = parseCookies