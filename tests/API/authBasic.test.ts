import { test, expect } from "@playwright/test";
import BookingPage from "../../pages_api/bookingPage";
import AuthPage from "../../pages_api/AuthPage";
import RoomsPage from "../../pages_api/RoomsPage";


test.beforeEach(async ({ page }) =>{
    const roomPage = new RoomsPage(page);
    await roomPage.getHealthCheckRoom();

});

test('Post without username', async ({ request, baseURL }) => {

    const response = await request.post(`${baseURL}/auth/login`, {
        data: {
            username: "",
            password: "password"
        },
    });

    expect(response.status()).toBe(403);

    const headers = await response.headers();
    console.log(headers['set-cookie']);

});



test('Post without password', async ({ request, baseURL }) => {

    const response = await request.post(`${baseURL}/auth/login`, {
        data: {
            username: "admin",
            password: ""
        },
    });

    expect(response.status()).toBe(403);

    const headers = await response.headers();
    console.log(headers['set-cookie']);

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



test.only('Get TOKEN - Auth ', async ({ request, baseURL }) => {
    
    let cookie="";

    const response = await request.post(`${baseURL}/auth/login`, {
        data: {
            username: "admin",
            password: "password"
        },
    });

    expect(response.status()).toBe(200);

    const headers = await response.headers();
    console.log(headers['set-cookie']);

    cookie = headers["set-cookie"];
    //extracted token from headers to only value
    const cookieValue = cookie.split(';')[0].split('=')[1];

    const validateToken = await request.post(`${baseURL}/auth/validate`, {
        data:{
            token: cookieValue
        },
    });

    expect(validateToken.status()).toBe(200);

});



//!POM - Implementacija API 
test('GET Booking with POM implementation', async ({ page }) => {

    const bookingPage = new BookingPage(page);

    const body = await bookingPage.getBookings();

    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(body.bookings[0].firstname).toBe("James");

});



