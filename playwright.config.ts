import { PlaywrightTestConfig, devices } from '@playwright/test'

require('dotenv').config();


const config: PlaywrightTestConfig = {


    projects: [
        {
             name: "Chrome",
             use: {
                ...devices["Desktop Chrome"]
             }
        },

        // {
        //     name: "iphone",
        //     use: {
        //         ...devices["iPhone 8"]
        //     }
        // }
    ],

    //Obratiti paznju na testove koji se pokrecu
    // testMatch: ["tests/client.test.ts"],
    testMatch: ["tests/API/authBasic.test.ts"],
    use: {
        baseURL: "https://automationintesting.online",
        headless: false,
        screenshot: "off",
        video: "off",
        //Ovdje promijeniti api token ako pada
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Cookie': `token=${process.env.API_TOKEN!}`
        },
        
    },
    
    fullyParallel: true,
    retries: 0,

    reporter: [
    ["dot"], 

    ["json", {
        outputFile: "jsonReports/jsonReport.json"
    }], 

    ["html", {
        open: "always"
    }]
]

};


export default config;