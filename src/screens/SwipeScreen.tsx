import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type SwipeScreenRoute = RouteProp<RootStackParamList, 'Swipe'>;

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

function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
  const [index, setIndex] = useState(0);
  const urls = imageUrls.length > 0 ? imageUrls : [''];

  return (
    <View style={styles.imageContainer}>
      <View style={StyleSheet.absoluteFillObject}>
        {urls[index] ? (
          <Image source={{ uri: urls[index] }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#e5e7eb' }]} />
        )}
      </View>
      <TouchableOpacity
        style={styles.imageTapLeft}
        onPress={() => setIndex(i => Math.max(0, i - 1))}
        activeOpacity={1}
      />
      <TouchableOpacity
        style={styles.imageTapRight}
        onPress={() => setIndex(i => Math.min(urls.length - 1, i + 1))}
        activeOpacity={1}
      />
      {urls.length > 1 && (
        <View style={styles.dots}>
          {urls.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

function DetailModal({ stay, onClose }: { stay: Stay; onClose: () => void }) {
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageCarousel imageUrls={stay.imageUrls} />
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
          <Text className="text-gray-700 leading-6 mb-8">{stay.description}</Text>
        </ScrollView>
        <TouchableOpacity onPress={onClose} className="mx-6 mb-8 py-4 rounded-2xl items-center bg-black">
          <Text className="text-white font-semibold text-base">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default function SwipeScreen() {
  const route = useRoute<SwipeScreenRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;

  const [stays, setStays] = useState<Stay[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailStay, setDetailStay] = useState<Stay | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndexRef = useRef(0);
  const staysRef = useRef<Stay[]>([]);
  currentIndexRef.current = currentIndex;
  staysRef.current = stays;

  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    apiClient.get<Stay[]>(`/api/trips/${tripId}/stays`).then(data => {
      setStays(data);
      setLoading(false);
    });
  }, []);

  const animateSwipe = (liked: boolean) => {
    const toX = liked ? SCREEN_WIDTH + 100 : -(SCREEN_WIDTH + 100);
    Animated.timing(position, {
      toValue: { x: toX, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(async () => {
      const stay = staysRef.current[currentIndexRef.current];
      if (stay) {
        try {
          await apiClient.post(`/api/trips/${tripId}/swipes`, { stayId: stay.id, liked });
        } catch {}
      }
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex(i => i + 1);
    });
  };

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8,
    onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy * 0.3 }),
    onPanResponderRelease: (_, g) => {
      if (g.dx > SWIPE_THRESHOLD) animateSwipe(true);
      else if (g.dx < -SWIPE_THRESHOLD) animateSwipe(false);
      else Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    },
  })).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (currentIndex >= stays.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-4xl mb-4">🎉</Text>
        <Text className="text-2xl font-bold mb-2 text-center">You've seen them all!</Text>
        <Text className="text-gray-500 text-center mb-8">Your group can now see which stays everyone liked.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Liked', { tripId })} className="py-4 px-8 rounded-2xl bg-black mb-4 w-full items-center">
          <Text className="text-white font-semibold text-base">See Liked Stays ❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Home')} className="py-4 px-8 w-full items-center">
          <Text className="text-gray-400 text-base">Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (stays.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-2xl font-bold mb-2 text-center">No stays found</Text>
        <Text className="text-gray-500 text-center">Try adjusting your trip's vibe or location.</Text>
      </View>
    );
  }

  const renderCards = () => {
    const visible = stays.slice(currentIndex, currentIndex + 3);
    return [...visible].reverse().map((stay, reversedIdx) => {
      const offset = visible.length - 1 - reversedIdx;
      const isTop = offset === 0;

      const cardStyle = isTop
        ? {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate },
            ],
          }
        : {
            transform: [
              { scale: 1 - offset * 0.04 },
              { translateY: -offset * 12 },
            ],
          };

      return (
        <Animated.View
          key={stay.id}
          style={[styles.card, cardStyle]}
          {...(isTop ? panResponder.panHandlers : {})}
        >
          <ImageCarousel imageUrls={stay.imageUrls} />

          {isTop && (
            <>
              <Animated.View style={[styles.label, styles.likeLabel, { opacity: likeOpacity }]}>
                <Text style={styles.labelText}>LIKE ❤️</Text>
              </Animated.View>
              <Animated.View style={[styles.label, styles.passLabel, { opacity: passOpacity }]}>
                <Text style={styles.labelText}>PASS</Text>
              </Animated.View>
            </>
          )}

          <View style={styles.cardInfo}>
            <View className="flex-row justify-between items-end">
              <View className="flex-1 mr-4">
                <Text className="text-xl font-bold text-white">{stay.name}</Text>
                <Text className="text-white opacity-80">{stay.locationName}</Text>
              </View>
              <View className="items-end">
                <Text className="text-white font-bold text-lg">€{stay.priceFrom}</Text>
                <Text className="text-white opacity-70 text-xs">per night</Text>
              </View>
            </View>
            {stay.rating && (
              <Text className="text-white opacity-80 text-sm mt-1">★ {stay.rating}</Text>
            )}
          </View>
        </Animated.View>
      );
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-6 pt-14 pb-2">
        <TouchableOpacity onPress={() => navigation.navigate('TripRoom', { tripId })}>
          <Text className="text-gray-400">← Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Liked', { tripId })}>
          <Text className="text-base">❤️ Liked</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center px-4">
        <View style={styles.cardStack}>
          {renderCards()}
        </View>
      </View>

      <View className="flex-row justify-between items-center px-10 pb-10 pt-4">
        <TouchableOpacity
          onPress={() => animateSwipe(false)}
          className="w-16 h-16 rounded-full bg-white items-center justify-center shadow-sm border border-gray-100"
        >
          <Text className="text-2xl">✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDetailStay(stays[currentIndex])}
          className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm border border-gray-100"
        >
          <Text className="text-lg">ℹ️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => animateSwipe(true)}
          className="w-16 h-16 rounded-full bg-black items-center justify-center shadow-sm"
        >
          <Text className="text-2xl">❤️</Text>
        </TouchableOpacity>
      </View>

      {detailStay && <DetailModal stay={detailStay} onClose={() => setDetailStay(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cardStack: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 1.35,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: '75%',
    position: 'relative',
  },
  imageTapLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '40%',
  },
  imageTapRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: 'white',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  label: {
    position: 'absolute',
    top: 40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 3,
    zIndex: 10,
  },
  likeLabel: {
    left: 20,
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.15)',
    transform: [{ rotate: '-15deg' }],
  },
  passLabel: {
    right: 20,
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239,68,68,0.15)',
    transform: [{ rotate: '15deg' }],
  },
  labelText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 1,
  },
});
