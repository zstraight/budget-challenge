const puppeteer = require('puppeteer');

// Configuration
const SITE_URL = 'https://budget-challenge-kabx7cbo4-zander-straights-projects.vercel.app/'; // Replace with your URL
const TOTAL_USERS = 60;
const DELAY_BETWEEN_ACTIONS = 1000; // 1 second

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateUser(userId) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    try {
        console.log(`User ${userId} starting test...`);
        
        // Go to the website
        await page.goto(SITE_URL);
        console.log(`User ${userId} loaded page`);
        
        // Wait for and click the Begin Challenge button
        await page.waitForSelector('button');
        await page.click('button');
        await delay(DELAY_BETWEEN_ACTIONS);
        console.log(`User ${userId} started challenge`);
        
        // Handle each question (1-5)
        for (let questionNum = 1; questionNum <= 5; questionNum++) {
            // Wait for options to be visible
            await page.waitForSelector('.grid button');
            
            // Get all option buttons
            const options = await page.$$('.grid button');
            
            // Choose a random option
            const randomIndex = Math.floor(Math.random() * options.length);
            await options[randomIndex].click();
            
            console.log(`User ${userId} answered question ${questionNum}`);
            await delay(DELAY_BETWEEN_ACTIONS);
        }
        
        // Wait for and verify results page
        await page.waitForSelector('.text-3xl');
        console.log(`User ${userId} completed test successfully`);
        
    } catch (error) {
        console.error(`User ${userId} encountered error:`, error.message);
    } finally {
        await browser.close();
    }
}

async function runLoadTest() {
    console.log(`Starting load test with ${TOTAL_USERS} users...`);
    
    const startTime = Date.now();
    
    try {
        const userSimulations = Array.from(
            { length: TOTAL_USERS }, 
            (_, index) => simulateUser(index + 1)
        );
        
        await Promise.all(userSimulations);
        
        const totalTime = (Date.now() - startTime) / 1000;
        console.log('\n--- Load Test Results ---');
        console.log(`Total users: ${TOTAL_USERS}`);
        console.log(`Total time: ${totalTime.toFixed(2)} seconds`);
        console.log(`Average time per user: ${(totalTime / TOTAL_USERS).toFixed(2)} seconds`);
        
    } catch (error) {
        console.error('Load test failed:', error);
    }
}

runLoadTest();