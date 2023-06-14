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



//! Kreiranje sobe od strane admina, zatim user rezerviše sobu te uradi update
test.only('Admin creates room, then user book that exact room and update', async ({ page }) => {
    
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
            "checkin": "2025-01-01",
            "checkout": "2025-01-03"
        }
    }

    const bodyBooking = await bookingPage.CreateBooking(bookingData);

    expect(bookingData.roomid).toBe(`${roomID}`);
    console.log(bodyBooking)

    const bookingId = bodyBooking.bookingid;

    const updatedData = {
        "roomid": `${roomID}`,
        "firstname": "Automation Update",
        "lastname": "Tester Update",
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2025-01-04",
            "checkout": "2025-01-06"
        }
    }

    const updateBooking = await bookingPage.UpdateBooking(updatedData, bookingId);
    

    expect(updatedData.firstname).toBe(updateBooking.booking.firstname)
    expect(updatedData.bookingdates.checkin).toBe(updateBooking.booking.bookingdates.checkin)
    expect(updatedData.bookingdates.checkout).toBe(updateBooking.booking.bookingdates.checkout)

    console.log(updateBooking);




});