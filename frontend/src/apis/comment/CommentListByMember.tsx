import { IComment } from '../../interfaces/comment/IComment';

/** 멤버 코멘트 리스트
 * @author 박성준
 * @param
 * @returns comments
 */

export interface ICommentResponse {
  data: IComment[];
}

export async function getMemberComment(
  token: string | null,
): Promise<ICommentResponse | null> {
  let fetchData: ICommentResponse | null = null;
  if (typeof token === 'string') {
    const response = await fetch(
      `https://i9a507.p.ssafy.io/api/comments/members?id=`,
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

    fetchData = (await response.json()) as ICommentResponse;
  }
  return fetchData;
}
