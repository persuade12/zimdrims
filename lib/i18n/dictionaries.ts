export const locales = ['en', 'sn', 'nd'] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  sn: 'ChiShona',
  nd: 'IsiNdebele',
}

export const localeShort: Record<Locale, string> = {
  en: 'EN',
  sn: 'SN',
  nd: 'ND',
}

export type Dictionary = {
  brand: {
    government: string
    department: string
    platform: string
    motto: string
  }
  shell: {
    openNav: string
    closeNav: string
    search: string
    openSearch: string
    closeSearch: string
    searchPlaceholder: string
    notifications: string
    newCount: string
    viewAllAlerts: string
    openProfile: string
    administrator: string
    online: string
    verifiedOfficial: string
    viewProfile: string
    accountSettings: string
    helpSupport: string
    signOut: string
    language: string
    eocStatus: string
    operational: string
    version: string
  }
  footer: {
    tagline: string
    copyright: string
    motto: string
    email: string
    phone: string
  }
  hero: {
    title: string
    breadcrumb: string
    createAlert: string
    exportReport: string
    dataSources: string
    lastUpdate: string
  }
  home: {
    alertSummary: string
    activeWarnings: string
    hazardMap: string
    forecastTimeline: string
    riverLevels: string
    rainfallSummary: string
    alertStatistics: string
    quickActions: string
    keyContacts: string
    viewAll: string
  }
  common: {
    liveSystem: string
    critical: string
    warning: string
    watch: string
    advisory: string
    allClear: string
  }
  navGroups: Record<string, string>
  nav: Record<string, string>
  journey: Record<string, string>
  quick: Record<string, { title: string; description: string }>
}

const navEn = {
  Home: 'Home',
  'National COP': 'National COP',
  'Early Warning': 'Early Warning',
  'All Hazards': 'All Hazards',
  Weather: 'Weather',
  Cyclone: 'Cyclone',
  Flood: 'Flood',
  Drought: 'Drought',
  Fire: 'Fire',
  Health: 'Health',
  Mining: 'Mining',
  'Road Traffic': 'Road Traffic',
  Hydrology: 'Hydrology',
  'Risk Intelligence': 'Risk Intelligence',
  'Risk Dashboard': 'Risk Dashboard',
  'Risk Map': 'Risk Map',
  'Impact Intelligence': 'Impact Intelligence',
  'Trigger Monitor': 'Trigger Monitor',
  'Anticipatory Action': 'Anticipatory Action',
  'Emergency Operations': 'Emergency Operations',
  'Incident Command': 'Incident Command',
  'Logistics & Resources': 'Logistics & Resources',
  'Shelters & Evacuation': 'Shelters & Evacuation',
  'Government Coordination': 'Government Coordination',
  'Partner Coordination': 'Partner Coordination',
  'SADC Regional Coordination': 'SADC Regional Coordination',
  'Damage & Loss': 'Damage & Loss',
  Recovery: 'Recovery',
  Resilience: 'Resilience',
  Reports: 'Reports',
  Analytics: 'Analytics',
  'Lessons Learned': 'Lessons Learned',
  'Digital SOPs': 'Digital SOPs',
  'Users & Roles': 'Users & Roles',
  'Data Sources': 'Data Sources',
  'System Administration': 'System Administration',
}

const navGroupsEn = {
  COMMAND: 'COMMAND',
  ANTICIPATION: 'ANTICIPATION',
  RESPONSE: 'RESPONSE',
  COORDINATION: 'COORDINATION',
  RECOVERY: 'RECOVERY',
  KNOWLEDGE: 'KNOWLEDGE',
  ADMINISTRATION: 'ADMINISTRATION',
}

const en: Dictionary = {
  brand: {
    government: 'Government of Zimbabwe',
    department: 'Department of Civil Protection',
    platform: 'Zimbabwe Integrated Multi-Hazard Disaster Risk Management System',
    motto: 'Saving Lives, Protecting Livelihoods, Building Resilience',
  },
  shell: {
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    search: 'Search',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    searchPlaceholder: 'Search province, district, ward, hazard...',
    notifications: 'Notifications',
    newCount: '{count} new',
    viewAllAlerts: 'View all alerts',
    openProfile: 'Open profile menu',
    administrator: 'DCP Administrator',
    online: 'Online',
    verifiedOfficial: 'Verified DCP official · Level 5',
    viewProfile: 'View profile',
    accountSettings: 'Account settings',
    helpSupport: 'Help & support',
    signOut: 'Sign out',
    language: 'Language',
    eocStatus: 'National DCP EOC',
    operational: 'OPERATIONAL',
    version: 'Version 2.0.0',
  },
  footer: {
    tagline: 'ZIM-DRIMS',
    copyright: '© 2026 Department of Civil Protection · Government of Zimbabwe',
    motto: 'Saving Lives, Protecting Livelihoods, Building Resilience',
    email: 'drims.helpdesk@dcp.gov.zw',
    phone: '+263 242 700 000',
  },
  hero: {
    title: 'Early Warning Centre',
    breadcrumb: 'Home · Early Warning',
    createAlert: 'Create Alert',
    exportReport: 'Export Report',
    dataSources: '26 Active Data Sources',
    lastUpdate: 'Last update: 5 mins ago',
  },
  home: {
    alertSummary: 'Alert Summary',
    activeWarnings: 'Active Early Warnings',
    hazardMap: 'Zimbabwe Early Warning Map',
    forecastTimeline: 'Hazard Forecast Timeline (72 Hours)',
    riverLevels: 'River Level Monitoring',
    rainfallSummary: 'Rainfall Summary (24 Hours)',
    alertStatistics: 'Alert Statistics',
    quickActions: 'Quick Actions',
    keyContacts: 'Key Contacts',
    viewAll: 'View all',
  },
  common: {
    liveSystem: 'Live Monitoring',
    critical: 'Critical',
    warning: 'Warning',
    watch: 'Watch',
    advisory: 'Advisory',
    allClear: 'All Clear',
  },
  navGroups: navGroupsEn,
  nav: navEn,
  journey: {},
  quick: {},
}

