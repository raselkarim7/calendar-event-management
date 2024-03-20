import { createPortal } from 'react-dom';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import { StyledModalContainer, StyledDialogHeader, StyledChildrenContainer } from './Styled';

interface PropsInterface {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}
const CustomModal = ({ open, onClose, children }: PropsInterface) => {
  return createPortal(
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
    </Dialog>,
    document.body,
  );
};

export default CustomModal;
