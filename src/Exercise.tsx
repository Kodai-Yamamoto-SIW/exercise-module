import React, { Children, ReactElement, ReactNode } from 'react';
import styles from './styles.module.css';

export interface ExerciseProps {
  /** 演習タイトル */
  title: string;
  /** 課題の内容 */
  children: ReactNode;
  /** 解答欄の見出し */
  solutionTitle?: string;
}

export interface SolutionProps {
  /** 解答として表示する内容 */
  children: ReactNode;
}

export function Solution({ children }: SolutionProps): ReactElement {
  return <>{children}</>;
}

export default function Exercise({
  title,
  children,
  solutionTitle = '解答を表示',
}: ExerciseProps): ReactElement {
  const childrenArray = Children.toArray(children);

  const solutionChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Solution,
  );

  const problemChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === Solution),
  );

  return (
    <div className={styles.exerciseSection}>
      <h3>{title}</h3>
      <div className={styles.exerciseContent}>{problemChildren}</div>
      {solutionChild && (
        <details className={styles.exerciseSolution}>
          <summary>{solutionTitle}</summary>
          <div className={styles.exerciseSolutionContent}>
            {React.isValidElement(solutionChild) && solutionChild.props
              ? (solutionChild.props as { children: ReactNode }).children
              : null}
          </div>
        </details>
      )}
    </div>
  );
}
