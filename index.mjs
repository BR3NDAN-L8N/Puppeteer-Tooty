import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import cron from 'node-cron'

// SCRAPERS
import {
    typingSpeedTestMjs,
    autoLoginQuotesToScrapeMjs,
    schedulingWithCronMjs
} from './scrapers/_index.mjs'

(async () => {
    // typingSpeedTestMjs()
    // autoLoginQuotesToScrapeMjs()
    schedulingWithCronMjs()
    
})()  // need empty parens here, not sure why