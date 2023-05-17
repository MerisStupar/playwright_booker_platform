import { test, expect } from "@playwright/test";


test.describe("Admin login - with API - POST Request", async () => {

    let cookies = "";

    test.beforeAll(async ({ request, baseURL }) => {

        const response = await request.post(`${baseURL}/auth/login`, {
            data: {
                username:  process.env.USERNAM_OF_ADMIN!,
                password:  process.env.PASSWORD_OF_ADMIN!
            },
        });

        expect(response.status()).toBe(200);
        const headers = await response.headers();
        cookies = headers["set-cookie"];

    });


    test('POST with invalid usernname and password', async ({ request, baseURL }) => {
    
        const respone = await request.post(`${baseURL}/auth/login`,{
            data: {
                username: "invalidUsername",
                password: "invalidPassword"
            },
        });

        expect(respone.status()).toBe(403);

        const body = await respone.text();
        expect(body).toBe("");

    });


    test('POST with invalid username and valid password', async ({  request, baseURL  }) => {
        
        const response = await request.post(`${baseURL}/auth/login`, {
            data:{
                username: "invalidUsername",
                password: "password"
            },
        });


        expect(response.status()).toBe(403);

        const body = await response.text();
        expect(body).toBe("");

    });


    test('POST with no username and valid password', async ({ request, baseURL   }) => {
        const response = await request.post(`${baseURL}/auth/login`, {
            data:{
                password: "password"
            },
        });

        expect(response.status()).toBe(403);
        const body = await response.text();
        expect(body).toBe("");
    });
    
    
    test('POST with empty body', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/auth/login`,{
            data: {},
        });
        expect(response.status()).toBe(403);

        const body = await response.text();
        expect(body).toBe("");
    });


    test('POST with no body', async ({ request, baseURL }) => {
        
        const response = await request.post(`${baseURL}/auth/login`,{});
        
        expect(response.status()).toBe(400);

        const body = await response.json();
        console.log(body);
        expect(body.status).toBe(400);
        expect(body.error).toBe("Bad Request");
        expect(body.path).toBe(`/auth/login`);
    });
    




    


    test("GET Booking by ID with details", async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking/1`, {
            headers: { cookie: cookies },
        });

        console.log(cookies)

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.bookingid).toBe(1);
        expect(body.roomid).toBe(1);
        expect(body.firstname).toBe("James");
        expect(body.lastname).toBe("Dean");
        expect(body.depositpaid).toBe(true);
    });


});
      
      


