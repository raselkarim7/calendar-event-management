import { DayNameType } from '@/types';

import { StyledEachDayContainer, StyledTimeIndicator, StyledHourlyEventContainer } from './Styled/StyledEachDay';
import { useAppDispatch } from '@/hooks';
import { increment } from '@/features/appSlice';

interface PropsInterface {
  columnIndex: number;
  dayName: DayNameType;
}

const twentyFourHours = Array.from(Array(24)).map((_, i) => i);
const EachDay = ({ dayName }: PropsInterface) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <StyledEachDayContainer>
        {twentyFourHours.map(hour => (
          <div style={{ display: 'flex', width: '100%' }} key={hour}>
            {dayName === 'SUN' && <StyledTimeIndicator ownerState={{ hour: hour }}></StyledTimeIndicator>}
            <StyledHourlyEventContainer
              onClick={() => {
                dispatch(increment());
              }}
            >
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
