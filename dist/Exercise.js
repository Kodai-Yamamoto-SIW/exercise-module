import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Children } from 'react';
import styles from './styles.module.css';
export function Solution({ children }) {
    return _jsx(_Fragment, { children: children });
}
export default function Exercise({ title, children, solutionTitle = '解答を表示', }) {
    const childrenArray = Children.toArray(children);
    const solutionChild = childrenArray.find((child) => React.isValidElement(child) && child.type === Solution);
    const problemChildren = childrenArray.filter((child) => !(React.isValidElement(child) && child.type === Solution));
    return (_jsxs("div", { className: styles.exerciseSection, children: [_jsx("h3", { children: title }), _jsx("div", { className: styles.exerciseContent, children: problemChildren }), solutionChild && (_jsxs("details", { className: styles.exerciseSolution, children: [_jsx("summary", { children: solutionTitle }), _jsx("div", { className: styles.exerciseSolutionContent, children: React.isValidElement(solutionChild) && solutionChild.props
                            ? solutionChild.props.children
                            : null })] }))] }));
}
