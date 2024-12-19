/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SearchLazyImport = createFileRoute('/search')()
const RegisterLazyImport = createFileRoute('/register')()
const ProfileLazyImport = createFileRoute('/profile')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const AdminIndexLazyImport = createFileRoute('/admin/')()
const AdminPenyakitgejalaIndexLazyImport = createFileRoute(
  '/admin/penyakitgejala/',
)()
const AdminPenyakitIndexLazyImport = createFileRoute('/admin/penyakit/')()
const AdminGejalaIndexLazyImport = createFileRoute('/admin/gejala/')()
const AdminPenyakitgejalaCreateLazyImport = createFileRoute(
  '/admin/penyakitgejala/create',
)()
const AdminPenyakitCreateLazyImport = createFileRoute(
  '/admin/penyakit/create',
)()
const AdminGejalaCreateLazyImport = createFileRoute('/admin/gejala/create')()
const AdminPenyakitEditIdLazyImport = createFileRoute(
  '/admin/penyakit/edit/$id',
)()
const AdminGejalaEditIdLazyImport = createFileRoute('/admin/gejala/edit/$id')()

// Create/Update Routes

const SearchLazyRoute = SearchLazyImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/search.lazy').then((d) => d.Route))

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ProfileLazyRoute = ProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const AdminPenyakitgejalaIndexLazyRoute =
  AdminPenyakitgejalaIndexLazyImport.update({
    id: '/admin/penyakitgejala/',
    path: '/admin/penyakitgejala/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/admin/penyakitgejala/index.lazy').then((d) => d.Route),
  )

const AdminPenyakitIndexLazyRoute = AdminPenyakitIndexLazyImport.update({
  id: '/admin/penyakit/',
  path: '/admin/penyakit/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/penyakit/index.lazy').then((d) => d.Route),
)

const AdminGejalaIndexLazyRoute = AdminGejalaIndexLazyImport.update({
  id: '/admin/gejala/',
  path: '/admin/gejala/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/gejala/index.lazy').then((d) => d.Route),
)

