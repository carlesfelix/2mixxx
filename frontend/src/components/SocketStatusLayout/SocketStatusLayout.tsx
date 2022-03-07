import classNames from "classnames";
import { ReactNode } from "react";
import { useTranslation } from "../../services/i18n";
import SocketConnectionStatus from "../../types/SocketConnectionStatus";
import './SocketStatusLayout.scss';

type Props = {
  socketConnectionStatus: SocketConnectionStatus;
  children: ReactNode;
  className?: string;
}
export default function SocketStatusLayout(props: Props) {
  const { socketConnectionStatus, children, className = '' } = props;
  const { t } = useTranslation();
  const error = !socketConnectionStatus.connected && socketConnectionStatus.error;
  const rootClassName = classNames(
    'SocketStatusLayout', className
  );
  return (
    <div className={rootClassName}>
      {
        error ? (
          <div className="layout layout-center-v SocketStatusLayout__error">
            <p className="error-header">
              {t('Components.SocketStatusLayout.errorMessage')}
            </p>
            <p className="error-details">
              {t('Components.SocketStatusLayout.errorDetails', { error })}
            </p>
          </div>
        ) : (
          children
        )
      }
    </div>
  );
}
