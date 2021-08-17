import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayMenu from '../../../../components/OverlayMenu';
import Library from '../../../../types/Library';
import OptionItem from '../../../../types/OptionItem';
import './LibraryItem.scss';

type Props = {
  library: Library;
};
export default function LibraryItem(props: Props) {
  const { library } = props;
  const { title } = library;
  const menuItems: OptionItem[] = [
    {
      label: 'Edit info',
      value: 1
    },
    {
      label: 'Manage songs',
      value: 2
    },
    {
      label: 'Delete library',
      value: 3
    }
  ];
  return (
    <div className="card card-primary LibraryItem">
      <span className="library-title">
        {title}
      </span>
      <span className="library-menu">
        <OverlayMenu items={menuItems} onSelected={(value) => console.log('selected', value)}>
          <span className="library-menu-btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </span>
        </OverlayMenu>
      </span>
    </div>
  );
}