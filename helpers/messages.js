const { rejects } = require('assert');
const { green } = require('colors');
const { resolve } = require('path');

require('colors');


const showMenu = () => {

    return new Promise ( resolve => {

        console.clear();
        console.log('=================='.yellow);
        console.log(' Choose an option '.yellow);
        console.log('==================\n'.yellow);
        
        console.log(` ${'1'.yellow} Create tasks `);
        console.log(` ${'2'.yellow}. List tasks `);
        console.log(` ${'3'.yellow}. List completed tasks `);
        console.log(` ${'4'.yellow}. List pending tasks `);
        console.log(` ${'5'.yellow}. complete task `);
        console.log(` ${'6'.yellow}. Delete task `);
        console.log(` ${'0'.yellow}. Exit \n `);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question('Choose an option: ', (opt) =>{
            readLine.close();
            resolve(opt);
        })

    });

   
}

const pause = () => {

    return new Promise ( resolve => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPress ${'ENTER'.yellow} to continue\n`, (opt) => {
            readLine.close();
            resolve();
        })

    });
    
}

module.exports = {
    showMenu,
    pause
}