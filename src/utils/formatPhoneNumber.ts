export function hidePhoneNumber(phoneNumber: string): string {
  const lastFourDigits = phoneNumber.slice(-4)
  const formattedNumber = `**** ${lastFourDigits}`
  return formattedNumber
}

export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length !== 10) {
    throw new Error('Phone number must be 10 digits long')
  }

  const part1 = phoneNumber.slice(0, 4)
  const part2 = phoneNumber.slice(4, 7)
  const part3 = phoneNumber.slice(7, 10)

  return `${part1} ${part2} ${part3}`
}
