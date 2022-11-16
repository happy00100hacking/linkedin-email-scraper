const parseCookies = require('./parseCookies')
const puppeteer = require('puppeteer');


// postIdFromPost('webflow', 5)
const postIdFromPost = async (search, limit) => {

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
    let postId = []

    while (limit > postId.length) {
        console.log(postId.length, "postId scraped")
        postId = await page.evaluate(() => {
            let tmpData = []
            let arr = Array.from(document.querySelectorAll('div[data-urn'))
            for (x of arr) {
                postId = x.dataset.urn
                tmpData.push({
                    postId: postId
                })
            }
            return tmpData
        })

        let pgPrevHeight = await page.evaluate('document.body.scrollHeight')
        await page.evaluate(`window.scrollTo(0, ${pgPrevHeight})`)
        await page.waitForFunction(`document.body.scrollHeight > ${pgPrevHeight}`)
    }
    browser.close()
    postId.length = limit
    console.log(postId, limit)
    return postId
}

// postIdFromPost('webflow', 5)

module.exports = postIdFromPost