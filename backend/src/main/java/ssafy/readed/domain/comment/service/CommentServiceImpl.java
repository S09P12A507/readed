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
import ssafy.readed.domain.comment.entity.Like;
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
    @Transactional
    public CommentResponseDto selectComment(Long commentId, Member member) {
        return CommentResponseDto.from(getComment(commentId),
                checkLikeByMember(commentId, member.getId()));
    }

    @Override
    @Transactional
    public List<CommentResponseDto> getMemberCommentList(Long memberId, Member member) {

        if (memberId == null) {
            return checkLikeList(commentRepository.findAllByMember_Id(member.getId()), member);
        }
        return checkLikeList(commentRepository.findAllByMember_Id(memberId), member);
    }

    @Override
    @Transactional
    public List<CommentResponseDto> getBookCommentList(Long bookId, Member member) {
        return checkLikeList(commentRepository.findAllByBook_Id(bookId), member);
    }

    @Override
    @Transactional
    public void updateComment(Long commentId, Member member, CommentRequestDto commentRequestDto) {
        Comment comment = getComment(commentId);

        authCheckComment(member, comment);
        comment.update(commentRequestDto);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Member member) {
        Comment comment = getComment(commentId);

        authCheckComment(member, comment);
        deleteLikeByComment(commentId);

        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public void likeComment(Long commentId, Member member) {
        likeRepository.save(Like.createLike(member, getComment(commentId)));
    }

    @Override
    @Transactional
    public void unlikeComment(Long commentId, Member member) {
        Like like = likeRepository.findByCommentAndMember(commentId, member.getId()).orElseThrow(
                () -> new GlobalRuntimeException("해당 좋아요가 존재하지 않습니다", HttpStatus.BAD_REQUEST)
        );

        Like.deleteLike(getComment(commentId));
        likeRepository.delete(like);
    }


    private static void authCheckComment(Member member, Comment comment) {
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

    private Boolean checkLikeByMember(Long commentId, Long memberId) {
        return likeRepository.findByCommentAndMember(commentId, memberId).isPresent();
    }

    private List<CommentResponseDto> checkLikeList(List<Comment> commentList, Member member) {
        return commentList.stream().map(comment ->
                checkLikeByMember(comment.getId(), member.getId()) ?
                        CommentResponseDto.from(comment, true)
                        : CommentResponseDto.from(comment, false)
        ).toList();
    }

    private void deleteLikeByComment(Long commentId) {
        likeRepository.deleteByComment(commentId);
    }


}
