import { test, expect } from "@playwright/test";
import AuthPage from "../../pages_api/AuthPage";


test('Healt Check ', async ({ page }) => {

    const authPage = new AuthPage(page);
    await authPage.getHealthCheck();

});


test('Create room ', async ({ request }) => {
    
    const response = await request.post(`/room/`, {
        data:{
            "roomName": "Playwrihgt API",
            "type": "Suite",
            "accessible": true,
            "image": "https://blog.postman.com/wp-content/uploads/2014/07/logo.png",
            "description": "This is room 101, dare you enter?",
            "roomPrice": 500,
            "features": [
              "WiFi", "Safe"
            ]
        },
    });


    expect(response.status()).toBe(201);


});
