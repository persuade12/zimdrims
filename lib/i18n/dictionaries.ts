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
    tagline: string
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
    provincialAdmin: string
    province: string
    online: string
    verifiedOfficial: string
    viewProfile: string
    accountSettings: string
    helpSupport: string
    signOut: string
    language: string
    mobileApp: string
    mobileTagline: string
    getItOn: string
    downloadOn: string
  }
  footer: {
    poweredBy: string
    cha: string
    evidenceTitle: string
    evidenceSub: string
    villageTitle: string
    villageSub: string
    ministryTitle: string
    ministrySub: string
    secureTitle: string
    secureSub: string
  }
  hero: {
    line1: string
    line2: string
    line3: string
    body: string
    explore: string
    watchDemo: string
  }
  home: {
    atAGlance: string
    quickAccess: string
    governanceDashboard: string
    viewFullGovernance: string
    platformHealth: string
    latestAlerts: string
    sdgGoals: string
    dataMarketplace: string
    exploreMarketplace: string
    dataAtAGlance: string
    zimvac: string
    zimlac: string
  }
  common: {
    liveSystem: string
    villages: string
    provinces: string
    districts: string
    traditionalLeaders: string
    households: string
    population: string
    activeProjects: string
    hazardAlerts: string
  }
  navGroups: Record<string, string>
  nav: Record<string, string>
  journey: Record<string, string>
  quick: Record<string, { title: string; description: string }>
}

