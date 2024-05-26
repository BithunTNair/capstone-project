const COURT_SCHEMA= require('../models/courtModel');

const createnewcourt=(req,res)=>{
try {
    const {
        name,
        location,
        type,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description
    }=req.body;
  
    COURT_SCHEMA({
       name:name

    }).save().then((response)=>{
        res.status(200).json({message:'court added successfully'})
    }).catch((err)=>{
res.status(500).json({message:'something went wrong'})
    })
} catch (error) {
    console.log(error);
}
}

module.exports={createnewcourt};