import express from 'express';
import { submitInquiry, getAllInquiries } from '../controllers/inquiryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitInquiry);
router.get('/', protect, getAllInquiries);

export default router;
