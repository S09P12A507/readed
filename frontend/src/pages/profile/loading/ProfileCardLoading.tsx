import styled from 'styled-components';
import { Skeleton } from '@mui/material';

const SkeletonContainer = styled.div``;
function ProfileCardLoading() {
  return (
    <SkeletonContainer>
      <Skeleton variant="circular" animation="wave" />
      <Skeleton variant="rounded" animation="wave" />
    </SkeletonContainer>
  );
}

export default ProfileCardLoading;
