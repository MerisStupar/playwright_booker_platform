import { test, expect } from "@playwright/test";

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

test('GET Booking with ENV', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking`, { headers:{} });
    expect(response.status()).toBe(200);
    const body = await response.json();

    console.log(body);
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(body.bookings[0].bookingid).toBe(1);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("James");
    expect(body.bookings[0].lastname).toBe("Dean");
    expect(body.bookings[0].depositpaid).toBe(true);
});



