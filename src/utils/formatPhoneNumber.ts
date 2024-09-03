export function maskPhoneNumber(phoneNumber: string): string {
  const lastFourDigits = phoneNumber.slice(-4)
  return `**** ${lastFourDigits}`
}

export function formatPhoneNumberWithSpaces(phoneNumber: string): string {
  if (phoneNumber.length !== 10) {
    throw new Error('Phone number must be 10 digits long')
  }

  const part1 = phoneNumber.slice(0, 4)
  const part2 = phoneNumber.slice(4, 7)
  const part3 = phoneNumber.slice(7, 10)

  return `${part1} ${part2} ${part3}`
}

export function formatPhoneNumberWithDashes(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length !== 10) {
    throw new Error('Phone number must be 10 digits long');
  }

  const areaCode = cleaned.slice(0, 3);
  const centralOfficeCode = cleaned.slice(3, 6);
  const lineNumber = cleaned.slice(6, 10);

  return `${areaCode} ${centralOfficeCode}-${lineNumber}`;
}