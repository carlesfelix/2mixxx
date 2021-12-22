import { Link, LinkProps } from 'react-router-dom';
import './BottomLink.scss';

type Props = LinkProps;

export default function BottomLink(props: Props) {
  return (
    <div className="BottomLink">
      <Link
        className="btn btn-primary BottomLink__link "
        {...props}
      />
    </div>
  );
}
