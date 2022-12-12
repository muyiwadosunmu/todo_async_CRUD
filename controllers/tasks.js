const Task = require('../models/task');
const { createCustomError} = require('../errors/customErrors');


const getAllTasks = async (req,res) => {
    try {
        // Find all Documents
        const tasks = await Task.find({});
        if (!tasks) {
            return res.status(204).json({"message":"No Tasks"})
        }
        res.status(200).json({success:true, data:{tasks}});
        
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

const createTask = async (req, res) => {
    // Create a Task
    if (!req?.body?.name) {
        return res.status(400).json({'message': "Name of task is required"});
    }
    try {
        const result = await Task.create({
            name : req.body.name,
            completed : req.body.completed
        });
        res.status(201).json({result});

    } catch (error) {
        res.status(500).json({msg:error});
        console.log(error);        
    }
};

const getTask = async (req,res, next) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if (!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({msg:error})        
    } 
};

const updateTask = async (req,res) =>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findByIdAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        })
        if (!task) {
            return res.status(404).json({msg:`No task with id :${taskID} `})
        }
        res.status(200).json({id:taskID, data:req.body})
    } catch (error) {
        
    }
};

const deleteTask = async (req,res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task) {
            return next(createCustomError(`No task with id:${taskID}`, 404))
        
        } 
        res.status(200).json({task:null, status:'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}