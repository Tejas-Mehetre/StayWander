const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review");
const user = require("./user");

const listingSchema = new schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1948&q=80",
        set : (v) =>
        v === "" ? "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1948&q=80" : v,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [{
        type : schema.Types.ObjectId,
        ref : "Review",
    }],
    owner :{
        type : schema.Types.ObjectId,
        ref : "user",
    },
});

module.exports = mongoose.model('listing', listingSchema);
