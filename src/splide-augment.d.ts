declare module "@splidejs/react-splide" {
  import SplideCore from "@splidejs/splide";

  export interface SplideOptions {
    type?: string;
    perPage?: number;
    perMove?: number;
    autoplay?: boolean;
    interval?: number;
    pagination?: boolean;
    arrows?: boolean;
    gap?: string;
    focus?: string;
  }

  interface SplideProps {
    options?: SplideOptions;
  }

  export interface SplideRef {
    splide: SplideCore;
  }
}
