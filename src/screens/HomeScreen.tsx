import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-white px-6">
      {user && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          className="absolute top-14 right-6 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <Text className="font-bold text-base">{user.displayName[0].toUpperCase()}</Text>
        </TouchableOpacity>
      )}
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl font-bold mb-2">Stay</Text>
        <Text className="text-base text-gray-500 mb-10">Discover your next stay</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          className="bg-black py-4 px-8 rounded-2xl"
        >
          <Text className="text-white font-semibold text-base">Create a trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
