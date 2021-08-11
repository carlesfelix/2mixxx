import { ReactNode, Suspense } from 'react';

type Props = {
  children: ReactNode;
};
export default function RouteContent(props: Props) {
  const { children } = props;
  return (
    <Suspense fallback={false}>
      {children}
    </Suspense>
  );
}
