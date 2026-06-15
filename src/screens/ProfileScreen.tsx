import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Home');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Profile</Text>
      </View>

      <View className="mx-6 mt-4 bg-gray-50 rounded-2xl p-5 mb-6">
        <View className="w-16 h-16 rounded-full bg-black items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">
            {user?.displayName?.[0]?.toUpperCase() ?? '?'}
          </Text>
        </View>
        <Text className="text-xl font-bold">{user?.displayName}</Text>
        <Text className="text-gray-400 text-sm mt-1">Logged in</Text>
      </View>

      <View className="mx-6 gap-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('MyTrips')}
          className="flex-row items-center justify-between bg-gray-50 rounded-2xl px-5 py-4"
        >
          <Text className="font-semibold text-base">My Trips</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="py-4 rounded-2xl items-center border border-red-100"
        >
          <Text className="text-red-500 font-semibold text-base">Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
