const Task = require('../models/Tasks');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({});
        // different options

        // res.status(200).json({tasks});
        // res.status(200).json({ tasks, amount: tasks.length });
        res.status(200).json({ status: 'success', data: { tasks, numberHits: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
        const task = await(Task.create(req.body))
        // console.log(req);
        res.status(201).json({ task });
   
})

const getTask = asyncWrapper(async (req, res) => {
        const {id: taskId} = req.params;
        const task = await Task.findOne({ _id: taskId} );
        if(!task) {
            return res.status(404).json({msg: `There is no task with id ${ taskId }`});
        }
        res.status(200).json({ task });
    // res.json({ id: req.params.id })
})


const updateTask = asyncWrapper(async (req, res) => {
        const {id: taskId} = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body,{
            // option
            new: true,
            runValidators: true,
        });
        if(!task) {
            return res.status(404).json({msg: `There is no task with id ${ taskId }`});
        }
        res.status(200).json({ task });
    // res.send("Update Task")
})


const deleteTask = asyncWrapper(async (req, res) => {
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        if(!task) {
            res.status(404).json({msg: `There is no task with id ${task}`});
        }
        res.status(200).json({ task });
    res.send("delete task")
})

// const editTask = async (req, res) => {

// }


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}