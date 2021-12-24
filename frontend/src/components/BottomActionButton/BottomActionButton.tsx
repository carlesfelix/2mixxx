import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './BottomActionButton.scss';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function BottomActionButton(props: Props) {
  return (
    <div className="BottomActionButton">
      <button {...props} />
    </div>
  );
}
