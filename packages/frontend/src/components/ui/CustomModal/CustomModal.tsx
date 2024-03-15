import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StyledModalContainer = styled('div')(({ theme }) => ({
  background: theme.app.color.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'min(70vw, 450px)',
}));

const StyledDialogHeader = styled('div')(({ theme }) => ({
  width: 'inherit',
  height: '36px',
  background: theme.app.color.bluishCyan,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& svg': {
    width: '28px',
    height: '28px',
    paddingRight: '8px',
    cursor: 'pointer',
    color: theme.app.color.blackEel,
    padding: '2px',

    '&:hover': {
      background: theme.app.color.moonMist,
      borderRadius: '50%',
    },
  },
}));

const StyledChildrenContainer = styled('div')(() => ({
  padding: '16px',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  scrollbarWidth: 'thin',
}));

interface PropsInterface {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}
const CustomModal = ({ open, onClose, children }: PropsInterface) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <>
        <StyledModalContainer>
          <StyledDialogHeader>
            <div onClick={onClose}>
              <CloseIcon />
            </div>
          </StyledDialogHeader>
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        </StyledModalContainer>
      </>
    </Dialog>
  );
};

export default CustomModal;
