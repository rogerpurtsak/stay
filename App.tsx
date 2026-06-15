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
import LikedScreen from './src/screens/LikedScreen';
import TripRoomScreen from './src/screens/TripRoomScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';
import AddedItemsScreen from './src/screens/AddedItemsScreen';

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
  Liked: { tripId: string };
  TripRoom: { tripId: string };
  Matches: { tripId: string };
  Profile: undefined;
  MyTrips: undefined;
  AddedItems: { tripId: string };
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
          <Stack.Screen name="Liked" component={LikedScreen} />
          <Stack.Screen name="TripRoom" component={TripRoomScreen} />
          <Stack.Screen name="Matches" component={MatchesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyTrips" component={MyTripsScreen} />
          <Stack.Screen name="AddedItems" component={AddedItemsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
