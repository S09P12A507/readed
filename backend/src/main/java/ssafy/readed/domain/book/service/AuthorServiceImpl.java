package ssafy.readed.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Author;
import ssafy.readed.domain.book.repository.AuthorRepository;
import ssafy.readed.domain.book.service.dto.AuthorDetailResponseDto;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.service.S3FileService;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final S3FileService s3FileService;

    private final String PATH = "image/author/profile/";

    @Override
    public AuthorDetailResponseDto getDetail(Long authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(() -> new GlobalRuntimeException("해당 ID의 저자가 없습니다", HttpStatus.NOT_FOUND));
        String s3Url = s3FileService.getS3Url(author.getAuthorProfileFile().getSavedPath(), author.getAuthorProfileFile().getSavedFilename());
        return AuthorDetailResponseDto.from(author, s3Url);
    }
}
