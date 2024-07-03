import express from 'express';
import sessionMiddleware from 'express-session';
import { User } from '../models/user.model.js';
import { Blogs } from '../models/blogs.model.js';

const app = express();

// Session middleware configuration
app.use(sessionMiddleware({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { username, email, password, fullname } = req.body;
    console.log("Username:", username);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json("User already exists");
    }

    const createUser = new User({
      email,
      username,
      password,
      fullname
    });
    await createUser.save();
    return res.status(200).json("Signup successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    req.session.user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      }
    });
  } catch (error) {
    console.log("Error: " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkSession = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      message: "User is logged in",
      user: req.session.user,
    });
  } else {
    return res.status(401).json({ message: "User is not logged in" });
  }
};

const Blogsupload = async(req,res)=>{
  try {
  
    const {blog_title,blog_logo,description} = req.body;
    const Blogcreate = new Blogs({
      blog_title,
      blog_logo,
      description
    });
    console.log("blog is created ");
    await Blogcreate.save();
    return res.status(200).json("Blod created successfully");

  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error in blog section");
  }
}

export { register, login, checkSession,Blogsupload };