import { Fragment, useState, useEffect } from 'react';

import { secondsToDhms } from '@utils';
import { DisplayMedium, DisplaySmall } from '@core/components';
import { StyledCountdown, StyledUnit, StyledTime } from './countdown.styles';

const getDateTimeDifference = (startDate, endDate) => {
	return endDate - startDate / 1000;
};

const Countdown = ({ timestamp, message = 'Countdown has ended', onEnd }) => {
	const [ counter, setCounter ] = useState(parseInt(getDateTimeDifference(Date.now(), timestamp)));

	useEffect(
		() => {
			let timeoutID;
			if (counter > 0) {
				timeoutID = setTimeout(() => {
					setCounter(counter - 1);
				}, 1000);
			} else onEnd && onEnd();
			return () => {
				clearTimeout(timeoutID);
			};
		},
		[ counter ]
	);

	return (
		<StyledCountdown>
			{counter > 0 ? (
				secondsToDhms(counter).map((unit, i) => {
					const { label, value } = unit;
					return (
						<Fragment key={`unit-${i}`}>
							{i !== 0 && <StyledTime>:</StyledTime>}
							<StyledUnit key={`unit-${i}`}>
								<StyledTime>{value}</StyledTime>
								<DisplaySmall color="primary">{label}</DisplaySmall>
							</StyledUnit>
						</Fragment>
					);
				})
			) : (
				<DisplayMedium color="secundary">{message}</DisplayMedium>
			)}
		</StyledCountdown>
	);
};

export default Countdown;
