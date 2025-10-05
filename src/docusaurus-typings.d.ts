declare module '@theme/Heading' {
  import type {ComponentType, HTMLAttributes, ReactNode} from 'react';

  export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: ReactNode;
  }

  const Heading: ComponentType<HeadingProps>;
  export default Heading;
}