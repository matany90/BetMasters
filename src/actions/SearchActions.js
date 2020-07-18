import _ from 'lodash';
import {
	ON_TEXT_CHANGE,
	DATA_AFTER_SEARCH_FRIENDLY,
	DATA_AFTER_SEARCH_TEAM,
	CLEAN_SEARCH
} from './types.js';


export const cleanSearch = () => {
	return {
		type: CLEAN_SEARCH,
		payload: {
			text: '',
			data: null
		}
	};
};

export const handleSearch = (textToSearch, fullData, whereToSearch) => {
	return (dispatch) => {
		const formatText = textToSearch.toLowerCase();
		const dataToShow = _.filter(fullData, item => {
			if (whereToSearch === 'friendlyLeagues') return containsFriendlyLeagues(item, formatText);
			else if (whereToSearch === 'teamNames') return containsTeamNames(item, formatText);
		});
		if (whereToSearch === 'friendlyLeagues') {
			dispatch({
				type: DATA_AFTER_SEARCH_FRIENDLY,
				payload: dataToShow
			});
		} else if (whereToSearch === 'teamNames') {
			dispatch({
				type: DATA_AFTER_SEARCH_TEAM,
				payload: dataToShow
			});
		}
		dispatch({
			type: ON_TEXT_CHANGE,
			payload: formatText
		});
	};
};

const containsFriendlyLeagues = (friendlyLeauge, formatText) => {
	if (friendlyLeauge.friendlyLeagueName.toLowerCase().includes(formatText)) {
		return true;
	}
	return false;
};

const containsTeamNames = (match, formatText) => {
	if (match.awayteamName.toLowerCase().includes(formatText) || match.hometeamName.toLowerCase().includes(formatText)) {
		return true;
	}
	return false;
};
