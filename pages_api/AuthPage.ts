import { Page, expect } from "@playwright/test";


export default class AuthPage{

    constructor (public page:Page){}


    async getHealthCheck(){

        const response = await this.page.request.get(`/auth/actuator/health`);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.status).toBe("UP");
    }


}