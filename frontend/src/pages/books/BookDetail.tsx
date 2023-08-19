import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Divider,
  Rating,
  Card,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeIcon from '@mui/icons-material/Mode';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactsIcon from '@mui/icons-material/Contacts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Comments from '../../components/book/Comment';
import BackButton from '../../components/common/button/BackButton';
import AlertsModal from '../../components/common/alert/Alert';
import aladinLogo from '../../assets/img/aladin.jpg';
import kyoboLogo from '../../assets/img/Kyobo.png';
import yes24Logo from '../../assets/img/yes24.png';
import ridiLogo from '../../assets/img/Ridi.png';
import miliLogo from '../../assets/img/millie.png';
import non from '../../assets/img/Nan.png';
import ReadedFooter from '../../components/common/Footer';

// .
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoContainer = styled.div`
  padding: 1rem;
  display: grid;
`;

const BookImage = styled.img`
  display: grid;
  width: 50%;
  height: auto;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 100%;
  border: var(--divider) 1px solid;
  margin-right: 1rem;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 5rem;
  align-items: center;
`;

const Authors = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const AuthorsInfo = styled.div`
  display: grid;
`;

const CommentContainer = styled.div`
  display: grid;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & th,
  & td {
    border: none;
    width: 25%;
    text-align: center;
  }

  & th:not(:last-child),
  & td:not(:last-child) {
    border-right: 1px solid rgba(224, 224, 224, 1);
  }

  & tbody tr:not(:last-child) td {
    border-bottom: 1px solid rgba(255, 255, 255);
  }
`;

interface Book {
  author: {
    authorName: string;
    authorRole: string;
    authorProfileImage: string;
  }[];
  publisher: string[];
  bookDescription: string;
  coverImage: string;
  bookTitle: string;
  isBookmarkChecked: boolean;
  link: {
    ebook: {
      aladinUrl: string | null;
      kyoboUrl: string | null;
      yes24Url: string | null;
      ridiUrl: string | null;
      millieUrl: string | null;
    };
    offline: {
      aladinUrl: string | null;
      kyoboUrl: string | null;
      yes24Url: string | null;
    };
  };
  commentContent: string | null;
  commentRating: number | null;
  commentId: number | null;
}

interface Comment {
  id: number;
  memberNickname: string;
  rating: number;
  likeCount: number;
  isLiked: boolean;
  commentContent: string;
  profileImage: string;
  createdAt: Date;
}

