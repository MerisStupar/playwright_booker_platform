<div id="top"></div>

## Playwright Booker Platform - Automation Testing


<div id="top"></div>

<br />
<div align="center">
  
<img src="https://pbs.twimg.com/profile_images/1318604600677527552/stk8sqYZ_400x400.png" alt="Logo" width="240" height="240">


  <h3 align="center">Automation Testing - Backend & Frontend</h3>

  <p align="center">
    A project where you can learn about automatic testing!
  </p>
</div>



## About The Project
The project contains many covered test cases. It contains testing of the entire frontend part and backend part. Testing the UI and also testing the APIs available for this project. There are also combined UI+API tests. The project also implemented a Postgres database for the purpose of running queries through scripts from Playwright.

The project also contains a demonstration of how to connect to a Postgres database with Playwright and how to make queries through a script through the aforementioned framework. Also the Postgres database that is the view has nothing to do with the Booker application - this link is only for the purpose of demonstrating how to query through Playwright.

You can find this application on the link below:
* [Booker Application](https://automationintesting.online/)

<br />


### Folder structure
    .
    |--- baseFixture
    |--- data-test
    |--- jsonReports
    |--- README.md
    |--- pages
    |--- pages_api
    |--- test
        |--- API
        |--- DB
        |--- UI_API
    |--- README.md
    |--- package-lock.json
    |--- package.json
    |--- playwright.config.ts

## Getting Started

Install NPM package
* npm
  ```sh
  npm install npm@latest -g
  ```
### Preparation
1. Clone the repo
   ```sh
   git clone https://github.com/MerisStupar/playwright_booker_platform.git
   ```
2. Install Playwright
   ```sh
   npm init playwright@latest
   ```
3. Dotenv 
   ```sh
   npm install dotenv --save
   ```
4. Set your .dotenv file in root of the folder. I've use following .env variables
   ```sh
   USERNAME_OF_ADMIN=admin
   PASSWORD_OF_ADMIN=password
   API_TOKEN=SetYourValue
   ```
5. Before running test set the testMatch in playwright.config.ts file
   ```sh
    testMatch: ["tests/FolderYouWant/TestYouWant.test.ts"],
    testMatch: ["tests/API/auth.test.ts"]  --> Example 
   ```
6. Running the Example Test
   ```sh
   npx playwright test --> Runs all test from testMatch or you can use scripts from package.json
   ```
## Useful Swagger Links For Booker-Platform

* [Auth Swagger](https://automationintesting.online/auth/swagger-ui/index.html#/)
* [Booking Swagger](https://automationintesting.online/booking/swagger-ui/index.html#/)
* [Room Swagger](https://automationintesting.online/room/swagger-ui/index.html#/)
* [Branding Swagger](https://automationintesting.online/branding/swagger-ui/index.html#/)
* [Report Swagger](https://automationintesting.online/report/swagger-ui/index.html#/)
* [Message Swagger](https://automationintesting.online/message/swagger-ui/index.html#/)


Duplicate:
* [Report Swagger](https://automationintesting.online/report/swagger-ui/index.html#/)
* [Message Swagger](https://automationintesting.online/message/swagger-ui/index.html#/)






<p align="right">[<a href="#top">back to top</a>]</p>
