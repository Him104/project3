const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true,trim: true},
    excerpt: {type: String, required: true, trim: true},
    authorId: {type: String, required: true, trim: true }, 
    ISBN: {type: String, required: true, unique: true, trim: true},
    category: {type: String, required: true, trim: true},
    subcategory: {type: [String]},
    isPublished: {type:Boolean,default:true},
    isDeleted: {type:Boolean,default:false},
    releasedAt: { type: Date, default: Date.now },
    reviews: {type: Number, default: 0}
    
    }
    , { timestamps: true });
    
    module.exports = mongoose.model('books', bookSchema);   