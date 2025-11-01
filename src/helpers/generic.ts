// Generate initials from a full name or separate first/last names
export const getInitials = (
  firstNameOrFullName: string,
  lastName?: string
): string => {
  if (lastName) {
    // Two separate names provided
    const firstInitial = firstNameOrFullName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  // Single full name provided - split by space
  const names = firstNameOrFullName
    .trim()
    .split(" ")
    .filter((n) => n.length > 0);

  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  // Take first and last name from the full name
  const firstInitial = names[0].charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};
