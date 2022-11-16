const puppeteer = require('puppeteer')
const parseCookies = require('./parseCookies')

// let allPostId = [
//     {
//         postId: 'urn:li:activity:6993966945377148928'
//     },
//     {
//         postId: 'urn:li:activity:6993669521865637889'
//     }
// ]

const uidFromIndividualPost = async (posts) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })
    const page = await browser.newPage()
    cookies = await parseCookies()
    await page.setCookie(...cookies)
    // await page.goto('https://linkedin.com')
    let usersData = []
    for (x of posts) {
        await page.goto(`https://www.linkedin.com/feed/update/${x.postId}`)

        let condition = true
        while (condition) {
            let c = undefined
            try {
                await page.waitForSelector('.comments-comments-list__load-more-comments-button.artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--tertiary.ember-view', { timeout: 10000 })
                await page.click('.comments-comments-list__load-more-comments-button.artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--tertiary.ember-view')
                console.log("Clicked")
            } catch (err) {
                condition = false
            }
        }
        console.log(condition, "While End")
        const users = await page.evaluate(() => {
            let tmpData = []
            let elementData = Array.from(document.querySelectorAll('.ember-view.tap-target.comments-post-meta__actor-link'))
            for (x of elementData) {
                tmpData.push({
                    name: x.querySelector('img').alt.split('See profile for ')[1],
                    userId: x.href.split('/')[4]
                })
            }
            return tmpData
        })
        usersData = [...usersData, ...users]

    }

    uniqueUser = usersData.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name && t.userId === value.userId
        ))
    )
    await browser.close()

    // console.log(uniqueUser)
    return uniqueUser
}

// uidFromIndividualPost(allPostId).then(x => console.log(x, x.length))

module.exports = uidFromIndividualPost