import { View, StyleSheet } from 'react-native';
import Logo from '@/components/Logo';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
    </View>
  );
};

export default Header;

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
