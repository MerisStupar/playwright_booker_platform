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

    async validateToken(){

        const cookie = await this.getToken();
        //Extracting only vale from token for example token=P7UXQH8EaSb0JXPo; Path=/
        const cookieValue = cookie.split('=')[1].split(';')[0];

        const response = await this.page.request.post("/auth/validate", {
            data: {
                "token": `${cookieValue}`
            }
        });

        expect(response.status()).toBe(200);

    }

    async validateFakeToken(){

        const cookie = await this.getToken();
        //Extracting only vale from token for example token=P7UXQH8EaSb0JXPo; Path=/
        const cookieValue = cookie.split('=')[1].split(';')[0];

        const response = await this.page.request.post("/auth/validate", {
            data: {
                "token": `${cookieValue}_brokencookie`
            }
        });

        expect(response.status()).toBe(403);
        console.log(`Status should be 403 forbidden: ${response.status()}`)
    }

    async destroyToken(){
        const cookie = await this.getToken();
        //Extracting only vale from token for example token=P7UXQH8EaSb0JXPo; Path=/
        const cookieValue = cookie.split('=')[1].split(';')[0];

        const response = await this.page.request.post("/auth/logout", {
            data: {
                "token": `${cookieValue}`
            }
        });

        expect(response.status()).toBe(200);
    }

}