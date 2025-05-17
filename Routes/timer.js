import express from 'express';
import { TimeController } from '../Controllers/Time.js';

const router = express.Router();


router.get("/Get_time",TimeController);

export default router