const sn: Dictionary = {
  ...en,
  brand: {
    government: 'Hurumende yeZimbabwe',
    department: 'Dipatimenti reCivil Protection',
    platform: 'Zimbabwe Integrated Multi-Hazard Disaster Risk Management System',
    motto: 'Kuponesa Hupenyu, Kuchengetedza Mararamiro, Kuvaka Kusimba',
  },
  shell: {
    ...en.shell,
    searchPlaceholder: 'Tsvaga province, district, ward, njodzi...',
    administrator: 'Mutungamiri weDCP',
    verifiedOfficial: 'Mukuru akasimbiswa weDCP · Level 5',
    eocStatus: 'National DCP EOC',
    operational: 'OPERATIONAL',
  },
  hero: {
    title: 'Centre yeEarly Warning',
    breadcrumb: 'Kumba · Early Warning',
    createAlert: 'Gadzira Alert',
    exportReport: 'Export Report',
    dataSources: '26 Data Sources Dziri Kushanda',
    lastUpdate: 'Last update: 5 mins ago',
  },
  home: {
    alertSummary: 'Summary yeAlerts',
    activeWarnings: 'Early Warnings Dziri Kushanda',
    hazardMap: 'Map yeEarly Warning yeZimbabwe',
    forecastTimeline: 'Hazard Forecast Timeline (72 Hours)',
    riverLevels: 'River Level Monitoring',
    rainfallSummary: 'Rainfall Summary (24 Hours)',
    alertStatistics: 'Alert Statistics',
    quickActions: 'Quick Actions',
    keyContacts: 'Key Contacts',
    viewAll: 'Ona zvese',
  },
  navGroups: navGroupsEn,
  nav: navEn,
  journey: {},
  quick: {},
}

const nd: Dictionary = {
  ...en,
  brand: {
    government: 'Uhulumeni waseZimbabwe',
    department: 'Umnyango Wokuvikela Komphakathi',
    platform: 'Zimbabwe Integrated Multi-Hazard Disaster Risk Management System',
    motto: 'Ukusindisa Imipilo, Ukuvikela Imiphilo, Ukwakha Ukuqina',
  },
  shell: {
    ...en.shell,
    searchPlaceholder: 'Sesha isifundazwe, isifunda, iwadi, ingozi...',
    administrator: 'Umphathi we-DCP',
    verifiedOfficial: 'Isikhulu esiqinisekisiwe se-DCP · Level 5',
    eocStatus: 'National DCP EOC',
    operational: 'OPERATIONAL',
  },
  hero: {
    title: 'Isikhungo Sexwayiso Sokuqala',
    breadcrumb: 'Ekhaya · Isixwayiso Sokuqala',
    createAlert: 'Dala Isaziso',
    exportReport: 'Thumela Umbiko',
    dataSources: 'Imithombo yeData Esebenzayo engu-26',
    lastUpdate: 'Ukubuyekezwa kokugcina: emizuzwini engu-5 edlule',
  },
  home: {
    alertSummary: 'Isifinyezo Sezaziso',
    activeWarnings: 'Izixwayiso Zokuqala Esebenzayo',
    hazardMap: 'Imephu Yesixwayiso Sokuqala yaseZimbabwe',
    forecastTimeline: 'Isikhathi Sokubikezela Ingozi (Amahora angu-72)',
    riverLevels: 'Ukuqapha Amazinga Emifuleni',
    rainfallSummary: 'Isifinyezo Senkundla (Amahora angu-24)',
    alertStatistics: 'Izibalo Zezaziso',
    quickActions: 'Izenzo Eziqondile',
    keyContacts: 'Oxhumana Nabo Ababalulekile',
    viewAll: 'Buka konke',
  },
  navGroups: navGroupsEn,
  nav: navEn,
  journey: {},
  quick: {},
}

export const dictionaries: Record<Locale, Dictionary> = { en, sn, nd }

export function formatMessage(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  )
}
