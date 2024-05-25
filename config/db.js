const mongoose= require('mongoose');

const connectDB=async()=>{
try {
    await mongoose.connect('mongodb+srv://hydrafan:bQDC12104zJnZo9T@cluster0.61shhop.mongodb.net/')
console.log('connected to mongodb');
} catch (error) {
    console.log(error);
}
}
module.exports= connectDB;