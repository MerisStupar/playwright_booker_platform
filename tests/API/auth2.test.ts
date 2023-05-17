import { test, expect } from "@playwright/test";




test('Get TOKEN - Auth ', async ({ request }) => {
    

    const response = await request.post("https://automationintesting.online/auth/login", {

        data: {
            username: process.env.USERNAM_OF_ADMIN!,
            password: process.env.PASSWORD_OF_ADMIN!
        }
    });

    expect(response.status()).toBe(200);

    const headers = await response.headers();

    console.log(headers['set-cookie']);

});

const savedToken = "LUTh58DImSfFyBmt";

test('GET Booking', async ({ request }) => {
    const response = await request.get("https://automationintesting.online/booking/", {
        headers: { cookie: `token=${savedToken}` },
      });


    expect(response.status()).toBe(200);
});



test('GET Booking with ENV', async ({ request }) => {
    const response = await request.get("https://automationintesting.online/booking/", {
        headers: { cookie: `token=${process.env.SAVEDTOKEN!}` },
      });


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
