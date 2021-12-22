import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import './Dialog.scss';

Modal.setAppElement('#root');

type CloseOption = 'escape' | 'clickOutside' | 'closeBtn';
type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  maxWidth?: string;
  className?: string;
  closeOptions?: CloseOption[];
  preventClose?: boolean;
};

export default function Dialog(props: Props) {
  const {
    isOpen = false, children, title, footer, maxWidth,
    closeOptions = [], onClose, preventClose = false,
    className = ''
  } = props;
  function requestCloseHandler(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>): void {
    if (onClose && !preventClose && (
      (closeOptions.includes('clickOutside') && event.type === 'click') || (
        closeOptions.includes('escape') && event.type === 'keydown' &&
        (event as React.KeyboardEvent).key === 'Escape')
      )
    ) {
      onClose();
    }
  }
  function closeHandler(): void {
    onClose && onClose();
  }
  const dialogComponentClassName = classNames(
    'Dialog__component',
    { [className]: !!className }
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestCloseHandler}
      portalClassName="Dialog"
      overlayClassName="dialog-mask"
      className="dialog-content"
      contentLabel="Example Modal"
    >
      <div className={dialogComponentClassName} style={{ maxWidth }}>
        <div className="Dialog__header content-container">
          {
            title && (
              <h2>{title}</h2>
            )
          }
          {
            closeOptions.includes('closeBtn') && (
              <button className="btn close-btn" onClick={closeHandler} disabled={preventClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )
          }
        </div>        
        <div className="Dialog__content content-container">
          {children}
        </div>
        {
          footer && (
            <div className="Dialog__footer content-container">
              {footer}
            </div>
          )
        }
      </div>
    </Modal>
  );
}
