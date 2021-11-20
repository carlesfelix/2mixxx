import classNames from 'classnames';
import { ReactNode } from 'react';
import { useMe } from '../../contexts/me';
import { logoutGuestMeAction } from '../../contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from '../../contexts/room-user';
import AsyncLayout from '../AsyncLayout';
import Toolbar from '../Toolbar';
import { getMenu } from './helpers';
import './PageLayout.scss';

type Props = {
  children?: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  className?: string;
  inProgress?: boolean;
  error?: Error | null | boolean;
  errorMessage?: string;
};

export default function PageLayout(props: Props) {
  const {
    children, toolbarTitle,
    toolbarLinkBack, className = '',
    error, inProgress, errorMessage
  } = props;
  const { state: meState, dispatch: meDispatch } = useMe();
  const { dispatch: roomUserDispatch } = useRoomUser();
  const menu = getMenu({
    onAbout: aboutHandler,
    onLogOutRegisteredUser: logOutRegisteredUserHandler,
    onLogOutRoomUser: logOutRoomUserHandler,
    me: meState.user,
    meProgress: meState.inProgress
  });
  function aboutHandler(): void {

  }
  function logOutRegisteredUserHandler(): void {

  }
  function logOutRoomUserHandler(): void {
    removeRoomUserAction(roomUserDispatch);
    logoutGuestMeAction(meDispatch);
  }
  const pageLayoutClassName = classNames('PageLayout', {
    [className]: !!className
  });
  return (
    <div className={pageLayoutClassName}>
      <Toolbar
        title={inProgress ? 'Loading...' : toolbarTitle}
        linkBack={toolbarLinkBack} menu={menu}
      />
      <div className="page-container">
        <AsyncLayout
          inProgress={inProgress}
          error={error}
          errorMessage={errorMessage}
        >
          {children}
        </AsyncLayout>
      </div>
    </div>
  );
}
