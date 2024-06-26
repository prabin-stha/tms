/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedRootLayoutImport } from './routes/_authenticated/_root-layout'
import { Route as AuthenticatedRootLayoutIndexImport } from './routes/_authenticated/_root-layout/index'
import { Route as AuthenticatedRootLayoutMySlotsIndexImport } from './routes/_authenticated/_root-layout/my-slots/index'
import { Route as AuthenticatedRootLayoutBookingsIndexImport } from './routes/_authenticated/_root-layout/bookings/index'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRootLayoutRoute = AuthenticatedRootLayoutImport.update({
  id: '/_root-layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedRootLayoutIndexRoute =
  AuthenticatedRootLayoutIndexImport.update({
    path: '/',
    getParentRoute: () => AuthenticatedRootLayoutRoute,
  } as any)

const AuthenticatedRootLayoutMySlotsIndexRoute =
  AuthenticatedRootLayoutMySlotsIndexImport.update({
    path: '/my-slots/',
    getParentRoute: () => AuthenticatedRootLayoutRoute,
  } as any)

const AuthenticatedRootLayoutBookingsIndexRoute =
  AuthenticatedRootLayoutBookingsIndexImport.update({
    path: '/bookings/',
    getParentRoute: () => AuthenticatedRootLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_root-layout': {
      preLoaderRoute: typeof AuthenticatedRootLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_root-layout/': {
      preLoaderRoute: typeof AuthenticatedRootLayoutIndexImport
      parentRoute: typeof AuthenticatedRootLayoutImport
    }
    '/_authenticated/_root-layout/bookings/': {
      preLoaderRoute: typeof AuthenticatedRootLayoutBookingsIndexImport
      parentRoute: typeof AuthenticatedRootLayoutImport
    }
    '/_authenticated/_root-layout/my-slots/': {
      preLoaderRoute: typeof AuthenticatedRootLayoutMySlotsIndexImport
      parentRoute: typeof AuthenticatedRootLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedRootLayoutRoute.addChildren([
      AuthenticatedRootLayoutIndexRoute,
      AuthenticatedRootLayoutBookingsIndexRoute,
      AuthenticatedRootLayoutMySlotsIndexRoute,
    ]),
  ]),
  LoginRoute,
  RegisterRoute,
])

/* prettier-ignore-end */
