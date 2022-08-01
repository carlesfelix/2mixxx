import PageLayout from "../../components/PageLayout";
import { useTranslation } from "../../services/i18n";
import './NotFoundPage.scss';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <PageLayout className="NotFoundPage">
      <div className="layout layout-center-v">
        <p>{t('Pages.NotFoundPage.notFoundMessage')}</p>
      </div>
    </PageLayout>
  );
}
