const Task = require('../models/Tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const createTask = async (req, res) => {
    try {
        const task = await(Task.create(req.body))
        // console.log(req);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg: error});
    }
   
}

const getTask = async (req, res) => {
    try {

        const {id: taskId} = req.params;
        const task = await Task.findOne({ _id: taskId} );
        if(!task) {
            return res.status(404).json({msg: `There is no task with id ${ taskId }`});
        }
        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({msg: error});
    }
    // res.json({ id: req.params.id })
}


const updateTask = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({msg: error});
    }
    // res.send("Update Task")
}


const deleteTask = async (req, res) => {
    try {
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        if(!task) {
            res.status(404).json({msg: `There is no task with id ${task}`});
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({msg: error}); 
    }
    res.send("delete task")
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}