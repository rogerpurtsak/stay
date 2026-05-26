import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold mb-2">Stay</Text>
      <Text className="text-base text-gray-500">Discover your next stay</Text>
    </View>
  );
}
