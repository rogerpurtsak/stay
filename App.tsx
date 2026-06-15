import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/auth/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen, { OnboardingData } from './src/screens/onboarding/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import TripLandingScreen from './src/screens/TripLandingScreen';
import SwipeScreen from './src/screens/SwipeScreen';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Auth: { onboardingData?: OnboardingData };
  TripLanding: {
    tripId: string;
    inviteCode: string;
    locationName: string;
    startDate: string;
    endDate: string;
    guests: number;
  };
  Swipe: { tripId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="TripLanding" component={TripLandingScreen} />
          <Stack.Screen name="Swipe" component={SwipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
