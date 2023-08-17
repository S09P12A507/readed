export interface IReport {
  reportId: number;
  title: string;
  content: string;
  isPublic: boolean;
  bookId: number;
  bookTitle: string;
  bookCover: string | null;
  memberId: number;
  memberNickname: string;
}
