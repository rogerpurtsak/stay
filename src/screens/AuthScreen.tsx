import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { OnboardingData } from './onboarding/OnboardingScreen';
import { apiClient } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthScreenRoute = RouteProp<RootStackParamList, 'Auth'>;
type AuthResponse = {
  token: string;
  userId: string;
  displayName: string;
};

function LoginForm({ onboardingData }: { onboardingData?: OnboardingData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const handleSubmit = async () => {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', { email, password });
      await login(response.token, response.userId, response.displayName);
      if (onboardingData) {
        const trip = await apiClient.post<{ tripId: string; inviteCode: string }>('/api/trips', {
          locationName: onboardingData.location,
          radiusKm: onboardingData.radiusKm,
          guests: onboardingData.guests,
          vibe: onboardingData.vibe,
          startDate: onboardingData.startDate,
          endDate: onboardingData.endDate,
        });
        navigation.replace('TripLanding', {
          tripId: trip.tripId,
          inviteCode: trip.inviteCode,
          locationName: onboardingData.location,
          startDate: onboardingData.startDate,
          endDate: onboardingData.endDate,
          guests: onboardingData.guests,
        });
      } else {
        navigation.replace('Home');
      }
    } catch (e) {
      console.error('Login failed:', e);
      alert(String(e));
    }
  };

  return (
    <View>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Parool"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-black py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-semibold text-base">Logi sisse</Text>
      </TouchableOpacity>
    </View>
  );
}

function RegisterForm({ onboardingData }: { onboardingData?: OnboardingData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', { displayName, email, password });
      await login(response.token, response.userId, response.displayName);
      if (onboardingData) {
        const trip = await apiClient.post<{ tripId: string; inviteCode: string }>('/api/trips', {
          locationName: onboardingData.location,
          radiusKm: onboardingData.radiusKm,
          guests: onboardingData.guests,
          vibe: onboardingData.vibe,
          startDate: onboardingData.startDate,
          endDate: onboardingData.endDate,
        });
        navigation.replace('TripLanding', {
          tripId: trip.tripId,
          inviteCode: trip.inviteCode,
          locationName: onboardingData.location,
          startDate: onboardingData.startDate,
          endDate: onboardingData.endDate,
          guests: onboardingData.guests,
        });
      } else {
        navigation.replace('Home');
      }
    } catch (e) {
      console.error('Register failed:', e);
      alert(String(e));
    }
  };

  return (
    <View>
        <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Name"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Parool"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-black py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-semibold text-base">Registreeri</Text>
      </TouchableOpacity>
    </View>
  );
}


export default function AuthScreen() {
  const route = useRoute<AuthScreenRoute>();
  const { onboardingData } = route.params;
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <View className="flex-row gap-6 mb-8">
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text className={isLogin ? 'text-xl font-bold' : 'text-xl text-gray-400'}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text className={!isLogin ? 'text-xl font-bold' : 'text-xl text-gray-400'}>Register</Text>
        </TouchableOpacity>
      </View>

      {isLogin ? <LoginForm onboardingData={onboardingData} /> : <RegisterForm onboardingData={onboardingData}/>}
    </View>
  );
}