const AdminPenyakitgejalaCreateLazyRoute =
  AdminPenyakitgejalaCreateLazyImport.update({
    id: '/admin/penyakitgejala/create',
    path: '/admin/penyakitgejala/create',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/admin/penyakitgejala/create.lazy').then((d) => d.Route),
  )

const AdminPenyakitCreateLazyRoute = AdminPenyakitCreateLazyImport.update({
  id: '/admin/penyakit/create',
  path: '/admin/penyakit/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/penyakit/create.lazy').then((d) => d.Route),
)

const AdminGejalaCreateLazyRoute = AdminGejalaCreateLazyImport.update({
  id: '/admin/gejala/create',
  path: '/admin/gejala/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/gejala/create.lazy').then((d) => d.Route),
)

const AdminPenyakitEditIdLazyRoute = AdminPenyakitEditIdLazyImport.update({
  id: '/admin/penyakit/edit/$id',
  path: '/admin/penyakit/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/penyakit/edit/$id.lazy').then((d) => d.Route),
)

const AdminGejalaEditIdLazyRoute = AdminGejalaEditIdLazyImport.update({
  id: '/admin/gejala/edit/$id',
  path: '/admin/gejala/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/gejala/edit/$id.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/gejala/create': {
      id: '/admin/gejala/create'
      path: '/admin/gejala/create'
      fullPath: '/admin/gejala/create'
      preLoaderRoute: typeof AdminGejalaCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/penyakit/create': {
      id: '/admin/penyakit/create'
      path: '/admin/penyakit/create'
      fullPath: '/admin/penyakit/create'
      preLoaderRoute: typeof AdminPenyakitCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/penyakitgejala/create': {
      id: '/admin/penyakitgejala/create'
      path: '/admin/penyakitgejala/create'
      fullPath: '/admin/penyakitgejala/create'
      preLoaderRoute: typeof AdminPenyakitgejalaCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/gejala/': {
      id: '/admin/gejala/'
      path: '/admin/gejala'
      fullPath: '/admin/gejala'
      preLoaderRoute: typeof AdminGejalaIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/penyakit/': {
      id: '/admin/penyakit/'
      path: '/admin/penyakit'
      fullPath: '/admin/penyakit'
      preLoaderRoute: typeof AdminPenyakitIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/penyakitgejala/': {
      id: '/admin/penyakitgejala/'
      path: '/admin/penyakitgejala'
      fullPath: '/admin/penyakitgejala'
      preLoaderRoute: typeof AdminPenyakitgejalaIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/gejala/edit/$id': {
      id: '/admin/gejala/edit/$id'
      path: '/admin/gejala/edit/$id'
      fullPath: '/admin/gejala/edit/$id'
      preLoaderRoute: typeof AdminGejalaEditIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/penyakit/edit/$id': {
      id: '/admin/penyakit/edit/$id'
      path: '/admin/penyakit/edit/$id'
      fullPath: '/admin/penyakit/edit/$id'
      preLoaderRoute: typeof AdminPenyakitEditIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/search': typeof SearchLazyRoute
  '/admin': typeof AdminIndexLazyRoute
  '/admin/gejala/create': typeof AdminGejalaCreateLazyRoute
  '/admin/penyakit/create': typeof AdminPenyakitCreateLazyRoute
  '/admin/penyakitgejala/create': typeof AdminPenyakitgejalaCreateLazyRoute
  '/admin/gejala': typeof AdminGejalaIndexLazyRoute
  '/admin/penyakit': typeof AdminPenyakitIndexLazyRoute
  '/admin/penyakitgejala': typeof AdminPenyakitgejalaIndexLazyRoute
  '/admin/gejala/edit/$id': typeof AdminGejalaEditIdLazyRoute
  '/admin/penyakit/edit/$id': typeof AdminPenyakitEditIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/search': typeof SearchLazyRoute
  '/admin': typeof AdminIndexLazyRoute
  '/admin/gejala/create': typeof AdminGejalaCreateLazyRoute
  '/admin/penyakit/create': typeof AdminPenyakitCreateLazyRoute
  '/admin/penyakitgejala/create': typeof AdminPenyakitgejalaCreateLazyRoute
  '/admin/gejala': typeof AdminGejalaIndexLazyRoute
  '/admin/penyakit': typeof AdminPenyakitIndexLazyRoute
  '/admin/penyakitgejala': typeof AdminPenyakitgejalaIndexLazyRoute
  '/admin/gejala/edit/$id': typeof AdminGejalaEditIdLazyRoute
  '/admin/penyakit/edit/$id': typeof AdminPenyakitEditIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/search': typeof SearchLazyRoute
  '/admin/': typeof AdminIndexLazyRoute
  '/admin/gejala/create': typeof AdminGejalaCreateLazyRoute
  '/admin/penyakit/create': typeof AdminPenyakitCreateLazyRoute
  '/admin/penyakitgejala/create': typeof AdminPenyakitgejalaCreateLazyRoute
  '/admin/gejala/': typeof AdminGejalaIndexLazyRoute
  '/admin/penyakit/': typeof AdminPenyakitIndexLazyRoute
  '/admin/penyakitgejala/': typeof AdminPenyakitgejalaIndexLazyRoute
  '/admin/gejala/edit/$id': typeof AdminGejalaEditIdLazyRoute
  '/admin/penyakit/edit/$id': typeof AdminPenyakitEditIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/search'
    | '/admin'
    | '/admin/gejala/create'
    | '/admin/penyakit/create'
    | '/admin/penyakitgejala/create'
    | '/admin/gejala'
    | '/admin/penyakit'
    | '/admin/penyakitgejala'
    | '/admin/gejala/edit/$id'
    | '/admin/penyakit/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/search'
    | '/admin'
    | '/admin/gejala/create'
    | '/admin/penyakit/create'
    | '/admin/penyakitgejala/create'
    | '/admin/gejala'
    | '/admin/penyakit'
    | '/admin/penyakitgejala'
    | '/admin/gejala/edit/$id'
    | '/admin/penyakit/edit/$id'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/search'
    | '/admin/'
    | '/admin/gejala/create'
    | '/admin/penyakit/create'
    | '/admin/penyakitgejala/create'
    | '/admin/gejala/'
    | '/admin/penyakit/'
    | '/admin/penyakitgejala/'
    | '/admin/gejala/edit/$id'
    | '/admin/penyakit/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  ProfileLazyRoute: typeof ProfileLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  SearchLazyRoute: typeof SearchLazyRoute
  AdminIndexLazyRoute: typeof AdminIndexLazyRoute
  AdminGejalaCreateLazyRoute: typeof AdminGejalaCreateLazyRoute
  AdminPenyakitCreateLazyRoute: typeof AdminPenyakitCreateLazyRoute
  AdminPenyakitgejalaCreateLazyRoute: typeof AdminPenyakitgejalaCreateLazyRoute
  AdminGejalaIndexLazyRoute: typeof AdminGejalaIndexLazyRoute
  AdminPenyakitIndexLazyRoute: typeof AdminPenyakitIndexLazyRoute
  AdminPenyakitgejalaIndexLazyRoute: typeof AdminPenyakitgejalaIndexLazyRoute
  AdminGejalaEditIdLazyRoute: typeof AdminGejalaEditIdLazyRoute
  AdminPenyakitEditIdLazyRoute: typeof AdminPenyakitEditIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  ProfileLazyRoute: ProfileLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  SearchLazyRoute: SearchLazyRoute,
  AdminIndexLazyRoute: AdminIndexLazyRoute,
  AdminGejalaCreateLazyRoute: AdminGejalaCreateLazyRoute,
  AdminPenyakitCreateLazyRoute: AdminPenyakitCreateLazyRoute,
  AdminPenyakitgejalaCreateLazyRoute: AdminPenyakitgejalaCreateLazyRoute,
  AdminGejalaIndexLazyRoute: AdminGejalaIndexLazyRoute,
  AdminPenyakitIndexLazyRoute: AdminPenyakitIndexLazyRoute,
  AdminPenyakitgejalaIndexLazyRoute: AdminPenyakitgejalaIndexLazyRoute,
  AdminGejalaEditIdLazyRoute: AdminGejalaEditIdLazyRoute,
  AdminPenyakitEditIdLazyRoute: AdminPenyakitEditIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/login",
        "/profile",
        "/register",
        "/search",
        "/admin/",
        "/admin/gejala/create",
        "/admin/penyakit/create",
        "/admin/penyakitgejala/create",
        "/admin/gejala/",
        "/admin/penyakit/",
        "/admin/penyakitgejala/",
        "/admin/gejala/edit/$id",
        "/admin/penyakit/edit/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/profile": {
      "filePath": "profile.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/search": {
      "filePath": "search.lazy.jsx"
    },
    "/admin/": {
      "filePath": "admin/index.lazy.jsx"
    },
    "/admin/gejala/create": {
      "filePath": "admin/gejala/create.lazy.jsx"
    },
    "/admin/penyakit/create": {
      "filePath": "admin/penyakit/create.lazy.jsx"
    },
    "/admin/penyakitgejala/create": {
      "filePath": "admin/penyakitgejala/create.lazy.jsx"
    },
    "/admin/gejala/": {
      "filePath": "admin/gejala/index.lazy.jsx"
    },
    "/admin/penyakit/": {
      "filePath": "admin/penyakit/index.lazy.jsx"
    },
    "/admin/penyakitgejala/": {
      "filePath": "admin/penyakitgejala/index.lazy.jsx"
    },
    "/admin/gejala/edit/$id": {
      "filePath": "admin/gejala/edit/$id.lazy.jsx"
    },
    "/admin/penyakit/edit/$id": {
      "filePath": "admin/penyakit/edit/$id.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
