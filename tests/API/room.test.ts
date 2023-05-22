import { test, expect } from "@playwright/test";
import RoomsPage from "../../pages_api/RoomsPage";
import * as roomData from "../../data-test/roomDataAPI.json";


test.beforeEach(async ({ page }) => {
    const roomPage = new RoomsPage(page);
    await roomPage.getHealthCheckRoom();

});


test('Create room ', async ({ page }) => {

    const roomPage = new RoomsPage(page);

    await roomPage.getHealthCheckRoom();
    //Creating room from admin side
    await roomPage.createRoom();

    
    //Validate on front page that room is visible
    const bodyRoom = await roomPage.getRoom();
    const lastIndex = bodyRoom.rooms.length - 1;
    const lastRoom = bodyRoom.rooms[lastIndex];


    // console.log(bodyRoom.rooms.lenght);
    expect(lastRoom.roomName).toBe(roomData.roomName)
    expect(lastRoom.image).toBe(roomData.image);
    expect(lastRoom.roomPrice).toBe(roomData.roomPrice);




});
