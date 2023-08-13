import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7%;
`;

const ModalCloseButton = styled(Button)`
  left: 2%;
  margin: 2%;
  font-weight: bold;
  font-size: 1rem;
`;

const ModalSendButton = styled(Button)`
  color: #7aa874;
  font-weight: bold;
  font-size: 1rem;
`;

const ModalContentContainer = styled.div`
  background-color: white;
  max-width: var(--screen-size-mobile);
  width: 100%;
  height: 100vh;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
  margin-top: 1rem;
`;

const Textsize = styled.div`
  float: right;
  margin-right: 5%;
`;

interface ModalProps {
  onClose: () => void;
  onSave: () => void;
  handleRatingChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textLength: number;
  ratingValue: number;
  inputText: string;
  title: string;
}

function Comments({
  onClose,
  onSave,
  handleRatingChange,
  handleInputChange,
  textLength,
  ratingValue,
  inputText,
  title,
}: ModalProps) {
  return (
    <div>
      <ModalContentContainer>
        <ModalHeaderContainer>
          <ModalCloseButton startIcon={<CloseIcon />} onClick={onClose}>
            닫기
          </ModalCloseButton>
          <h2>{title.length > 10 ? `${title.slice(0, 10)}...` : title}</h2>
          <ModalSendButton onClick={onSave}>등록</ModalSendButton>
        </ModalHeaderContainer>
        <Divider />
        <Star>
          <Rating
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size="large"
            onChange={handleRatingChange}
          />
        </Star>
        <TextField
          value={inputText}
          onChange={handleInputChange}
          placeholder="책에 대한 코멘트를 자유롭게 남겨주세요."
          variant="standard"
          multiline
          rows={25}
          style={{
            width: '96%',
            padding: '3%',
            flexWrap: 'wrap',
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Textsize>{textLength} / 300 글자</Textsize>
      </ModalContentContainer>
    </div>
  );
}

export default Comments;
