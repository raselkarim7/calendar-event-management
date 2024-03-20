import { Divider, Grid, IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

import { customColors } from '@/configs';
import { getTimeRange, initialEventFormObj } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRemoveCalenderEventMutation } from '@/services';
import { setEventForm } from '@/features/appSlice';
import { toast } from 'react-toastify';
import { UiBackDrop } from '..';

interface EventPopoverInterface {
  anchorEl: HTMLDivElement | null;
  onClosePopOver: () => void;
}

const EventPopover = ({ anchorEl, onClosePopOver }: EventPopoverInterface) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [removeCalenderEvents, { isLoading }] = useRemoveCalenderEventMutation();
  const dispatch = useAppDispatch();
  const eventPopOver = useAppSelector(state => state.app.eventPopOver);

  const handleClose = () => {
    onClosePopOver();
  };

  const handleEdit = () => {
    dispatch(
      setEventForm({
        ...initialEventFormObj,
        mode: 'EDIT',
        data: {
          ...eventPopOver.data,
          startDate: new Date(eventPopOver.data.startDate),
          endDate: eventPopOver.data.endDate ? new Date(eventPopOver.data.endDate) : undefined,
        },
      }),
    );
    onClosePopOver();
  };

  const handleDelete = async () => {
    try {
      await removeCalenderEvents(eventPopOver.data._id);
      toast.success('Event removed successfully');
      onClosePopOver();
    } catch (error) {
      toast.success('Event remove failed');
    }
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <Grid
            container
            direction='row'
            gap={'8px'}
            padding={'4px 4px 0px 0px'}
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <IconButton size='small' aria-label='edit' onClick={handleEdit}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton size='small' aria-label='delete' onClick={handleDelete}>
              <DeleteIcon fontSize='small' />
            </IconButton>
            <IconButton size='small' aria-label='close' onClick={() => handleClose()}>
              <ClearIcon fontSize='small' />
            </IconButton>
          </Grid>
          <Divider />
          <CardContent
            style={{
              padding: '8px 12px',
              maxHeight: '300px',
              minWidth: '200px',
              minHeight: '200px',
              overflowY: 'auto',
              wordBreak: 'break-all',
              scrollbarWidth: 'thin',
            }}
          >
            <Typography variant='h4' color={'black'} component='div'>
              {eventPopOver.data.title}
            </Typography>
            <Typography padding={'4px 0px 8px 0px'} color={customColors.brightBlue} component='div' variant='copyright'>
              {dayjs(eventPopOver.data.startDate).format('MMMM D, YYYY')}
              {eventPopOver.data.isFullday && (
                <Typography fontWeight={'bold'} color={'#eb2f93'} variant='caption' component='div'>
                  Full day event
                </Typography>
              )}

              <div>{getTimeRange(eventPopOver.data)}</div>
            </Typography>

            {eventPopOver.data.isRepeat && (
              <Typography fontWeight={'bold'} color={'orangered'} variant='caption' component='div'>
                Repeat In: {eventPopOver.data.repeatAfter} days
              </Typography>
            )}

            <Typography fontWeight={'bold'} color={'black'} variant='caption' component='div'>
              Description:{' '}
            </Typography>
            <Typography
              variant={!eventPopOver.data.description ? 'body1' : 'caption'}
              color={!eventPopOver.data.description ? 'primary' : 'text.secondary'}
            >
              {eventPopOver.data.description ? eventPopOver.data.description : 'No Description'}
            </Typography>

            <Typography
              fontWeight={'bold'}
              color={'black'}
              margin={'4px 0px 0px 0px'}
              variant='caption'
              component='div'
            >
              Note:{' '}
            </Typography>
            <Typography
              variant={!eventPopOver.data.note ? 'body1' : 'caption'}
              color={!eventPopOver.data.note ? 'primary' : 'text.secondary'}
            >
              {eventPopOver.data.note ? eventPopOver.data.note : 'No Note'}
            </Typography>
          </CardContent>
        </Card>
        <UiBackDrop open={isLoading} />
      </Popover>
    </>
  );
};

export default EventPopover;
