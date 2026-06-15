import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

type MatchesRoute = RouteProp<RootStackParamList, 'Matches'>;

type Stay = {
  id: string;
  name: string;
  locationName: string;
  priceFrom: number;
  bookingUrl: string;
  imageUrls: string[];
};

type Match = {
  stay: Stay;
  likedCount: number;
  memberCount: number;
  popularityPercentage: number;
  isPerfectMatch: boolean;
};

function MatchCard({ match }: { match: Match }) {
  const { stay, likedCount, memberCount, isPerfectMatch } = match;
  return (
    <TouchableOpacity
      onPress={() => stay.bookingUrl && Linking.openURL(stay.bookingUrl)}
      activeOpacity={0.85}
      className="flex-row bg-gray-50 rounded-2xl mb-3 overflow-hidden"
    >
      {stay.imageUrls[0] ? (
        <Image source={{ uri: stay.imageUrls[0] }} style={{ width: 110, height: 120 }} resizeMode="cover" />
      ) : (
        <View style={{ width: 110, height: 120 }} className="bg-gray-200" />
      )}
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="font-bold text-base mb-1" numberOfLines={1}>{stay.name}</Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>{stay.locationName}</Text>
          <Text className="text-sm mt-1">€{stay.priceFrom}<Text className="text-gray-400 text-xs">/night</Text></Text>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <View className={`px-2 py-1 rounded-full ${isPerfectMatch ? 'bg-black' : 'bg-gray-100'}`}>
            <Text className={`text-xs font-bold ${isPerfectMatch ? 'text-white' : 'text-gray-600'}`}>
              {likedCount}/{memberCount} ❤️
            </Text>
          </View>
          {isPerfectMatch && (
            <Text className="text-xs text-gray-400">Everyone liked this!</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MatchesScreen() {
  const route = useRoute<MatchesRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiClient.get<Match[]>(`/api/trips/${tripId}/matches`);
    setMatches(data);
    setLoading(false);
  }, [tripId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const perfect = matches.filter(m => m.isPerfectMatch);
  const popular = matches.filter(m => !m.isPerfectMatch);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Matches</Text>
      </View>

      {matches.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6 pt-20">
          <Text className="text-4xl mb-4">🤝</Text>
          <Text className="text-xl font-bold mb-2 text-center">No matches yet</Text>
          <Text className="text-gray-500 text-center mb-6">When 2+ members like the same stay, it'll appear here.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Swipe', { tripId })}
            className="bg-black py-4 px-8 rounded-2xl"
          >
            <Text className="text-white font-semibold">Keep swiping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-6">
          {perfect.length > 0 && (
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-3">
                <Text className="text-lg font-bold">Perfect Matches</Text>
                <View className="bg-black px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-bold">{perfect.length}</Text>
                </View>
              </View>
              <Text className="text-gray-400 text-sm mb-4">Everyone in the trip liked these stays.</Text>
              {perfect.map(m => <MatchCard key={m.stay.id} match={m} />)}
            </View>
          )}

          {popular.length > 0 && (
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-3">
                <Text className="text-lg font-bold">Popular Places</Text>
                <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                  <Text className="text-gray-600 text-xs font-bold">{popular.length}</Text>
                </View>
              </View>
              <Text className="text-gray-400 text-sm mb-4">Liked by multiple members.</Text>
              {popular.map(m => <MatchCard key={m.stay.id} match={m} />)}
            </View>
          )}
        </View>
      )}

      <View className="h-8" />
    </ScrollView>
  );
}
