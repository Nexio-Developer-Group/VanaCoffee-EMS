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
    appUrl: 'https://nexiotech.cloud',
    appName: 'NexioTech',
    appDescription: 'NexioTech is a platform for all your tech needs.',
    apiBaseUrl: 'https://api.nexiotech.cloud',
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
}

export default appConfig
