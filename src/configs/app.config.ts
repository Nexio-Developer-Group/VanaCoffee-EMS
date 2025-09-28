export type AppConfig = {
    appVersion?: string
    appUrl: string
    appName: string
    appDescription?: string
    apiBaseUrl: string
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
}

const appConfig: AppConfig = {
    appVersion: '0.0.1',
    appUrl: 'https://vanscafe.shop',
    appName: 'VansCafe',
    appDescription: 'Vans Cafe - Best Coffee in Udaipur',
    apiBaseUrl: 'https://api.vanscafe.shop',
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
}

export default appConfig
