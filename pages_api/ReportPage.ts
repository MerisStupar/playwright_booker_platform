import { Page, expect } from "@playwright/test";



export default class ReportPage{

    constructor (public page:Page){}



    async GetHealtCheck(){

        const response = await this.page.request.get('/report/actuator/health');
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.status).toBe("UP");

    }

    async GetSpecificRoomReport(roomId){

        const response = await this.page.request.get(`/report/room/${roomId}`);
        const body = await response.json();

        expect(response.status()).toBe(200);

        return body;
    }



}