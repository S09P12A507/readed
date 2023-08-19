// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
/** 베스트셀러
 * @author 박성준
 * @param
 * @returns 베스트셀러
 */

interface TermProps {
  year: number;
  month: number;
  week: number;
}
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

export async function getBestSeller(
  token: string | null,
  term: TermProps,
): Promise<IMainBookResponse | null> {
  let fetchData: IMainBookResponse | null = null;
  const { year, month, week } = term;
  if (typeof token === 'string') {
    const response = await fetch(
      `https://i9a507.p.ssafy.io/api/books/bestsellers/${year}/${month}/${week}`,
      {
        headers: {
          'X-READED-ACCESSTOKEN': token,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network error');
    }

    fetchData = (await response.json()) as IMainBookResponse;
  }

  return fetchData;
}
