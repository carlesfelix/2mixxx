import { lazy } from 'react'

/**
 * Main pages
 */
export const NoUserMainPage = lazy(async () => await import('@/pages/NoUserMainPage'))
export const EventUserMainPage = lazy(async () => await import('@/pages/EventUserMainPage'))
export const RegisteredUserMainPage = lazy(async () => await import('@/pages/RegisteredUserMainPage'))

/**
 * No user pages
 */
export const LoginPage = lazy(async () => await import('@/pages/LoginPage'))

/**
 * Registered user pages
 */
export const RegisteredUserEventsPage = lazy(async () => await import('@/pages/RegisteredUserEventsPage'))
export const RegisteredUserCreateEventPage = lazy(async () => await import('@/pages/RegisteredUserCreateEventPage'))

/**
 * Generic pages
 */
export const NotFoundPage = lazy(async () => await import('@/pages/NotFoundPage'))
