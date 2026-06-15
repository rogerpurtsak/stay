import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

type UserTrip = {
  tripId: string;
  inviteCode: string;
  locationName: string;
  startDate: string;
  endDate: string;
  guests: number;
  isCreator: boolean;
  memberCount: number;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function TripCard({
  trip,
  onOpen,
  onLeave,
}: {
  trip: UserTrip;
  onOpen: () => void;
  onLeave?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onOpen}
      activeOpacity={0.8}
      className="bg-gray-50 rounded-2xl p-4 mb-3"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-bold text-base flex-1 mr-2" numberOfLines={1}>
          {trip.locationName}
        </Text>
        <View className="bg-gray-200 px-2 py-0.5 rounded-full">
          <Text className="text-xs text-gray-500">
            {trip.memberCount} {trip.memberCount === 1 ? 'member' : 'members'}
          </Text>
        </View>
      </View>
      <Text className="text-gray-500 text-sm mb-3">
        {formatDate(trip.startDate)} – {formatDate(trip.endDate)} · {trip.guests} guests
      </Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onOpen}
          className="flex-1 py-2 rounded-xl bg-black items-center"
        >
          <Text className="text-white text-xs font-semibold">Open</Text>
        </TouchableOpacity>
        {onLeave && (
          <TouchableOpacity
            onPress={onLeave}
            className="px-4 py-2 rounded-xl border border-gray-200 items-center"
          >
            <Text className="text-gray-400 text-xs">Leave</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function MyTripsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [trips, setTrips] = useState<UserTrip[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiClient.get<UserTrip[]>('/api/users/me/trips');
    setTrips(data);
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleLeave = async (trip: UserTrip) => {
    await apiClient.delete(`/api/trips/${trip.tripId}/members/me`);
    setTrips(prev => prev.filter(t => t.tripId !== trip.tripId));
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const created = trips.filter(t => t.isCreator);
  const joined = trips.filter(t => !t.isCreator);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">My Trips</Text>
      </View>

      {trips.length === 0 ? (
        <View className="items-center justify-center px-6 pt-20">
          <Text className="text-4xl mb-4">🧳</Text>
          <Text className="text-xl font-bold mb-2">No trips yet</Text>
          <Text className="text-gray-500 text-center">Create or join a trip to get started.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding')}
            className="mt-6 bg-black px-8 py-4 rounded-2xl"
          >
            <Text className="text-white font-semibold">Create a trip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-6">
          {created.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold mb-3">Created by me ({created.length})</Text>
              {created.map(trip => (
                <TripCard
                  key={trip.tripId}
                  trip={trip}
                  onOpen={() => navigation.navigate('TripRoom', { tripId: trip.tripId })}
                />
              ))}
            </View>
          )}

          {joined.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold mb-3">Joined trips ({joined.length})</Text>
              {joined.map(trip => (
                <TripCard
                  key={trip.tripId}
                  trip={trip}
                  onOpen={() => navigation.navigate('TripRoom', { tripId: trip.tripId })}
                  onLeave={() => handleLeave(trip)}
                />
              ))}
            </View>
          )}
        </View>
      )}

      <View className="h-8" />
    </ScrollView>
  );
}
