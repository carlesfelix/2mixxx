import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import { customStyles } from './constants';
import './Dialog.scss';

Modal.setAppElement('#root');

type CloseOption = 'escape' | 'clickOutside' | 'closeBtn';
type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  className?: string;
  closeOptions?: CloseOption[];
  preventClose?: boolean;
};

export default function Dialog(props: Props) {
  const {
    isOpen = false, children, title, footer, className = '',
    closeOptions = [], onClose, preventClose = false
  } = props;
  const dialogClassName = classNames('card card-primary Dialog', {
    [className]: !!className
  });
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestCloseHandler}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={dialogClassName}>
        <div className="Dialog__header">
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
        <div className="Dialog__content">
          {children}
        </div>
        {
          footer && (
            <div className="Dialog__footer">
              {footer}
            </div>
          )
        }
      </div>
    </Modal>
  );
}
