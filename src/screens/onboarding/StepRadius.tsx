import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OnboardingData } from './OnboardingScreen';

type Props = {
  onNext: (data: Partial<OnboardingData>) => void;
};

const OPTIONS = [10, 25, 50, 100];

export default function StepRadius({ onNext }: Props) {
  const [radiusKm, setRadiusKm] = useState(25);

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold mb-2">Search radius</Text>
      <Text className="text-gray-500 mb-8">How far from the city center?</Text>

      <View className="gap-3 mb-8">
        {OPTIONS.map(r => (
          <TouchableOpacity
            key={r}
            onPress={() => setRadiusKm(r)}
            className={`py-4 rounded-2xl items-center border ${
              radiusKm === r ? 'bg-black border-black' : 'border-gray-200'
            }`}
          >
            <Text className={`font-medium text-base ${radiusKm === r ? 'text-white' : 'text-black'}`}>
              {r} km
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onNext({ radiusKm })}
        className="py-4 rounded-2xl items-center bg-black"
      >
        <Text className="font-semibold text-base text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
