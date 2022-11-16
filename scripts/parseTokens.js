const path = require('path')
const fs = require('fs').promises

async function parseTokens() {
    const StringTokens = await fs.readFile(path.join(__dirname, 'tokens.json'), 'utf8')
    return JSON.parse(StringTokens)
    
}

module.exports = parseTokens