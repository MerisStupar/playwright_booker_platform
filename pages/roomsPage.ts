import { Page, expect } from "@playwright/test";



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

    private resultRoomID = this.page.locator(`#roomName`);
     



    async enterRoomID(roomID: string){
        await this.roomID.type(roomID);
        expect(this.resultRoomID).toHaveValue(roomID)
    }

    async selectRoomType(dataValue:string){
      await this.roomType.click();
      await this.roomType.selectOption({
        value: dataValue
      })
    }

    async selectRoomAccessible(){
        await this.roomAccessible.click()
    }

    async enterRoomPrice(roomPrice: string){
        await this.roomPrice.type(roomPrice);
    }

    async selectWiFi(){
        await this.roomWifiCB.check();
    }

    async selectTV(){
        await this.roomTVCB.check();
    }
    
    async selectRadio(){
        await this.roomRadioCB.check();
    }

    async selectRefreshments(){
        await this.roomRefreshmentsCB.check();
    }

    async selectSafe(){
        await this.roomSafeCB.check();
    }

    async selectViews(){
        await this.roomViewsCB.check();
    }

    async selectCreateButton(){
        await this.createButton.click();
    }

    public async addingFullRoom(roomID:string, typeValue:string, accessible:string, roomPrice:string) {
        //Adding number of room
        await this.roomID.type(roomID);
        //Adding type of room
        await this.roomType.click();
        await this.roomType.selectOption({
            value: typeValue
        })

        //Adding accessible
        await this.roomAccessible.click();
        await this.roomAccessible.selectOption({
            value: accessible
        })

        //Adding price
        await this.roomPrice.type(roomPrice)

        //Adding room details
        await this.selectWiFi();
        await this.selectTV();
        await this.selectViews();
        await this.selectRefreshments();
        await this.selectSafe();
        await this.selectRadio();

    

        //Create room - clicking the button create
        await this.selectCreateButton();
    }


}