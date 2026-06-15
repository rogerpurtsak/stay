import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

type TripRoomRoute = RouteProp<RootStackParamList, 'TripRoom'>;

type TripDetail = {
  tripId: string;
  inviteCode: string;
  locationName: string;
  guests: number;
  startDate: string;
  endDate: string;
  members: Array<{ id: string; displayName: string; isGuest: boolean }>;
};

type StayCard = {
  id: string;
  name: string;
  locationName: string;
  priceFrom: number;
  imageUrls: string[];
};

type MemberLiked = {
  memberId: string;
  displayName: string;
  isGuest: boolean;
  likedStays: StayCard[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function TripRoomScreen() {
  const route = useRoute<TripRoomRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [memberLiked, setMemberLiked] = useState<MemberLiked[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [tripData, likedData] = await Promise.all([
      apiClient.get<TripDetail>(`/api/trips/${tripId}`),
      apiClient.get<MemberLiked[]>(`/api/trips/${tripId}/member-liked`),
    ]);
    setTrip(tripData);
    setMemberLiked(likedData);
    setLoading(false);
  }, [tripId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  if (loading || !trip) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleShare = () =>
    Share.share({ message: `Join my trip on Stay! Use invite code: ${trip.inviteCode}` });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Trip Room</Text>
      </View>

      {/* Trip info */}
      <View className="mx-6 bg-gray-50 rounded-2xl p-5 mb-6 gap-3">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs text-gray-400 mb-1">Location</Text>
            <Text className="font-semibold">{trip.locationName}</Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-400 mb-1">Guests</Text>
            <Text className="font-semibold">{trip.guests}</Text>
          </View>
        </View>
        <View>
          <Text className="text-xs text-gray-400 mb-1">Dates</Text>
          <Text className="font-semibold">{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</Text>
        </View>
      </View>

      {/* Invite code */}
      <View className="mx-6 bg-black rounded-2xl px-5 py-4 mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-gray-400 mb-1">Invite code</Text>
          <Text className="text-white font-bold text-xl tracking-widest">{trip.inviteCode}</Text>
        </View>
        <TouchableOpacity onPress={handleShare} className="bg-white px-4 py-2 rounded-xl">
          <Text className="font-semibold text-sm">Share</Text>
        </TouchableOpacity>
      </View>

      {/* Members + liked stays */}
      <View className="px-6 mb-4">
        <Text className="text-lg font-bold mb-4">Members ({trip.members.length})</Text>

        {memberLiked.length === 0 && (
          <View className="items-center py-6">
            <Text className="text-gray-400 text-center">No members yet. Share the invite code to get started!</Text>
          </View>
        )}

        {memberLiked.map(member => (
          <View key={member.memberId} className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center">
                <Text className="font-bold text-sm">{member.displayName[0].toUpperCase()}</Text>
              </View>
              <Text className="font-semibold text-base">{member.displayName}</Text>
              {member.isGuest && (
                <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                  <Text className="text-xs text-gray-400">Guest</Text>
                </View>
              )}
              <Text className="text-gray-400 text-sm ml-auto">❤️ {member.likedStays.length}</Text>
            </View>

            {member.likedStays.length === 0 ? (
              <Text className="text-gray-400 text-sm ml-10">No liked stays yet</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ml-10">
                {member.likedStays.map(stay => (
                  <View key={stay.id} className="mr-3 w-40">
                    {stay.imageUrls[0] ? (
                      <Image
                        source={{ uri: stay.imageUrls[0] }}
                        className="w-40 h-28 rounded-xl mb-2"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-40 h-28 rounded-xl mb-2 bg-gray-100" />
                    )}
                    <Text className="font-semibold text-sm" numberOfLines={1}>{stay.name}</Text>
                    <Text className="text-gray-400 text-xs" numberOfLines={1}>{stay.locationName}</Text>
                    <Text className="text-sm mt-0.5">€{stay.priceFrom}<Text className="text-gray-400 text-xs">/night</Text></Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        ))}
      </View>

      {/* Actions */}
      <View className="mx-6 mb-12 gap-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('Swipe', { tripId })}
          className="py-4 rounded-2xl items-center bg-black"
        >
          <Text className="text-white font-semibold text-base">Swipe Stays</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ActivityFeed', { tripId })}
          className="py-4 rounded-2xl items-center border border-gray-200"
        >
          <Text className="font-semibold text-base">Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Matches', { tripId })}
          className="py-4 rounded-2xl items-center border border-gray-200"
        >
          <Text className="font-semibold text-base">See Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddedItems', { tripId })}
          className="py-4 rounded-2xl items-center border border-gray-200"
        >
          <Text className="font-semibold text-base">Added by members</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Liked', { tripId })}
          className="py-4 rounded-2xl items-center border border-gray-200"
        >
          <Text className="font-semibold text-base">My Liked Stays</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
