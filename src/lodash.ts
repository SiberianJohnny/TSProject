declare module 'lodash.debounce' {

  export type voidFunc = () => void;

  export interface OptionsTypes {
    'leading'?: boolean,
    'maxWait'?: number,
    'trailing'?: boolean
  }

  export type Fn = {
    (): void
    cancel(): void;
  }

  export default function debounce(fn: voidFunc, wait: number, options?: OptionsTypes): Fn
}