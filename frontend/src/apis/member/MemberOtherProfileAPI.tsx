import { IUserProfileInfo } from '../../interfaces/user/IUserProfileInfo';

/** 다른 사람 프로필 조회
 * @author 박성준
 * @param {string} memberId 조회하고자 하는 멤버의 id값(string)
 * @returns profileInfo
 */

export async function getMemberProfile(
  memberId: string,
): Promise<IUserProfileInfo> {
  const response = await fetch(
    `https://i9a507.p.ssafy.io/api/members/profile?id=${memberId}`,
    // `http://localhost:8081/api/members/profile?id=${memberId}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Network error');
  }

  const fetchData: IUserProfileInfo =
    (await response.json()) as IUserProfileInfo;

  return fetchData;
}
