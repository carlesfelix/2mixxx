import { Link } from 'react-router-dom';
import Dialog from '../../../../components/Dialog';
import { useTranslation } from '../../../../services/i18n';
import './SongRequestProgressDialog.scss';

type Props = {
  isOpen: boolean;
};
export default function SongRequestProgressDialog(props: Props) {
  const { isOpen } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      isOpen={isOpen}
      title={t('Components.SongRequestProgressDialog.title')}
      className="SongRequestProgressDialog"
      footer={
        <div className="song-request-progress-actions">
          <Link className="btn btn-primary" to="/">
            {t('Components.SongRequestProgressDialog.goBack')}
          </Link>
        </div>
      }>
        <p>{t('Components.SongRequestProgressDialog.sucessMessage')}</p>
      </Dialog>
  );
}
