const USER = require("../models/users");

async function handleCreateTask(req,res){
   const {assignTo , ...taskData} = req.body;
   const user = await USER.findOneAndUpdate({
      fullname : assignTo
   },{$push: { "userTasks.newTask.tasks": taskData }
   , $inc : {"userTasks.newTask.value" : 1 }
},{new : true})
   if(!user) return res.json({message : "Masla hai boss"})
   return res.json(user)
}

async function handleUpdateTask(req,res){
   const {btn,task} = req.body;
   const userTaskUpdated = await USER.findOneAndUpdate(
      { fullname: req.user.fullname },
      { 
         $push: { [`userTasks.${btn}.tasks`] : task } ,
         $inc : { 
            [`userTasks.${btn}.value`] : 1,
            "userTasks.newTask.value" : -1 
         },
         $pull: { "userTasks.newTask.tasks": {_id : task._id }}
      },
      { new: true }
   );
   console.log(task)
   return res.json(userTaskUpdated)
}

module.exports = {
   handleCreateTask,
   handleUpdateTask
}