const inquirer = require('inquirer');
const Task = require('../models/task');
require('colors');

const questions = [
    {   
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Create tasks`
            },
            {
                value: '2',
                name: `${'2.'.yellow} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.yellow} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.yellow} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Exit`
            }
        ]
    }
]




const inquirerMenu = async() => {

    console.clear();
    console.log('=================='.yellow);
    console.log(' Choose an option '.white);
    console.log('==================\n'.yellow);

    const { option } = await inquirer.prompt(questions);

    return option;

}

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.yellow} to continue!`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
 
}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );
    return desc;
}


const deleteListTasks = async( tasks = []) => {


    const choices = tasks.map( (task, i) => {

        const index = `${i + 1}.`.yellow;
        return {
            value: task.id,
            name: `${ index} ${ task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.yellow + ' Cancel'
    })

    const question =  [
        {
            type: 'list',
            name: 'id',
            message: 'delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);
    
    return id;
}

const confirm = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    
    return ok;

}


const showCheckList = async( tasks = []) => {


    const choices = tasks.map( (task, i) => {

        const index = `${i + 1}.`.yellow;
        return {
            value: task.id,
            name: `${ index} ${ task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });

    const question =  [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'selections',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteListTasks,
    confirm,
    showCheckList
}