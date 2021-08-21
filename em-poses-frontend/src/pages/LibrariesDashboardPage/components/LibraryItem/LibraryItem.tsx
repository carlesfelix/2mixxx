import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayMenu from '../../../../components/OverlayMenu';
import Library from '../../../../types/Library';
import { getLibraryMenu } from '../../helpers';
import './LibraryItem.scss';

type Props = {
  library: Library,
  onStartEdit: (value: Library) => void;
  onStartDelete: (value: Library) => void;
};
export default function LibraryItem(props: Props) {
  const { library, onStartDelete, onStartEdit } = props;
  const { title } = library;
  const libraryMenu = getLibraryMenu({
    onDeleteLibrary: deleteLibraryHandler, onEditInfo: editInfoHandler
  });
  function deleteLibraryHandler(): void {
    onStartDelete(library);
  }
  function editInfoHandler(): void {
    onStartEdit(library);
  }
  return (
    <div className="card card-primary LibraryItem">
      <span className="library-title">
        {title}
      </span>
      <span className="library-menu">
        <OverlayMenu items={libraryMenu}>
          <span className="library-menu-btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </span>
        </OverlayMenu>
      </span>
    </div>
  );
}
