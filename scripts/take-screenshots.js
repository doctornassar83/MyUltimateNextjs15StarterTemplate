const puppeteer = require('puppeteer');
const fs = require('node:fs');
const path = require('node:path');

async function takeScreenshots() {
    // Create the screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: { width: 1280, height: 800 }
    });
    const page = await browser.newPage();

    // Navigate to the homepage
    console.log('Taking screenshot of homepage...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle2' });
    await page.screenshot({
        path: path.join(screenshotsDir, 'screenshot1.png'),
        fullPage: false
    });

    // Navigate to the dashboard
    console.log('Taking screenshot of dashboard...');
    await page.goto('http://localhost:3003/dashboard', { waitUntil: 'networkidle2' });
    await page.screenshot({
        path: path.join(screenshotsDir, 'screenshot2.png'),
        fullPage: false
    });

    // Navigate to the api-examples page
    console.log('Taking screenshot of API examples page...');
    await page.goto('http://localhost:3003/api-examples', { waitUntil: 'networkidle2' });
    await page.screenshot({
        path: path.join(screenshotsDir, 'screenshot3.png'),
        fullPage: false
    });

    // Navigate to the accessibility page
    console.log('Taking screenshot of accessibility page...');
    await page.goto('http://localhost:3003/accessibility', { waitUntil: 'networkidle2' });
    await page.screenshot({
        path: path.join(screenshotsDir, 'screenshot4.png'),
        fullPage: false
    });

    await browser.close();
    console.log('Screenshots captured successfully!');
}

takeScreenshots().catch((err) => {
    console.error('Error taking screenshots:', err);
    process.exit(1);
});
