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
  });

});

