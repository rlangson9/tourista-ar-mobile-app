export interface Holiday {
  name: string;
  date: string;
  description: string;
  type: 'national' | 'religious' | 'cultural';
}

export interface CustomNote {
  category: 'etiquette' | 'dining' | 'dress' | 'greetings' | 'communication' | 'safety';
  title: string;
  description: string;
  icon: string;
}

export interface CountryCulturalData {
  country: string;
  holidays: Holiday[];
  customs: CustomNote[];
  languageTips: string[];
  funFacts: string[];
}

export const culturalData: Record<string, CountryCulturalData> = {
  'China': {
    country: 'China',
    holidays: [
      {
        name: 'Chinese New Year (Spring Festival)',
        date: 'January-February (varies)',
        description: 'The most important traditional festival, celebrating the beginning of a new lunar year. Families gather for reunion dinners.',
        type: 'cultural'
      },
      {
        name: 'Qingming Festival',
        date: 'April 4-6',
        description: 'Tomb-sweeping day where families honor ancestors by cleaning their graves and offering food and flowers.',
        type: 'cultural'
      },
      {
        name: 'Dragon Boat Festival',
        date: 'May-June (varies)',
        description: 'Celebration with dragon boat races and eating zongzi (sticky rice dumplings).',
        type: 'cultural'
      },
      {
        name: 'Mid-Autumn Festival',
        date: 'September-October (varies)',
        description: 'Moon festival featuring mooncakes and family gatherings under the full moon.',
        type: 'cultural'
      },
      {
        name: 'National Day',
        date: 'October 1',
        description: 'Celebrates the founding of the People\'s Republic of China.',
        type: 'national'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Handshakes with Both Hands',
        description: 'When greeting someone, a handshake with both hands is considered more polite and respectful.',
        icon: '🤝'
      },
      {
        category: 'dining',
        title: 'Chopstick Etiquette',
        description: 'Never stick chopsticks upright in rice (resembles funerary rituals). Do not point with chopsticks.',
        icon: '🥢'
      },
      {
        category: 'etiquette',
        title: 'Gift Giving',
        description: 'Avoid giving clocks (symbolize death), umbrellas (separation), or white/black items (mourning). Red is lucky!',
        icon: '🎁'
      },
      {
        category: 'dress',
        title: 'Conservative Dress',
        description: 'Dress conservatively in business and formal settings. Avoid revealing clothing in temples.',
        icon: '👔'
      },
      {
        category: 'communication',
        title: 'Face (Mianzi)',
        description: 'Avoid causing public embarrassment. "Saving face" is crucial in social interactions.',
        icon: '😊'
      },
      {
        category: 'safety',
        title: 'Temple Etiquette',
        description: 'Remove shoes before entering temples. Dress modestly. Do not take photos of statues without permission.',
        icon: '🛕'
      }
    ],
    languageTips: [
      'Learn basic phrases like "Ni Hao" (Hello) and "Xie Xie" (Thank you)',
      'Mandarin is the official language, but regions have dialects',
      'Many people in major cities speak some English',
      'Carry a translation app or phrasebook',
      'Non-verbal communication is important'
    ],
    funFacts: [
      'China has the world\'s oldest continuous civilization - 5,000+ years!',
      'Tea was discovered in China by Emperor Shen Nong in 2737 BCE',
      'The Great Wall is the only man-made structure visible from space with the naked eye',
      'Paper, compass, gunpowder, and printing are China\'s "Four Great Inventions"',
      'Ketchup originated from a Chinese fermented fish sauce called "ke-tsiap"'
    ]
  },
  'Tanzania': {
    country: 'Tanzania',
    holidays: [
      {
        name: 'Union Day',
        date: 'April 26',
        description: 'Celebrates the unification of Tanganyika and Zanzibar in 1964.',
        type: 'national'
      },
      {
        name: 'Eid al-Fitr',
        date: 'varies (end of Ramadan)',
        description: 'Festival marking the end of Ramadan with prayers, feasting, and gift-giving.',
        type: 'religious'
      },
      {
        name: 'Eid al-Adha',
        date: 'varies',
        description: 'Festival of Sacrifice commemorating Abraham\'s willingness to sacrifice his son.',
        type: 'religious'
      },
      {
        name: 'Independence Day (Zanzibar)',
        date: 'January 12',
        description: 'Celebrates Zanzibar\'s independence from British rule.',
        type: 'national'
      },
      {
        name: 'Christmas Day',
        date: 'December 25',
        description: 'Christian celebration of Jesus\' birth, widely celebrated even in Muslim-majority areas.',
        type: 'religious'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Swahili Greetings',
        description: 'Say "Jambo!" (Hello) or "Shikamoo" (respectful greeting to elders). Handshakes are common.',
        icon: '👋'
      },
      {
        category: 'etiquette',
        title: 'Respecting Elders',
        description: 'Always greet elders first and use respectful language. Stand when an elder enters.',
        icon: '👴'
      },
      {
        category: 'dining',
        title: 'Eating with Right Hand',
        description: 'Use only your right hand for eating and accepting items. The left hand is considered unclean.',
        icon: '🍛'
      },
      {
        category: 'dress',
        title: 'Conservative Clothing',
        description: 'Dress modestly, especially in Muslim-majority Zanzibar. Cover shoulders and knees.',
        icon: '👗'
      },
      {
        category: 'safety',
        title: 'Wildlife Safety',
        description: 'Always follow your safari guide\'s instructions. Never approach wild animals on foot.',
        icon: '🦁'
      },
      {
        category: 'communication',
        title: 'Time Perception',
        description: '"Tanzania time" is more relaxed. Be patient and flexible with schedules.',
        icon: '⏰'
      }
    ],
    languageTips: [
      'Swahili is the national language - learn a few words!',
      'English is widely spoken in tourist areas and by guides',
      '"Hakuna Matata" really means "no problem" in Swahili',
      'Many tribal languages are also spoken',
      'Always greet people before asking for help'
    ],
    funFacts: [
      'Tanzania is home to Mount Kilimanjaro - Africa\'s highest peak!',
      'The Great Migration in Serengeti involves over 1.5 million wildebeest',
      'Zanzibar was once the world\'s largest producer of cloves',
      'Tanzania has more than 120 different ethnic groups',
      'Ngorongoro Crater is the world\'s largest inactive volcanic caldera'
    ]
  },
  'South Africa': {
    country: 'South Africa',
    holidays: [
      {
        name: 'Freedom Day',
        date: 'April 27',
        description: 'Celebrates the first democratic election in 1994 and the end of apartheid.',
        type: 'national'
      },
      {
        name: 'Heritage Day',
        date: 'September 24',
        description: 'Celebrates South Africa\'s diverse cultures and traditions. Also known as "Braai Day".',
        type: 'cultural'
      },
      {
        name: 'Day of Reconciliation',
        date: 'December 16',
        description: 'Promotes national unity and healing from past divisions.',
        type: 'national'
      },
      {
        name: 'Youth Day',
        date: 'June 16',
        description: 'Honors the Soweto Uprising of 1976 led by students.',
        type: 'national'
      },
      {
        name: 'Christmas Day',
        date: 'December 25',
        description: 'Celebrated with summer braais (barbecues) since it\'s summer in December.',
        type: 'religious'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Ubuntu Spirit',
        description: 'Ubuntu means "I am because we are." Community and sharing are central values.',
        icon: '❤️'
      },
      {
        category: 'dining',
        title: 'Braai Culture',
        description: 'South Africans love braais (barbecues). If invited, bring something to share.',
        icon: '🔥'
      },
      {
        category: 'etiquette',
        title: 'Personal Space',
        description: 'South Africans are generally warm and friendly. Handshakes are appropriate for business.',
        icon: '🤗'
      },
      {
        category: 'communication',
        title: '11 Official Languages',
        description: 'South Africa has 11 official languages! English is widely understood.',
        icon: '🗣️'
      },
      {
        category: 'safety',
        title: 'Wildlife Awareness',
        description: 'Even in urban areas, be aware of wildlife. Never feed wild animals.',
        icon: '🦒'
      },
      {
        category: 'dress',
        title: 'Diverse Cultures',
        description: 'Respect traditional clothing of different cultures. Business dress is usually formal.',
        icon: '👗'
      }
    ],
    languageTips: [
      'English is widely spoken and understood',
      'Learn a greeting in Zulu or Afrikaans - it will be appreciated!',
      '"Howzit?" is a common informal greeting meaning "How are you?"',
      '11 official languages: English, Afrikaans, Zulu, Xhosa, and more',
      'Most people speak at least 2-3 languages'
    ],
    funFacts: [
      'South Africa has 11 official languages - more than any other country!',
      'Table Mountain in Cape Town is one of the oldest mountains on Earth',
      'South Africa is the only country in the world with three capital cities',
      'The world\'s largest visible crater is in South Africa - Vredefort Crater',
      'Nelson Mandela was called "Madiba" - his traditional clan name'
    ]
  },
  'Zimbabwe': {
    country: 'Zimbabwe',
    holidays: [
      {
        name: 'Independence Day',
        date: 'April 18',
        description: 'Celebrates independence from British colonial rule in 1980.',
        type: 'national'
      },
      {
        name: 'Heroes Day',
        date: 'August 12',
        description: 'Honors those who fought for Zimbabwe\'s liberation.',
        type: 'national'
      },
      {
        name: 'Defense Forces Day',
        date: 'August 13',
        description: 'Celebrates the Zimbabwe Defense Forces with parades.',
        type: 'national'
      },
      {
        name: 'Christmas Day',
        date: 'December 25',
        description: 'Christian celebration with family gatherings and feasts.',
        type: 'religious'
      },
      {
        name: 'Easter',
        date: 'March-April (varies)',
        description: 'Christian holiday with church services and family time.',
        type: 'religious'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Respectful Greetings',
        description: 'Greet elders first. Shake hands with the right hand. "Mhoroi" is Shona for hello.',
        icon: '👋'
      },
      {
        category: 'etiquette',
        title: 'Hospitality (Unhu)',
        description: 'Unhu is the Shona concept of good character and hospitality. Guests are treated warmly.',
        icon: '🏠'
      },
      {
        category: 'dining',
        title: 'Eating Customs',
        description: 'It\'s polite to wash hands before eating. Eat with the right hand if no utensils.',
        icon: '🍽️'
      },
      {
        category: 'communication',
        title: 'Indirect Communication',
        description: 'Zimbabweans often communicate indirectly. "Yes" may mean "I understand" not agreement.',
        icon: '💬'
      },
      {
        category: 'safety',
        title: 'Wildlife Areas',
        description: 'Always stay in designated areas in national parks. Follow your guide\'s instructions.',
        icon: '🦏'
      },
      {
        category: 'dress',
        title: 'Conservative Dress',
        description: 'Dress modestly in rural areas. Smart-casual for urban settings.',
        icon: '👔'
      }
    ],
    languageTips: [
      'English is the official language of business and education',
      'Shona and Ndebele are the most widely spoken African languages',
      '"Mhoroi" = Hello (Shona), "Sawubona" = Hello (Ndebele)',
      'Learning basic greetings is greatly appreciated',
      'Many people speak multiple languages'
    ],
    funFacts: [
      'Great Zimbabwe was once the capital of the Kingdom of Zimbabwe (1300-1450)!',
      'Zimbabwe means "houses of stone" in Shona',
      'Victoria Falls is locally called "Mosi-oa-Tunya" - "The Smoke That Thunders"',
      'Zimbabwe has some of the world\'s largest elephant populations',
      'The Zimbabwe bird on the flag is based on soapstone carvings from Great Zimbabwe'
    ]
  },
  'Egypt': {
    country: 'Egypt',
    holidays: [
      {
        name: 'Eid al-Fitr',
        date: 'varies (end of Ramadan)',
        description: 'Festival marking the end of Ramadan with prayers, visits, and special sweets.',
        type: 'religious'
      },
      {
        name: 'Eid al-Adha',
        date: 'varies',
        description: 'Feast of Sacrifice commemorating Abraham. Families share meat with the poor.',
        type: 'religious'
      },
      {
        name: 'Coptic Christmas',
        date: 'January 7',
        description: 'Egyptian Orthodox Christmas celebration following the Coptic calendar.',
        type: 'religious'
      },
      {
        name: 'Sham el-Nessim',
        date: 'April (Easter Monday)',
        description: 'Spring festival dating back to ancient Egypt! Families picnic outdoors.',
        type: 'cultural'
      },
      {
        name: 'Revolution Day',
        date: 'July 23',
        description: 'Commemorates the 1952 Egyptian Revolution led by the Free Officers Movement.',
        type: 'national'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Assalamu Alaikum',
        description: 'The standard Arabic greeting meaning "peace be upon you." Response: "Wa Alaikum Assalam".',
        icon: '✋'
      },
      {
        category: 'etiquette',
        title: 'Hospitality (Diwan)',
        description: 'Egyptians are extremely hospitable. You may be invited for tea or a meal.',
        icon: '🍵'
      },
      {
        category: 'dining',
        title: 'Ramadan Etiquette',
        description: 'Avoid eating, drinking, or smoking in public during Ramadan daylight hours.',
        icon: '🌙'
      },
      {
        category: 'dress',
        title: 'Modest Clothing',
        description: 'Dress conservatively, especially in religious sites. Cover shoulders and knees.',
        icon: '👗'
      },
      {
        category: 'safety',
        title: 'Temple & Mosque Etiquette',
        description: 'Remove shoes before entering. Dress modestly. Ask permission before photographing people.',
        icon: '🕌'
      },
      {
        category: 'communication',
        title: 'Bargaining (Baksheesh)',
        description: 'Bargaining is expected in bazaars. Start at 50% of the asking price!',
        icon: '💰'
      }
    ],
    languageTips: [
      'Arabic is the official language - learn basic phrases!',
      'English is widely understood in tourist areas and by guides',
      '"Salam Aleikum" = Peace be upon you (formal greeting)',
      '"Shukran" = Thank you',
      '"La shukran" = No, thank you (declining politely)'
    ],
    funFacts: [
      'Ancient Egyptians invented the 365-day calendar!',
      'The Great Pyramid of Giza was the tallest man-made structure for 4,000 years',
      'Cleopatra lived closer in time to the iPhone than to the building of the Great Pyramid',
      'Ancient Egyptians used toothpaste made from crushed ox hooves, ashes, burnt eggshells, and pumice',
      'Egypt has the largest Arabic population in the world'
    ]
  },
  'Kenya': {
    country: 'Kenya',
    holidays: [
      {
        name: 'Madaraka Day',
        date: 'June 1',
        description: 'Celebrates Kenya attaining self-governance in 1963.',
        type: 'national'
      },
      {
        name: 'Jamhuri Day',
        date: 'December 12',
        description: 'Independence Day celebrating Kenya becoming a republic in 1964.',
        type: 'national'
      },
      {
        name: 'Eid al-Fitr',
        date: 'varies (end of Ramadan)',
        description: 'Celebration with prayers, feasting, and new clothes.',
        type: 'religious'
      },
      {
        name: 'Eid al-Adha',
        date: 'varies',
        description: 'Festival of Sacrifice with family gatherings and community sharing.',
        type: 'religious'
      },
      {
        name: 'Christmas Day',
        date: 'December 25',
        description: 'Christian celebration with church services and family gatherings.',
        type: 'religious'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Jambo Bwana!',
        description: '"Jambo!" is a friendly Swahili greeting. More respectful: "Shikamoo" for elders.',
        icon: '👋'
      },
      {
        category: 'etiquette',
        title: 'Community Spirit (Harambee)',
        description: '"Harambee" means "pulling together." Community support is central.',
        icon: '🤝'
      },
      {
        category: 'dining',
        title: 'Eating Customs',
        description: 'Eat with your right hand. It\'s polite to leave a small amount as an offering.',
        icon: '🍛'
      },
      {
        category: 'dress',
        title: 'Traditional Attire',
        description: 'Respect traditional clothing like the Maasai shukas. Dress modestly in rural areas.',
        icon: '👗'
      },
      {
        category: 'safety',
        title: 'Safari Etiquette',
        description: 'Always stay in your vehicle. Never feed animals. Keep quiet around wildlife.',
        icon: '🦁'
      },
      {
        category: 'communication',
        title: 'Polite Refusals',
        description: 'Directly saying "no" can be impolite. Use phrases like "I\'ll try" instead.',
        icon: '💬'
      }
    ],
    languageTips: [
      'Swahili and English are both official languages',
      '"Hakuna Matata" is truly Swahili for "no problems"!',
      'Learn basic Swahili - locals will love it!',
      'There are over 60 different ethnic languages spoken',
      'Most Kenyans speak at least 3 languages'
    ],
    funFacts: [
      'Kenya has over 50 national parks and reserves!',
      'The Great Migration sees over 2 million animals move between Kenya and Tanzania',
      'Barack Obama Sr. was born in Kenya',
      'Kenya is the world\'s leading exporter of black tea',
      'The Maasai people measure a man\'s wealth by how many cows he has'
    ]
  },
  'Morocco': {
    country: 'Morocco',
    holidays: [
      {
        name: 'Eid al-Fitr',
        date: 'varies (end of Ramadan)',
        description: 'Festival of Breaking the Fast with family gatherings and special pastries.',
        type: 'religious'
      },
      {
        name: 'Eid al-Adha',
        date: 'varies',
        description: 'Festival of Sacrifice with shared meals and charitable giving.',
        type: 'religious'
      },
      {
        name: 'Throne Day',
        date: 'July 30',
        description: 'Celebrates the King\'s coronation with parades and celebrations.',
        type: 'national'
      },
      {
        name: 'Independence Day',
        date: 'November 18',
        description: 'Celebrates independence from French and Spanish rule in 1956.',
        type: 'national'
      },
      {
        name: 'Amazigh New Year',
        date: 'January 14',
        description: 'Berber New Year celebration (Yennayer) celebrating Amazigh culture.',
        type: 'cultural'
      }
    ],
    customs: [
      {
        category: 'greetings',
        title: 'Salaam Aleikum',
        description: 'Traditional Arabic greeting. Handshakes are common between same genders.',
        icon: '✋'
      },
      {
        category: 'etiquette',
        title: 'Mint Tea Hospitality',
        description: 'Mint tea is a symbol of hospitality. It\'s polite to accept at least one cup.',
        icon: '🍵'
      },
      {
        category: 'dining',
        title: 'Communal Eating',
        description: 'Eat from a communal plate with your right hand. Bread is used to scoop food.',
        icon: '🍽️'
      },
      {
        category: 'dress',
        title: 'Modest Clothing',
        description: 'Dress conservatively, especially in medinas and religious sites.',
        icon: '👗'
      },
      {
        category: 'communication',
        title: 'Souk Bargaining',
        description: 'Bargaining is expected! Start at 30-50% of the asking price and have fun with it.',
        icon: '💰'
      },
      {
        category: 'safety',
        title: 'Medina Etiquette',
        description: 'Ask permission before photographing people. Dress modestly.',
        icon: '🏛️'
      }
    ],
    languageTips: [
      'Arabic is the official language, but French is widely spoken',
      'Amazigh (Berber) languages are also spoken',
      '"Salaam Aleikum" = Peace be upon you',
      '"Shukran" = Thank you',
      '"La shukran" = No, thank you',
      'Many people in tourist areas speak English, Spanish, and German too'
    ],
    funFacts: [
      'Morocco has the largest film studio in Africa - Ouarzazate!',
      'Morocco is the largest exporter of sardines in the world',
      'The blue city of Chefchaouen is said to have Jewish origins',
      'Morocco has 9 UNESCO World Heritage sites',
      'Traditional Moroccan slippers (babouches) have no heel - for easy removal indoors'
    ]
  }
};

export const getCulturalData = (country: string): CountryCulturalData | null => {
  return culturalData[country] || null;
};

export const getUpcomingHolidays = (country: string, count = 3): Holiday[] => {
  const data = getCulturalData(country);
  if (!data) return [];
  return data.holidays.slice(0, count);
};

export const getCustomsByCategory = (country: string, category: CustomNote['category']): CustomNote[] => {
  const data = getCulturalData(country);
  if (!data) return [];
  return data.customs.filter(c => c.category === category);
};
