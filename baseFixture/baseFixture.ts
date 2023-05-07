import {test as baseTest} from '@playwright/test'


import LoginPage from '../pages/loginPage';
import RoomsPage from '../pages/roomsPage';
import ClientPage from '../pages/clientPage';
import BrandingPage from '../pages/brandingPage';

type pages = {

    loginPage: LoginPage;
    roomsPage: RoomsPage;
    clientPage: ClientPage;
    brandingPage: BrandingPage;

}


const testPages = baseTest.extend<pages>({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  roomsPage: async ({ page }, use) => {
    await use(new RoomsPage(page));
  },

  clientPage: async ({ page }, use) => {
    await use(new ClientPage(page));
  },

  brandingPage: async ({ page }, use) => {
    await use(new BrandingPage(page));
  }
  
  

  
  });


export const test = testPages;
export const expect = testPages.expect;