import { Page, expect } from "@playwright/test";


export default class BookingPage{

    constructor (public page:Page){}


    async getBookings() {
        const response = await this.page.request.get(`/booking`, { headers: {} });
        expect(response.status()).toBe(200);
        const body = await response.json();
        // console.log(body);
        return body;
    }



}