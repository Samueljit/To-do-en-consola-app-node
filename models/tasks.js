const Task = require("./task");


class Tasks {

    _list = {};

    get listArr() {

        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task )
        } )

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ){

        if (this._list[id]) {
            delete this._list[id];
        }

    }

    loadTasksFromArr( tasks = []) {

        tasks.forEach( task => {
            this._list[task.id] = task;
       });
    }

    createTask( desc = '' ) {

        const task = new Task(desc);
        this._list[task.id] = task;

    }

    listCompleted() {

        console.log();
        this.listArr.forEach( (task, i) => {

            const idx = `${i + 1}`.yellow;
            const { desc, completedIn } = task;
            const status = ( completedIn )
                                ? 'Completed'.green
                                : 'Pending status'.red;

            console.log(`${ idx } ${ desc } ${status}`);


        });
    }

    listPendingCompleted( completed = true ) {

        console.log();
        let index = 0;
        this.listArr.forEach( (task) => {

            const { desc, completedIn } = task;
            const status = ( completedIn )
                                ? 'Completed'.green
                                : 'Pending status'.red;
            if ( completed ) {
                if (completedIn) {
                    index += 1;
                    console.log(`${ index.toString().yellow }${'.'.yellow} ${ desc } ${completedIn.green}`);
                }
            } else {
                if (!completedIn) {
                    index += 1;
                    console.log(`${ index.toString().yellow}${'.'.yellow} ${ desc } ${status}`);
                }
            }
                            });
    }


    toggleCompleted ( ids = [] ){

        ids.forEach( id => {

            const task = this._list[id];
            if ( !task.completedIn ){
                task.completedIn = new Date().toISOString();
            }

        });

        this.listArr.forEach( task => {

            if ( !ids.includes(task.id) ) {
                this._list[task.id].completedIn = null
            }

        });

    }
}




module.exports = Tasks;