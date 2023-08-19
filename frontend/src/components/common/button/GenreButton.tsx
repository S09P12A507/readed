import styled from 'styled-components';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Genrebuttons = styled(Button)`
  display: flex;
  white-space: nowrap;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

interface GenreProps {
  genres: number;
  content: string;
}

function GenreButton({ genres, content }: GenreProps) {
  const navigate = useNavigate();

  const handleGenreClick = (genre: number) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <div>
      <Genrebuttons
        onClick={() => handleGenreClick(genres)}
        endIcon={<ArrowForwardIosIcon />}
        style={{
          backgroundColor: '#F7DB6A',
          borderRadius: '3rem',
          color: 'black',
          margin: '0.6rem',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}>
        {content}
      </Genrebuttons>
    </div>
  );
}

export default GenreButton;
