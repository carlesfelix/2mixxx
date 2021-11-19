import PageLayout from '../../components/PageLayout';
import './LoadingPage.scss';

export default function LoadingPage() {
  return (
    <PageLayout
      className="LoadingPage"
      inProgress
    />
  );
}