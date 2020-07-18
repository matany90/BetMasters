import React from 'react';
import { View, Text } from 'react-native';
import { locali } from '../../locales/i18n';

export default () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', marginRight: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{locali('app.app_name')}</Text>
        </View>
    </View>
);
