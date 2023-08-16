export async function delLogout(
  accessToken: string | null,
  refreshToken: string | null,
) {
  const headers = new Headers();
  headers.append('X-READED-ACCESSTOKEN', accessToken || ''); // Handle null values
  headers.append('X-READED-REFRESHTOKEN', refreshToken || ''); // Handle null values
  const response = await fetch(`https://i9a507.p.ssafy.io/api/members/logout`, {
    headers,
  });
  if (!response.ok) {
    throw new Error('Network error');
  }
}
