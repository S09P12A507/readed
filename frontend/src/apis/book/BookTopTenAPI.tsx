// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
/** 리디드 탑텐
 * @author 박성준
 * @param
 * @returns 리디드탑텐
 */

export interface IMainBook {
  bookId: number;
  bookTitle: string;
  coverImage: string;
  avgRating: number;
  author: string;
}

export interface IMainBookResponse {
  data: IMainBook[];
}

export async function getTopTen(
  token: string | null,
): Promise<IMainBookResponse | null> {
  let fetchData: IMainBookResponse | null = null;
  if (typeof token === 'string') {
    const response = await fetch(`https://i9a507.p.ssafy.io/api/books/topten`, {
      headers: {
        'X-READED-ACCESSTOKEN': token,
      },
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    fetchData = (await response.json()) as IMainBookResponse;
  }

  return fetchData;
}
