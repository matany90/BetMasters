import React from 'react';
import { Text, View, Modal, Image } from 'react-native';

const FullScreenSpinner = ({ children, visible, source, style }) => {
const { textStyle, containerStyle, spinnerStyle } = styles;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={() => {}}
		>
			<View style={containerStyle}>
				<View style={{ position: 'absolute', top: 150, left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
					<Text style={textStyle}>{children}</Text>
				</View>
				<View
					style={spinnerStyle}
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
				>
				<Image
					source={source}
					style={style}
				/>
				</View>
			</View>
		</Modal>
	);
};

const styles = {
	textStyle: {
		fontSize: 30,
		textAlign: 'center',
		lineHeight: 40,
		color: '#fff',
		fontWeight: 'bold'
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	},
	spinnerStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center' 
	}
};

export { FullScreenSpinner };
