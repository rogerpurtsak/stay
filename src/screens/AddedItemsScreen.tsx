import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { apiClient } from '../api/client';
import { useAuth } from '../auth/AuthContext';

type AddedItemsRoute = RouteProp<RootStackParamList, 'AddedItems'>;

type AddedItem = {
  id: string;
  addedByUserId: string;
  addedByDisplayName: string;
  url: string;
  title: string;
  notes: string | null;
  createdAt: string;
};

function AddModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (url: string, title: string, notes: string) => Promise<void>;
}) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!url.trim() || !title.trim()) return;
    setSaving(true);
    try {
      await onSave(url.trim(), title.trim(), notes.trim());
      setUrl(''); setTitle(''); setNotes('');
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="px-6 pt-6 pb-4 flex-row items-center justify-between border-b border-gray-100">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-gray-400 text-base">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold">Add accommodation</Text>
          <TouchableOpacity onPress={handleSave} disabled={saving || !url.trim() || !title.trim()}>
            <Text className={`font-semibold text-base ${!url.trim() || !title.trim() ? 'text-gray-300' : 'text-black'}`}>
              {saving ? '...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="px-6 pt-6">
          <Text className="text-xs text-gray-400 mb-2 uppercase tracking-wide">URL *</Text>
          <TextInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://airbnb.com/rooms/..."
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            className="bg-gray-50 rounded-xl px-4 py-3 text-base mb-5"
          />

          <Text className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Title *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Cosy studio in Tallinn"
            className="bg-gray-50 rounded-xl px-4 py-3 text-base mb-5"
          />

          <Text className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Notes (optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Loved the balcony, good location..."
            multiline
            numberOfLines={3}
            className="bg-gray-50 rounded-xl px-4 py-3 text-base mb-8"
            style={{ textAlignVertical: 'top', minHeight: 80 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function AddedItemsScreen() {
  const route = useRoute<AddedItemsRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tripId } = route.params;
  const { user } = useAuth();

  const [items, setItems] = useState<AddedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiClient.get<AddedItem[]>(`/api/trips/${tripId}/items`);
    setItems(data);
    setLoading(false);
  }, [tripId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSave = async (url: string, title: string, notes: string) => {
    const item = await apiClient.post<AddedItem>(`/api/trips/${tripId}/items`, { url, title, notes });
    setItems(prev => [item, ...prev]);
  };

  const handleDelete = async (itemId: string) => {
    await apiClient.delete(`/api/trips/${tripId}/items/${itemId}`);
    setItems(prev => prev.filter(i => i.id !== itemId));
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
      <View className="px-6 pt-14 pb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-gray-400 text-base">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Added</Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-black px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-semibold text-sm">+ Add</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-4xl mb-4">🔗</Text>
          <Text className="text-xl font-bold mb-2">No links added yet</Text>
          <Text className="text-gray-500 text-center mb-6">
            Paste a link to any accommodation — Airbnb, Booking.com, anywhere.
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-black py-4 px-8 rounded-2xl"
          >
            <Text className="text-white font-semibold">Add first link</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {items.map(item => (
            <View key={item.id} className="bg-gray-50 rounded-2xl p-4 mb-3">
              <View className="flex-row items-start justify-between mb-2">
                <Text className="font-bold text-base flex-1 mr-3" numberOfLines={2}>
                  {item.title}
                </Text>
                {user?.userId === item.addedByUserId && (
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text className="text-gray-300 text-lg">✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {item.notes ? (
                <Text className="text-gray-500 text-sm mb-3" numberOfLines={3}>
                  {item.notes}
                </Text>
              ) : null}

              <View className="flex-row items-center justify-between">
                <Text className="text-gray-400 text-xs flex-1 mr-3" numberOfLines={1}>
                  Added by {item.addedByDisplayName}
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.url)}
                  className="bg-black px-3 py-1.5 rounded-lg"
                >
                  <Text className="text-white text-xs font-semibold">Open ↗</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View className="h-8" />
        </ScrollView>
      )}

      <AddModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}
