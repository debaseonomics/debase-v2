import { Tooltip } from '@core/components';
import { Token } from '@dapp/components';
import { StyledList, StyledListItem, StyledItemLabel, StyledItemValue } from './list.styles';

const List = ({ alternateRows, data, color = 'text' }) => {
	const renderListItems = () => {
		return data.map((item, i) => {
			const { label, value, valueType, tooltip } = item;
			return (
				<StyledListItem key={i} alternateRows={alternateRows}>
					<Tooltip key={i} message={tooltip} followCursor={true}>
						<StyledItemLabel color={color}>{label}</StyledItemLabel>
					</Tooltip>
					<StyledItemValue color={color}>
						{valueType && valueType !== '' ? <Token type={valueType} /> : ''}
						{value}
					</StyledItemValue>
				</StyledListItem>
			);
		});
	};

	if (data && data.length !== 0) {
		return <StyledList>{renderListItems()}</StyledList>;
	} else return null;
};

List.defaultProps = {
	alternateRows: true
};

export default List;
