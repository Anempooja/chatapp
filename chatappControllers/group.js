
const Group=require('../chatappModels/group')

const UserGroup=require('../chatappModels/userGroup')

const Chat=require('../chatappModels/chat')
const User = require('../chatappModels/user')

exports.addgroup=async(req,res,next)=>{
    console.log(req.body.groupName)
var groupName=req.body.groupName
var createdBy=req.body.createdBy
Group.create({name:groupName,createdBy:createdBy})
.then((response)=>{
    //console.log('response',response.id)
    const userIds=req.body.userIds
    for(var i=0;i<userIds.length;i++){
        UserGroup.create({userId:userIds[i],groupId:response.id})

    }
    res.json({message:'successfully added'})
   
})
}
exports.findGroup=async(req,res,next)=>{
    const userId=req.params.userId
   // console.log(userId)
    
   const groups=await UserGroup.findAll({where:{userId:userId}})
   const groupId=[]
   for(var i=0;i<groups.length;i++){
    groupId.push(groups[i].groupId)
   }
  // console.log(groupId,'ids')
   const groupName=[]
   for(var i=0;i<groupId.length;i++){
    const groupname=await Group.findAll({where:{id:groupId[i]}})
    groupName.push({name:groupname[0].name,id:groupId[i],createdBy:groupname[0].createdBy})

   }
   //console.log(groupName)
   res.status(200).json({groupName:groupName})
    
}

exports.groupChat=async(req,res,next)=>{
    const groupId=req.params.groupId
    console.log(groupId)
    const chat=await Chat.findAll({where:{groupId:groupId}})
    res.status(200).json({chat:chat})
}

exports.findUsers=async(req,res,next)=>{
    const groupId=req.params.groupId
    const users=await UserGroup.findAll({where:{groupId:groupId}})
    const userIds=[]
    const user=[]
    for(var i=0;i<users.length;i++){
        user.push(users[i])
        userIds.push(users[i].userId)
    }
    // console.log(userIds)
    res.status(200).json({userIds,user})
}
exports.deleteUser=async(req,res,next)=>{
    const groupId=req.params.groupId
    const user=req.params.option
    await UserGroup.destroy({where:{groupId:groupId,userId:user}})
    .then((response)=>{
        console.log(response)
       
    })
}