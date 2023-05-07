import { PlaywrightTestConfig, devices } from '@playwright/test'

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


    testMatch: ["tests/rooms.test.ts"],
    use: {
        baseURL: "https://automationintesting.online",
        headless: false,
        screenshot: "on",
        video: "on",
        
    },
    
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