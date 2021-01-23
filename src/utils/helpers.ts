/**
 * Throw an error if empty
 * @param value The value to check.
 * @param errorMessage The error message to display.
 */
export function throwIfEmpty(value: any, errorMessage: string) {
  if (!value) {
    throw new Error(errorMessage)
  }
}
