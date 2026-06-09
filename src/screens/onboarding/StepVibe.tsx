import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OnboardingData } from './OnboardingScreen';

type Props = {
  onNext: (data: Partial<OnboardingData>) => void;
};

const VIBES = ['Nature', 'City', 'Beach', 'Mountains', 'Countryside', 'Any'];

export default function StepVibe({ onNext }: Props) {
  const [vibe, setVibe] = useState('');

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold mb-2">What's the vibe?</Text>
      <Text className="text-gray-500 mb-8">Pick what fits your trip best</Text>

      <View className="flex-row flex-wrap gap-3 mb-8">
        {VIBES.map(v => (
          <TouchableOpacity
            key={v}
            onPress={() => setVibe(v)}
            className={`px-5 py-3 rounded-full border ${
              vibe === v ? 'bg-black border-black' : 'border-gray-200'
            }`}
          >
            <Text className={`font-medium ${vibe === v ? 'text-white' : 'text-black'}`}>
              {v}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onNext({ vibe })}
        disabled={!vibe}
        className={`py-4 rounded-2xl items-center ${vibe ? 'bg-black' : 'bg-gray-200'}`}
      >
        <Text className={`font-semibold text-base ${vibe ? 'text-white' : 'text-gray-400'}`}>
          Find stays
        </Text>
      </TouchableOpacity>
    </View>
  );
}
