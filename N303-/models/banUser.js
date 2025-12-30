const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    phoneNumber : {
        type : String,
        required : true,
        unique : true,
    },
} , {timestamps : true})
const model = mongoose.model("banUser" , schema)
module.exports = model