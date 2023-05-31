import { test, expect } from "@playwright/test";
import { Client } from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "NewDB"
});

test('DB Test - SELECT', async () => {
    await client.connect();
    
    try {
        const personsQueryResult = await client.query('SELECT * FROM persons');
        console.log(personsQueryResult.rows);

        const usersQueryResult = await client.query('SELECT * FROM users');
        console.log(usersQueryResult.rows);
    } catch (err) {
        console.error(err.message);
    } finally {
        await client.end();
    }
});



test('DB Test - INSERT INTO', async () => {
    try {
      const insertQuery = `
        INSERT INTO persons (personid, fullname)
        VALUES
          ('3', 'Radnom User 1'),
          ('3', 'Radnom User 2'),
          ('3', 'Radnom User 3'),
          ('3', 'Radnom User 4')
      `;
  
      const deleteQuery = `DELETE FROM persons WHERE personid = '3'`;
  
      await client.connect();
  
      // Insert rows
      const insertResult = await client.query(insertQuery);
      expect(insertResult.rowCount).toBe(4);
  
      // Delete rows
      const deleteResult = await client.query(deleteQuery);
      expect(deleteResult.rowCount).toBe(4);
  
      // Verify that rows are deleted
      const selectResult = await client.query(`SELECT * FROM persons`);
      console.log(selectResult.rows);
  
    } catch (err) {
      console.error(err.message);
    } finally {
      await client.end();
    }
  });
  