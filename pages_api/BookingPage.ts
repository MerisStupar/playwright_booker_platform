import { Page, expect } from "@playwright/test";
import * as bookingData from "../data-test/bookingDataAPI.json";


export default class BookingPage{

    constructor (public page:Page){}

    async getHealthCheck(){

        const response = await this.page.request.get('/booking/actuator/health');
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.status).toBe("UP");

    }

    async getToken(){
        const response = await this.page.request.post("auth/login", {
            data: {
                username: "admin",
                password: "password"
            },
        });
    
        expect(response.status()).toBe(200);
        const headers = await response.headers();
        const cookie = headers["set-cookie"];
    
        return cookie;
    
        }
    

    async getBookings() {

        const cookie = await this.getToken();
        const response = await this.page.request.get(`/booking`, { headers: {
            cookie: cookie
        } });
        expect(response.status()).toBe(200);
        const body = await response.json();
        // console.log(body);
        return body;
    }


    async CreateBooking(bookingData){

        const response = await this.page.request.post('/booking/', {
            data: bookingData
        });
        expect(response.status()).toBe(201);

        const body = response.json();

        return body;

    }

    async UpdateBooking(bookingUpdatedData, bookingId){
        
        const cookie = await this.getToken();

        const response = await this.page.request.put(`/booking/${bookingId}`, {
            headers: {
                cookie: cookie
            },
            data: bookingUpdatedData
        });

        expect(response.status()).toBe(200);

        const body = response.json();

        return body;

    }


    async DeleteBooking(bookingId) {

        const cookie = await this.getToken();

        const response = await this.page.request.put(`/booking/${bookingId}`, {
            headers: {
                cookie: cookie
            }
        });

        expect(response.status()).toBe(202);

        

    }



}