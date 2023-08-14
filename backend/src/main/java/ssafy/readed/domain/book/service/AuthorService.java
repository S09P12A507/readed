package ssafy.readed.domain.book.service;

import ssafy.readed.domain.book.service.dto.AuthorDetailResponseDto;

public interface AuthorService {

    AuthorDetailResponseDto getDetail(Long authorId);
}
