import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
 blog_title:{
    type:String,
    require:true
 },
 blog_logo:{
    type:String,
    require:true
 },
 description:{
    type:String,
    require:true
 }
});

export const Blogs = mongoose.model("Blogs", BlogSchema);
