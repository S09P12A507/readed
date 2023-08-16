export interface IReport {
  reportId: number;
  reportTitle: string;
  reportContent: string;
  isPublic: boolean;
  bookId: number;
  bookTitle: string;
  bookCover: string | null;
  memberId: number;
  memberNickname: string;
}
