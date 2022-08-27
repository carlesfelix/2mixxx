import { useEffect, useState } from 'react';
import { createUser, deleteUser, getAllUsers, updateUserRole } from '../../api/registered-users';
import AsyncLayout from '../../components/AsyncLayout';
import BasicButton from '../../components/BasicButton';
import BottomActionWrapper from '../../components/BottomActionWrapper';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import RegisteredUser from '../../types/RegisteredUser';
import UserForm from '../../types/UserForm';
import CreateUserFormDialog from './components/CreateUserFormDialog';
import EditUserRoleFormDialog from './components/EditUserRoleFormDialog';
import UserItem from './components/UserItem';
import './UsersDashboardPage.scss';

export default function UsersDashboardPage() {
  const { t } = useTranslation();
  const [ users, setUsers ] = useState<AsyncState<RegisteredUser[]>>({
    data: [], inProgress: true, error: false
  });
  const [ newUserFormDialog, setNewUserFormDialog ] = useState<DialogState<UserForm>>({
    inProgress: false, isOpen: false
  });
  const [ editUserRoleFormDialog, setEditUserRoleFormDialog ] = useState<DialogState<RegisteredUser>>({
    inProgress: false, isOpen: false
  });
  const [ confirmDeleteUserDialog, setConfirmDeleteUserDialog ] = useState<DialogState<UserForm>>({
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
  function submitUserFormDialogHandler(user: UserForm): void {
    setNewUserFormDialog({ isOpen: true, inProgress: true });
    createUser(user).then(createdUser => {
      setNewUserFormDialog({ isOpen: false, inProgress: false });
      setUsers(old => ({ ...old, data: [ createdUser, ...old.data ] }));
    }).catch(() => {
      setNewUserFormDialog({ isOpen: true, inProgress: false });
    });
  }
  function openEditUserRoleFormDialogHandler(user: RegisteredUser): void {
    setEditUserRoleFormDialog({ isOpen: true, inProgress: false, data: user });
  }
  function closeEditUserRoleFormDialogHandler(): void {
    setEditUserRoleFormDialog({ isOpen: false, inProgress: false });
  }
  function submitEditUserRoleFormDialogHandler(user: RegisteredUser, updatedRole: number): void {
    setEditUserRoleFormDialog(old => ({ ...old, inProgress: true }));
    updateUserRole(user.id!, updatedRole).then(() => {
      setEditUserRoleFormDialog({ isOpen: false, inProgress: false });
      setUsers(old => ({
        ...old,
        data: old.data.map(oldUser => {
          if (oldUser.id === user.id) {
            return {
              ...oldUser,
              role: updatedRole
            };
          }
          return oldUser;
        })
      }));
    }).catch(() => {
      setEditUserRoleFormDialog(old => ({ ...old, inProgress: false }));
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
    <PageLayout
      toolbarTitle={t('Pages.UsersDashboardPage.toolbarTitle')}
      toolbarLinkBack="/"
      className="UsersDashboardPage"
      bottomBar={
        <BottomActionWrapper className="bottom-action">
          <BasicButton onClick={openNewUserFormDialogHandler} color="primary" className="bottom-action-btn">
            {t('Pages.UsersDashboardPage.bottomActionButton')}
          </BasicButton>
        </BottomActionWrapper>
      }
    >
      <div className="page-content UsersDashboardPage__content layout layout-center-v">
        <AsyncLayout
          inProgress={users.inProgress}
          error={users.error}
          errorMessage={t('Pages.UsersDashboardPage.usersLoadError')}
        >
          <div className="user-list-container">
            {
              users.data.map(user => (
                <UserItem
                  key={user.id} user={user} className="user-item"
                  onDelete={openConfirmDeleteUserDialogHandler}
                  onEdit={openEditUserRoleFormDialogHandler}
                />
              ))
            }
          </div>
        </AsyncLayout>
        <CreateUserFormDialog
          state={newUserFormDialog} onClose={closeUserFormDialogHandler}
          onSubmit={submitUserFormDialogHandler}
        />
        <EditUserRoleFormDialog
          state={editUserRoleFormDialog} onClose={closeEditUserRoleFormDialogHandler}
          onSubmit={submitEditUserRoleFormDialogHandler}
        />
        <ConfirmDialog
          message={t('Pages.UsersDashboardPage.confirmDeleteUserDialogTitle')}
          isOpen={confirmDeleteUserDialog.isOpen}
          inProgress={confirmDeleteUserDialog.inProgress}
          onRejected={dismissConfirmDeleteUserDialogHandler}
          onConfirmed={confirmDeleteUserDialogHandler}
        />
      </div>
    </PageLayout>
  );
}