const en: Dictionary = {
  brand: {
    tagline: 'Digital Administration, Reporting & Engagement',
    platform: 'Zimbabwe Traditional Leadership Digital Platform',
    motto: 'From Village to Cabinet',
  },
  shell: {
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    search: 'Search',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    searchPlaceholder: 'Search villages, households, projects...',
    notifications: 'Notifications',
    newCount: '{count} new',
    viewAllAlerts: 'View all alerts',
    openProfile: 'Open profile menu',
    provincialAdmin: 'Provincial Administrator',
    province: 'Manicaland Province',
    online: 'Online',
    verifiedOfficial: 'Verified DARE/Inkundla official · Level 4',
    viewProfile: 'View profile',
    accountSettings: 'Account settings',
    helpSupport: 'Help & support',
    signOut: 'Sign out',
    language: 'Language',
    mobileApp: 'DARE/Inkundla Mobile App',
    mobileTagline: 'Powering Smart Decisions',
    getItOn: 'GET IT ON',
    downloadOn: 'Download on the',
  },
  footer: {
    poweredBy: 'Powered by CHA',
    cha: 'Centre for Humanitarian Analytics',
    evidenceTitle: 'Evidence-Based Decisions.',
    evidenceSub: 'Sustainable Development.',
    villageTitle: 'From Village to Cabinet.',
    villageSub: 'Leaving No One Behind.',
    ministryTitle: 'Ministry of Local Government',
    ministrySub: 'and Public Works – Zimbabwe',
    secureTitle: 'Secure & Trusted',
    secureSub: 'End-to-end encrypted · ISO 27001',
  },
  hero: {
    line1: 'One Platform.',
    line2: 'Every Community.',
    line3: 'Better Decisions.',
    body: "Connecting Zimbabwe's Traditional Leadership, Communities and Government through Data, Digital & Intelligence.",
    explore: 'Explore the Platform',
    watchDemo: 'Watch Demo',
  },
  home: {
    atAGlance: 'At a Glance',
    quickAccess: 'Quick Access',
    governanceDashboard: 'Governance Dashboard',
    viewFullGovernance: 'View Full Governance Dashboard',
    platformHealth: 'Platform Health',
    latestAlerts: 'Latest Alerts',
    sdgGoals: 'SDG Goals',
    dataMarketplace: 'Data Marketplace',
    exploreMarketplace: 'Explore Marketplace',
    dataAtAGlance: 'Data at a Glance',
    zimvac: 'ZimVAC Indicators',
    zimlac: 'ZimLAC Service Delivery',
  },
  common: {
    liveSystem: 'Live System',
    villages: 'Villages',
    provinces: 'Provinces',
    districts: 'Districts',
    traditionalLeaders: 'Traditional Leaders',
    households: 'Households',
    population: 'Population',
    activeProjects: 'Active Projects',
    hazardAlerts: 'Hazard Alerts',
  },
  navGroups: {
    'Governance & Leadership': 'Governance & Leadership',
    'Data & Profiles': 'Data & Profiles',
    'Services & Management': 'Services & Management',
    'Reports & Insights': 'Reports & Insights',
    'Administrative Enablement': 'Administrative Enablement',
  },
  nav: {
    Home: 'Home',
    'Platform Overview': 'Platform Overview',
    'Traditional Leaders Profiles': 'Traditional Leaders Profiles',
    Chiefs: 'Chiefs',
    Headmen: 'Headmen',
    'Village Heads': 'Village Heads',
    'Household Profiles': 'Household Profiles',
    'Community Profiles': 'Community Profiles',
    'Traditional Court': 'Traditional Court',
    'ZimVAC Dashboards': 'ZimVAC Dashboards',
    'ZimLAC Dashboards': 'ZimLAC Dashboards',
    'District & Provincial Profiles': 'District & Provincial Profiles',
    'Development Projects': 'Development Projects',
    'Hazard & Risk Intelligence': 'Hazard & Risk Intelligence',
    'Environment & Climate': 'Environment & Climate',
    'Social Protection': 'Social Protection',
    Health: 'Health',
    Education: 'Education',
    'Infrastructure & Services': 'Infrastructure & Services',
    'Reports & Analytics': 'Reports & Analytics',
    'Indigenous Knowledge Systems (IKS)': 'Indigenous Knowledge Systems (IKS)',
    'Environment & Climate Change': 'Environment & Climate Change',
    Agriculture: 'Agriculture',
    'Cultural Heritage': 'Cultural Heritage',
    'AI Insights & Alerts': 'AI Insights & Alerts',
    'Data Marketplace': 'Data Marketplace',
    'Governance Insights': 'Governance Insights',
    'Digital Administrative Enabler': 'Digital Administrative Enabler',
  },
  journey: {
    Village: 'Village',
    Ward: 'Ward',
    District: 'District',
    Province: 'Province',
    National: 'National',
    Cabinet: 'Cabinet',
  },
  quick: {
    'Traditional Leaders Profiles': {
      title: 'Traditional Leaders Profiles',
      description: 'Chiefs, headmen & village heads',
    },
    'Household Profiles': {
      title: 'Household Profiles',
      description: 'Demographics, livelihoods & social protection',
    },
    'Community Profiles': {
      title: 'Community Profiles',
      description: 'Community & village planning intelligence',
    },
    'Traditional Court': {
      title: 'Traditional Court',
      description: 'Court data, case management & performance metrics',
    },
    'ZimVAC Dashboards': {
      title: 'ZimVAC Dashboards',
      description: 'Food security & livelihood data',
    },
    'ZimLAC Dashboards': {
      title: 'ZimLAC Dashboards',
      description: 'Local governance & service delivery',
    },
    'Development Projects': {
      title: 'Development Projects',
      description: 'Investments & project tracking',
    },
    'Hazard & Risk': {
      title: 'Hazard & Risk',
      description: 'Multi-hazard intelligence & early warning',
    },
    'Environment & Climate': {
      title: 'Environment & Climate',
      description: 'Natural resources & climate resilience',
    },
    'Reports & Analytics': {
      title: 'Reports & Analytics',
      description: 'Custom reports, dashboards & data analytics',
    },
    'AI Insights & Alerts': {
      title: 'AI Insights & Alerts',
      description: 'AI-powered insights, recommendations & alerts',
    },
    'Digital Administrative Enabler': {
      title: 'Digital Administrative Enabler',
      description: 'TLSS workflows, documents & succession protocols',
    },
  },
}

