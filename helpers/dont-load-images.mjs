import puppeteer from 'puppeteer'

export default () => {
    page.on('request', (request) => {
        if (request.resourceType() === 'image') request.abort();
        else request.continue();
    });
}