import { Page, expect } from "@playwright/test";


export default class AuthPage{

    constructor (public page:Page){}


    async getHealthCheck(){

        const response = await this.page.request.get(`/auth/actuator/health`);
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

}