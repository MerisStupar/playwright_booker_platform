import {Page, expect} from "@playwright/test";
import * as roomData from "../data-test/messageDataAPI.json";



export default class MessagePage{

    constructor (public page:Page){}

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


    async getHealthCheck(){

        const response = await this.page.request.get('/message/actuator/health');

        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.status).toBe("UP");
    
    }

    async getAllMessage(){

        const response = await this.page.request.get('/message/');
        const body = await response.json();

        return body;

    }

    async getCountMessage(){

        const response = await this.page.request.get('/message/count');
        const body = await response.json();
        const messageCount = body.count;

        expect(response.status()).toBe(200);
        expect(body).toHaveProperty("count");

        return messageCount;
    }


    async getMessage(messageID){

        const response = await this.page.request.get(`/message/${messageID}`);
        const body = await response.json();
        return body;

    }

    async sendMessage(){

        const cookie = await this.getToken();

        const response = await this.page.request.post('/message/', {
            data: JSON.stringify(roomData),
            headers: {
                cookie: cookie
            },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
    
        return body;
    }

    async getUnreadMessage(){
        
        const response = await this.page.request.get('/message/count');
        const body = await response.json();

        expect(response.status()).toBe(200);

        return body;
    }

    async MarkAsReadMessage(messageID){

        const cookie = await this.getToken();

        const response = await this.page.request.put(`/message/${messageID}/read`, {
            headers: {
                cookie: cookie
            },
        });

        expect(response.status()).toBe(202);

    }

    async DeleteMessage(messageID){
        const cookie = await this.getToken();

        const response = await this.page.request.delete(`/message/${messageID}`, {
            headers:{
                cookie: cookie
            },
        });

        expect(response.status()).toBe(202);



    }

}