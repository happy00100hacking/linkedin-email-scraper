// const data = require('./scraped-data/webflow-userInfo.json')
const fs = require('fs/promises')
const path = require('path')

const run = async () => {
    let emails = []
    let websites = []
    const data = await fs.readFile(path.join(__dirname, 'scraped-data', 'webflow-userInfo.json'), 'utf8')
    const dataArr = JSON.parse(data)
    console.log(dataArr)
    for (x of dataArr) {
        if (x.emailAddress !== null){
            emails.push(x.emailAddress)
        }
        if (x.websiteURL.length > 0){
            for (website of x.websiteURL){
                websites.push(website)
            }
        }
    }
    console.log('Email \n', emails, '\n', emails.length)
    console.log('Websites \n', websites, '\n', websites.length)
    await fs.writeFile(path.join(__dirname, 'scraped-data', 'websites.json'), JSON.stringify(websites))
}

run()