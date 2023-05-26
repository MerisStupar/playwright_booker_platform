import {Page, expect} from "@playwright/test";
import * as brandingData from "../data-test/brandingDataAPI.json"



export default class BrandingPage{

    constructor(public page:Page){}


    async getToken() {
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

    async getHealtCheck() {

        const response = await this.page.request.get(`/branding/actuator/health`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe("UP");

    }


    async updateBranding(){
        
        const cookie = await this.getToken();

        const response = await this.page.request.put('/branding/', {
            data: JSON.stringify(brandingData),
            headers: {
                cookie: cookie
            },
        });

        expect(response.status()).toBe(202)

    }


    async getBranding() {
        
        const cookie = await this.getToken();

        const response = await this.page.request.get('/branding/', {
            headers:{
                cookie: cookie
            },
        });
    
        expect(response.status()).toBe(200);

        const body = await response.json();

        return body;

    }


    





}