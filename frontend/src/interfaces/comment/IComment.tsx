export interface IComment {
  id: number;
  memberId: number;
  bookId: number;
  commentContent: string;
  rating: number;
  likeCount: number;
  isSpoiler: false;
  bookTitle: string;
  bookCover: string;
  memberNickname: string;
  isLiked: boolean;
}
