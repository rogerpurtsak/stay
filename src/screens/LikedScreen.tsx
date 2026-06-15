import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

type LikedRoute = RouteProp<RootStackParamList, 'Liked'>;

type Stay = {
  id: string;
  name: string;
  locationName: string;
  priceFrom: number;
  rating: number;
  description: string;
  bookingUrl: string;
  vibeTags: string[];
  imageUrls: string[];
};

function DetailModal({ stay, onClose }: { stay: Stay; onClose: () => void }) {
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {stay.imageUrls[0] && (
          <Image source={{ uri: stay.imageUrls[0] }} style={styles.modalImage} resizeMode="cover" />
        )}
        <ScrollView className="px-6 pt-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold flex-1 mr-4">{stay.name}</Text>
            <Text className="text-lg font-semibold">€{stay.priceFrom}<Text className="text-gray-400 text-sm">/night</Text></Text>
          </View>
          <Text className="text-gray-500 mb-3">{stay.locationName}</Text>
          {stay.vibeTags.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-4">
              {stay.vibeTags.map(tag => (
                <View key={tag} className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-sm text-gray-600">{tag}</Text>
                </View>
              ))}
            </View>
          )}
          <Text className="text-gray-700 leading-6 mb-6">{stay.description}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(stay.bookingUrl)}
            className="bg-black py-4 rounded-2xl items-center mb-4"
          >
            <Text className="text-white font-semibold text-base">Book Now</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={onClose} className="mx-6 mb-8 py-4 rounded-2xl items-center border border-gray-200">
          <Text className="font-semibold text-base">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default function LikedScreen() {
  const route = useRoute<LikedRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;

  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailStay, setDetailStay] = useState<Stay | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiClient.get<Stay[]>(`/api/trips/${tripId}/liked`);
    setStays(data);
    setLoading(false);
  }, [tripId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleRemove = async (stayId: string) => {
    await apiClient.delete(`/api/trips/${tripId}/liked/${stayId}`);
    setStays(prev => prev.filter(s => s.id !== stayId));
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Liked stays</Text>
      </View>

      {stays.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-4xl mb-4">🤍</Text>
          <Text className="text-xl font-bold mb-2">No liked stays yet</Text>
          <Text className="text-gray-500 text-center mb-6">Swipe right on stays you like and they'll appear here.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Swipe', { tripId })}
            className="bg-black py-4 px-8 rounded-2xl"
          >
            <Text className="text-white font-semibold">Explore stays</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {stays.map(stay => (
            <TouchableOpacity
              key={stay.id}
              onPress={() => setDetailStay(stay)}
              className="flex-row bg-gray-50 rounded-2xl mb-4 overflow-hidden"
              activeOpacity={0.8}
            >
              {stay.imageUrls[0] ? (
                <Image source={{ uri: stay.imageUrls[0] }} style={styles.thumbnail} resizeMode="cover" />
              ) : (
                <View style={[styles.thumbnail, { backgroundColor: '#e5e7eb' }]} />
              )}
              <View className="flex-1 p-4 justify-between">
                <View>
                  <Text className="font-bold text-base mb-1" numberOfLines={1}>{stay.name}</Text>
                  <Text className="text-gray-500 text-sm" numberOfLines={1}>{stay.locationName}</Text>
                  <Text className="text-sm mt-1">€{stay.priceFrom}<Text className="text-gray-400"> /night</Text></Text>
                </View>
                <View className="flex-row gap-2 mt-3">
                  <TouchableOpacity
                    onPress={() => Linking.openURL(stay.bookingUrl)}
                    className="flex-1 py-2 rounded-xl bg-black items-center"
                  >
                    <Text className="text-white text-xs font-semibold">Book</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemove(stay.id)}
                    className="px-3 py-2 rounded-xl border border-gray-200 items-center"
                  >
                    <Text className="text-gray-400 text-xs">Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View className="h-8" />
        </ScrollView>
      )}

      {detailStay && <DetailModal stay={detailStay} onClose={() => setDetailStay(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 110,
    height: 130,
  },
  modalImage: {
    width: '100%',
    height: 280,
  },
});
