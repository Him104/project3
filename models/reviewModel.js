const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    bookId: {type: String, required: true, trim: true},
    reviewedBy: {type: String, required: true, trim: true},
    reviewedAt: { type: Date, default: Date.now },
    rating: {type: Number, required: true, min: 1, max: 5},
    review: {type: String, trim: true}, 
    isDeleted: {type:Boolean,default:false}
   
    
    
    }
    , { timestamps: true });
    
    module.exports = mongoose.model('reviews', reviewSchema);   