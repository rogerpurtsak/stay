import { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../api/client';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [tripCount, setTripCount] = useState<number | null>(null);

  useFocusEffect(useCallback(() => {
    if (!user) { setTripCount(null); return; }
    apiClient.get<{ tripId: string }[]>('/api/users/me/trips')
      .then(trips => setTripCount(trips.length))
      .catch(() => setTripCount(0));
  }, [user]));

  // Not logged in
  if (!user) {
    return (
      <View className="flex-1 bg-white px-6">
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold mb-2">Stay</Text>
          <Text className="text-base text-gray-500 mb-10">Discover your next stay</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding')}
            className="bg-black py-4 rounded-2xl mb-4 w-full items-center"
          >
            <Text className="text-white font-semibold text-base">Create a trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Auth', {})}
            className="py-3 w-full items-center"
          >
            <Text className="text-gray-500 text-base">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const profileButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      className="absolute top-14 right-6 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
    >
      <Text className="font-bold text-base">{user.displayName[0].toUpperCase()}</Text>
    </TouchableOpacity>
  );

  // Loading
  if (tripCount === null) {
    return (
      <View className="flex-1 bg-white">
        {profileButton}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  // Logged in, no trips
  if (tripCount === 0) {
    return (
      <View className="flex-1 bg-white px-6">
        {profileButton}
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl mb-6">✈️</Text>
          <Text className="text-2xl font-bold mb-3 text-center">Create your first trip</Text>
          <Text className="text-gray-500 text-center mb-10 leading-6">
            Plan where you're going, invite friends, and swipe through stays together.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding')}
            className="bg-black py-4 rounded-2xl w-full items-center"
          >
            <Text className="text-white font-semibold text-base">Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Logged in, has trips
  return (
    <View className="flex-1 bg-white px-6">
      {profileButton}
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl font-bold mb-2">Stay</Text>
        <Text className="text-base text-gray-500 mb-10">Hi, {user.displayName} 👋</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyTrips')}
          className="bg-black py-4 rounded-2xl mb-4 w-full items-center"
        >
          <Text className="text-white font-semibold text-base">My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          className="py-4 rounded-2xl border border-gray-200 w-full items-center"
        >
          <Text className="font-semibold text-base">Create new trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
