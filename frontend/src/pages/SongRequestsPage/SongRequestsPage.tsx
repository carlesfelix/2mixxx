import BottomLink from '../../components/BottomLink';
import PageLayout from '../../components/PageLayout';
import SocketStatusLayout from '../../components/SocketStatusLayout';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import useSocketConnectionStatus from '../../hooks/useSocketConnectionStatus';
import { useTranslation } from '../../services/i18n';
import SongRequestsPageContent from './components/SongRequestsPageContent';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const { t } = useTranslation();
  const mainSocket = useSocketConnectionManager(environment.REACT_APP_SOCKET_BASE_URI);
  const socketConnectionStatus = useSocketConnectionStatus(mainSocket);

  return (
    <PageLayout
      toolbarTitle={t('Pages.SongRequestsPage.toolbarTitle')}
      className="SongRequestsPage"
      bottomBar={
        <BottomLink to="/new-request">
          {t('Pages.SongRequestsPage.bottomAction')}
        </BottomLink>
      }
    >
      <SocketStatusLayout
        className="page-content SongRequestsPage__content"
        socketConnectionStatus={socketConnectionStatus}
      >
        {
          !!mainSocket && (
            <SongRequestsPageContent mainSocket={mainSocket} />
          )
        }
      </SocketStatusLayout>
    </PageLayout>
  );
}