const sn: Dictionary = {
  brand: {
    tagline: 'Kutungamira, Kushambadza & Kubatana Digitally',
    platform: 'Chikuva cheMadzishe eZimbabwe',
    motto: 'Kubva kuMusha Kusvika kuCabinet',
  },
  shell: {
    openNav: 'Vhura navigation',
    closeNav: 'Vhara navigation',
    search: 'Tsvaga',
    openSearch: 'Vhura tsvakiridzo',
    closeSearch: 'Vhara tsvakiridzo',
    searchPlaceholder: 'Tsvaga misha, dzimba, mapurojekiti...',
    notifications: 'Ziviso',
    newCount: '{count} itsva',
    viewAllAlerts: 'Ona ziviso dzose',
    openProfile: 'Vhura menyu yeprofile',
    provincialAdmin: 'Mutungamiri weProvince',
    province: 'Province yeManicaland',
    online: 'Pari online',
    verifiedOfficial: 'Mukuru akasimbiswa weDARE/Inkundla · Level 4',
    viewProfile: 'Ona profile',
    accountSettings: 'Zvirongwa zveaccount',
    helpSupport: 'Rubatsiro',
    signOut: 'Buda',
    language: 'Mutauro',
    mobileApp: 'App yeDARE/Inkundla',
    mobileTagline: 'Kupa Sarudzo Dzakanaka',
    getItOn: 'IWANA PA',
    downloadOn: 'Dhawunirodha pa',
  },
  footer: {
    poweredBy: 'Inotsigirwa neCHA',
    cha: 'Centre for Humanitarian Analytics',
    evidenceTitle: 'Sarudzo dzinovakirwa pahumbowo.',
    evidenceSub: 'Budiriro inogarika.',
    villageTitle: 'Kubva kuMusha Kusvika kuCabinet.',
    villageSub: 'Kusiyiwa kune mumwe.',
    ministryTitle: 'Bazi reHurumende dzeMunharaunda',
    ministrySub: 'neMabasa eruzhinji – Zimbabwe',
    secureTitle: 'Yakachengeteka & Yakavimbika',
    secureSub: 'Encrypted · ISO 27001',
  },
  hero: {
    line1: 'Chikuva Chimwe.',
    line2: 'Nharaunda Dzose.',
    line3: 'Sarudzo Dziri Nani.',
    body: 'Kubatanidza Madzishe, Nharaunda neHurumende yeZimbabwe kuburikidza neData, Digital & Intelligence.',
    explore: 'Ongorora Chikuva',
    watchDemo: 'Tarisa Demo',
  },
  home: {
    atAGlance: 'Pakatariswa',
    quickAccess: 'Kupinda Nekukurumidza',
    governanceDashboard: 'Dashboard yeHutongi',
    viewFullGovernance: 'Ona Dashboard yeHutongi Yakazara',
    platformHealth: 'Hutano hweChikuva',
    latestAlerts: 'Ziviso Dzazvino',
    sdgGoals: 'Zvinangwa zveSDG',
    dataMarketplace: 'Musika weData',
    exploreMarketplace: 'Ongorora Musika',
    dataAtAGlance: 'Data Pakatariswa',
    zimvac: 'Zviratidzo zveZimVAC',
    zimlac: 'Kupa Mabasa eZimLAC',
  },
  common: {
    liveSystem: 'System Iri Kuita',
    villages: 'Misha',
    provinces: 'Maprovince',
    districts: 'Matunhu',
    traditionalLeaders: 'Madzishe',
    households: 'Dzimba',
    population: 'Huwandu hwevanhu',
    activeProjects: 'Mapurojekiti Ari Kuita',
    hazardAlerts: 'Ziviso dzeNjodzi',
  },
  navGroups: {
    'Governance & Leadership': 'Hutongi & Uutungamiriri',
    'Data & Profiles': 'Data & Maprofile',
    'Services & Management': 'Mabasa & Kutonga',
    'Reports & Insights': 'Mishumo & Nzwisiso',
    'Administrative Enablement': 'Kusunungura Kwemabasa',
  },
  nav: {
    Home: 'Kumba',
    'Platform Overview': 'Ongororo yeChikuva',
    'Traditional Leaders Profiles': 'Maprofile eMadzishe',
    Chiefs: 'Madzishe',
    Headmen: 'Masabhuku',
    'Village Heads': 'Vatungamiriri vemisha',
    'Household Profiles': 'Maprofile edzimba',
    'Community Profiles': 'Maprofile enharaunda',
    'Traditional Court': 'Dare reTsika',
    'ZimVAC Dashboards': 'MaDashboard eZimVAC',
    'ZimLAC Dashboards': 'MaDashboard eZimLAC',
    'District & Provincial Profiles': 'Maprofile eMatunhu & Maprovince',
    'Development Projects': 'Mapurojekiti eBudiriro',
    'Hazard & Risk Intelligence': 'Nzwisiso yeNjodzi',
    'Environment & Climate': 'Zvakatikomberedza & Mamiriro ekunze',
    'Social Protection': 'Dziviriro yemagariro',
    Health: 'Utano',
    Education: 'Dzidzo',
    'Infrastructure & Services': 'Zvivakwa & Mabasa',
    'Reports & Analytics': 'Mishumo & Ongororo',
    'Indigenous Knowledge Systems (IKS)': 'Ruzivo rweVekuAfrica (IKS)',
    'Environment & Climate Change': 'Zvakatikomberedza & Shanduko yemamiriro',
    Agriculture: 'Kurima',
    'Cultural Heritage': 'Nhaka yeTsika',
    'AI Insights & Alerts': 'Nzwisiso yeAI & Ziviso',
    'Data Marketplace': 'Musika weData',
    'Governance Insights': 'Nzwisiso yeHutongi',
    'Digital Administrative Enabler': 'Chibatsiro cheMabasa eDigital',
  },
  journey: {
    Village: 'Musha',
    Ward: 'Wadhi',
    District: 'Dunhu',
    Province: 'Province',
    National: 'Nyika',
    Cabinet: 'Cabinet',
  },
  quick: {
    'Traditional Leaders Profiles': {
      title: 'Maprofile eMadzishe',
      description: 'Madzishe, masabhuku & vatungamiriri vemisha',
    },
    'Household Profiles': {
      title: 'Maprofile edzimba',
      description: 'Huwandu, mararamiro & dziviriro yemagariro',
    },
    'Community Profiles': {
      title: 'Maprofile enharaunda',
      description: 'Nzwisiso yekuronga nharaunda nemisha',
    },
    'Traditional Court': {
      title: 'Dare reTsika',
      description: 'Data yedare, kutonga nyaya & zviyero',
    },
    'ZimVAC Dashboards': {
      title: 'MaDashboard eZimVAC',
      description: 'Data yekuchengetedza chikafu & mararamiro',
    },
    'ZimLAC Dashboards': {
      title: 'MaDashboard eZimLAC',
      description: 'Hutongi hwemunharaunda & kupa mabasa',
    },
    'Development Projects': {
      title: 'Mapurojekiti eBudiriro',
      description: 'Mari & kutsvaga mapurojekiti',
    },
    'Hazard & Risk': {
      title: 'Njodzi & Njodzi',
      description: 'Nzwisiso yenzodzi & yambiro yekutangira',
    },
    'Environment & Climate': {
      title: 'Zvakatikomberedza & Mamiriro',
      description: 'Zviwanikwa zvemusango & kusimba kwemamiriro',
    },
    'Reports & Analytics': {
      title: 'Mishumo & Ongororo',
      description: 'Mishumo, maDashboard & ongororo yeData',
    },
    'AI Insights & Alerts': {
      title: 'Nzwisiso yeAI & Ziviso',
      description: 'Nzwisiso, kuraira & ziviso zveAI',
    },
    'Digital Administrative Enabler': {
      title: 'Chibatsiro cheMabasa eDigital',
      description: 'Mabasa eTLSS, magwaro & nheyo dzekutevera',
    },
  },
}

