const mongoose= require('mongoose');

const blogpostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    body:{
        type: String,
        required: true
    }
},{
    timestamps:{
        createdAt: "created_At"
    }
});

const BlogPost = mongoose.model("BlogPost" , blogpostSchema, "blogposts");

module.exports = { BlogPost };
