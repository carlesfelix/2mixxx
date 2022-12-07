import { lazy } from 'react'

/**
 * Main pages
 */
export const NoUserMainPage = lazy(() => import('@/pages/NoUserMainPage'))
export const EventUserMainPage = lazy(() => import('@/pages/EventUserMainPage'))
export const RegisteredUserMainPage = lazy(() => import('@/pages/RegisteredUserMainPage'))

/**
 * No user pages
 */
export const LoginPage = lazy(() => import('@/pages/LoginPage'))

/**
 * Registered user pages
 */
export const RegisteredUserEventsPage = lazy(() => import('@/pages/RegisteredUserEventsPage'))
export const RegisteredUserCreateEventPage = lazy(() => import('@/pages/RegisteredUserCreateEventPage'))

/**
 * Generic pages
 */
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
