/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// Extend Window interface for custom methods
interface Window {
  openPhotoModal: (index: number) => void;
  closePhotoModal: () => void;
}

// Define custom JSX namespace for Astro
declare namespace astroHTML.JSX {
  // This allows standard HTML attributes like `class`
  // and Astro directives like `is:inline`
  interface HTMLAttributes extends astro.JSX.HTMLAttributes {
    [key: string]: any;
  }

  // Base HTML attributes interface that accepts 'class' and other HTML attributes
  interface HTMLAttributes extends astro.JSX.HTMLAttributes {
    class?: string;
    id?: string;
    title?: string;
    tabindex?: number | string;
    lang?: string;
    dir?: string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean | string;
    'data-*'?: string;
    style?: string;
    slot?: string;
    part?: string;
  }

  // HTML Element interfaces for specific tags
  interface AnchorHTMLAttributes extends HTMLAttributes {
    href?: string;
    target?: string;
    rel?: string;
    download?: any;
    hreflang?: string;
    referrerpolicy?: string;
  }

  interface ImgHTMLAttributes extends HTMLAttributes {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'auto' | 'sync';
    crossorigin?: string;
  }

  interface TimeHTMLAttributes extends HTMLAttributes {
    datetime?: string;
  }

  interface ScriptHTMLAttributes extends HTMLAttributes {
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
    charset?: string;
    'is:inline'?: boolean;
  }

  interface StyleHTMLAttributes extends HTMLAttributes {
    'is:global'?: boolean;
    'is:inline'?: boolean;
    media?: string;
  }

  interface MetaHTMLAttributes extends HTMLAttributes {
    name?: string;
    content?: string;
    charset?: string;
    'http-equiv'?: string;
    property?: string;
  }

  interface LinkHTMLAttributes extends HTMLAttributes {
    href?: string;
    rel?: string;
    type?: string;
    media?: string;
    crossorigin?: string | boolean;
    integrity?: string;
    as?: string;
  }

  interface ButtonHTMLAttributes extends HTMLAttributes {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
  }

  interface InputHTMLAttributes extends HTMLAttributes {
    type?: string;
    name?: string;
    value?: string | number | readonly string[];
    checked?: boolean;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    multiple?: boolean;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    pattern?: string;
    accept?: string;
    capture?: boolean | string;
    autocomplete?: string;
    autofocus?: boolean;
    enterkeyhint?: string;
    inputmode?: string;
  }

  interface CanvasHTMLAttributes extends HTMLAttributes {
    width?: number | string;
    height?: number | string;
  }

  interface IframeHTMLAttributes extends HTMLAttributes {
    src?: string;
    srcdoc?: string;
    name?: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    frameborder?: number | string;
    allow?: string;
    allowfullscreen?: boolean;
    sandbox?: string;
    referrerpolicy?: string;
  }

  // Ensure other Astro-specific directives are recognized if needed
  interface IntrinsicAttributes {
    "set:html"?: any;
    "set:text"?: any;
    "is:raw"?: boolean;
  }
}