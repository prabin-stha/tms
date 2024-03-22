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
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedTrafficIndexImport } from './routes/_authenticated/traffic/index'
import { Route as AuthenticatedTrafficIdImport } from './routes/_authenticated/traffic/$id'

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

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTrafficIndexRoute = AuthenticatedTrafficIndexImport.update({
  path: '/traffic/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTrafficIdRoute = AuthenticatedTrafficIdImport.update({
  path: '/traffic/$id',
  getParentRoute: () => AuthenticatedRoute,
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
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/traffic/$id': {
      preLoaderRoute: typeof AuthenticatedTrafficIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/traffic/': {
      preLoaderRoute: typeof AuthenticatedTrafficIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedIndexRoute,
    AuthenticatedTrafficIdRoute,
    AuthenticatedTrafficIndexRoute,
  ]),
  LoginRoute,
  RegisterRoute,
])

/* prettier-ignore-end */