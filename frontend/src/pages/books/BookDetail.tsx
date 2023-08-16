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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoContainer = styled.div`
  padding: 1rem;
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
  author: string[];
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
}

function BookDetail() {
  const { bookId } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingsValue, setRatingsValue] = useState<number>(0);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

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
          `https://i9a507.p.ssafy.io/api/comments/${bookId as string}`,
          formData,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(() => {
          setMessage('코멘트가 등록됐습니다.');
          setShowAlert(true);
        })
        .catch(() => {});
    }
    setIsModalOpen(false);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      const formData = {
        commentContent: null,
        rating: ratingValue,
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token, bookId]);

  useEffect(() => {
    setTextLength(inputText.length);
  }, [inputText]);

  if (!data) {
    return <div>로--딩--중!...</div>;
  }

  return (
    <div>
      <BackButton />
      <Container>
        <BookImage src={data.coverImage} alt={data.bookTitle} />
        <h2>{data.bookTitle}</h2>
        <h5>??? 지음 | ??? 옮김</h5>
        {/* <h5> {data.publisher}</h5> */}
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
        {ratingValue > 0 && (
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
        )}
        <br />
        <StyledTable>
          <TableBody>
            <TableRow>
              <TableCell>읽고 싶어요</TableCell>
              <TableCell>코멘트</TableCell>
              <TableCell>독서록 쓰기</TableCell>
              <TableCell>북클럽 보기</TableCell>
            </TableRow>
            <TableRow>
              <TableCell onClick={handleToggleFavorite}>
                {isBookmarked ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </TableCell>
              <TableCell>
                <ModeIcon
                  onClick={handleOpenModal}
                  style={{ cursor: 'pointer' }}
                />
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
        <h3> e- book</h3>
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
          <LogoIcon>
            <h2>E북이 아직 없어요😥</h2>
          </LogoIcon>
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
          <LogoIcon>
            <h2>구매처가 없는 책이에요😥</h2>
          </LogoIcon>
        )}
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>책 소개</h3>
        <p> {data.bookDescription}</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>저자 / 역자</h3>
        <h2>저자이름</h2>
        <p>저자</p>
        <h2>(대충 사진)</h2>
        <p>역자</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>대충 통계 </h3>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>대충 댓글</h3>
      </InfoContainer>

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
        onClose={() => setShowAlert(false)}
        message={message}
      />
    </div>
  );
}

export default BookDetail;
