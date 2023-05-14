import { Page, expect } from "@playwright/test";
import * as data from '../data-test/roomData.json';


export default class RoomsPage {
    
  constructor(public page:Page) {}

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

  //Button to create room
  private createButton = this.page.locator(`#createRoom`);



  //Alert message 
  private alertMessage = this.page.locator(`div.alert.alert-danger`);


  async validateAlertMessageEmptyData(expectedText:string){
    await this.alertMessage.scrollIntoViewIfNeeded();
    expect(this.alertMessage).toHaveText(expectedText);
  }
 
  async enterRoomID(roomID: string) {
    await this.roomID.type(roomID);
    expect(this.roomID).toHaveValue(data.roomID);
  }

  async selectRoomType(dataValue: string) {
    await this.roomType.click();
    await this.roomType.selectOption({
      value: dataValue,
    });

    expect(this.roomType).toHaveValue(dataValue);
  }

  async selectRoomAccessible(dataValue: string) {
    await this.roomAccessible.click();
    await this.roomAccessible.selectOption({
        value: dataValue
    });
    expect(this.roomAccessible).toHaveValue(dataValue)
  }

  async enterRoomPrice(roomPrice: string) {
    await this.roomPrice.type(roomPrice);
    expect(this.roomPrice).toHaveValue(roomPrice);
  }

  async selectWiFi() {

    await this.roomWifiCB.check();
    expect(this.roomWifiCB).toBeChecked();

  }

  async selectTV() {
    await this.roomTVCB.check();
    expect(this.roomTVCB).toBeChecked();
  }

  async selectRadio() {
    await this.roomRadioCB.check();
  }

  async selectRefreshments() {
    await this.roomRefreshmentsCB.check();
  }

  async selectSafe() {
    await this.roomSafeCB.check();
  }

  async selectViews() {
    await this.roomViewsCB.check();
  }

  async selectCreateButton() {
    await this.createButton.click();
  }

  //Function to add all CB
  private async addRoomDetails() {
    await this.selectWiFi();
    expect(this.roomWifiCB).toBeChecked();
  
    await this.selectTV();
    expect(this.roomTVCB).toBeChecked();
  
    await this.selectViews();
    expect(this.roomViewsCB).toBeChecked();
  
    await this.selectRefreshments();
    expect(this.roomRefreshmentsCB).toBeChecked();
  
    await this.selectSafe();
    expect(this.roomSafeCB).toBeChecked();
  
    await this.selectRadio();
    expect(this.roomRadioCB).toBeChecked();
  }


  //Adding full specified room
  public async addingFullRoom( roomID: string, typeValue: string, accessible: string,
    roomPrice: string
  ) {
    //Adding number of room
    await this.enterRoomID(roomID);
    //Adding type of room
    await this.selectRoomType(typeValue);
    //Adding accessible
    await this.selectRoomAccessible(accessible);
    //Adding price
    await this.enterRoomPrice(roomPrice);
    //Addin all room details all CB
    await this.addRoomDetails();
    //Create room - clicking the button create
    await this.selectCreateButton();
  }

  
  async expectedDetails_CreatingRoom(){

    const expectedDetails = "WiFiTVRadioRefreshmentsSafeViews";
    const details = this.page.locator("(//div[@class='col-sm-5'])").last();
    const textContext = await details.textContent();
    expect(textContext).toContain(expectedDetails);
    
  }

}