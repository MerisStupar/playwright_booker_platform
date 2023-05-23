import { Page, expect } from "@playwright/test";
import * as roomData from "../data-test/roomDataAPI.json";


export default class RoomsPage {

    constructor (public page:Page){}

    private cookies;

    async getToken(){
    const response = await this.page.request.post("auth/login", {
        data: {
            username: "admin",
            password: "password"
        },
    });

    expect(response.status()).toBe(200);
    const headers = await response.headers();
    this.cookies = headers["set-cookie"];

    }


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
        // console.log(body);
        
        expect(response.status()).toBe(201);
        expect(body.type).toBe(roomData.type);
        expect(body.roomName).toBe(roomData.roomName);
        expect(body.roomPrice).toBe(roomData.roomPrice);

    }


    async getRoom(){

        await this.getToken();
        const response = await this.page.request.get('/room/', { headers: {
            cookie: this.cookies
        } });
        // console.log(this.cookies);
        expect(response.status()).toBe(200);
        const body = await response.json();
        //console.log(body);
        return body;
    }


    async updateRoom(roomID, updateRoomData){
        await this.getToken();
        const respose = await this.page.request.put(`/room/${roomID}`, {
            data: JSON.stringify(updateRoomData),
        })
        
        const updatedBody = await respose.json();

        expect(respose.status()).toBe(202);
    
        return updatedBody;
    }



}