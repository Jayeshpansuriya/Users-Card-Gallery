// import fetch from 'node-fetch';
// import fs from 'fs/promises'; // File system (Promise-based)

// async function fetchUsers() {
//     try {
//         const res = await fetch('https://randomuser.me/api/?results=10');
//         const data = await res.json();

//         // Save users array to file
//         await fs.writeFile('users.json', JSON.stringify(data.results, null, 2));

//         console.log("✅ Users saved to users.json");
//     } catch (err) {
//         console.error("❌ Error fetching or saving users:", err.message);
//     }
// }

// fetchUsers();


import fetch from 'node-fetch';
import minimist from 'minimist';



const args = minimist(process.argv.slice(2));
const genderFilter= args.gender;
const countryFilter =args.country;

async function fetchAndFilterUsers(){
    try{
        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();
        const users = data.results;

        const filtered = users.filter(user =>{
            const matchGender = genderFilter ? user.gender === genderFilter:true;
            const matchCountry = countryFilter ? user.location.country.toLowerCase()=== countryFilter.toLowerCase() : true;
            return matchGender && matchCountry;        
        });

        if(filtered.length === 0){
            console.log("no users matched your filters.");

        }else{
            filtered.forEach((user,i)=>{
                console.log(`\n user ${i+1}`);
                console.log(`name : ${user.name.first} ${user.name.last}`);
                console.log(`gender: ${user.gender}`);
                console.log(`eamil: ${user.emil}`);
                console.log(`country : ${user.location.country}`);

            });
        }
    }
    catch(error){
        console.error(error.message );

    }
}

fetchAndFilterUsers();
