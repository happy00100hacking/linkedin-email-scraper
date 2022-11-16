
const axios = require('axios')

const emailsFromWebsite = async (data) => {
    const endResult = []
    for (websites of data) {
        const name = websites.name
        const userId = websites.userId
        const emailAddress = websites.emailAddress
        let websiteURL = []
        let wEmailAddress = []

        for (website of websites.websiteURL) {
            try {
                console.log('processing :', website)
                let weburl = undefined
                let regex1 = /http(s)?:\/\//
                let regex2 = /^www./
                if (regex1.test(website)) {
                    weburl = website
                    websiteURL.push(weburl)
                } else if (regex2.test(website)) {
                    weburl = 'https://' + website
                    websiteURL.push(weburl)
                } else {
                    break
                }

                const res = await axios(weburl)
                const text = res.data
                const emails = text.match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
                );
                console.log(emails)
                let uniqueMails = undefined;
                if (emails !== null) {
                    if (emails.length > 0) {
                        uniqueMails = emails.filter((c, index) => {
                            return emails.indexOf(c) === index;
                        });
                        for (x of uniqueMails) {
                            const string = x
                            const regex = /(\.png)|(\.jpg)/

                            if (regex.test(string)) {
                                console.log('image :', x)

                            } else {
                                console.log("Website :", x)
                                wEmailAddress.push(x);
                            }

                        }
                    }
                }
            }catch(err){
                console.log(err.message)
            }
        }
        endResult.push({
            name,
            userId,
            emailAddress,
            websiteURL,
            wEmailAddress
        })
    }
    // console.log(endResult)
    return endResult

}

// emailsFromWebsite(websites)

module.exports = emailsFromWebsite





