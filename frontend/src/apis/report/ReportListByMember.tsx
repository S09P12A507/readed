import { IReport } from '../../interfaces/report/IReport';
/** 멤버 독서록 리스트
 * @author 박성준
 * @param
 * @returns reports
 */

export interface IReportResponse {
  data: IReport[];
}

export async function getMemberReport(
  token: string | null,
): Promise<IReportResponse | null> {
  let fetchData: IReportResponse | null = null;
  if (typeof token === 'string') {
    const response = await fetch(
      `https://i9a507.p.ssafy.io/api/reports/members?id=`,
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

    fetchData = (await response.json()) as IReportResponse;
  }
  return fetchData;
}
