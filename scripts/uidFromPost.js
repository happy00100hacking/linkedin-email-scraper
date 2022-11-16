const parseCookies = require('./parseCookies')
const puppeteer = require('puppeteer');


// uidFromPost('webflow', 5)
const uidFromPost = async (search, limit) => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })
    const page = await browser.newPage()
    const cookies = await parseCookies()
    await page.setCookie(...cookies)

    const URL = 'https://www.linkedin.com/search/results/content/?keywords=' + encodeURIComponent(search)
    console.log('OPENED SUCCESSFULLY :', URL)
    await page.goto(URL)
    let users = []

    while (limit > users.length) {
        console.log(users.length, "users scraped")
        users = await page.evaluate(() => {
            let tmpData = []
            let arr = Array.from(document.querySelectorAll('.app-aware-link.update-components-actor__container-link.relative.display-flex.flex-grow-1'))
            for (x of arr) {
                let fullProfileLink = x.href
                let profileLink = fullProfileLink.split('?')[0]
                let linkSplit = profileLink.split('/')
                let userId = linkSplit[linkSplit.length - 1]
                console.log(userId)
                tmpData.push({
                    name: x.querySelector('.update-components-actor__name.t-14.t-bold.hoverable-link-text.t-black span').textContent,
                    userId: userId
                })
            }
            return tmpData
        })

        let pgPrevHeight = await page.evaluate('document.body.scrollHeight')
        await page.evaluate(`window.scrollTo(0, ${pgPrevHeight})`)
        await page.waitForFunction(`document.body.scrollHeight > ${pgPrevHeight}`)
    }
    browser.close()
    console.log(users)
    return users
}

// uidFromPost('webflow', 2)
module.exports = uidFromPost