import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-4xl font-bold mb-2">Stay</Text>
      <Text className="text-base text-gray-500 mb-10">Discover your next stay</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Onboarding')}
        className="bg-black py-4 px-8 rounded-2xl"
      >
        <Text className="text-white font-semibold text-base">Create a trip</Text>
      </TouchableOpacity>
    </View>
  );
}
