export type ExpandableResult<T> = {
  expand: { [key: string]: never };
} & T;
