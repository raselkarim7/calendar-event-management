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

const EventForm = () => {
  return (
    <StyledFormContainer>
      <StyledFormFieldsContainer>
        <TextField id='event-title' placeholder='Add Title' variant='standard' size='medium' sx={{}} />

        <StyledDateAndCheckboxContainer>
          <RegularDatePicker date='' onChange={() => {}} />
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label='All Day' />
          </FormGroup>
        </StyledDateAndCheckboxContainer>

        <StyledTimePickersContainer>
          <CustomTimePicker />
          <div>–</div>
          <CustomTimePicker />
        </StyledTimePickersContainer>

        <StyledRepeatContainer>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label='Is Repeat' />
          </FormGroup>
          <StyledFlexContainer>
            <div>Repeat After:</div>
            <TextField
              id='event-description'
              placeholder='Number'
              defaultValue={1}
              variant='standard'
              type='text'
              size='small'
              sx={{ width: '110px' }}
            />
            <div>Days</div>
          </StyledFlexContainer>
        </StyledRepeatContainer>

        <TextField id='event-description' placeholder='Add Description' variant='standard' size='small' sx={{}} />
        <TextField
          id='event-note'
          placeholder='Add Note'
          variant='standard'
          multiline
          minRows={3}
          maxRows={12}
          size='small'
        />

        <StyledFlexContainer>
          <div>End Date:</div>
          <RegularDatePicker date='' onChange={() => {}} />
        </StyledFlexContainer>
      </StyledFormFieldsContainer>

      <StyledSumitButtonsContainer>
        <StyledFlexContainer>
          <Button variant='outlined'>Cancel</Button>
          <Button variant='contained'>Save</Button>
        </StyledFlexContainer>
      </StyledSumitButtonsContainer>
    </StyledFormContainer>
  );
};

export default EventForm;
