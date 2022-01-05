require('colors');

const { inquirerMenu,
        pause,
        readInput,
        deleteListTasks,
        confirm,
        showCheckList } 
        = require('./helpers/inquirer');
        
const { saveDB, readDB } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');


const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const taskDB = readDB();

    if (taskDB) { // load tasks
        tasks.loadTasksFromArr(taskDB);
    }

    console.clear();

    do {
       opt = await inquirerMenu();
       
        switch (opt) {
            case '1': // create option
                const desc = await readInput('Description:');
                tasks.createTask( desc );
            break;

            case '2':// list tasks
                tasks.listAllTask();
            break;

            case '3': // list completed
                tasks.listPendingCompleted(true);
            break;

            case '4': // list pending
                tasks.listPendingCompleted(false);
            break;

            case '5': // complete tasks | pending
                const ids = await showCheckList( tasks.listArr );
                tasks.toggleCompleted( ids );
            break;

            case '6': // Delete tasks
                const id =  await deleteListTasks( tasks.listArr );
                if ( id !== '0') {
                    const ok = await confirm('¿Are you sure?');
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log(`   \n${'Task deleted'.green}`);
                    }
                }
        break;
        }

        saveDB( tasks.listArr );

       await pause();
    

    } while ( opt != '0' );

    // showMenu(); 
    
    // pause();a

}

main();

