/* eslint-disable @typescript-eslint/no-explicit-any */
type Maybe<T> = T | null | undefined;

type VoidLike = void | Promise<void>;

type AnyFunction = (...args: any[]) => any;

type AnyAsyncFunction = (...args: any[]) => Promise<any>;

type FromPromise<T> = T extends Promise<infer U> ? U : T;
