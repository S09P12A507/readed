package ssafy.readed.domain.comment.service;

import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.comment.controller.dto.CommentRequestDto;
import ssafy.readed.domain.comment.entity.Comment;
import ssafy.readed.domain.comment.repository.CommentRepository;
import ssafy.readed.domain.comment.repository.LikeRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public void saveComment(Long bookId, Member member, CommentRequestDto commentRequestDto) {
        Book book = getBook(bookId);

        Comment comment = Comment.builder()
                .member(member)
                .book(book)
                .commentContent(commentRequestDto.getCommentContent())
                .rating(commentRequestDto.getRating())
                .likeCount(0L)
                .isSpoiler(commentRequestDto.getIsSpoiler())
                .build();

        commentRepository.save(comment);
    }

    @Override
    public CommentResponseDto selectComment(Long commentId, Member member) {
        Comment comment = getComment(commentId);
        return null;
    }

    @Override
    public List<CommentResponseDto> getMemberCommentList(Long memberId, Member member) {
        return null;
    }

    @Override
    public List<CommentResponseDto> getBookCommentList(Long bookId, Member member) {
        return null;
    }

    @Override
    public void updateComment(Long commentId, Member member, CommentRequestDto commentRequestDto) {

    }

    @Override
    public void deleteComment(Long commentId, Member member) {

    }

    @Override
    public void likeComment(Long commentId, Member member) {

    }

    @Override
    public void unlikeComment(Long commentId, Member member) {

    }


    private static void authCheck(Member member, Comment comment) {
        if (!comment.getMember().getId().equals(member.getId())) {
            throw new GlobalRuntimeException("권한이 없습니다.", HttpStatus.EXPECTATION_FAILED);
        }
    }

    private Book getBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 책이 존재하지 않습니다", HttpStatus.BAD_REQUEST));
    }

    private Comment getComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(
                () -> new GlobalRuntimeException("해당 코멘트가 존재하지 않습니다", HttpStatus.BAD_REQUEST)
        );
    }


}
