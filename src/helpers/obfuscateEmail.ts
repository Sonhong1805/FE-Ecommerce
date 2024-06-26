export const obfuscateEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const visiblePart = localPart.slice(0, 2);
  const obfuscatedPart = visiblePart + "*".repeat(localPart.length - 2);
  return obfuscatedPart + "@" + domain;
};
