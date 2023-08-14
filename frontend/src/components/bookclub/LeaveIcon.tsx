import LogoutIcon from '@mui/icons-material/Logout';

function LeaveIcon() {
  const handleBookclubOut = () => {
    window.location.href = '/bookclub/detail/2:';
  };
  return (
    <div>
      <LogoutIcon
        style={{
          fontSize: '4rem',
          backgroundColor: '#d9d9d9',
          borderRadius: '50%',
        }}
        onClick={handleBookclubOut}
      />
    </div>
  );
}

export default LeaveIcon;
