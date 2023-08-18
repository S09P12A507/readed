import { IBookmark } from '../../interfaces/bookmark/IBookmark';

/** 멤버 코멘트 리스트
 * @author 박성준
 * @param
 * @returns comments
 */

export interface IBookmarkResponse {
  data: IBookmark[];
}

export async function getBookmark(
  token: string | null,
): Promise<IBookmarkResponse | null> {
  let fetchData: IBookmarkResponse | null = null;
  if (typeof token === 'string') {
    const response = await fetch(`https://i9a507.p.ssafy.io/api/bookmarks`, {
      headers: {
        'X-READED-ACCESSTOKEN': token,
        // Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    fetchData = (await response.json()) as IBookmarkResponse;
    // console.log(fetchData);
  }
  return fetchData;
}
