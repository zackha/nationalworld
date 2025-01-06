import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Logo from '@/components/Logo';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
    </View>
  );
};

export const HeaderTwo = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 12, paddingTop: 12, gap: 6 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <IconSymbol name="arrow.backward" size={22} color="white" />
        <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontFamily: 'BBCReithSerifBd', fontSize: 34 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 2,
    alignItems: 'center',
    width: '100%',
    height: 42,
    color: '#fff',
  },
});
