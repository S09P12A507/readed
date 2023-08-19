import styled from 'styled-components';
import { IImageStyle } from '../../../interfaces/common/IImageStyle';

/**
 * 프로필사진 컴포넌트
 *
 * @author 박성준
 */

const ProfileFrame = styled.div<IImageStyle>`
  position: relative;
  margin-right: 1.5rem;
  min-width: 6rem;
  min-height: 6rem;
  max-width: 7rem;
  max-height: 7rem;
  outline-color: black;
  border-radius: 50%;
  background-color: var(--divider);
  background-image: url(${props => props.imageSource});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

// const TmpPictureText = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

function ProfileCardPicture({
  imageSource,
}: {
  imageSource?: IImageStyle['imageSource'];
}) {
  return (
    <ProfileFrame imageSource={imageSource} />
    //   <TmpPictureText>{imageSource}</TmpPictureText>
    // </ProfileFrame>
  );
}

ProfileCardPicture.defaultProps = {
  imageSource: 'none',
};

export default ProfileCardPicture;
