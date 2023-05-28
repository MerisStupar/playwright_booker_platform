import {test, expect} from "@playwright/test";
import BookingPage from "../../pages_api/BookingPage";
import RoomsPage from "../../pages_api/RoomsPage";


test.beforeEach(async ({ page }) =>{
    
    const bookingPage = new BookingPage(page);
    await bookingPage.getHealthCheck();

});

//! Kreiranje sobe od strane admina, zatim user rezerviše sobu
test('Admin creates room, then user book that exact room', async ({ page }) => {
    
    const bookingPage = new BookingPage(page);
    const roomPage = new RoomsPage(page);

    const body = await roomPage.createRoom();
    const roomID = body.roomid;
    // console.log(roomID);

    const bookingData = {
        "roomid": `${roomID}`,
        "firstname": "Automation",
        "lastname": "Tester",
        "depositpaid": true,
        "email": "tester@email.com",
        "phone": "07123456789",
        "bookingdates": {
            "checkin": "2024-02-01",
            "checkout": "2025-02-05"
        }
    }

    await bookingPage.CreateBooking(bookingData);

    expect(bookingData.roomid).toBe(`${roomID}`);
});
