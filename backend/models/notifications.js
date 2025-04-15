import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type : {type : String , enum:['application' , 'invite'] , required:true} ,
    sender : {type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true} ,
    receiver: {type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true} ,
    project : {type:mongoose.Schema.Types.ObjectId , ref: 'Project' ,required:true },
    status : {type:String , enum:['pending', 'accepted' , 'rejected'] , default:'pending'},
    message : {type:String , required : true} ,
    createdAt : {type:Date , default:Date.now} 
});

export default mongoose.model('Notification' , notificationSchema) ;