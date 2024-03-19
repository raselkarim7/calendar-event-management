import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface UiBackDropInterface {
  open: boolean;
}
export default function UiBackDrop({ open }: UiBackDropInterface) {
  return (
    <Backdrop sx={{ color: theme => theme.app.color.white, zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}
