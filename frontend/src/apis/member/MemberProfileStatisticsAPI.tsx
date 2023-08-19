import { IUserProfileStatistics } from '../../interfaces/user/IUserProfileStatistics';
/** 내 프로필만 조회
 * @author 박성준
 * @param
 * @returns profileInfo statistics
 */

export interface IUserProfileStatisticsResponse {
  data: IUserProfileStatistics;
}

export async function getMemberProfileStatistics(
  token: string | null,
): Promise<IUserProfileStatisticsResponse | null> {
  let fetchData: IUserProfileStatisticsResponse | null = null;
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

    fetchData = (await response.json()) as IUserProfileStatisticsResponse;
  }
  return fetchData;
}
