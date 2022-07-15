export type AnyValueType = string | number | boolean | AnyObjectType;
export type AnyObjectType = {
  [key: string]: AnyValueType;
};

export type DispatcherType<T = string | AnyObjectType> =
  | string
  | ((s: any) => any)
  | ((s: T) => T extends string ? T : typeof s[keyof typeof s]);

export type CaseFunctionType = (...args: any) => any;
export interface ISvitchCase {
  [key: string]: CaseFunctionType;
}
