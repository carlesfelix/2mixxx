import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { registeredUserRoles } from '../../../core/constants/user-roles';
import {
  createUserCtrl, deleteUserCtrl, getAllUsersCtrl,
  updateUserCtrl, userEmailExistsCtrl
} from '../controllers/registered-users';
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

registeredUsersRouter.get(
  '/exists',
  [ query('email').isEmail() ],
  validationErrorMid,
  userEmailExistsCtrl
);

export default registeredUsersRouter;
