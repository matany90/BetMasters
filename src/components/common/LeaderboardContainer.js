import React from 'react';
import { View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Spinner } from './';

const LeaderboardContainer = ({ data, style, ...rest }) => {
	if (data) {
		return (
			<View style={style}>
			<Leaderboard
				data={data}
				{...rest}
			/>
			</View>
		);
	}
	return (
		<View style={{ height: 120 }}>
			<Spinner size="large" />
		</View>
	);
};

export { LeaderboardContainer };
