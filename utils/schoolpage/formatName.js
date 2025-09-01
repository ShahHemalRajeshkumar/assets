export function formatName(name) {
  const parts = name.trim().split(' ');
  if (parts.length === 2) {
    return `${parts[1]} ${parts[0]}`;
  }
  if (parts.length > 2) {
    const lastName = parts.slice(0, parts.length - 1).join(' ');
    const firstName = parts[parts.length - 1];
    return `${firstName} ${lastName}`;
  }
  return name;
}
