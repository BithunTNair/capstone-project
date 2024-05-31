const mongoose= require('mongoose');
const courtScheduleSchema= mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    slot:{
        type:Object,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    cancellation:{
        type:Array
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

 const courtSchedules=mongoose.model('courtSchedules',courtScheduleSchema);
 courtScheduleSchema.index({date:1,'slot.id':1,courtId:1},{unique:true});
 module.exports=courtSchedules;