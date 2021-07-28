import './Toolbar.scss';

type Props = {
  title: string;
  link?: string;
};
export default function Toolbar(props: Props) {
  const { title } = props;
  return (
    <nav className="Toolbar">
      <span>
        {title}
      </span>
    </nav>
  );
}