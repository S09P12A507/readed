import { IUserProfileInfo } from '../../interfaces/user/IUserProfileInfo';
/** 내 프로필만 조회
 * @author 박성준
 * @param
 * @returns profileInfo
 */

// export interface IProifle {
//   bookId: number;
//   bookTitle: string;
//   coverImage: string;
//   avgRating: number;
//   author: string;
// }

export interface IUserProfileInfoResponse {
  data: IUserProfileInfo;
}

export async function getMemberProfile(
  token: string | null,
): Promise<IUserProfileInfoResponse | null> {
  let fetchData: IUserProfileInfoResponse | null = null;
  if (typeof token === 'string') {
    const response = await fetch(
      `https://i9a507.p.ssafy.io/api/members/profile?id=`,
      {
        headers: {
          'X-READED-ACCESSTOKEN': token,
          // Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network error');
    }

    fetchData = (await response.json()) as IUserProfileInfoResponse;
  }
  return fetchData;
}
