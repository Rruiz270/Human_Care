import type { NavigatorScreenParams } from '@react-navigation/native';

// Landing Stack
export type LandingStackParamList = {
  Welcome: undefined;
  Features: undefined;
  CareModel: undefined;
  Pricing: undefined;
};

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

// Life Map Stack
export type LifeMapStackParamList = {
  LifeMapHome: undefined;
  Past: undefined;
  Present: undefined;
  Future: undefined;
  JourneyMap: undefined;
};

// Sessions Stack
export type SessionsStackParamList = {
  SessionsList: undefined;
  SessionDetail: { sessionId: string };
  ScheduleSession: undefined;
};

// Missions Stack
export type MissionsStackParamList = {
  MissionsList: undefined;
  MissionDetail: { missionId: string };
  HabitTracker: undefined;
};

// Profile Stack
export type ProfileStackParamList = {
  Settings: undefined;
  Metrics: undefined;
  Calendar: undefined;
  Content: undefined;
  VideoPlayer: { videoId: string };
};

// Main Tab Navigator
export type MainTabParamList = {
  Inicio: undefined;
  Mapa: NavigatorScreenParams<LifeMapStackParamList>;
  Missoes: NavigatorScreenParams<MissionsStackParamList>;
  Chat: undefined;
  Perfil: NavigatorScreenParams<ProfileStackParamList>;
};

// Root Stack
export type RootStackParamList = {
  Landing: NavigatorScreenParams<LandingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