const nd: Dictionary = {
  brand: {
    tagline: 'Ukuphatha, Ukubika & Ukuzibandakanya Ngokwedijithali',
    platform: 'Inkundla Yamakhosi Esintu eZimbabwe',
    motto: 'Kusukela Emzaneni Kuya eKhabhinethi',
  },
  shell: {
    openNav: 'Vula ukuzulazula',
    closeNav: 'Vala ukuzulazula',
    search: 'Sesha',
    openSearch: 'Vula ukusesha',
    closeSearch: 'Vala ukusesha',
    searchPlaceholder: 'Sesha imizi, imizi yemizi, amaphrojekthi...',
    notifications: 'Izaziso',
    newCount: '{count} ezintsha',
    viewAllAlerts: 'Buka zonke izaziso',
    openProfile: 'Vula imenyu yephrofayili',
    provincialAdmin: 'Umphathi Wesifunda',
    province: 'Isifunda saseManicaland',
    online: 'Ku-online',
    verifiedOfficial: 'Isikhulu esiqinisekisiwe seDARE/Inkundla · Level 4',
    viewProfile: 'Buka iphrofayili',
    accountSettings: 'Izilungiselelo ze-akhawunti',
    helpSupport: 'Usizo nokwesekwa',
    signOut: 'Phuma',
    language: 'Ulimi',
    mobileApp: 'I-App yeDARE/Inkundla',
    mobileTagline: 'Iqhuba Izinqumo Ezihlakaniphile',
    getItOn: 'ITHOLAKALA KU',
    downloadOn: 'Dawuniloda ku',
  },
  footer: {
    poweredBy: 'Ixhaswa yi-CHA',
    cha: 'Centre for Humanitarian Analytics',
    evidenceTitle: 'Izinqumo ezisekelwe ebufakazini.',
    evidenceSub: 'Intuthuko esimeme.',
    villageTitle: 'Kusukela Emzaneni Kuya eKhabhinethi.',
    villageSub: 'Akunalabo abashiywa ngaphandle.',
    ministryTitle: 'UMnyango Wohulumeni Basekhaya',
    ministrySub: 'nemisebenzi yomphakathi – Zimbabwe',
    secureTitle: 'Ephephile & Ethembekile',
    secureSub: 'Encrypted · ISO 27001',
  },
  hero: {
    line1: 'Inkundla Eyodwa.',
    line2: 'Wonke Umphakathi.',
    line3: 'Izinqumo Ezcono.',
    body: 'Ukuhlanganisa Amakhosi Esintu, Imiphakathi noHulumeni waseZimbabwe ngeData, iDigital & Intelligence.',
    explore: 'Hlola Inkundla',
    watchDemo: 'Bukela iDemo',
  },
  home: {
    atAGlance: 'Ngesiquphe',
    quickAccess: 'Ukungena Ngokushesha',
    governanceDashboard: 'I-Dashboard Yokuphatha',
    viewFullGovernance: 'Buka i-Dashboard Yokuphatha Ephelele',
    platformHealth: 'Impilo Yenkundla',
    latestAlerts: 'Izaziso Zakamuva',
    sdgGoals: 'Imigomo ye-SDG',
    dataMarketplace: 'Imakethe YeData',
    exploreMarketplace: 'Hlola Imakethe',
    dataAtAGlance: 'IData Ngesiquphe',
    zimvac: 'Izinkomba zeZimVAC',
    zimlac: 'Ukulethwa Kwemisebenzi yeZimLAC',
  },
  common: {
    liveSystem: 'Isistimu Esisebenzayo',
    villages: 'Imizi',
    provinces: 'Izifunda',
    districts: 'Izifunda ezincane',
    traditionalLeaders: 'Amakhosi Esintu',
    households: 'Imizi yemizi',
    population: 'Inani labantu',
    activeProjects: 'Amaphrojekthi Asebenzayo',
    hazardAlerts: 'Izaziso Zengozi',
  },
  navGroups: {
    'Governance & Leadership': 'Ukuphatha & Uburholi',
    'Data & Profiles': 'IData & Amaphrofayili',
    'Services & Management': 'Izinsiza & Ukuphatha',
    'Reports & Insights': 'Imibiko & Ukuqonda',
    'Administrative Enablement': 'Ukusekela Okuphathayo',
  },
  nav: {
    Home: 'Ekhaya',
    'Platform Overview': 'Ukubuka Kwenkundla',
    'Traditional Leaders Profiles': 'Amaphrofayili Amakhosi',
    Chiefs: 'Amakhosi',
    Headmen: 'Izinduna',
    'Village Heads': 'Abanumzane',
    'Household Profiles': 'Amaphrofayili emizi',
    'Community Profiles': 'Amaphrofayili omphakathi',
    'Traditional Court': 'Inkundla Yesintu',
    'ZimVAC Dashboards': 'Ama-Dashboard eZimVAC',
    'ZimLAC Dashboards': 'Ama-Dashboard eZimLAC',
    'District & Provincial Profiles': 'Amaphrofayili Ezifunda',
    'Development Projects': 'Amaphrojekthi Entuthuko',
    'Hazard & Risk Intelligence': 'Ukuqonda Ingozi',
    'Environment & Climate': 'Indalo & Isimo sezulu',
    'Social Protection': 'Ukuvikelwa Komphakathi',
    Health: 'Impilo',
    Education: 'Imfundo',
    'Infrastructure & Services': 'Ingqalasizinda & Izinsiza',
    'Reports & Analytics': 'Imibiko & Ukuhlaziya',
    'Indigenous Knowledge Systems (IKS)': 'Ulwazi Lwesintu (IKS)',
    'Environment & Climate Change': 'Indalo & Ukushintsha kwesimo sezulu',
    Agriculture: 'Ukulima',
    'Cultural Heritage': 'Ifa Lamasiko',
    'AI Insights & Alerts': 'Ukuqonda kwe-AI & Izaziso',
    'Data Marketplace': 'Imakethe YeData',
    'Governance Insights': 'Ukuqonda Ukuphatha',
    'Digital Administrative Enabler': 'Isesekeli Sokuphatha Ngedijithali',
  },
  journey: {
    Village: 'Umuzi',
    Ward: 'Iwadi',
    District: 'Isifunda',
    Province: 'Isifundazwe',
    National: 'Izwe',
    Cabinet: 'Ikhabhinethi',
  },
  quick: {
    'Traditional Leaders Profiles': {
      title: 'Amaphrofayili Amakhosi',
      description: 'Amakhosi, izinduna & abanumzane',
    },
    'Household Profiles': {
      title: 'Amaphrofayili emizi',
      description: 'Izibalo zabantu, ukuphila & ukuvikelwa',
    },
    'Community Profiles': {
      title: 'Amaphrofayili omphakathi',
      description: 'Ukuqonda ukuhlela umphakathi nemizi',
    },
    'Traditional Court': {
      title: 'Inkundla Yesintu',
      description: 'Idata yenkundla, ukuphatha amacala & izilinganiso',
    },
    'ZimVAC Dashboards': {
      title: 'Ama-Dashboard eZimVAC',
      description: 'Idata yokudla & ukuphila',
    },
    'ZimLAC Dashboards': {
      title: 'Ama-Dashboard eZimLAC',
      description: 'Ukuphatha komphakathi & ukulethwa kwezinsiza',
    },
    'Development Projects': {
      title: 'Amaphrojekthi Entuthuko',
      description: 'Izimali & ukulandelela amaphrojekthi',
    },
    'Hazard & Risk': {
      title: 'Ingozi & Ubungozi',
      description: 'Ukuqonda izingozi & isexwayiso sokuqala',
    },
    'Environment & Climate': {
      title: 'Indalo & Isimo sezulu',
      description: 'Izinsiza zemvelo & ukuqina kwesimo sezulu',
    },
    'Reports & Analytics': {
      title: 'Imibiko & Ukuhlaziya',
      description: 'Imibiko, ama-dashboard & ukuhlaziya idata',
    },
    'AI Insights & Alerts': {
      title: 'Ukuqonda kwe-AI & Izaziso',
      description: 'Ukuqonda, izeluleko & izaziso ze-AI',
    },
    'Digital Administrative Enabler': {
      title: 'Isesekeli Sokuphatha Ngedijithali',
      description: 'Imisebenzi ye-TLSS, amadokhumenti & ukulandelana',
    },
  },
}

export const dictionaries: Record<Locale, Dictionary> = { en, sn, nd }

export function formatMessage(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  )
}
