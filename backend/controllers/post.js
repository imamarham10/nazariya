import mongoose from "mongoose";
import PostMessage from "../modals/postMessages.js";

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export const getPosts = async (req,res) =>{
    const { page } = req.query;
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) -1 )*LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});
        const post =await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);
        //console.log(postMessages);
        res.status(200).json({data: post, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    }catch(error){
        res.status(404).json({message: error.message});
    }
}
//QUERY -> /posts?page=1 , page = 1
//PARAMS -> /posts/123 , id = 123
//The RegExp object is used for matching text with a pattern.
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPosts = async (req,res)=>{
    const post = req.body;
    //console.log(req.userId);
    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage );

    }catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async(req,res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    // console.log(req.userId);
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}
