import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { permissions, registeredUserRoles } from '../../../core/constants/user-roles';
import {
  createUserCtrl, deleteUserCtrl, getAllUsersCtrl,
  updateUserRoleCtrl, userEmailExistsCtrl
} from '../controllers/registered-users';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const registeredUsersRouter = Router();

registeredUsersRouter.post(
  '/',
  userHasSomePermission([ permissions.CREATE_USER ]),
  [
    body('email').isEmail(),
    body('role').isIn(Object.values(registeredUserRoles)),
    body('password').isStrongPassword({
      minLength: 8, minLowercase: 1, minUppercase: 1,
      minSymbols: 1
    })
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
  '/:userId/role',
  userHasSomePermission([ permissions.UPDATE_USER_ROLE ]),
  [
    param('userId').isUUID(),
    body('role').isIn(Object.values(registeredUserRoles))
  ],
  validationErrorMid,
  updateUserRoleCtrl
);

registeredUsersRouter.get(
  '/exists',
  userHasSomePermission([ permissions.CHECK_USER_EXISTS ]),
  [ query('email').isEmail() ],
  validationErrorMid,
  userEmailExistsCtrl
);

export default registeredUsersRouter;
