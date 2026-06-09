import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { OnboardingData } from './OnboardingScreen';

type Props = {
  onNext: (data: Partial<OnboardingData>) => void;
};

export default function StepLocation({ onNext }: Props) {
  const [location, setLocation] = useState('');

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold mb-2">Where to?</Text>
      <Text className="text-gray-500 mb-8">Enter a city or region</Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-8 text-base"
        placeholder="e.g. Tallinn, Barcelona..."
        value={location}
        onChangeText={setLocation}
        autoFocus
      />

      <TouchableOpacity
        onPress={() => onNext({ location })}
        disabled={!location.trim()}
        className={`py-4 rounded-2xl items-center ${location.trim() ? 'bg-black' : 'bg-gray-200'}`}
      >
        <Text className={`font-semibold text-base ${location.trim() ? 'text-white' : 'text-gray-400'}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
