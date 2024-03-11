type ExtractPrefix<str> = str extends `${infer prefix}_${string}`
  ? `${prefix}_`
  : '';

type RemovePrefix<
  prefix extends string,
  str extends string,
> = str extends `${prefix}${infer rest}` ? rest : str;

type SnakeCaseToCamelCase<str extends string> =
  str extends `${infer first}_${infer rest}`
    ? `${first}${Capitalize<SnakeCaseToCamelCase<rest>>}`
    : str;

export type TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  obj extends Record<string, unknown>,
  prefix extends string = ExtractPrefix<keyof obj>,
> = {
  [key in keyof obj as key extends string
    ? SnakeCaseToCamelCase<RemovePrefix<prefix, key>>
    : key]: obj[key];
};
