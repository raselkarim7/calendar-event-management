/* eslint max-lines: off */
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
  StyledRepeatAfterContainer,
} from './Styled';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { useEffect, useState } from 'react';
import { AppInitialStateInterface } from '@/types/app';
import { getOnlyDateString, initialEventFormObj } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarEventPayloadInterface } from '@/types';
import { usePostCalenderEventMutation } from '@/services';
import { toast } from 'react-toastify';
import UiBackDrop from '@/components/ui/UiBackDrop/UiBackDrop';
import { setEventFormsVisibility } from '@/features/appSlice';

const MAX_LENGTH = {
  title: 50,
  description: 150,
  note: 350,
};

interface LocalFormDataInterface extends Omit<AppInitialStateInterface['eventForm']['data'], 'startTime' | 'endTime'> {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

interface LocalFormValidationErrorsInterface {
  title: string;
  startTime: string;
  endTime: string;
  repeatAfter: string;
  description: string;
  note: string;
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
  const dispatch = useAppDispatch();

  const [addEvent, addEventService] = usePostCalenderEventMutation();

  const [localFormData, setLocalFormdata] = useState<LocalFormDataInterface>(initialFormState);
  const [localErrors, setLocalErrors] = useState<LocalFormValidationErrorsInterface>({
    title: '',
    startTime: '',
    endTime: '',
    repeatAfter: '',
    description: '',
    note: '',
  });

  useEffect(() => {
    setLocalFormdata({
      ...eventForm.data,
      startTime: eventForm.data.startTime ? dayjs(eventForm.data.startTime) : null,
      endTime: eventForm.data.endTime ? dayjs(eventForm.data.endTime) : null,
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
    setLocalErrors(prev => ({ ...prev, [fieldName]: '' }));
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
    setLocalErrors(prev => ({
      ...prev,
      repeatAfter: '',
    }));
  };

  const isValid = () => {
    let hasError = false;
    const errorsObj = { ...localErrors };
    if (!localFormData.title.trim()) {
      hasError = true;
      errorsObj.title = 'Title is required.';
    }
    if (localFormData.title.length > MAX_LENGTH.title) {
      hasError = true;
      errorsObj.title = `Title must be less than ${MAX_LENGTH.title} character.`;
    }

    if (localFormData.description && localFormData.description.length > MAX_LENGTH.description) {
      hasError = true;
      errorsObj.description = `Description must be less than ${MAX_LENGTH.description} character.`;
    }
    if (localFormData.note && localFormData.note.length > MAX_LENGTH.note) {
      hasError = true;
      errorsObj.note = `Note must be less than ${MAX_LENGTH.note} character.`;
    }

    if (!localFormData.isFullday) {
      if (!localFormData.startTime) {
        hasError = true;
        errorsObj.startTime = 'Start time is required';
      }
      if (!localFormData.endTime) {
        hasError = true;
        errorsObj.endTime = 'End time is required';
      }
      if (localFormData.startTime && localFormData.endTime) {
        const isSame = localFormData.startTime.isSame(localFormData.endTime);
        const isAfter = localFormData.startTime.isAfter(localFormData.endTime);
        if (isSame || isAfter) {
          hasError = true;
          errorsObj.endTime = 'End time must be greater.';
        }
      }
    }

    if (localFormData.isRepeat) {
      if (!localFormData.repeatAfter) {
        hasError = true;
        errorsObj.repeatAfter = 'Repeat after required';
      }
    }
    setLocalErrors(errorsObj);
    return hasError;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid()) {
      return;
    }

    const payload: CalendarEventPayloadInterface = {
      title: localFormData.title,
      startDate: localFormData.startDate.toISOString(),
      isFullday: localFormData.isFullday,
      isRepeat: localFormData.isRepeat,
      repeatAfter: localFormData.repeatAfter ?? 0,
      startTime: localFormData.startTime ? localFormData.startTime.toISOString() : '',
      endTime: localFormData.endTime ? localFormData.endTime.toISOString() : '',
      description: localFormData.description ?? '',
      note: localFormData.note ?? '',
      endDate: localFormData.endDate ? localFormData.endDate.toISOString() : '',
    };

    try {
      const res = await addEvent(payload).unwrap();
      console.log('res ========> ', res);
      toast.success('Event added successfully.');
      dispatch(setEventFormsVisibility('INVISIBLE'));
    } catch (error) {
      toast.error('Adding event failed.');
    }
  };

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
          error={Boolean(localErrors.title)}
          helperText={localErrors.title}
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
                    setLocalErrors(prev => ({
                      ...prev,
                      startTime: '',
                      endTime: '',
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
            disabled={localFormData.isFullday}
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

              setLocalErrors(prev => ({
                ...prev,
                startTime: '',
              }));
            }}
            error={Boolean(localErrors.startTime)}
            helperText={localErrors.startTime}
          />
          <div>–</div>
          <CustomTimePicker
            disabled={localFormData.isFullday}
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
              setLocalErrors(prev => ({
                ...prev,
                endTime: '',
              }));
            }}
            error={Boolean(localErrors.endTime)}
            helperText={localErrors.endTime}
          />
        </StyledTimePickersContainer>

        <StyledRepeatContainer>
          <div>
            <div style={{ marginTop: '5px' }}>
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
                        setLocalErrors(prev => ({
                          ...prev,
                          repeatAfter: '',
                        }));
                      }}
                    />
                  }
                  label='Is Repeat'
                />
              </FormGroup>
            </div>
          </div>

          <StyledRepeatAfterContainer>
            <div>Repeat After:</div>
            <TextField
              id='event-description'
              placeholder='Number'
              value={localFormData.repeatAfter ? localFormData.repeatAfter.toString() : ''}
              variant='standard'
              type='text'
              size='small'
              sx={{ width: '110px' }}
              error={Boolean(localErrors.repeatAfter)}
              helperText={localErrors.repeatAfter}
              onChange={handleRepeatAfterChange}
            />
            <div>Days</div>
          </StyledRepeatAfterContainer>
        </StyledRepeatContainer>

        <TextField
          id='event-description'
          placeholder='Add Description'
          variant='standard'
          size='small'
          value={localFormData.description || ''}
          onChange={e => handleChangePlainText(e, 'description')}
          error={Boolean(localErrors.description)}
          helperText={localErrors.description}
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
          error={Boolean(localErrors.note)}
          helperText={localErrors.note}
        />

        <StyledFlexContainer>
          <div>End Date:</div>
          <RegularDatePicker
            minDate={getOnlyDateString(localFormData.startDate)}
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
      <UiBackDrop open={addEventService.isLoading} />
    </StyledFormContainer>
  );
};

export default EventForm;
