package ssafy.readed.domain.bookmark.service;

import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.bookmark.controller.dto.DeleteBookmarkListRequestDto;
import ssafy.readed.domain.bookmark.entity.Bookmark;
import ssafy.readed.domain.bookmark.repository.BookmarkRepository;
import ssafy.readed.domain.bookmark.service.dto.BookmarkResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.service.MemberService;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookRepository bookRepository;
    private final MemberService memberService;

    @Override
    @Transactional
    public void saveBookmark(Long bookId, Member member) {
        Book book = getBook(bookId);
        Member findMember = memberService.getMember(member.getId());

        Bookmark bookmark = Bookmark.builder()
                .book(book)
                .member(findMember)
                .isChecked(true).build();

        findMember.addBookmark(bookmark);
        bookmarkRepository.save(bookmark);
    }


    @Override
    @Transactional
    public List<BookmarkResponseDto> selectBookmarkList(Member member) {
        Member findMember = memberService.getMember(member.getId());
        return BookmarkToBookmarkResponseDto(findMember.getBookmarkList());
    }

    @Override
    @Transactional
    public void deleteBookmark(Long bookId, Member member) {
        Member findMember = memberService.getMember(member.getId());
        Bookmark bookmark = getBookmark(bookId, findMember.getId());

        findMember.deleteBookmark(bookmark.getId());
        bookmarkRepository.deleteById(bookmark.getId());
    }

    @Override
    @Transactional
    public void deleteBookmarkInList(Member member,
            List<DeleteBookmarkListRequestDto> requestDtoList) {
        Member findMember = memberService.getMember(member.getId());

        for (DeleteBookmarkListRequestDto requestDto : requestDtoList) {
            if (!requestDto.getIsChecked()) {
                Bookmark bookmark = getBookmark(requestDto.getBookId(), findMember.getId());

                findMember.deleteBookmark(bookmark.getId());
                bookmarkRepository.deleteById(bookmark.getId());
            }
        }
    }

    @Override
    @Transactional
    public Bookmark getBookmark(Long bookId, Long memberId) {
        return bookmarkRepository.selectBookmarkByBookId(bookId, memberId);
    }

    private Book getBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 책이 존재하지 않습니다.", HttpStatus.BAD_REQUEST));
    }

    private static List<BookmarkResponseDto> BookmarkToBookmarkResponseDto(
            List<Bookmark> bookmarkList) {
        return bookmarkList.stream().filter(bookmark -> bookmark.getIsChecked())
                .map(BookmarkResponseDto::from).toList();
    }


}
