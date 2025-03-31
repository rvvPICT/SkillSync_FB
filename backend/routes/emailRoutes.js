import express from 'express' ;
import { verifyEmail } from '../controller/emailController.js' ;


const router = express.Router() ;

router.get('/verify' , verifyEmail) ;

export default router