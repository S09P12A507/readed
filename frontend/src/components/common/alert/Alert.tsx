import { Modal, Button } from '@mui/material';

interface AlertsModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

function AlertsModal({ open, onClose, message }: AlertsModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          display: 'grid',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '5px',
        }}>
        <p>{message}</p>
        <br />
        <Button onClick={onClose} variant="contained" color="primary">
          확인
        </Button>
      </div>
    </Modal>
  );
}

export default AlertsModal;
