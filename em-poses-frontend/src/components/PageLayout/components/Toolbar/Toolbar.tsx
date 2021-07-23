import './Toolbar.scss';

type Props = {
  title: string;
  link?: string;
};
export default function Toolbar(props: Props) {
  const { title, link } = props;
  return (
    <nav className="Toolbar">
      <span>
        {title}
      </span>
    </nav>
  );
}