import { test, expect } from "@playwright/test";

//! Pitanje kako prebaciti ovo na config da se samo mijenja?
test.describe("Booking - GET requests", async () => {

  let _cookies;

  test.beforeAll(async ({request}) =>{
    
    const response = await request.post("auth/login", {
        data: {
            username: "admin",
            password: "password"
        },
    });

    expect(response.status()).toBe(200);
    const headers = await response.headers();

    _cookies = headers["set-cookie"];
  });



  test("GET all bookings with details", async ({ request }) => {

    const response = await request.get("booking/", {
      headers: {
        cookies: _cookies
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body)
    // expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    // expect(body.bookings[0].bookingid).toBe(1);
    // expect(body.bookings[0].roomid).toBe(1);
    // expect(body.bookings[0].firstname).toBe("James");
    // expect(body.bookings[0].lastname).toBe("Dean");
    // expect(body.bookings[0].depositpaid).toBe(true);
  });

});

