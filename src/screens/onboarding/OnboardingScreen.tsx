import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import StepDates from './StepDates';
import StepGuests from './StepGuests';
import StepLocation from './StepLocation';
import StepRadius from './StepRadius';
import StepVibe from './StepVibe';
import { apiClient } from '../../api/client';

export type OnboardingData = {
  startDate: string;
  endDate: string;
  guests: number;
  location: string;
  radiusKm: number;
  vibe: string;
};

const TOTAL_STEPS = 5;

export default function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const next = async (update: Partial<OnboardingData>) => {
    const updated = { ...data, ...update };
    setData(updated);
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate('Auth', { onboardingData: updated as OnboardingData });
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = (step + 1) / TOTAL_STEPS;

  const steps = [
    <StepDates key="dates" onNext={next} />,
    <StepGuests key="guests" onNext={next} />,
    <StepLocation key="location" onNext={next} />,
    <StepRadius key="radius" onNext={next} />,
    <StepVibe key="vibe" onNext={next} />,
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-2">
        <View className="h-1 bg-gray-200 rounded-full">
          <View
            className="h-1 bg-black rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
        <Text className="text-xs text-gray-400 mt-2 text-right">
          {step + 1} / {TOTAL_STEPS}
        </Text>
      </View>

      <View className="flex-1 px-6 pt-6">
        {steps[step]}
      </View>

      {step > 0 && (
        <TouchableOpacity onPress={back} className="px-6 pb-6">
          <Text className="text-gray-400 text-sm">← Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
