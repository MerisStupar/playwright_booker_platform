import { Page } from "@playwright/test";



export default class RoomsPage{

    constructor (public page: Page){}

    //Room's fields and dropdowns
    private roomID = this.page.locator(`#roomName`);
    private roomType = this.page.locator(`#type`);
    private roomAccessible = this.page.locator(`#accessible`);
    private roomPrice = this.page.locator(`#roomPrice`);

    //Room's CheckBoxes
    private roomWifiCB = this.page.locator(`#wifiCheckbox`);
    private roomTVCB = this.page.locator(`#tvCheckbox`);
    private roomRadioCB = this.page.locator(`#radioCheckbox`);
    private roomRefreshmentsCB = this.page.locator(`#refreshCheckbox`);
    private roomSafeCB = this.page.locator(`#safeCheckbox`);
    private roomViewsCB = this.page.locator(`#viewsCheckbox`);

    private createButton = this.page.locator(`#createRoom`);



    async enterRoomID(roomID: string){
        await this.roomID.type(roomID);
    }

    async selectRoomType(){
        await this.roomType.click();
    }

    async selectRoomAccessible(){
        await this.roomAccessible.click()
    }

    async enterRoomPrice(roomPrice: string){
        await this.roomPrice.type(roomPrice);
    }

    async selectWiFi(){
        await this.roomWifiCB.click();
    }

    async selectTV(){
        await this.roomTVCB.click();
    }
    
    async selectRadio(){
        await this.roomRadioCB.click();
    }

    async selectRefreshments(){
        await this.roomRefreshmentsCB.click();
    }

    async selectSafe(){
        await this.roomSafeCB.click();
    }

    async selectViews(){
        await this.roomViewsCB.click();
    }

    async selectCreateButton(){
        await this.createButton.click();
    }


}