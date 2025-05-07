import { Image, ImageProps } from 'react-native';

export default function Logo(props: ImageProps) {
  return <Image source={require('../assets/logo.png')} style={{ width: 203, height: 42 }} {...props} />;
}
