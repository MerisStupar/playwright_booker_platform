import { test, expect } from "@playwright/test";
import BookingPage from "../../pages_api/bookingPage";
import AuthPage from "../../pages_api/AuthPage";


test.only('Healt Check ', async ({ page }) => {

    const authPage = new AuthPage(page);
    await authPage.getHealthCheck();

});




test('POST with empty token', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/auth/validate`, {
        data: {
            token: ""
        },
    });

    expect(response.status()).toBe(403);


    const body = await response.text();
    expect(body).toBe("");
});



test('Get TOKEN - Auth ', async ({ request, baseURL }) => {

    const response = await request.post(`${baseURL}/auth/login`, {
        data: {
            username: "admin",
            password: "password"
        },
    });

    expect(response.status()).toBe(200);

    const headers = await response.headers();
    console.log(headers['set-cookie']);

});


//!POM - Implementacija API 
test('GET Booking with POM implementation', async ({ page }) => {

    const bookingPage = new BookingPage(page);

    const body = await bookingPage.getBookings();

    expect(body.bookings.length).toBeGreaterThan(1);
    expect(body.bookings[0].firstname).toBe("James");

});



