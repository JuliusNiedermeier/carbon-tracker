/**Represents a numeric range with optional minimum and maximum values.*/
export type Range = [number, number?];

/** Represents a mapping of property names to numeric values or ranges. */
export type PropertyMap<T extends string> = Record<T, number | Range>;

/**Extracts a slice of the input array either at a single position or within a range.*/
function slice(array: string[], position: number): string;
function slice(array: string[], range: Range, join: string): string;
function slice(array: string[], at: number | Range, join?: string): string {
  if (!Array.isArray(at)) return array[at < 0 ? array.length + at : at];
  return array.slice(...at).join(join);
}

/**Options for parsing a line of text into an object.*/
interface ParseLineToObjectOptions<T extends string> {
  line: string;
  delimiter: string;
  properties: PropertyMap<T>;
  join: string;
  lineNumber: number;
}

/**Parses a line of text into an object based on the provided options. */
const parseLineToObject = <T extends string>(options: ParseLineToObjectOptions<T>) => {
  const values = options.line.split(options.delimiter).map((value) => value.trim());
  const record: Partial<Record<T, string>> = {};

  Object.keys(options.properties).forEach((property, index) => {
    const at = options.properties[property as T];

    if (!Array.isArray(at)) record[property as T] = slice(values, at);
    else record[property as T] = slice(values, at, options.join);

    if (typeof record[property as T] === 'undefined') {
      throw new Error(
        `Error while parsing line ${options.lineNumber}. Property ${property} at position ${at} is undefined. Values: ${values}`,
      );
    }
  });

  return record as Required<typeof record>;
};

interface ParseCSVOptions<T extends string> extends Omit<ParseLineToObjectOptions<T>, 'line' | 'lineNumber'> {
  csv: string;
}

/**Parses a CSV string into an array of objects based on the provided options. */
export const parseCSV = <T extends string>(options: ParseCSVOptions<T>) => {
  return options.csv
    .split('\n')
    .filter((line) => line.length)
    .map((line, index) => {
      return parseLineToObject({
        line,
        delimiter: options.delimiter,
        properties: options.properties,
        join: options.join,
        lineNumber: index + 1,
      });
    });
};
