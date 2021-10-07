import puppeteer from 'puppeteer'

/**
 * @param newPage: The new page/tab to switch to
 */

export default (newPage) => {
    await newPage.bringToFront()
}