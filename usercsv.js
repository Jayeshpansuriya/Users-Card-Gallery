import fetch from 'node-fetch';
import fs from 'fs/promises';
import { Parser } from 'json2csv';

main();

async function main(){

    try {

        const res = await fetch('https://randomuser.me/api/?results=100');
        const data = await res.json();
        const users = data.results;

       const cleaned = users.map(user=>({
            fullName: `${user.name.first} ${user.name.last}`,
            gender:user.gender,
            email:user.email,
            country: user.location.country,
        }));

        const parses = new Parser();
        const csv = parses.parse(cleaned);

        await fs.writeFile('users.csv',csv);
        console.log("users.csv filr created successfully");
        
    } catch (error) {

        console.error(error.message);
        
    }
}