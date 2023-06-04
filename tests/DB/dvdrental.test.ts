import { test, expect } from "@playwright/test";

import { Client } from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "dvdrental"
});


test('Select top 5 rows from actors', async ({ }) => {
    
    await client.connect();
   
    try {
        const actorSelectQuery = `SELECT * FROM actor LIMIT 5;`

        const actorQueryResult = await client.query(actorSelectQuery);
        expect(actorQueryResult.rowCount).toBe(5);
        expect(actorQueryResult.rows[0].actor_id).toBe(1);
        expect(actorQueryResult.rows[0].first_name).toBe('Penelope');
        expect(actorQueryResult.rows[0].last_name).toBe('Guiness');
        console.log(actorQueryResult);

    } catch (error) {
        console.log(error.message);
    } finally{
        await client.end();
    }
});


test.only('INSERT statement then DELETE statement', async ({ }) => {
    
    await client.connect();

    try {

        const insertQuery = `
        INSERT INTO public.actor(
            actor_id, first_name, last_name, last_update)
            VALUES (201, 'TestUser', 'TestUser', '2023-06-04 17:55:55.62');`;

        const deleteQuery = `DELETE FROM actor WHERE actor_id='201';`

        const queryResult = await client.query(insertQuery);
        expect(queryResult.rowCount).toBe(1);
        expect(queryResult.command).toBe('INSERT')

        const deleteResult = await client.query(deleteQuery);
        expect(deleteResult.rowCount).toBe(1);

    } catch (error) {
        console.log(error.message);
    } finally {
        await client.end();
    }


});

