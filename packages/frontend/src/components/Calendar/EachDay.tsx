import { DayNameType } from '@/types';

import { styled } from '@mui/material';

interface TimeIndicatorOwerStateInterface {
  hour: number;
}
const StyledTimeIndicator = styled('div')<{ ownerState: TimeIndicatorOwerStateInterface }>(({ theme, ownerState }) => ({
  marginTop: '-5px',
  '&::before': {
    color: theme.app.color.paleSky,
    content: `'${ownerState.hour.toString().padStart(2, '0')} ${ownerState.hour < 12 ? 'AM' : 'PM'}'`,
    marginLeft: '-50px',
    fontSize: '12px',
    display: 'inline-block',
  },
}));

interface DayContainerOwerStateInterface {}
const StyledEachDayContainer = styled('div')<{ ownerState: DayContainerOwerStateInterface }>(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.app.color.moonMist,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  height: '100%',
  margin: '-1px 0 0 -1px', // BorderCollapse
}));

const StyledHourlyEventContainer = styled('div')(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.app.color.moonMist,
  height: '80px',
  overflowY: 'auto',
  width: '100%',
  wordBreak: 'break-all',
  padding: '5px',
  scrollbarWidth: 'thin',
}));

interface PropsInterface {
  columnIndex: number;
  dayName: DayNameType;
}

const twentyFourHours = Array.from(Array(24)).map((_, i) => i);
const EachDay = ({ dayName }: PropsInterface) => {
  return (
    <>
      <StyledEachDayContainer ownerState={{ hour: 1 }}>
        {twentyFourHours.map(hour => (
          <div style={{ display: 'flex', width: '100%' }} key={hour}>
            {dayName === 'SUN' && <StyledTimeIndicator ownerState={{ hour: hour }}></StyledTimeIndicator>}
            <StyledHourlyEventContainer>
              {/* {hour} */}

              {dayName === 'THU' &&
                hour === 5 &&
                `Lorem ipsum dolor sitmetthereisnosuchthingaspaing 
                Lorem ipsum dolor sitmetthereisnosuchthingaspaing 
                Lorem ipsum dolor sitmetthereisnosuchthingaspaing`}

              {hour === 12 &&
                `Lorem ipsum dolor sitmetthereisnosuchthingaspaing 
                Lorem ipsum dolor sitmetthereisnosuchthingaspaing 
                Lorem ipsum dolor sitmetthereisnosuchthingaspaing`}
            </StyledHourlyEventContainer>
          </div>
        ))}
      </StyledEachDayContainer>
    </>
  );
};

export default EachDay;
