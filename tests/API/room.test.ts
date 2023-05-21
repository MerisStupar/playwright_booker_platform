import { test, expect } from "@playwright/test";
import RoomsPage from "../../pages_api/RoomsPage";
import * as roomData from "../../data-test/roomDataAPI.json";



test('Create room ', async ({ page }) => {

    const roomPage = new RoomsPage(page);

    await roomPage.getHealthCheckRoom();
    await roomPage.createRoom();

    
    const bodyRoom = await roomPage.getRoom();
    expect(bodyRoom.rooms[1].roomid).toBe(2);
    expect(bodyRoom.rooms[1].roomName).toBe(roomData.roomName);




});
