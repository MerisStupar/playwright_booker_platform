import {test, expect} from "@playwright/test";
import MessagePage from "../../pages_api/MessagesPage";
import * as roomData from "../..//data-test/messageDataAPI.json";
import { log } from "console";




test.beforeEach(async ({ page })=>{
    const messagePage = new MessagePage(page);
    await messagePage.getHealthCheck();
})


test.only('Send message to admin', async ({ page }) => {

    const messagePage = new MessagePage(page);
    const body = await messagePage.sendMessage();

    expect(body.name).toBe(roomData.name);
    expect(body.email).toBe(roomData.email);
    expect(body.subject).toBe(roomData.subject);
    

    console.log(`Message count: ${await messagePage.getCountMessage()}`);

});

test('Send message to admin - admin read exact message', async ({ page }) => {

    const messagePage = new MessagePage(page);
    const body = await messagePage.sendMessage();
    const messageID = body.messageid;


    expect(body.name).toBe(roomData.name);
    expect(body.email).toBe(roomData.email);
    expect(body.subject).toBe(roomData.subject);

    console.log(`This is ID of message: ${messageID}`);

    await messagePage.MarkAsReadMessage(messageID);

    await messagePage.DeleteMessage(messageID);
});

test('Send message to admin - then read, then delete it', async ({ page }) => {

    const messagePage = new MessagePage(page);
    const body = await messagePage.sendMessage();
    const messageID = body.messageid;


    expect(body.name).toBe(roomData.name);
    expect(body.email).toBe(roomData.email);
    expect(body.subject).toBe(roomData.subject);

    console.log(`This is ID of message: ${messageID}`);

    await messagePage.MarkAsReadMessage(messageID);
    await messagePage.DeleteMessage(messageID);
    
});