import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { permissions, registeredUserRoles } from '../../../core/constants/user-roles';
import {
  createUserCtrl, deleteUserCtrl, getAllUsersCtrl,
  updateUserCtrl, userEmailExistsCtrl
} from '../controllers/registered-users';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const registeredUsersRouter = Router();

registeredUsersRouter.post(
  '/',
  userHasSomePermission([ permissions.CREATE_USER ]),
  [
    body('email').isEmail(),
    body('role').isIn(Object.values(registeredUserRoles))
  ],
  validationErrorMid,
  createUserCtrl
);

registeredUsersRouter.delete(
  '/:userId',
  userHasSomePermission([ permissions.DELETE_USER ]),
  [ param('userId').isUUID() ],
  validationErrorMid,
  deleteUserCtrl
);

registeredUsersRouter.get(
  '/',
  userHasSomePermission([ permissions.GET_ALL_USERS ]),
  getAllUsersCtrl
);

registeredUsersRouter.put(
  '/:userId',
  userHasSomePermission([ permissions.UPDATE_USER ]),
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
  userHasSomePermission([ permissions.CHECK_USER_EXISTS ]),
  [ query('email').isEmail() ],
  validationErrorMid,
  userEmailExistsCtrl
);

export default registeredUsersRouter;
