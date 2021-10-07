import puppeteer from 'puppeteer'

export default async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('http://quotes.toscrape.com/')

    // wait for click 'login' btn
    const openLoginFormButton = "a[href='/login']"
    await page.waitForSelector(openLoginFormButton)
    await page.click(openLoginFormButton)

    // @login form enter user and pass and log in
    await page.waitForSelector(openLoginFormButton)
    await page.type('#username', 'username', { delay: 100 })
    await page.type('#password', 'password', { delay: 100 })
    const loginButton = "input[type='submit']"
    await page.click(loginButton)
}