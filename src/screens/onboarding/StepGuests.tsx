import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OnboardingData } from './OnboardingScreen';

type Props = {
  onNext: (data: Partial<OnboardingData>) => void;
};

export default function StepGuests({ onNext }: Props) {
  const [guests, setGuests] = useState(2);

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold mb-2">How many guests?</Text>
      <Text className="text-gray-500 mb-12">Including yourself</Text>

      <View className="flex-row items-center justify-center gap-8 mb-12">
        <TouchableOpacity
          onPress={() => setGuests(Math.max(1, guests - 1))}
          className="w-14 h-14 rounded-full border border-gray-200 items-center justify-center"
        >
          <Text className="text-2xl">−</Text>
        </TouchableOpacity>

        <Text className="text-5xl font-bold w-16 text-center">{guests}</Text>

        <TouchableOpacity
          onPress={() => setGuests(guests + 1)}
          className="w-14 h-14 rounded-full border border-gray-200 items-center justify-center"
        >
          <Text className="text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onNext({ guests })}
        className="py-4 rounded-2xl items-center bg-black"
      >
        <Text className="font-semibold text-base text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
