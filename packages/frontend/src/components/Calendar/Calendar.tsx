import { styled } from '@mui/material';
import EachDay from './EachDay';
import { SEVEN_DAYS } from '@/utils';

const StyledContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const StyledTimeIndicator = styled('div')(() => ({
  display: 'flex',
  background: 'yellow',
  width: '100px',
}));

const StyledDays = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const Calendar = () => {
  return (
    <div style={{ width: '100%' }}>
      <StyledContainer>
        <StyledTimeIndicator></StyledTimeIndicator>
        <StyledDays>
          {SEVEN_DAYS.map((day, index) => (
            <EachDay key={day} columnIndex={index} dayName={day} />
          ))}
        </StyledDays>
      </StyledContainer>
    </div>
  );
};

export default Calendar;
