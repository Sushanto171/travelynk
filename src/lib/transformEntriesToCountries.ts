/**
 * Transforms an array of key-value pairs (like form entries) into an array of country objects.
 * The input is assumed to be sorted such that each country's 'code' entry is immediately
 * followed by its 'name' entry.
 *
 * @param {Array<[string, string]>} entries - The input array of [key, value] pairs.
 * @returns {Array<{code: string, name: string}>} The resulting array of country objects.
 */

import { ICountry } from "@/types/country.interface";

export function transformEntriesToCountries(entries: [string, FormDataEntryValue][]): ICountry[] {
  const countries: ICountry[] = [];

  // Iterate through the entries, stepping by 2 since each country has a 'code' and 'name'
  for (let i = 0; i < entries.length; i += 2) {
    // Check if the current entry and the next one (for 'name') exist
    if (entries[i] && entries[i + 1]) {
      const codeEntry = entries[i];
      const nameEntry = entries[i + 1];

      // Assuming the value is the second element (index 1) of the inner array
      const countryCode = codeEntry[1];
      const countryName = nameEntry[1];

      countries.push({
        code: countryCode as string,
        name: countryName as string
      });
    }
  }

  return countries;
}