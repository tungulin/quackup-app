declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.ttf';
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
declare module '*.mp3';

interface Window {
  gtag?: (...args: any[]) => void;
}