function BookDetail() {
  const { bookId } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const [commentdata, setCommentData] = useState<Comment[] | null>(null);
  const [mycommentdata, setMyCommentData] = useState<Comment | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingsValue, setRatingsValue] = useState<number>(0);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const handleReadMore = (commentId: number) => {
    if (!expandedComments.includes(commentId)) {
      setExpandedComments(prevExpanded => [...prevExpanded, commentId]);
    } else {
      setExpandedComments(prevExpanded =>
        prevExpanded.filter(id => id !== commentId),
      );
    }
  };

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const navigate = useNavigate();

  const handleReport = () => {
    if (data) {
      navigate(`/report/${bookId as string}`, {
        state: { bookTitle: data.bookTitle },
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInputText('');
    setRatingValue(ratingValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputText('');
    setRatingsValue(ratingValue);
  };

  const handleBuyAladin = () => {
    if (data && data.link.ebook.aladinUrl) {
      window.open(data.link.ebook.aladinUrl, '_blank');
    }
  };

  const handleBuykyobo = () => {
    if (data && data.link.ebook.kyoboUrl) {
      window.open(data.link.ebook.kyoboUrl, '_blank');
    }
  };

  const handleBuyyes24 = () => {
    if (data && data.link.ebook.yes24Url) {
      window.open(data.link.ebook.yes24Url, '_blank');
    }
  };

  const handleBuymili = () => {
    if (data && data.link.ebook.millieUrl) {
      window.open(data.link.ebook.millieUrl, '_blank');
    }
  };

  const handleBuyridi = () => {
    if (data && data.link.ebook.ridiUrl) {
      window.open(data.link.ebook.ridiUrl, '_blank');
    }
  };

  const handleAladin = () => {
    if (data && data.link.offline.aladinUrl) {
      window.open(data.link.offline.aladinUrl, '_blank');
    }
  };

  const handlekyobo = () => {
    if (data && data.link.offline.kyoboUrl) {
      window.open(data.link.offline.kyoboUrl, '_blank');
    }
  };

  const handleyes24 = () => {
    if (data && data.link.offline.yes24Url) {
      window.open(data.link.offline.yes24Url, '_blank');
    }
  };

  const hasEbookLinks =
    data &&
    (data.link.ebook.aladinUrl ||
      data.link.ebook.kyoboUrl ||
      data.link.ebook.yes24Url ||
      data.link.ebook.millieUrl ||
      data.link.ebook.ridiUrl);

  const hasBuybookLinks =
    data &&
    (data.link.offline.aladinUrl ||
      data.link.offline.kyoboUrl ||
      data.link.offline.yes24Url);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 300) {
      return;
    }
    setInputText(inputValue);
  };

  const handleToggleFavorite = () => {
    if (token) {
      if (isBookmarked) {
        axios
          .delete(
            `https://i9a507.p.ssafy.io/api/bookmarks/${bookId as string}`,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setIsBookmarked(false);
          })
          .catch(() => {});
      } else {
        axios
          .post(
            `https://i9a507.p.ssafy.io/api/bookmarks/${bookId as string}`,
            {},
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setIsBookmarked(true);
          })
          .catch(() => {});
      }
    }
  };

  const handleSaveButton = () => {
    const formData = {
      commentContent: inputText,
      rating: ratingsValue * 2,
    };

    if (token) {
      axios
        .patch(
          `https://i9a507.p.ssafy.io/api/comments/books/${bookId as string}`,
          formData,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(() => {
          setRatingValue(ratingsValue);
          setMessage('코멘트가 등록됐습니다.');
          setShowAlert(true);
        })
        .catch(() => {});
    }
    setIsModalOpen(false);
  };
  const handleLike = (commentId: number, like: boolean) => {
    if (token) {
      const updatedCommentData = commentdata?.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likeCount: like ? comment.likeCount - 1 : comment.likeCount + 1,
            isLiked: !like,
          };
        }
        return comment;
      });

      setCommentData(updatedCommentData as Comment[]);

      if (like) {
        axios
          .delete(`https://i9a507.p.ssafy.io/api/comments/likes/${commentId}`, {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          })
          .then(() => {})
          .catch(() => {});
      } else {
        axios
          .post(
            `https://i9a507.p.ssafy.io/api/comments/likes/${commentId}`,
            {},
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {})
          .catch(() => {});
      }
    }
  };
  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      const formData = {
        commentContent: null,
        rating: newValue * 2,
      };

      if (ratingValue === 0) {
        setRatingValue(newValue);
        axios
          .post(
            `https://i9a507.p.ssafy.io/api/comments/${bookId as string}`,
            formData,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setRatingsValue(newValue);
          })
          .catch(() => {});
      } else {
        setRatingValue(newValue);
        axios
          .patch(
            `https://i9a507.p.ssafy.io/api/comments/books/${bookId as string}`,
            formData,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setRatingsValue(newValue);
          })
          .catch(() => {});
      }
    }
  };

  const handleRatingCommentChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      setRatingsValue(newValue);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);

    if (message === '코멘트가 등록됐습니다.') {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get<{ data: Book }>(
          `https://i9a507.p.ssafy.io/api/books/${bookId as string}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setData(response.data.data);
          setIsBookmarked(response.data.data.isBookmarkChecked);
          if (response.data.data.commentRating) {
            setRatingValue(response.data.data.commentRating / 2);
          }
          if (response.data.data.commentId) {
            axios
              .get<{ data: Comment }>(
                `https://i9a507.p.ssafy.io/api/comments/${response.data.data.commentId}`,
                {
                  headers: {
                    'X-READED-ACCESSTOKEN': token,
                  },
                },
              )
              .then(responses => {
                setMyCommentData(responses.data.data);
              })
              .catch(() => {});
          }
        })
        .catch(() => {});

      axios
        .get<{ data: Comment[] }>(
          `https://i9a507.p.ssafy.io/api/comments/books/${bookId as string}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setCommentData(response.data.data);
        })
        .catch(() => {});
    }
  }, [token, bookId, data?.commentId]);

  useEffect(() => {
    setTextLength(inputText.length);
  }, [inputText]);

  if (!data) {
    return <div>로--딩--중!...</div>;
  }

  const translator = Object.values(data.author).find(
    author => author.authorRole === '옮긴이',
  );

  const mainAuthor = Object.values(data.author).find(
    author => author.authorRole === '지은이',
  );

  return (
    <div>
      <BackButton />
      <Container>
        <BookImage src={data.coverImage} alt={data.bookTitle} />
        <h2
          style={{
            textAlign: 'center',
            margin: '1rem',
            wordBreak: 'keep-all',
          }}>
          {data.bookTitle}
        </h2>
        <Authors>
          {mainAuthor && <h5>{mainAuthor?.authorName} 지음 </h5>}
          {translator && <h5> &nbsp;| {translator?.authorName} 옮김</h5>}
        </Authors>
        <br />
        <h6>읽은 책을 평가해주세요</h6>
        <Star>
          <Rating
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size="large"
            onChange={handleRatingChange}
          />
        </Star>
        {ratingValue > 0 && !data.commentContent ? (
          <Card
            style={{
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              width: '300px',
              margin: '2%',
              padding: '5%',
              border: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
            책에 대한 한줄평을 남겨주세요!
            <Button
              onClick={handleOpenModal}
              variant="contained"
              style={{
                background: 'var(--primary-dark)',
                color: 'white',
                marginTop: '10px',
              }}>
              코멘트 남기기
            </Button>
          </Card>
        ) : (
          mycommentdata && (
            <Card style={{ width: '100%' }}>
              <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                내가 작성한 댓글
              </h3>
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center',
                  margin: '0.3rem',
                }}>
                <img
                  src={mycommentdata.profileImage}
                  alt="프로필이미지"
                  style={{
                    height: '2rem',
                    width: '2rem',
                    borderRadius: '50%',
                    marginRight: '1rem',
                  }}
                />
                {mycommentdata.memberNickname}
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'var(--primary-main)',
                    borderRadius: '4rem',
                    width: '3.5rem',
                    right: '1.5rem',
                  }}>
                  <StarIcon style={{ color: 'yellow', fontSize: '1rem' }} />{' '}
                  <p style={{ color: 'white' }}>{mycommentdata.rating / 2}</p>
                </div>
              </div>
              {mycommentdata.commentContent && (
                <div style={{ minHeight: '4rem', margin: '0.5rem' }}>
                  {expandedComments.includes(mycommentdata.id) ? (
                    mycommentdata.commentContent
                  ) : (
                    <div>
                      {mycommentdata.commentContent.length > 120 ? (
                        <>
                          {mycommentdata.commentContent.slice(0, 120)}...
                          <span
                            role="button"
                            tabIndex={0}
                            style={{
                              color: 'var(--primary-main)',
                              cursor: 'pointer',
                              marginLeft: '0.5rem',
                            }}
                            onClick={() => handleReadMore(mycommentdata.id)}>
                            더 보기
                          </span>
                        </>
                      ) : (
                        mycommentdata.commentContent
                      )}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    margin: '0.5rem',
                  }}>
                  {new Date(mycommentdata.createdAt).toLocaleDateString(
                    'ko-KR',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    },
                  )}
                </p>
                <Button
                  // variant="contained"
                  style={{
                    border: '1px solid var(--text-secondary)',
                    height: '2rem',
                    marginRight: '1.5rem',
                  }}
                  onClick={() =>
                    handleLike(mycommentdata.id, mycommentdata.isLiked)
                  }>
                  <ThumbUpOffAltIcon fontSize="small" /> &nbsp;{' '}
                  {mycommentdata.likeCount}
                </Button>
              </div>
            </Card>
          )
        )}
        <br />
        <StyledTable style={{}}>
          <TableBody>
            <TableRow>
              <TableCell style={{ wordBreak: 'keep-all', padding: '0.5rem' }}>
                읽고 싶어요
              </TableCell>
              <TableCell style={{ wordBreak: 'keep-all', padding: '0.5rem' }}>
                코멘트
              </TableCell>
              <TableCell style={{ wordBreak: 'keep-all', padding: '0.5rem' }}>
                독서록 쓰기
              </TableCell>
              <TableCell style={{ wordBreak: 'keep-all', padding: '0.5rem' }}>
                북클럽 보기
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell onClick={handleToggleFavorite}>
                {isBookmarked ? (
                  <FavoriteIcon style={{ color: '#FF6D75' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </TableCell>
              <TableCell>
                {data.commentRating && data.commentContent ? (
                  <ModeIcon
                    onClick={handleOpenModal}
                    style={{ cursor: 'pointer', color: 'var(--primary-main)' }}
                  />
                ) : (
                  <ModeIcon
                    onClick={handleOpenModal}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </TableCell>
              <TableCell>
                <MenuBookIcon
                  onClick={handleReport}
                  style={{ cursor: 'pointer' }}
                />
              </TableCell>
              <TableCell>
                <ContactsIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </Container>
      <br />
      <Divider />
      <InfoContainer>
        <h3> e-book</h3>
        {hasEbookLinks ? (
          <LogoIcon>
            {data && data.link.ebook.aladinUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={aladinLogo}
                  alt="aladin"
                  onClick={handleBuyAladin}
                />
              </Circle>
            )}
            {data && data.link.ebook.kyoboUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={kyoboLogo}
                  alt="kyobo"
                  onClick={handleBuykyobo}
                />
              </Circle>
            )}
            {data && data.link.ebook.yes24Url && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={yes24Logo}
                  alt="yes24"
                  onClick={handleBuyyes24}
                />
              </Circle>
            )}
            {data && data.link.ebook.millieUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={miliLogo}
                  alt="mili"
                  onClick={handleBuymili}
                />
              </Circle>
            )}
            {data && data.link.ebook.ridiUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={ridiLogo}
                  alt="ridi"
                  onClick={handleBuyridi}
                />
              </Circle>
            )}
          </LogoIcon>
        ) : (
          <LogoIcon />
        )}
        <h3> 구매처</h3>
        {hasBuybookLinks ? (
          <LogoIcon>
            {data && data.link.offline.aladinUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={aladinLogo}
                  alt="aladin"
                  onClick={handleAladin}
                />
              </Circle>
            )}
            {data && data.link.offline.kyoboUrl && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={kyoboLogo}
                  alt="kyobo"
                  onClick={handlekyobo}
                />
              </Circle>
            )}
            {data && data.link.offline.yes24Url && (
              <Circle>
                <img
                  style={{ width: '3rem' }}
                  src={yes24Logo}
                  alt="yes24"
                  onClick={handleyes24}
                />
              </Circle>
            )}
          </LogoIcon>
        ) : (
          <LogoIcon />
        )}
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>책 소개</h3>
        <p> {data.bookDescription}</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3 style={{ marginBottom: '0.75rem' }}>저자 / 역자</h3>
        {mainAuthor && (
          <Authors>
            {mainAuthor.authorProfileImage ? (
              <img
                src={mainAuthor?.authorProfileImage}
                alt="저자"
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '0.5rem',
                  marginRight: '1rem',
                }}
              />
            ) : (
              <img
                src={non}
                alt="저자"
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '0.5rem',
                  marginRight: '1rem',
                }}
              />
            )}

            <AuthorsInfo>
              <h5>저자</h5>
              {mainAuthor?.authorName}
            </AuthorsInfo>
          </Authors>
        )}
        {translator && (
          <Authors>
            {translator.authorProfileImage ? (
              <img
                src={translator?.authorProfileImage}
                alt="역자"
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '0.5rem',
                  marginRight: '1rem',
                }}
              />
            ) : (
              <img
                src={non}
                alt="역자"
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '0.5rem',
                  marginRight: '1rem',
                }}
              />
            )}
            <AuthorsInfo>
              <h5>역자</h5>
              {translator?.authorName}
            </AuthorsInfo>
          </Authors>
        )}
      </InfoContainer>
      <Divider />

      <InfoContainer>
        <h3>코멘트 {commentdata ? commentdata.length : ''} </h3>
      </InfoContainer>
      <CommentContainer>
        {commentdata &&
          commentdata.map((comment: Comment) => (
            <Card key={comment.id} sx={{ display: 'grid', margin: '2%' }}>
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center',
                  margin: '0.3rem',
                }}>
                <img
                  src={comment.profileImage}
                  alt="프로필이미지"
                  style={{
                    height: '2rem',
                    width: '2rem',
                    borderRadius: '50%',
                    marginRight: '1rem',
                  }}
                />
                {comment.memberNickname}
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'var(--primary-main)',
                    borderRadius: '4rem',
                    width: '3.5rem',
                    right: '1.5rem',
                  }}>
                  <StarIcon style={{ color: 'yellow', fontSize: '1rem' }} />{' '}
                  <p style={{ color: 'white' }}>{comment.rating / 2}</p>
                </div>
              </div>

              {comment.commentContent && (
                <div style={{ minHeight: '4rem', margin: '0.5rem' }}>
                  {expandedComments.includes(comment.id) ? (
                    comment.commentContent
                  ) : (
                    <div>
                      {comment.commentContent.length > 120 ? (
                        <>
                          {comment.commentContent.slice(0, 120)}...
                          <span
                            role="button"
                            tabIndex={0}
                            style={{
                              color: 'var(--primary-main)',
                              cursor: 'pointer',
                              marginLeft: '0.5rem',
                            }}
                            onClick={() => handleReadMore(comment.id)}>
                            더 보기
                          </span>
                        </>
                      ) : (
                        comment.commentContent
                      )}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    margin: '0.5rem',
                  }}>
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <Button
                  // variant="contained"
                  style={{
                    border: '1px solid var(--text-secondary)',
                    height: '2rem',
                    marginRight: '1.5rem',
                  }}
                  onClick={() => handleLike(comment.id, comment.isLiked)}>
                  <ThumbUpOffAltIcon fontSize="small" /> &nbsp;{' '}
                  {comment.likeCount}
                </Button>
              </div>
            </Card>
          ))}
      </CommentContainer>
      <Modal open={IsModalOpen} onClose={handleCloseModal}>
        <div>
          <Comments
            onClose={handleCloseModal}
            onSave={handleSaveButton}
            handleRatingChange={handleRatingCommentChange}
            handleInputChange={handleInputChange}
            textLength={textLength}
            ratingValue={ratingsValue}
            inputText={inputText}
            title={data.bookTitle}
          />
        </div>
      </Modal>
      <AlertsModal
        open={showAlert}
        onClose={() => handleAlertClose()}
        message={message}
      />
      <ReadedFooter />
    </div>
  );
}

export default BookDetail;
