import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { OnboardingData } from './OnboardingScreen';

type Props = {
  onNext: (data: Partial<OnboardingData>) => void;
};

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function StepDates({ onNext }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const today = new Date();
  const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(weekLater);
  const [picking, setPicking] = useState<'start' | 'end'>('start');

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold mb-2">When are you going?</Text>
      <Text className="text-gray-500 mb-6">Pick your travel dates</Text>

      <View className="flex-row gap-3 mb-4">
        <TouchableOpacity
          onPress={() => setPicking('start')}
          className={`flex-1 py-3 px-4 rounded-xl border ${picking === 'start' ? 'border-black' : 'border-gray-200'}`}
        >
          <Text className="text-xs text-gray-500 mb-1">Check-in</Text>
          <Text className="font-semibold">{toIso(startDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPicking('end')}
          className={`flex-1 py-3 px-4 rounded-xl border ${picking === 'end' ? 'border-black' : 'border-gray-200'}`}
        >
          <Text className="text-xs text-gray-500 mb-1">Check-out</Text>
          <Text className="font-semibold">{toIso(endDate)}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePicker
        value={picking === 'start' ? startDate : endDate}
        mode="date"
        display="spinner"
        minimumDate={picking === 'end' ? startDate : today}
        onChange={(_, date) => {
          if (!date) return;
          if (picking === 'start') {
            setStartDate(date);
            if (date >= endDate) setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
          } else {
            setEndDate(date);
          }
        }}
        textColor="black"
      />

      <TouchableOpacity
        onPress={() => onNext({ startDate: toIso(startDate), endDate: toIso(endDate) })}
        className="py-4 rounded-2xl items-center bg-black mt-2"
      >
        <Text className="text-white font-semibold text-base">Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Auth', {})}
        className="py-4 items-center"
      >
        <Text className="text-gray-400 text-sm">Already have an account? <Text className="text-black font-semibold">Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
