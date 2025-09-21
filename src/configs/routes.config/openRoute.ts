import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const openRoute: Routes = [
    {
        key: 'home',
        path: `/`,
        component: lazy(() => import('@/views/open/home')),
        authority: [],
    },
    {
        key: 'menu',
        path: `/menu`,
        component: lazy(() => import('@/views/open/menu')),
        authority: [],
    }
    
]

export default openRoute