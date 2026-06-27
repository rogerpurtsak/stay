import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';

type ActivityFeedRoute = RouteProp<RootStackParamList, 'ActivityFeed'>;

type ActivityEvent = {
  type: 'LIKE' | 'JOIN' | 'MATCH' | 'ADDED_ITEM';
  actorName: string | null;
  description: string;
  occurredAt: string;
};

const ICONS: Record<string, string> = {
  LIKE: '❤️',
  JOIN: '👋',
  MATCH: '🤝',
  ADDED_ITEM: '🔗',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ActivityFeedScreen() {
  const route = useRoute<ActivityFeedRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;

  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiClient.get<ActivityEvent[]>(`/api/trips/${tripId}/activity`);
    setEvents(data);
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

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-400 text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Activity</Text>
      </View>

      {events.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-4xl mb-4">📭</Text>
          <Text className="text-xl font-bold mb-2">No activity yet</Text>
          <Text className="text-gray-500 text-center">
            Activity will appear here when members join, swipe, or add accommodations.
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {events.map((event, i) => (
            <View key={i} className="flex-row items-start gap-3 mb-5">
              <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mt-0.5">
                <Text className="text-base">{ICONS[event.type] ?? '📌'}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-800 leading-5">{event.description}</Text>
                <Text className="text-xs text-gray-400 mt-1">{timeAgo(event.occurredAt)}</Text>
              </View>
            </View>
          ))}
          <View className="h-8" />
        </ScrollView>
      )}
    </View>
  );
}
