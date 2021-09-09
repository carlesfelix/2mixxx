import { Router } from 'express';
import { body, param } from 'express-validator';
import { registeredUserRoles } from '../../../core/constants/user-roles';
import { createUserCtrl, deleteUserCtrl, getAllUsersCtrl, updateUserCtrl } from '../controllers/registered-users';
import { validationErrorMid } from '../middlewares/validation.mid';

const registeredUsersRouter = Router();

registeredUsersRouter.post(
  '/',
  [
    body('email').isEmail(),
    body('role').isIn(Object.values(registeredUserRoles))
  ],
  validationErrorMid,
  createUserCtrl
);

registeredUsersRouter.delete(
  '/:userId',
  [ param('userId').isUUID() ],
  validationErrorMid,
  deleteUserCtrl
);

registeredUsersRouter.get(
  '/',
  getAllUsersCtrl
);

registeredUsersRouter.put(
  '/:userId',
  [
    param('userId').isUUID(),
    body('email').isEmail(),
    body('role').isIn(Object.values(registeredUserRoles))
  ],
  validationErrorMid,
  updateUserCtrl
);

export default registeredUsersRouter;
