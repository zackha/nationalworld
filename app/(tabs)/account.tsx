import React, { useState } from 'react';
import { HeaderTwo } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity, Text, View, Switch, ScrollView, StyleSheet } from 'react-native';
import type { SettingsListItemProps } from '@/types';

const ListItem: React.FC<SettingsListItemProps> = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
    <IconSymbol name="arrow.forward" size={20} color="white" />
  </TouchableOpacity>
);

export default function AccountScreen() {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ThemedView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderTwo title="Settings" />
        <View style={styles.container}>
          <View style={styles.section}>
            <ListItem title="Account settings" />
            <ListItem title="Theme" />
            <View style={[styles.item, styles.notificationContainer]}>
              <View style={styles.notificationText}>
                <Text style={styles.itemText}>Notification</Text>
                <Text style={styles.notificationDescription}>
                  Turn on breaking news notifications. To receive these notifications, you must also allow notifications in your device settings.
                </Text>
              </View>
              <Switch trackColor={{ false: '#000', true: '#fff' }} thumbColor={isEnabled ? '#000' : '#fff'} onValueChange={toggleSwitch} value={isEnabled} style={styles.switch} />
            </View>
            <View>
              <ListItem title="Terms & Conditions" style={styles.borderBottom} />
              <ListItem title="Privacy Policy" />
            </View>
            <ListItem title="Report an issue" />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Version v2025.7.2 (26074)</Text>
            <Text style={styles.footerText}>Copyright 2025 Barrnon Media Limited</Text>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  section: {
    paddingVertical: 18,
    gap: 14,
  },
  item: {
    padding: 18,
    backgroundColor: '#151618',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
    fontFamily: 'BBCReithSansMd',
    fontSize: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationText: {
    flex: 1,
    gap: 4,
  },
  notificationDescription: {
    color: '#aaa',
    fontFamily: 'BBCReithSansMd',
    fontSize: 12,
    lineHeight: 22,
  },
  switch: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
    marginRight: -8,
    marginTop: -4,
  },
  footer: {
    paddingVertical: 20,
    gap: 4,
    textAlign: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#ccc',
    fontFamily: 'BBCReithSansRg',
  },
  borderBottom: {
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
});
