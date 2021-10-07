import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import cron from 'node-cron'

const theCode = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto('https://learnwebcode.github.io/practice-requests/')

    /**
     * GET NAMES
     *
     * saves the names of the animals in the images on the page into  "saved-from-scrapes/names.txt"
     */

    const getNames = async () => {
        const names = await page.evaluate(() => { // evaluate lets us run client side JS
            // get all selectors and makes it an array; querySelectorAll naturally returns a nodeList
            return Array.from(document.querySelectorAll('.info strong')).map(selector => selector.textContent)
        })

        await fs.writeFile('saved-from-scrapes/names.txt', names.join('\r\n'))
    }

    /**
     * GET IMAGES
     * 
     * saves the images on the page into the folder "saved-from-scrapes"
     */

    const getImages = async () => {
        // $$eval === document.querySelectorAll w/out needing 'evaluate' func 
        // puts them in an array without us having to convert a nodeList
        const photos = await page.$$eval('img', (imagesArray) => {
            return imagesArray.map(image => image.src) // returns the image's url
        })

        for (const photoUrl of photos) {
            const imagePage = await page.goto(photoUrl)
            // save image
            await fs.writeFile(`saved-from-scrapes/${photoUrl.split('/').pop()}`, await imagePage.buffer()) // split().pop() gives us last bit of the url which in this case contains the name of the image
        }
    }

    /**
     * Clicks the button labeled 'click me'
     */

    const fireClickMeEvent = async () => {
        await page.click('#clickme')

        // $eval === document.querySelector w/out needing 'evaluate' func
        const text = await page.$eval('#data', element => element.textContent)
        console.log(text);
    }

    const submitFormSkyColor = async () => {
        await page.type('#ourfield', 'blue') // enter text into input
        await Promise.all([  // await a list of promises before moving on
            page.click('#ourform button'),  // click 'submit' button
            page.waitForNavigation()  // wait for page to navigate
        ])

        const message = await page.$eval('#message', element => element.textContent)  // grab the message text
        console.log(message);
    }

    // await getNames()
    // await getImages()
    // await fireClickMeEvent()
    await submitFormSkyColor()

    await browser.close()
}

export default () => {
    cron.schedule('*/5 * * * * *', theCode)  // runs every 5 seconds
}