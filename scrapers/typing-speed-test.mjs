import puppeteer from 'puppeteer'

export default async () => {
    const browser = await puppeteer.launch({ headless: false })  // opens browser, headless true === no GUI, false opens GUI
    const page = await browser.newPage() // open new TAB
    await page.goto('https://typing-speed-test.aoeu.eu') // navigates to a URL
    await page.waitForSelector('.nextword') // wait for selector to be rendered

    const words = await page.evaluate(() => {
        try {
            const wordElements = document.querySelectorAll('.nextword') // give us an array of words with the 'nextword class
            const wordList = [
                document.querySelector('.currentword').innerText
            ]

            wordElements.forEach(word => {
                wordList.push(word.innerText)
            })

            return wordList
        } catch (error) {
            console.log(`\n\nBrendan Says: Error\n ${error}\n\n`);
        }
    })

    // words.forEach(async word => {
    // })
    for (let i = 0; i < words.length; i++) {  // doesn't work wit forEach? 
        await page.type("#input", words[i])
        // await page.Keyboard.press('Space')  // doesn't work for the typing speed site
        await page.keyboard.press(String.fromCharCode(32))
    }
    // console.log('Words: ', words)
}