// Return frist item of array
type Head<T> = T extends [infer I, ...infer _Rest] ? I : never;

// This generic takes an array and returns all items exclude the first one.
type Tail<T> = T extends [infer _I, ...infer Rest] ? Rest : never;

type Zip_DeepMergeTwoTypes<T, U> = T extends []
  ? U
  : U extends []
  ? T
  : [
      DeepMergeTwoTypes<Head<T>, Head<U>>,
      ...Zip_DeepMergeTwoTypes<Tail<T>, Tail<U>>
    ];

/*
* Get all unique keys from A,B types (remove common keys in types).
  *
type A = { key1: null; key2: string;}
type B = { key1: string; key3: string;}
type C = GetObjDifferentKeys<A,B>
C = { key2: string; key3: string; }
*/
type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;
/*
* Get same keys in A,B types.
  *
type A = { key1: null; key2: string;}
type B = { key1: string; key3: string;}
type C = GetObjSameKeys<A,B>
C = { key1: null | string; }
*/
type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;

/*
* Merge two types togather, using reccursion
  *
type A = { key1: null; key2: string;}
type B = { key1: string; key3: string;}
type C = GetObjSameKeys<A,B>
C = { key1: null | string; key2: string; key3: string; }
  */
type MergeTwoObjects<T, U> = Partial<GetObjDifferentKeys<T, U>> &
  // Run reccursion to DeepMergeTwoTypes
  { [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]> };

// it merge 2 static types and try to avoid of unnecessary options (`'`)
export type DeepMergeTwoTypes<T, U> =
  // ----- 2 added lines ------
  [T, U] extends [any[], any[]]
    ? Zip_DeepMergeTwoTypes<T, U>
    : // check if generic types are objects
    [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }]
    ? MergeTwoObjects<T, U>
    : T | U;
