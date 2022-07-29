import { lazy } from 'react';

export const HomePage = lazy(() => import('../pages/HomePage'));
export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
export const DashboardPage = lazy(() => import('../pages/DashboardPage'));
export const RoomsDashboardPage = lazy(() => import('../pages/RoomsDashboardPage'));
export const ManageRoomLibrariesPage = lazy(() => import('../pages/ManageRoomLibrariesPage'));
export const LibrariesDashboardPage = lazy(() => import('../pages/LibrariesDashboardPage'));
export const UsersDashboardPage = lazy(() => import('../pages/UsersDashboardPage'));
export const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
export const ManageRoomModeratorsPage = lazy(() => import('../pages/ManageRoomModeratorsPage'));
export const ModerateRoomsPage = lazy(() => import('../pages/ModerateRoomsPage'));
export const ModerateRoomPage = lazy(() => import('../pages/ModerateRoomPage'));
export const RoomPage = lazy(() => import('../pages/RoomPage'));
export const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));
export const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
