import express from 'express';
import { getSiteContent, updateSiteContent } from '../controllers/siteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSiteContent);
router.put('/', protect, updateSiteContent);

export default router;
