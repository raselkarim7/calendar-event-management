import { CustomTimePicker } from '@/components/ui/CustomTimePicker';
import RegularDatePicker from '@/components/ui/RegularDatePicker/RegularDatePicker';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {
  StyledFormContainer,
  StyledFormFieldsContainer,
  StyledDateAndCheckboxContainer,
  StyledTimePickersContainer,
  StyledRepeatContainer,
  StyledFlexContainer,
  StyledSumitButtonsContainer,
} from './Styled';
import { useAppSelector } from '@/hooks';

import { useEffect, useState } from 'react';
import { AppInitialStateInterface } from '@/types/app';
import { getOnlyDateString, initialEventFormObj } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';

interface LocalFormDataInterface extends Omit<AppInitialStateInterface['eventForm']['data'], 'startTime' | 'endTime'> {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

const initialFormState: LocalFormDataInterface = {
  ...initialEventFormObj.data,
  startTime: null,
  endTime: null,
};

interface PropsInterface {
  onClose: () => void;
}

const EventForm = (props: PropsInterface) => {
  const { eventForm } = useAppSelector(state => state.app);
  // const dispatch = useAppDispatch();
  const [localFormData, setLocalFormdata] = useState<LocalFormDataInterface>(initialFormState);

  useEffect(() => {
    setLocalFormdata({
      ...eventForm.data,
      startTime: eventForm.data.startTime ? dayjs(eventForm.data.startTime) : null,
      endTime: null,
    });
  }, [eventForm]);

  const handleChangePlainText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: 'title' | 'note' | 'description',
  ) => {
    setLocalFormdata(prev => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  const handleRepeatAfterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // here we validated only number field, if no data then set to 0
    const value = event.target.value;
    const integerValue = parseInt(value, 10);
    if (value === '' || (!isNaN(integerValue) && integerValue < 10_000)) {
      setLocalFormdata(prev => ({
        ...prev,
        repeatAfter: value === '' ? 0 : integerValue,
      }));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Validation work on going.');
  };

  console.log('localFormData: ', localFormData);

  return (
    <StyledFormContainer>
      <StyledFormFieldsContainer>
        <TextField
          id='event-title'
          placeholder='Add Title'
          variant='standard'
          size='medium'
          value={localFormData.title}
          onChange={e => handleChangePlainText(e, 'title')}
        />

        <StyledDateAndCheckboxContainer>
          <RegularDatePicker
            date={getOnlyDateString(localFormData.startDate)}
            onChange={val => {
              if (val) {
                setLocalFormdata(prev => ({
                  ...prev,
                  startDate: val.toDate(),
                  startTime:
                    !prev.isFullday && prev.startTime
                      ? dayjs(val)
                          .set('hour', prev.startTime?.get('hour') ?? 0)
                          .set('minute', prev.startTime?.get('minute') ?? 0)
                          .set('seconds', prev.startTime?.get('seconds') ?? 0)
                      : null,
                  endTime:
                    !prev.isFullday && prev.endTime
                      ? dayjs(val)
                          .set('hour', prev.endTime?.get('hour') ?? 0)
                          .set('minute', prev.endTime?.get('minute') ?? 0)
                          .set('seconds', prev.endTime?.get('seconds') ?? 0)
                      : null,
                }));
              }
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={localFormData.isFullday}
                  onChange={e => {
                    setLocalFormdata(prev => ({
                      ...prev,
                      isFullday: e.target.checked,
                    }));
                  }}
                />
              }
              label='All Day'
            />
          </FormGroup>
        </StyledDateAndCheckboxContainer>

        <StyledTimePickersContainer>
          <CustomTimePicker
            minTime={null}
            placeholder='Start Time'
            value={localFormData.startTime}
            onChange={val => {
              setLocalFormdata(prev => ({
                ...prev,
                startTime: dayjs(prev.startDate)
                  .set('hour', val?.get('hour') ?? 0)
                  .set('minute', val?.get('minute') ?? 0)
                  .set('seconds', val?.get('seconds') ?? 0),
              }));
            }}
          />
          <div>–</div>
          <CustomTimePicker
            placeholder='End Time'
            value={localFormData.endTime}
            minTime={localFormData.startTime}
            onChange={(val: Dayjs) => {
              setLocalFormdata(prev => ({
                ...prev,
                endTime: dayjs(prev.startDate)
                  .set('hour', val?.get('hour') ?? 0)
                  .set('minute', val?.get('minute') ?? 0)
                  .set('seconds', val?.get('seconds') ?? 0),
              }));
            }}
          />
        </StyledTimePickersContainer>

        <StyledRepeatContainer>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={localFormData.isRepeat}
                  onChange={e => {
                    setLocalFormdata(prev => ({
                      ...prev,
                      isRepeat: e.target.checked,
                    }));
                  }}
                />
              }
              label='Is Repeat'
            />
          </FormGroup>
          <StyledFlexContainer>
            <div>Repeat After:</div>
            <TextField
              id='event-description'
              placeholder='Number'
              value={localFormData.repeatAfter ? localFormData.repeatAfter.toString() : ''}
              variant='standard'
              type='text'
              size='small'
              sx={{ width: '110px' }}
              onChange={handleRepeatAfterChange}
            />
            <div>Days</div>
          </StyledFlexContainer>
        </StyledRepeatContainer>

        <TextField
          id='event-description'
          placeholder='Add Description'
          variant='standard'
          size='small'
          value={localFormData.description || ''}
          onChange={e => handleChangePlainText(e, 'description')}
        />
        <TextField
          id='event-note'
          placeholder='Add Note'
          variant='standard'
          multiline
          minRows={3}
          maxRows={12}
          size='small'
          value={localFormData.note || ''}
          onChange={e => handleChangePlainText(e, 'note')}
        />

        <StyledFlexContainer>
          <div>End Date:</div>
          <RegularDatePicker
            date={localFormData.endDate ? getOnlyDateString(localFormData.endDate) : ''}
            onChange={val => {
              if (val) {
                setLocalFormdata(prev => ({
                  ...prev,
                  endDate: val.toDate(),
                }));
              }
            }}
          />
        </StyledFlexContainer>
      </StyledFormFieldsContainer>

      <StyledSumitButtonsContainer>
        <StyledFlexContainer>
          <Button variant='outlined' onClick={props.onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            {eventForm.mode === 'CREATE' && 'Save'}
            {eventForm.mode === 'EDIT' && 'Update'}
          </Button>
        </StyledFlexContainer>
      </StyledSumitButtonsContainer>
    </StyledFormContainer>
  );
};

export default EventForm;
