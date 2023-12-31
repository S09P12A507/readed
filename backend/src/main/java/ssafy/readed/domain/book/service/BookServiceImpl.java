package ssafy.readed.domain.book.service;


import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.AuthorProfileFile;
import ssafy.readed.domain.book.entity.BestsellerBook;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.entity.BookCoverFile;
import ssafy.readed.domain.book.entity.Publisher;
import ssafy.readed.domain.book.repository.BestsellerBookRepository;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.book.service.dto.BookAuthorResponseDto;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.domain.bookmark.service.BookmarkService;
import ssafy.readed.domain.comment.entity.Comment;
import ssafy.readed.domain.comment.repository.CommentRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.service.S3FileService;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BestsellerBookRepository bestsellerBookRepository;
    private final BookmarkService bookmarkService;
    private final S3FileService s3FileService;
    private final CommentRepository commentRepository;


    @Override
    public BookDetailResponseDto getDetail(Long bookId, Member member) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new GlobalRuntimeException("해당 ID의 책이 없습니다.", HttpStatus.BAD_REQUEST));
        Publisher publisher = book.getPublisher();
        String bookCoverImageUrl = s3FileService.getS3Url(book.getBookCoverFile());
        String publisherLogoUrl = s3FileService.getS3Url(publisher.getPublisherLogoFile());
        List<BookAuthorResponseDto> bookAuthorResponseDtoList = book.getBookAuthorList().stream()
                .map(bookAuthor -> {
                    AuthorProfileFile authorProfileFile = bookAuthor.getAuthor()
                            .getAuthorProfileFile();
                    String authorImageUrl = s3FileService.getS3Url(authorProfileFile);
                    return BookAuthorResponseDto.from(bookAuthor, authorImageUrl);
                }).toList();
        Boolean isBookmarkCheck = bookmarkService.getBookmark(bookId, member.getId()) != null;

        Comment comment = commentRepository.findByBookAndMember(bookId, member.getId());
        if (comment == null) {
            comment = new Comment();
        }

        return BookDetailResponseDto.from(book, bookCoverImageUrl, publisherLogoUrl,
                bookAuthorResponseDtoList, isBookmarkCheck, comment);
    }

    @Override
    public List<BookBriefResponseDto> getBestsellerList(Integer year, Integer month, Integer week) {
        List<BestsellerBook> bestsellerBookList = bestsellerBookRepository.findTop10(year, month,
                week);

        return bestsellerBookList.stream()
                .map(BestsellerBook::getBook)
                .map(book ->
                        BookBriefResponseDto.from(book,
                                s3FileService.getS3Url(book.getBookCoverFile()))
                ).toList();
    }

    @Override
    public List<BookBriefResponseDto> searchBookByTitle(String keyword) {
        List<Book> bookList = bookRepository.findTop30ByTitleContainingIgnoreCase(keyword);
        return bookList.stream().map(book -> {
            BookCoverFile bookCoverFile = book.getBookCoverFile();
            return BookBriefResponseDto.from(book, s3FileService.getS3Url(bookCoverFile));
        }).toList();
    }

    @Override
    public List<BookBriefResponseDto> getReadedTopTen() {
        return bookRepository.findReadedTop10().stream()
                .map(book ->
                        BookBriefResponseDto.from(book,
                                s3FileService.getS3Url(book.getBookCoverFile())))
                .toList();
    }

    @Override
    public List<BookBriefResponseDto> getRecommendBooks(Integer genreId) {
        return bookRepository.findBooksByRecommendGenre(GenreMapper.getGenre(genreId)).stream()
                .map(book ->
                        BookBriefResponseDto.from(book,
                                s3FileService.getS3Url(book.getBookCoverFile())))
                .toList();
    }
}
