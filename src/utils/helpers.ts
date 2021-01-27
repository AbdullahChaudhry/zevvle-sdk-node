/**
 * Throw an error if empty
 * @param value The value to check.
 * @param errorMessage The error message to display.
 */
export function throwErrorIfEmpty(value: any, errorMessage: string): void {
  if (!value) {
    throw new Error(errorMessage)
  }
}
