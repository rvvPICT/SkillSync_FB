import express from 'express' ;
import { sendNotification ,getUserNotification, updateNotificationStatus } from '../controller/notificationController.js';

const router = express.Router() ;

router.get('/:userId' , getUserNotification) ;
router.patch('/:notificationId' , updateNotificationStatus) ;
router.get('/create' ,sendNotification ) ;


export default router ;