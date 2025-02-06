declare module '@splidejs/react-splide' {
  import { ComponentType } from 'react';

  // Usando ComponentProps para obter as propriedades do Splide e SplideSlide
  export const Splide: ComponentType<React.ComponentProps<'div'>>; 
  export const SplideSlide: ComponentType<React.ComponentProps<'div'>>;
}
