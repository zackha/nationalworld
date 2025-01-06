import React, { useState } from 'react';
import { HeaderTwo } from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity, Text, View, Switch, ScrollView } from 'react-native';

export default function AccountScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ThemedView>
      <HeaderTwo title="Settings" />
      <ScrollView style={{ margin: 12 }}>
        <View style={{ paddingVertical: 18, gap: 14 }}>
          <TouchableOpacity style={{ padding: 18, backgroundColor: '#151618', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Account settings</Text>
            <IconSymbol name="arrow.forward" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 18, backgroundColor: '#151618', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Theme</Text>
            <IconSymbol name="arrow.forward" size={20} color="white" />
          </TouchableOpacity>
          <View style={{ padding: 18, backgroundColor: '#151618', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Notification</Text>
              <Text style={{ color: '#aaa', fontFamily: 'BBCReithSansMd', fontSize: 12, lineHeight: 22 }}>
                Turn on breaking news notifications. To receive these notifications, you must also allow notifications in your device settings.
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#000', true: '#fff' }}
              thumbColor={isEnabled ? '#000' : '#fff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }], marginRight: -8, marginTop: -4 }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 18,
                backgroundColor: '#151618',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: '#666',
                borderBottomWidth: 1,
              }}>
              <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Terms & Conditions</Text>
              <IconSymbol name="arrow.forward" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 18, backgroundColor: '#151618', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Privacy Policy</Text>
              <IconSymbol name="arrow.forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ padding: 18, backgroundColor: '#151618', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Report an issue</Text>
            <IconSymbol name="arrow.forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, gap: 4 }}>
          <Text style={{ color: '#ccc', fontFamily: 'BBCReithSansRg', textAlign: 'center' }}>Version v2025.7.2 (26074)</Text>
          <Text style={{ color: '#ccc', fontFamily: 'BBCReithSansRg', textAlign: 'center' }}>Copyright 2025 Barrnon Media Limited</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
