import express from 'express' ;
import { sendNotification ,getUserNotification, updateNotificationStatus, deleteNotification, markNotificationAsRead } from '../controller/notificationController.js';

const router = express.Router() ;

router.get('/:userId' , getUserNotification) ;
router.patch('/:notificationId' , updateNotificationStatus) ;
router.delete('/:notificationId' , deleteNotification) ;
router.patch('/:notificationId/read', markNotificationAsRead);
router.get('/create' ,sendNotification ) ;



export default router ;