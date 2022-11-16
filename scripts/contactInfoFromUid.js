const parseTokens = require('./parseTokens')
const axios = require('axios')
const delay = require('./delay')


// let usrs = [
//     {
//         name: "Abhishek Singh",
//         userId: "mrsingh98"
//     },
//     {
//         name: "alexandro",
//         userId: 'alex'
//     }
// ]

// contactInfoFromUid(usrs)

const contactInfoFromUid = async (users) => {
    let endResult = []
    // const corsCookie = await parseTokens()
    // const li_atValue = corsCookie[0].value
    // const corsValue = corsCookie[1].value
    // console.log(corsValue)
    let usr = Array.from(users)
    console.log(usr)
    let tokens = await parseTokens()
    let tCount = 0

    for (x of usr) {
        let name = x.name
        let userId = null
        let emailAddress = null
        // let twitterHandle = null
        let websiteURL = []

        let li_atValue = tokens[tCount].token
        console.log("li vlaue", li_atValue)

        try {
            const res = await axios(
                {
                    method: 'get',
                    url: `https://linkedin.com/voyager/api/identity/profiles/${x.userId}/profileContactInfo`,
                    headers: {
                        cookie: `JSESSIONID="ajax:604943910877292780"; li_at=${li_atValue};`,
                        "Csrf-Token": "ajax:604943910877292780",
                        "Sec-Fetch-Mode": "cors"
                    },
                    delay: 2000
                }
            )
            console.log("Request by :", tokens[tCount].name)
            tCount++
            if (tCount === tokens.length) tCount = 0
            console.log(res.status)
            if (res.status === 200) {
                console.log(res.data)
                userId = x.userId
                if (res.data.emailAddress) emailAddress = res.data.emailAddress
                if (res.data.websites) {
                    for (website of res.data.websites) {
                        websiteURL.push(website.url)
                    }

                }
                // if (res.data.twitterHandles.length > 0) twitterHandle = res.data.twitterHandles[0].name

                endResult.push({
                    name,
                    userId,
                    emailAddress,
                    // twitterHandle,
                    websiteURL
                })
                await delay(7000)
            } else {
                await delay(7000)
            }
        } catch (e) {

            if (e.code === "ECONNABORTED") {
                console.log(`${x} instance timed out`)
            } else {
                console.log(e)
            }
        }
    }

    // try {
    //     await fs.writeFile(path.join(__diruserId, 'datas', 'webflow.json'), JSON.stringify(endResult))
    // } catch (err) {
    //     console.log(err.message)
    // }

    console.log(endResult)
    return endResult

}

// contactInfoFromUid(usrs)

module.exports = contactInfoFromUid