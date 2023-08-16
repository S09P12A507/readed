package ssafy.readed.domain.bookmark.service;

import java.util.List;
import ssafy.readed.domain.bookmark.controller.dto.DeleteBookmarkListRequestDto;
import ssafy.readed.domain.bookmark.entity.Bookmark;
import ssafy.readed.domain.bookmark.service.dto.BookmarkResponseDto;
import ssafy.readed.domain.member.entity.Member;

public interface BookmarkService {

    void saveBookmark(Long bookId, Member member);

    List<BookmarkResponseDto> selectBookmarkList(Member member);

    void deleteBookmark(Long bookId, Member member);

    void deleteBookmarkInList(Member member, List<DeleteBookmarkListRequestDto> requestDtoList);

    Bookmark getBookmark(Long bookId, Long memberId);
}
