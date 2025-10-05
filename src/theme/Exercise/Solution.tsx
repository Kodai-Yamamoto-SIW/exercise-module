import type {ReactElement, ReactNode} from 'react';

export interface SolutionProps {
  /** 解答として表示する内容 */
  children: ReactNode;
}

export default function Solution({children}: SolutionProps): ReactElement {
  return <>{children}</>;
}
