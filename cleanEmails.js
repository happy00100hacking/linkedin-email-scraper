const fs = require('fs/promises')
const path = require('path')

const run = async () => {
    const sEmails = await fs.readFile(path.join(__dirname, 'scraped-data', 'wEmailAddress.json'), 'utf8')
    const emails = JSON.parse(sEmails)
    let endResult = []
    for (x of emails) {
        const string = x
        const regex = /\.[png|jpg]/

        if (regex.test(string)) {
            console.log("Image")
        }else{
            console.log('Email')
            endResult.push(x)
        }
    }
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'cleanedEmail.json'), JSON.stringify(endResult))
}

run()