import {test, expect} from "@playwright/test";
import MessagePage from "../../pages_api/MessagesPage";
import * as roomData from "../..//data-test/messageDataAPI.json";



test.beforeEach(async ({ page })=>{
    const meessagePage = new MessagePage(page);
    await meessagePage.getHealthCheck();
})


test('Send message to admin', async ({ page }) => {

    const meessagePage = new MessagePage(page);
    const body = await meessagePage.sendMessage();

    expect(body.name).toBe(roomData.name);
    expect(body.email).toBe(roomData.email);
    expect(body.subject).toBe(roomData.subject);

});
