const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

// Demo screenshots URLs (replace with actual URLs of contemporary Next.js apps)
const screenshotUrls = [
    {
        url: 'https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.jpg',
        filename: 'screenshot1.png',
        description: 'Modern UI components with Shadcn'
    },
    {
        url: 'https://raw.githubusercontent.com/shadcn-ui/taxonomy/main/public/og.jpg',
        filename: 'screenshot2.png',
        description: 'Dark mode interface with dashboard layout'
    }
];

async function downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (response) => {
                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302) {
                    return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
                }

                if (response.statusCode !== 200) {
                    return reject(new Error(`Failed to download: ${response.statusCode}`));
                }

                const fileStream = fs.createWriteStream(outputPath);
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Downloaded: ${outputPath}`);
                    resolve();
                });

                fileStream.on('error', (err) => {
                    fs.unlink(outputPath, () => {}); // Delete the file if there was an error
                    reject(err);
                });
            })
            .on('error', reject);
    });
}

async function copyDemoScreenshots() {
    const screenshotsDir = path.join(__dirname, '../public/images');

    // Create directory if it doesn't exist
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    console.log('Downloading demo screenshots...');

    // Download each screenshot
    for (const screenshot of screenshotUrls) {
        const outputPath = path.join(screenshotsDir, screenshot.filename);
        try {
            await downloadFile(screenshot.url, outputPath);
        } catch (error) {
            console.error(`Error downloading ${screenshot.filename}:`, error.message);
        }
    }

    console.log('Screenshots downloaded successfully!');
}

copyDemoScreenshots().catch((err) => {
    console.error('Error copying screenshots:', err);
    process.exit(1);
});
