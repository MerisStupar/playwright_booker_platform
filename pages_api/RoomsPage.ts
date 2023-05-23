import { Page, expect } from "@playwright/test";
import * as roomData from "../data-test/roomDataAPI.json";


export default class RoomsPage {

    constructor (public page:Page){}


    async getHealthCheckRoom(){

        const response = await this.page.request.get('/room/actuator/health');
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.status).toBe("UP");

    }


    async createRoom(){
        const response = await this.page.request.post('/room/', {
            data: JSON.stringify(roomData)
        });

        const body = await response.json();
        console.log(body);
        
        expect(response.status()).toBe(201);
        expect(body.type).toBe(roomData.type);
        expect(body.roomName).toBe(roomData.roomName);
        expect(body.roomPrice).toBe(roomData.roomPrice);

    }


    async getRoom(){

        const response = await this.page.request.get('/room/', { headers: {} });
        expect(response.status()).toBe(200);

        const body = await response.json();
        //console.log(body);
        return body;
    }



}