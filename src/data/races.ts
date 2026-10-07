export interface Race {
  id: string;
  name: string;
  description: string;
  speed: number;
  size: string;
  abilityBonuses: Record<string, number>;
  traits: string[];
  languages: string[];
  subraces?: Subrace[];
}

export interface Subrace {
  id: string;
  name: string;
  description: string;
  abilityBonuses: Record<string, number>;
  traits: string[];
}

export const races: Race[] = [
  {
    id: 'human',
    name: 'Человек',
    description: 'Люди — самая молодая из распространённых рас. Они появились позже эльфов и гномов.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: ['Дополнительный язык', 'Универсальность'],
    languages: ['Общий', 'Один на выбор'],
    subraces: []
  },
  {
    id: 'elf',
    name: 'Эльф',
    description: 'Эльфы — волшебный народ с неземной грацией, живущий в мире, но не полностью принадлежа ему.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { dex: 2 },
    traits: ['Тёмное зрение', 'Наследие Фей', 'Транс', 'Острые чувства'],
    languages: ['Общий', 'Эльфийский'],
    subraces: [
      {
        id: 'high-elf',
        name: 'Высший эльф',
        description: 'Высшие эльфы обладают острым умом и мастерством в магии.',
        abilityBonuses: { int: 1 },
        traits: ['Владение оружием эльфов', 'Заговор', 'Дополнительный язык']
      },
      {
        id: 'wood-elf',
        name: 'Лесной эльф',
        description: 'Лесные эльфы более скрытны и проворны.',
        abilityBonuses: { wis: 1 },
        traits: ['Владение оружием эльфов', 'Маска дикой природы', 'Быстроногий']
      },
      {
        id: 'drow',
        name: 'Дроу',
        description: 'Дроу — тёмные эльфы подземий.',
        abilityBonuses: { cha: 1 },
        traits: ['Улучшенное тёмное зрение', 'Магия дроу', 'Чувствительность к солнцу']
      }
    ]
  },
  {
    id: 'dwarf',
    name: 'Дварф',
    description: 'Дварфы храбры, выносливы и трудолюбивы. Они славятся мастерством в кузнечном деле.',
    speed: 25,
    size: 'Средний',
    abilityBonuses: { con: 2 },
    traits: ['Тёмное зрение', 'Дварфийская стойкость', 'Владение дварфийским оружием', 'Знание камня'],
    languages: ['Общий', 'Дварфийский'],
    subraces: [
      {
        id: 'hill-dwarf',
        name: 'Горный дварф',
        description: 'Горные дварфы сильны и выносливы.',
        abilityBonuses: { str: 2 },
        traits: ['Владение доспехами', 'Крепкий']
      },
      {
        id: 'mountain-dwarf',
        name: 'Холмовой дварф',
        description: 'Холмовые дварфы обладают особой живучестью.',
        abilityBonuses: { wis: 1 },
        traits: ['Дварфийская живучесть']
      }
    ]
  },
  {
    id: 'halfling',
    name: 'Полурослик',
    description: 'Полурослики — маленький, проворный народ, ценящий уют и комфорт.',
    speed: 25,
    size: 'Маленький',
    abilityBonuses: { dex: 2 },
    traits: ['Везучий', 'Храбрый', 'Проворство полурослика'],
    languages: ['Общий', 'Полуросликов'],
    subraces: [
      {
        id: 'lightfoot-halfling',
        name: 'Легконогий полурослик',
        description: 'Легконогие полурослики более общительны.',
        abilityBonuses: { cha: 1 },
        traits: ['Естественная скрытность']
      },
      {
        id: 'stout-halfling',
        name: 'Крепкий полурослик',
        description: 'Крепкие полурослики более выносливы.',
        abilityBonuses: { con: 1 },
        traits: ['Крепкая стойкость']
      }
    ]
  },
  {
    id: 'dragonborn',
    name: 'Драконорождённый',
    description: 'Драконорождённые несут в себе наследие драконов, обладая дыханием дракона.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { str: 2, cha: 1 },
    traits: ['Наследие дракона', 'Оружие дыхания', 'Сопротивление урону'],
    languages: ['Общий', 'Драконий'],
    subraces: []
  },
  {
    id: 'gnome',
    name: 'Гном',
    description: 'Гномы — энергичные и изобретательные создания маленького роста.',
    speed: 25,
    size: 'Маленький',
    abilityBonuses: { int: 2 },
    traits: ['Тёмное зрение', 'Гномья хитрость'],
    languages: ['Общий', 'Гномий'],
    subraces: [
      {
        id: 'forest-gnome',
        name: 'Лесной гном',
        description: 'Лесные гномы проворны и скрытны.',
        abilityBonuses: { dex: 1 },
        traits: ['Маленькая иллюзия', 'Разговор с животными']
      },
      {
        id: 'rock-gnome',
        name: 'Скальный гном',
        description: 'Скальные гномы — искусные изобретатели.',
        abilityBonuses: { con: 1 },
        traits: ['Мастерство ремесленника', 'Техник']
      }
    ]
  },
  {
    id: 'half-elf',
    name: 'Полуэльф',
    description: 'Полуэльфы сочетают лучшие качества людей и эльфов.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { cha: 2 },
    traits: ['Тёмное зрение', 'Наследие Фей', 'Универсальность навыков', 'Два дополнительных навыка'],
    languages: ['Общий', 'Эльфийский', 'Один на выбор'],
    subraces: []
  },
  {
    id: 'half-orc',
    name: 'Полуорк',
    description: 'Полуорки сочетают силу орков и упорство людей.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { str: 2, con: 1 },
    traits: ['Тёмное зрение', 'Угрожающий', 'Неукротимая стойкость', 'Свирепые атаки'],
    languages: ['Общий', 'Орочий'],
    subraces: []
  },
  {
    id: 'tiefling',
    name: 'Тифлинг',
    description: 'Тифлинги несут в себе инфернальное наследие, обладая демоническими чертами.',
    speed: 30,
    size: 'Средний',
    abilityBonuses: { int: 1, cha: 2 },
    traits: ['Тёмное зрение', 'Адское сопротивление', 'Инфернальное наследие'],
    languages: ['Общий', 'Инфернальный'],
    subraces: []
  }
];
