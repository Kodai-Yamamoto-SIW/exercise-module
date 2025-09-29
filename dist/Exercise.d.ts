import { ReactElement, ReactNode } from 'react';
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
export declare function Solution({ children }: SolutionProps): ReactElement;
export default function Exercise({ title, children, solutionTitle, }: ExerciseProps): ReactElement;
