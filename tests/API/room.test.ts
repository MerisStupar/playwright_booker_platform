import { test, expect } from "@playwright/test";
import RoomsPage from "../../pages_api/RoomsPage";
import * as roomData from "../../data-test/roomDataAPI.json";
import * as updateRoom from "../../data-test/roomUpdateDataAPI.json";


test.beforeEach(async ({ page }) => {
    const roomPage = new RoomsPage(page);
    await roomPage.getHealthCheckRoom();
});

test('Create room - then updated with new data - API Test', async ({ page }) => {

    const roomPage = new RoomsPage(page);

    await roomPage.getHealthCheckRoom();
    //Creating room from admin side
    await roomPage.createRoom();

    //Validate on front page that room is visible
    const bodyRoom = await roomPage.getRoom();
    const lastIndex = bodyRoom.rooms.length - 1;
    const lastRoom = bodyRoom.rooms[lastIndex];

    expect(lastRoom.roomName).toBe(roomData.roomName)
    expect(lastRoom.image).toBe(roomData.image);
    expect(lastRoom.roomPrice).toBe(roomData.roomPrice);

    let roomID = lastRoom.roomid;
    console.log(`This is roomID of created room: ${roomID}`);
    
    const response = await roomPage.updateRoom(roomID, updateRoom);
    
    expect(response.roomid).toBe(roomID)
    expect(response.roomName).toBe(updateRoom.roomName);
    expect(response.roomPrice).toBe(updateRoom.roomPrice);

});

//!Creating room from admin side then validate on front page with API 
test('Create room - API Test', async ({ page }) => {

    const roomPage = new RoomsPage(page);

    await roomPage.getHealthCheckRoom();
    //Creating room from admin side
    await roomPage.createRoom();

    //Validate on front page that room is visible
    const bodyRoom = await roomPage.getRoom();
    const lastIndex = bodyRoom.rooms.length - 1;
    const lastRoom = bodyRoom.rooms[lastIndex];

    console.log(lastRoom);

    expect(lastRoom.roomName).toBe(roomData.roomName)
    expect(lastRoom.image).toBe(roomData.image);
    expect(lastRoom.roomPrice).toBe(roomData.roomPrice);

});

test('Delete room - API Test', async ({ page }) => {

    const roomPage = new RoomsPage(page);
    const bodyRoom = await roomPage.getRoom();
    const lastIndex = bodyRoom.rooms.length - 1;
    

    if (lastIndex >= 0) {

      const lastRoom = bodyRoom.rooms[lastIndex];
      const roomID = lastRoom.roomid;
    
      await roomPage.deleteRoom(roomID);
      console.log(`Room with ID ${roomID} deleted successfully.`);

    } else {
      console.log('There are no rooms to be deleted.');
    }
});







