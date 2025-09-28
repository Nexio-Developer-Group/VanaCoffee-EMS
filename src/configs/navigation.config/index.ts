import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import { ADMIN, USER, DEVELOPER } from '@/constants/roles.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER, DEVELOPER],
        subMenu: [],
    },
    {
        key: 'newBill',
        path: '/bill-book/new',
        title: 'Create New Bill',
        translateKey: 'nav.newBill',
        icon: 'newBill',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, DEVELOPER],
        subMenu: [],
    },
    {
        key: 'billBook',
        path: '/bill-book',
        title: 'Bill Book',
        translateKey: 'nav.billBook',
        icon: 'billBook',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, DEVELOPER],
        subMenu: [],
    },
    {
        key: 'inventory',
        path: '',
        title: 'Inventory',
        translateKey: 'nav.inventory.inventory',
        icon: 'inventory',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, DEVELOPER],
        subMenu: [
            {
                key: 'inventory.items',
                path: '/items',
                title: 'Items',
                translateKey: 'nav.inventory.items',
                icon: 'items',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, DEVELOPER],
                subMenu: [],
            },
            {
                key: 'inventory.categories',
                path: '/categories',
                title: 'Categories',
                translateKey: 'nav.inventory.categories',
                icon: 'category',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, DEVELOPER],
                subMenu: [],
            },
        ],
    }
]

export default navigationConfig
