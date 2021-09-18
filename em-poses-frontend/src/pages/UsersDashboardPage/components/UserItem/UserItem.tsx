import { faEllipsisV, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import OverlayMenu from '../../../../components/OverlayMenu';
import RegisteredUser from '../../../../types/RegisteredUser';
import { getUserOptions } from '../../helpers';
import './UserItem.scss';

type Props = {
  user: RegisteredUser;
  className?: string;
  onEdit: (user: RegisteredUser) => void;
  onDelete: (user: RegisteredUser) => void;
};

export default function UserItem(props: Props) {
  const { user, className = '', onEdit, onDelete } = props;
  const rootClassNames = classNames('UserItem card card-primary', { [className]: !!className });
  const userOptions = getUserOptions({
    onDelete: deleteHandler,
    onEdit: editHandler
  });

  function deleteHandler(): void {
    onDelete(user);
  }
  function editHandler(): void {
    onEdit(user);
  }
  return (
    <div className={rootClassNames}>
      <span className="user-icon user-field">
        <FontAwesomeIcon icon={faUser} />
      </span>
      <span className="user-email user-field">
        <span>{user.email}</span>
      </span>
      <span className="user-role user-field">
        {user.role}
      </span>
      <span className="user-menu user-field">
        <OverlayMenu items={userOptions}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </OverlayMenu>
      </span>
    </div>
  );
}
