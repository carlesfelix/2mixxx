import classNames from "classnames";
import './DeterminateProgress.scss';

type Props = {
  progress?: number;
  className?: string;
  reverse?: boolean;
};

export default function DeterminateProgress(props: Props) {
  const { progress = 0, className, reverse } = props;
  const rootClassName = classNames(
    'DeterminateProgress', '_svg', className
  );
  const size = 100;
  const stroke = 13;
  const xyPosition = size / 2;
  const radius = xyPosition - stroke;
  const perimeter = 2 * Math.PI * radius;
  function getStrokeOffsetSpace(): number {
    return (((reverse ? 1 : -1) * progress + 100) * perimeter) / 100;
  }
  return (
    <svg height="1em" width="1em" viewBox={`0 0 ${size} ${size}`} className={rootClassName}>
      <circle
        className="_svg-stroke"
        cx={xyPosition}
        cy={xyPosition}
        r={radius}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${perimeter} ${perimeter}`}
        strokeDashoffset={`${getStrokeOffsetSpace()}`}
      />
    </svg>
  );
}
