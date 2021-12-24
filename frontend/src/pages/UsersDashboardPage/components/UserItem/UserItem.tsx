import { faEllipsisV, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Label from '../../../../components/Label';
import OverlayMenu from '../../../../components/OverlayMenu';
import { getRegisteredUserRoleName } from '../../../../helpers/registered-user-role';
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
  const rootClassNames = classNames(
    'UserItem',
    { [className]: !!className }
  );
  return (
    <Label
      header={
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
      }
      className={rootClassNames}
    >
      <div className="user-content">
        <span className="user-email user-field">
          <span>{user.email}</span>
        </span>
        <span className="user-role user-field">
          <span className="badge badge-secondary">
            {getRegisteredUserRoleName(user.role)}
          </span>
        </span>
        <span className="user-menu user-field">
          <OverlayMenu items={userOptions}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </OverlayMenu>
        </span>
      </div>
    </Label>
  );
}
