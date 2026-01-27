import express from 'express';
import { signup, login, recoverPassword, verifyResetCode, resetPassword, authorizeMachine } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/recover', recoverPassword);
router.post('/verify-code', verifyResetCode);
router.post('/reset-password', resetPassword);

router.post('/authorize-machine', authorizeMachine);

export default router;