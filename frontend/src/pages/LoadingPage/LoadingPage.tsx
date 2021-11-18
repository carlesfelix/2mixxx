import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLayout from '../../components/PageLayout';
import './LoadingPage.scss';

export default function LoadingPage() {
  return (
    <PageLayout className="LoadingPage" toolbarTitle="Loading...">
      <div className="page-content progress-container">
        <FontAwesomeIcon
          icon={faCircleNotch}
          spin
          className="loading-progress-icon"
        />
      </div>
    </PageLayout>
  );
}