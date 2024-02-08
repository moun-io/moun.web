export function isValidUrl(string: any) {
  try {
    new URL(string);
    return true; // No error means it's a valid URL
  } catch (error) {
    return false; // Error means it's not a valid URL
  }
}
