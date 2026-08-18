import {test,expect} from '@playwright/test';

test.describe.serial('API tests for Restful-booker @api',()=>{
    const baseURL = 'https://restful-booker.herokuapp.com';
    const bookingData = {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };
    const updatedBookingData = {
            "firstname" : "Anothername",
            "lastname" : "Brown",
            "totalprice" : 222,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-02-02",
                "checkout" : "2019-02-02"
            },
            "additionalneeds" : "Dinner"
        }; 
    let bookingId;
    let token;
    test('Create booking @api', async({request})=>{
        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking).toMatchObject(bookingData);

       bookingId=responseBody.bookingid;
    })
    
    test('Get info about booking @api',async({request})=>{
        const response = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(bookingData);

    })

    test('Update booking @api', async({request})=>{
        const authData={
            'username':'admin',
            'password':'password123'
        }
        
        const authToken = await request.post(`${baseURL}/auth`,{data: authData})
        expect(authToken.status()).toBe(200);
        const authTokenBody = await authToken.json();
        token=authTokenBody.token;
        const response=await request.put(`${baseURL}/booking/${bookingId}`, {
            headers:{Cookie:`token=${token}`},
            data:updatedBookingData
        })
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(updatedBookingData);
    })

    test('Delete booking @api',async({request})=>{
        const response = await request.delete(`${baseURL}/booking/${bookingId}`,{
            headers:{Cookie:`token=${token}`}
        })
        expect(response.status()).toBe(201);

        const response_check = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(response_check.status()).toBe(404);
    })

})