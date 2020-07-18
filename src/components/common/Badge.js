import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    badge: {
        fontSize: 40,
        paddingHorizontal: 10
    }
});

const Badge = ({ iconName, badgeCount, onPress }) =>
        <TouchableOpacity onPress={onPress}>
            <IconBadge 
                MainElement={
                <Ionicons name={iconName} style={[styles.badge, badgeCount > 0 ? { color: '#5ecff4' } : '']} />
                } 
                BadgeElement={
                    <Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>
                }
                IconBadgeStyle={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'transparent',
                        top: 9,
                        right: 14,
                    }}
                Hidden={badgeCount === 0}
            /> 
        </TouchableOpacity>;

export { Badge };
