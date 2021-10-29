import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createUser, deleteUser, getAllUsers, updateUser } from '../../api/registered-users';
import AsyncLayout from '../../components/AsyncLayout';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
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
  const [ confirmDeleteUserDialog, setConfirmDeleteUserDialog ] = useState<DialogState<RegisteredUser>>({
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
  function openConfirmDeleteUserDialogHandler(user: RegisteredUser): void {
    setConfirmDeleteUserDialog({ isOpen: true, inProgress: false, data: user });
  }
  function dismissConfirmDeleteUserDialogHandler(): void {
    setConfirmDeleteUserDialog({ isOpen: false, inProgress: false });
  }
  function confirmDeleteUserDialogHandler(): void {
    const { data } = confirmDeleteUserDialog;
    setConfirmDeleteUserDialog(old => ({ ...old, inProgress: true }));
    if (data) {
      deleteUser(data.id!).then(() => {
        setConfirmDeleteUserDialog({ isOpen: false, inProgress: false });
        setUsers(old => ({
          ...old,
          data: old.data.filter(({ id }) => id !== data.id)
        }));
      }).catch(() => {
        setConfirmDeleteUserDialog(old => ({ ...old, inProgress: false }));
      });
    }
  }
  return (
    <PageLayout toolbarTitle="Users" toolbarLinkBack="/dashboard">
      <div className="UsersDashboardPage">
        <AsyncLayout inProgress={users.inProgress}>
          <div className="user-list-container">
            {
              users.data.map(user => (
                <UserItem
                  key={user.id} user={user} className="user-item"
                  onDelete={openConfirmDeleteUserDialogHandler}
                  onEdit={openEditUserFormDialogHandler}
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
        <ConfirmDialog
          message="User will be deleted"
          isOpen={confirmDeleteUserDialog.isOpen}
          inProgress={confirmDeleteUserDialog.inProgress}
          onRejected={dismissConfirmDeleteUserDialogHandler}
          onConfirmed={confirmDeleteUserDialogHandler}
        />
      </div>
    </PageLayout>
  );
}
