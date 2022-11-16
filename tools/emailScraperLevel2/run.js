const postIdFromPost = require('../../scripts/postidFromPost')
const contactInfoFromUid = require('../../scripts/contactInfoFromUid')
const path = require('path')
const emailsFromWebsite = require('../../scripts/emailsFromWebsite')
const uidFromIndividualPost = require('../../scripts/uidFromIndividualPost')
const fs = require('fs').promises


const run = async (search, limit) => {
    const pid = await postIdFromPost(search, limit)
    const uid = await uidFromIndividualPost(pid)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-2-userId.json'), JSON.stringify(uid))
    const uInfo = await contactInfoFromUid(uid)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-2-userInfo.json'), JSON.stringify(uInfo))
    const eFromWeb = await emailsFromWebsite(uInfo)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'webflow-2-emailsFromWebsite.json'), JSON.stringify(eFromWeb))
    console.log("Completed")
}

run("webflow expert", 2)