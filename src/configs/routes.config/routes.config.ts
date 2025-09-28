import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import openRoute from './openRoute'
import { ADMIN, USER, DEVELOPER } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]
export const openRoutes: Routes = [...openRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [ADMIN, USER, DEVELOPER],
    },
    {
        key: 'billing',
        path: '/Billing',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [ADMIN, DEVELOPER],
    },
    {
        key: 'inventory.items',
        path: '/items',
        component: lazy(() => import('@/views/admin/items')),
        authority: [ADMIN, DEVELOPER],
    },
    {
        key: 'inventory.categories',
        path: '/categories',
        component: lazy(() => import('@/views/admin/category')),
        authority: [ADMIN, DEVELOPER],
    },
]
