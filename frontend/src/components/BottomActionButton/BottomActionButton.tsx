import { MouseEventHandler, ReactNode } from 'react'
import './BottomActionButton.scss';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function BottomActionButton(props: Props) {
  const { children, onClick } = props;
  return (
    <div className="BottomActionButton">
      <button
        className="btn btn-primary"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
