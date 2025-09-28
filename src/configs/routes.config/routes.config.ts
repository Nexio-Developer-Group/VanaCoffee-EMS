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
        key: 'billBook',
        path: '/bill-book',
        component: lazy(() => import('@/views/admin/billings')),
        authority: [ADMIN, DEVELOPER],
    },
    {
        key: 'billBook',
        path: '/bill-book/new',
        component: lazy(() => import('@/views/admin/billings/pages/CreateBillPage')),
        authority: [ADMIN, DEVELOPER],
    },
    {
        key: 'billBook',
        path: '/bill-preview',
        component: lazy(() => import('@/views/admin/billings/pages/BillPreview')),
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
