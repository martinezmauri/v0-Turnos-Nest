// utils/generate-avatar.ts
export function generateAvatarUrl(fullName: string) {
  const encodedName = encodeURIComponent(fullName);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&rounded=true&length=2`;
}
