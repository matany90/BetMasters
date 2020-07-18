import React from 'react';
import { Text, View } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants';

const Header = ({ children, style }) => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={[viewStyle, style]}>
			<Text style={textStyle}>{children}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: SECONDARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,

		//IOS Shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,

		//Android Shadow
		elevation: 2,

	},
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 5,
		color: '#FFF'
	}
};

export { Header };
