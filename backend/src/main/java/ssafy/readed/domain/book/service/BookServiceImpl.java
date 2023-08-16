package ssafy.readed.domain.book.service;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.controller.dto.BestsellerRequestDto;
import ssafy.readed.domain.book.entity.*;
import ssafy.readed.domain.book.repository.BestsellerRepository;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.book.service.dto.BookAuthorResponseDto;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.service.S3FileService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BestsellerRepository bestsellerRepository;
    private final S3FileService s3FileService;

    private final String PATH = "image/book/cover";

    @Override
    public BookDetailResponseDto getDetail(Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new GlobalRuntimeException("해당 ID의 책이 없습니다.", HttpStatus.BAD_REQUEST));
        Publisher publisher = book.getPublisher();
        String bookCoverImageUrl = s3FileService.getS3Url(book.getBookCoverFile());
        String publisherLogoUrl = s3FileService.getS3Url(publisher.getPublisherLogoFile());
        List<BookAuthorResponseDto> bookAuthorResponseDtoList = book.getBookAuthorList().stream().map(bookAuthor -> {
            AuthorProfileFile authorProfileFile = bookAuthor.getAuthor().getAuthorProfileFile();
            String authorImageUrl = s3FileService.getS3Url(authorProfileFile);
            return BookAuthorResponseDto.from(bookAuthor, authorImageUrl);
        }).toList();

        return BookDetailResponseDto.from(book, bookCoverImageUrl, publisherLogoUrl, bookAuthorResponseDtoList);
    }

    @Override
    public List<BookBriefResponseDto> getBestsellerList(BestsellerRequestDto bestsellerRequestDto) {
        Bestseller bestseller = bestsellerRepository.findByYearAndMonthAndWeek(bestsellerRequestDto.getYear(), bestsellerRequestDto.getMonth(), bestsellerRequestDto.getWeek())
                .orElseThrow(() -> new GlobalRuntimeException("해당하는 베스트셀러 목록이 없습니다.", HttpStatus.BAD_REQUEST));

        return bestseller.getBestsellerBookList().stream()
                .limit(10)
                .map(BestsellerBook::getBook)
                .map(book -> {
                    String s3Url = s3FileService.getS3Url(book.getBookCoverFile());
                    return BookBriefResponseDto.from(book, s3Url);
                }).toList();
    }

    @Override
    public List<BookBriefResponseDto> searchBookByTitle(String keyword) {
        List<Book> bookList = bookRepository.findByTitleContainingIgnoreCase(keyword);
        return bookList.stream().map(book -> {
            BookCoverFile bookCoverFile = book.getBookCoverFile();
            return BookBriefResponseDto.from(book, s3FileService.getS3Url(bookCoverFile));
        }).toList();
    }
}
