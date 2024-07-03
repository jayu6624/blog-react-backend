import express from 'express';
import { register,login,checkSession,Blogsupload } from '../controllers/user.controllers.js'; // Ensure the correct path

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/session', checkSession);
router.post('/blogs',Blogsupload)


export default router;
