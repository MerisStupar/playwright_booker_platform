import {test as baseTest} from '@playwright/test'


import LoginPage from '../pages/loginPage';
import RoomsPage from '../pages/roomsPage';


type pages = {

    loginPage: LoginPage;
    roomsPage: RoomsPage;

}


const testPages = baseTest.extend<pages>({
  
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },

    roomsPage: async ({page}, use)=>{
        await use(new RoomsPage(page));
    }
  

  
  });


export const test = testPages;
export const expect = testPages.expect;