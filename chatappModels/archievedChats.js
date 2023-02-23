const Sequelize=require('sequelize');
const sequelize=require('../chatappUtil/database');
const ArchievedChat=sequelize.define('archievedChat',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false,
        
       },
    
message:{
    type:Sequelize.STRING,
    allowNull:false
},
name:{
    type:Sequelize.STRING
},

})
module.exports=ArchievedChat