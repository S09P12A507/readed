import { IUserProfileInfo } from '../../interfaces/user/IUserProfileInfo';

export async function getMemberProfile(
  memberId: number,
): Promise<IUserProfileInfo> {
  const response = await fetch(
    `https://i9a507.p.ssafy.io/api/members/profile/${memberId}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fetchData: IUserProfileInfo = await response.json();
  return fetchData;
}
