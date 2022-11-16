const uidFromPost = require('../../scripts/uidFromPost')
const contactInfoFromUid = require('../../scripts/contactInfoFromUid')
const path = require('path')
const emailsFromWebsite = require('../../scripts/emailsFromWebsite')
const fs = require('fs').promises


const run = async (search, limit) => {
    const uid = await uidFromPost(search, limit)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-10-userId.json'), JSON.stringify(uid))
    const uInfo = await contactInfoFromUid(uid)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-10-userInfo.json'), JSON.stringify(uInfo))
    const eFromWeb = await emailsFromWebsite(uInfo)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-10-emailsFromWebsite.json'), JSON.stringify(eFromWeb))
    console.log("Completed")
}

run("webflow", 10)