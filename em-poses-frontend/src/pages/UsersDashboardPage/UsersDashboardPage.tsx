import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createUser, getAllUsers, updateUser } from '../../api/registered-users';
import AsyncLayout from '../../components/AsyncLayout';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import RegisteredUser from '../../types/RegisteredUser';
import UserFormDialog from './components/UserFormDialog';
import UserItem from './components/UserItem';
import './UsersDashboardPage.scss';

export default function UsersDashboardPage() {
  const [ users, setUsers ] = useState<AsyncState<RegisteredUser[]>>({
    data: [], inProgress: true, error: false
  });
  const [ newUserFormDialog, setNewUserFormDialog ] = useState<DialogState<RegisteredUser>>({
    inProgress: false, isOpen: false
  });
  const [ editUserFormDialog, setEditUserFormDialog ] = useState<DialogState<RegisteredUser>>({
    inProgress: false, isOpen: false
  });
  useEffect(() => {
    getAllUsers().then(data => {
      setUsers({ inProgress: false, error: false, data });
    }).catch(err => {
      setUsers({ inProgress: false, error: err, data: [] });
    })
  }, [ setUsers ]);
  function openNewUserFormDialogHandler(): void {
    setNewUserFormDialog({ isOpen: true, inProgress: false });
  }
  function closeUserFormDialogHandler(): void {
    setNewUserFormDialog({ isOpen: false, inProgress: false });
  }
  function submitUserFormDialogHandler(user: RegisteredUser): void {
    setNewUserFormDialog({ isOpen: true, inProgress: true });
    createUser(user).then(createdUser => {
      setNewUserFormDialog({ isOpen: false, inProgress: false });
      setUsers(old => ({ ...old, data: [ ...old.data, createdUser ] }));
    }).catch(() => {
      setNewUserFormDialog({ isOpen: true, inProgress: false });
    });
  }
  function openEditUserFormDialogHandler(user: RegisteredUser): void {
    setEditUserFormDialog({ isOpen: true, inProgress: false, data: user });
  }
  function closeEditUserFormDialogHandler(): void {
    setEditUserFormDialog({ isOpen: false, inProgress: false });
  }
  function submitEditUserFormDialogHandler(user: RegisteredUser): void {
    setEditUserFormDialog(old => ({ ...old, inProgress: true }));
    updateUser(user).then(() => {
      setEditUserFormDialog({ isOpen: false, inProgress: false });
      setUsers(old => ({
        ...old,
        data: old.data.map(oldUser => {
          if (oldUser.id === user.id) {
            return user;
          }
          return oldUser;
        })
      }));
    }).catch(() => {
      setEditUserFormDialog(old => ({ ...old, inProgress: false }));
    });
  }
  return (
    <div className="UsersDashboardPage">
      <AsyncLayout inProgress={users.inProgress}>
        <div className="user-list-container">
          {
            users.data.map(user => (
              <UserItem
                key={user.id} user={user} className="user-item"
                onDelete={() => {}} onEdit={openEditUserFormDialogHandler}
              />
            ))
          }
        </div>
        <div className="actions-container">
          <button className="btn btn-primary" onClick={openNewUserFormDialogHandler}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add new user</span>
          </button>
        </div>
      </AsyncLayout>
      <UserFormDialog
        state={newUserFormDialog} onClose={closeUserFormDialogHandler}
        onSubmit={submitUserFormDialogHandler}
      />
      <UserFormDialog
        state={editUserFormDialog} onClose={closeEditUserFormDialogHandler}
        onSubmit={submitEditUserFormDialogHandler}
      />
    </div>
  );
}
