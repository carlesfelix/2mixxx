import { lazy } from 'react';

/**
 * Main pages
 */
export const NoUserMainPage = lazy(() => import('@/pages/NoUserMainPage'));
export const RoomUserMainPage = lazy(() => import('@/pages/RoomUserMainPage'));
export const RegisteredUserMainPage = lazy(() => import('@/pages/RegisteredUserMainPage'));

/**
 * No user pages
 */
export const LoginPage = lazy(() => import('@/pages/LoginPage'));

/**
 * Registered user pages
 */
export const RegisteredUserRoomsPage = lazy(() => import('@/pages/RegisteredUserRoomsPage'));

/**
 * Generic pages
 */
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
