import { PlaywrightTestConfig, devices } from '@playwright/test'

require('dotenv').config();


const config: PlaywrightTestConfig = {


    projects: [
        {
             name: "chrome",
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

    testMatch: ["tests/API/auth.test.ts"],
    use: {
        baseURL: "https://automationintesting.online",
        extraHTTPHeaders: {
            "Authorization": "Basic le2Hxmkvq9zLPPNi"
        },
        headless: false,
        screenshot: "on",
        video: "on",
        
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