import express from 'express';

import { AuthToken } from '../../../middlewares';

import { UserController } from '../../../controllers/v1';

const router = express.Router();

const userController = new UserController();

router.post('/', userController.createUser);
router.post('/auth/login', userController.loginUser);
router.get('/', AuthToken.verifyToken, userController.getUser);
router.put('/', AuthToken.verifyToken, userController.updateUser);

export default router;
