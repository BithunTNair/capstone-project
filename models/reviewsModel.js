const mongoose = require('mongoose');
const reviewSchema= mongoose.Schema({
userId:{
    type:mongoose.Types.ObjectId,
    // required:true,
    ref:'users'
},
courtId:{
    type:mongoose.Types.ObjectId,
    // required:true,
    ref:'courts'
},
rating:{
    type:Number,
    min:1,
    max:5
},
comment:{
    type:String,
},
createdOn:{
    type:Date,
    default:new Date()
}
})

const reviews= mongoose.model('reviews',reviewSchema);
module.exports=reviews