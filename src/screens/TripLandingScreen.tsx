import { View, Text, TouchableOpacity, Share } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type TripLandingRoute = RouteProp<RootStackParamList, 'TripLanding'>;

export default function TripLandingScreen() {
  const route = useRoute<TripLandingRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId, inviteCode, locationName, startDate, endDate, guests } = route.params;

  const handleShare = async () => {
    await Share.share({
      message: `Join my trip on Stay! Use invite code: ${inviteCode}`,
    });
  };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <Text className="text-4xl font-bold mb-2">Trip Created 🎉</Text>
      <Text className="text-gray-500 mb-10">Your trip is ready. Invite friends and start swiping.</Text>

      <View className="bg-gray-50 rounded-2xl p-5 gap-4 mb-8">
        <View>
          <Text className="text-xs text-gray-400 mb-1">Location</Text>
          <Text className="font-semibold text-base">{locationName}</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400 mb-1">Dates</Text>
          <Text className="font-semibold text-base">{startDate} → {endDate}</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400 mb-1">Guests</Text>
          <Text className="font-semibold text-base">{guests}</Text>
        </View>
      </View>

      <View className="bg-black rounded-2xl px-5 py-4 mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-gray-400 mb-1">Invite code</Text>
          <Text className="text-white font-bold text-xl tracking-widest">{inviteCode}</Text>
        </View>
        <TouchableOpacity onPress={handleShare} className="bg-white px-4 py-2 rounded-xl">
          <Text className="font-semibold text-sm">Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.replace('Swipe', { tripId })}
        className="py-4 rounded-2xl items-center bg-black"
      >
        <Text className="text-white font-semibold text-base">Start Swiping</Text>
      </TouchableOpacity>
    </View>
  );
}
