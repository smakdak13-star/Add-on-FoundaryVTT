/**
 * Данные компендиумов — расы, классы, предметы, заклинания
 */

const RACES_DATA = [
  { name: 'Человек', type: 'race', system: {
    description: { value: '<p>Люди — самая молодая из распространённых рас, появившаяся позже эльфов и гномов. Они адаптивны и амбициозны.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    languages: { value: ['common'], custom: 'Один на выбор' },
    traits: { size: { value: 'med' } }
  }, flags: { 'dnd5e-2014-ru': { subraces: [] } } },

  { name: 'Эльф', type: 'race', system: {
    description: { value: '<p>Эльфы — волшебный народ с неземной грацией, живущий в мире, но не полностью принадлежа ему.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { dex: 2 },
    languages: { value: ['common', 'elvish'] },
    traits: {
      size: { value: 'med' },
      darkvision: { range: 60 },
      senses: { darkvision: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: ['Высший эльф', 'Лесной эльф', 'Дроу'],
    features: ['Тёмное зрение', 'Наследие Фей', 'Транс', 'Острые чувства']
  }} },

  { name: 'Дварф', type: 'race', system: {
    description: { value: '<p>Дварфы храбры, выносливы и трудолюбивы. Они славятся мастерством в кузнечном деле и горном деле.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 25 },
    abilities: { con: 2 },
    languages: { value: ['common', 'dwarvish'] },
    traits: {
      size: { value: 'med' },
      darkvision: { range: 60 },
      senses: { darkvision: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: ['Горный дварф', 'Холмовой дварф'],
    features: ['Тёмное зрение', 'Дварфийская стойкость', 'Владение дварфийским оружием', 'Знание камня']
  }} },

  { name: 'Полурослик', type: 'race', system: {
    description: { value: '<p>Полурослики — маленький, проворный народ, ценящий уют и комфорт домашней жизни.</p>' },
    source: 'Книга Игрока 2014',
    size: 'sm',
    movement: { walk: 25 },
    abilities: { dex: 2 },
    languages: { value: ['common', 'halfling'] },
    traits: { size: { value: 'sm' } }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: ['Легконогий полурослик', 'Крепкий полурослик'],
    features: ['Везучий', 'Храбрый', 'Проворство полурослика']
  }} },

  { name: 'Драконорождённый', type: 'race', system: {
    description: { value: '<p>Драконорождённые несут в себе наследие драконов, обладая оружием дыхания и сопротивлением урону.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { str: 2, cha: 1 },
    languages: { value: ['common', 'draconic'] },
    traits: { size: { value: 'med' } }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: [],
    features: ['Наследие дракона', 'Оружие дыхания', 'Сопротивление урону']
  }} },

  { name: 'Гном', type: 'race', system: {
    description: { value: '<p>Гномы — энергичные и изобретательные создания маленького роста, полные любопытства.</p>' },
    source: 'Книга Игрока 2014',
    size: 'sm',
    movement: { walk: 25 },
    abilities: { int: 2 },
    languages: { value: ['common', 'gnomish'] },
    traits: {
      size: { value: 'sm' },
      darkvision: { range: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: ['Лесной гном', 'Скальный гном'],
    features: ['Тёмное зрение', 'Гномья хитрость']
  }} },

  { name: 'Полуэльф', type: 'race', system: {
    description: { value: '<p>Полуэльфы сочетают лучшие качества людей и эльфов, обладая природной харизмой.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { cha: 2 },
    languages: { value: ['common', 'elvish'], custom: 'Один на выбор' },
    traits: {
      size: { value: 'med' },
      darkvision: { range: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: [],
    features: ['Тёмное зрение', 'Наследие Фей', 'Универсальность навыков']
  }} },

  { name: 'Полуорк', type: 'race', system: {
    description: { value: '<p>Полуорки сочетают неудержимую силу орков и упорство людей.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { str: 2, con: 1 },
    languages: { value: ['common', 'orc'] },
    traits: {
      size: { value: 'med' },
      darkvision: { range: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: [],
    features: ['Тёмное зрение', 'Угрожающий', 'Неукротимая стойкость', 'Свирепые атаки']
  }} },

  { name: 'Тифлинг', type: 'race', system: {
    description: { value: '<p>Тифлинги несут в себе инфернальное наследие, обладая демоническими чертами и врождённой магией.</p>' },
    source: 'Книга Игрока 2014',
    size: 'med',
    movement: { walk: 30 },
    abilities: { int: 1, cha: 2 },
    languages: { value: ['common', 'infernal'] },
    traits: {
      size: { value: 'med' },
      darkvision: { range: 60 }
    }
  }, flags: { 'dnd5e-2014-ru': {
    subraces: [],
    features: ['Тёмное зрение', 'Адское сопротивление', 'Инфернальное наследие']
  }} }
];

const CLASSES_DATA = [
  { name: 'Варвар', type: 'class', system: {
    description: { value: '<p>Свирепый воин, который может входить в боевую ярость.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd12',
    hitDie: 12,
    primaryAbility: { str: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { str: true, con: true }
  } },
  { name: 'Бард', type: 'class', system: {
    description: { value: '<p>Вдохновляющий маг, чья сила усиливается музыкой и поэзией.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { cha: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { dex: true, cha: true },
    spellcasting: { ability: 'cha', progression: 'full' }
  } },
  { name: 'Жрец', type: 'class', system: {
    description: { value: '<p>Священный заклинатель, наделённый божественной магией.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { wis: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { wis: true, cha: true },
    spellcasting: { ability: 'wis', progression: 'full' }
  } },
  { name: 'Друид', type: 'class', system: {
    description: { value: '<p>Заклинатель природы, черпающий силу из стихий.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { wis: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { int: true, wis: true },
    spellcasting: { ability: 'wis', progression: 'full' }
  } },
  { name: 'Воин', type: 'class', system: {
    description: { value: '<p>Мастер боевых искусств, использующий множество видов оружия и доспехов.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd10',
    hitDie: 10,
    primaryAbility: { str: true, dex: true },
    armor: 'all',
    weapons: 'all',
    savingThrows: { str: true, con: true }
  } },
  { name: 'Монах', type: 'class', system: {
    description: { value: '<p>Мастер боевых искусств, использующий внутреннюю энергию ки.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { dex: true, wis: true },
    armor: '',
    weapons: 'simple',
    savingThrows: { str: true, dex: true }
  } },
  { name: 'Паладин', type: 'class', system: {
    description: { value: '<p>Святой воин, связанный священной клятвой.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd10',
    hitDie: 10,
    primaryAbility: { str: true, cha: true },
    armor: 'all',
    weapons: 'all',
    savingThrows: { wis: true, cha: true },
    spellcasting: { ability: 'cha', progression: 'half' }
  } },
  { name: 'Следопыт', type: 'class', system: {
    description: { value: '<p>Воин дикой природы, использующий тактику и магию природы.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd10',
    hitDie: 10,
    primaryAbility: { dex: true, wis: true },
    armor: 'medium',
    weapons: 'all',
    savingThrows: { str: true, dex: true },
    spellcasting: { ability: 'wis', progression: 'half' }
  } },
  { name: 'Плут', type: 'class', system: {
    description: { value: '<p>Ловкий мошенник, использующий хитрость и скрытность.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { dex: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { dex: true, int: true }
  } },
  { name: 'Чародей', type: 'class', system: {
    description: { value: '<p>Заклинатель, черпающий магию из врождённой магической силы.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd6',
    hitDie: 6,
    primaryAbility: { cha: true },
    armor: '',
    weapons: 'simple',
    savingThrows: { con: true, cha: true },
    spellcasting: { ability: 'cha', progression: 'full' }
  } },
  { name: 'Колдун', type: 'class', system: {
    description: { value: '<p>Заклинатель, получивший силу от потустороннего покровителя.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd8',
    hitDie: 8,
    primaryAbility: { cha: true },
    armor: 'light',
    weapons: 'simple',
    savingThrows: { wis: true, cha: true },
    spellcasting: { ability: 'cha', progression: 'pact' }
  } },
  { name: 'Волшебник', type: 'class', system: {
    description: { value: '<p>Учёный маг, изучающий магию по книгам заклинаний.</p>' },
    source: 'Книга Игрока 2014',
    hitDice: 'd6',
    hitDie: 6,
    primaryAbility: { int: true },
    armor: '',
    weapons: 'simple',
    savingThrows: { int: true, wis: true },
    spellcasting: { ability: 'int', progression: 'full' }
  } }
];

const ITEMS_DATA = [
  // Простое оружие
  { name: 'Кинжал', type: 'weapon', system: {
    description: { value: '<p>Маленький обоюдоострый клинок.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 1, price: { value: 2, denomination: 'gp' },
    damage: { parts: [['1d4', 'piercing']], versatile: { number: 1, die: 'd4' } },
    properties: ['fin', 'lgt', 'thr'],
    weaponType: 'simpleM',
    range: { value: 20, long: 60, units: 'ft' },
    proficient: 1
  } },
  { name: 'Ручной топор', type: 'weapon', system: {
    description: { value: '<p>Компактный боевой топор.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 2, price: { value: 5, denomination: 'gp' },
    damage: { parts: [['1d6', 'slashing']] },
    properties: ['lgt', 'thr'],
    weaponType: 'simpleM',
    range: { value: 20, long: 60, units: 'ft' }
  } },
  { name: 'Дротик', type: 'weapon', system: {
    description: { value: '<p>Лёгкое копьё для метания.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 2, price: { value: 0.5, denomination: 'gp' },
    damage: { parts: [['1d6', 'piercing']] },
    properties: ['thr'],
    weaponType: 'simpleM',
    range: { value: 30, long: 120, units: 'ft' }
  } },
  { name: 'Булава', type: 'weapon', system: {
    description: { value: '<p>Тяжёлая металлическая головка на древке.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 4, price: { value: 5, denomination: 'gp' },
    damage: { parts: [['1d6', 'bludgeoning']] },
    weaponType: 'simpleM'
  } },
  { name: 'Боевой посох', type: 'weapon', system: {
    description: { value: '<p>Длинный деревянный посох.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 4, price: { value: 0.2, denomination: 'gp' },
    damage: { parts: [['1d6', 'bludgeoning']], versatile: { number: 1, die: 'd8' } },
    properties: ['ver'],
    weaponType: 'simpleM'
  } },
  { name: 'Копьё', type: 'weapon', system: {
    description: { value: '<p>Длинное древко с острым наконечником.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 3, price: { value: 1, denomination: 'gp' },
    damage: { parts: [['1d6', 'piercing']], versatile: { number: 1, die: 'd8' } },
    properties: ['thr', 'ver'],
    weaponType: 'simpleM',
    range: { value: 20, long: 60, units: 'ft' }
  } },
  { name: 'Короткий лук', type: 'weapon', system: {
    description: { value: '<p>Короткий лук для стрельбы.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 2, price: { value: 25, denomination: 'gp' },
    damage: { parts: [['1d6', 'piercing']] },
    properties: ['amm', 'two'],
    weaponType: 'simpleR',
    range: { value: 80, long: 320, units: 'ft' }
  } },
  // Воинское оружие
  { name: 'Длинный меч', type: 'weapon', system: {
    description: { value: '<p>Элегантный длинный клинок.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 3, price: { value: 15, denomination: 'gp' },
    damage: { parts: [['1d8', 'slashing']], versatile: { number: 1, die: 'd10' } },
    properties: ['ver'],
    weaponType: 'martialM'
  } },
  { name: 'Двуручный меч', type: 'weapon', system: {
    description: { value: '<p>Массивный двуручный меч.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 6, price: { value: 50, denomination: 'gp' },
    damage: { parts: [['2d6', 'slashing']] },
    properties: ['hvy', 'two'],
    weaponType: 'martialM'
  } },
  { name: 'Секира', type: 'weapon', system: {
    description: { value: '<p>Огромный двуручный топор.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 7, price: { value: 30, denomination: 'gp' },
    damage: { parts: [['1d12', 'slashing']] },
    properties: ['hvy', 'two'],
    weaponType: 'martialM'
  } },
  { name: 'Рапира', type: 'weapon', system: {
    description: { value: '<p>Тонкий длинный клинок.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 2, price: { value: 25, denomination: 'gp' },
    damage: { parts: [['1d8', 'piercing']] },
    properties: ['fin'],
    weaponType: 'martialM'
  } },
  { name: 'Длинный лук', type: 'weapon', system: {
    description: { value: '<p>Большой мощный лук.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 2, price: { value: 50, denomination: 'gp' },
    damage: { parts: [['1d8', 'piercing']] },
    properties: ['amm', 'hvy', 'two'],
    weaponType: 'martialR',
    range: { value: 150, long: 600, units: 'ft' }
  } },
  // Доспехи
  { name: 'Кожаный доспех', type: 'equipment', system: {
    description: { value: '<p>Доспех из жёсткой кожи.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 10, price: { value: 10, denomination: 'gp' },
    armor: { value: 11, type: 'light' },
    equipment: { type: 'suit' },
    proficient: 1
  } },
  { name: 'Клёпаный кожаный доспех', type: 'equipment', system: {
    description: { value: '<p>Кожаный доспех с металлическими заклёпками.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 13, price: { value: 45, denomination: 'gp' },
    armor: { value: 12, type: 'light' },
    equipment: { type: 'suit' },
    proficient: 1
  } },
  { name: 'Кольчужная рубаха', type: 'equipment', system: {
    description: { value: '<p>Рубаха из переплетённых колец.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 20, price: { value: 50, denomination: 'gp' },
    armor: { value: 13, type: 'medium' },
    equipment: { type: 'suit' }
  } },
  { name: 'Кираса', type: 'equipment', system: {
    description: { value: '<p>Подогнанная металлическая кираса.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 20, price: { value: 400, denomination: 'gp' },
    armor: { value: 14, type: 'medium' },
    equipment: { type: 'suit' }
  } },
  { name: 'Полулаты', type: 'equipment', system: {
    description: { value: '<p>Частичные латы из металлических пластин.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 40, price: { value: 750, denomination: 'gp' },
    armor: { value: 15, type: 'medium', stealth: true },
    equipment: { type: 'suit' }
  } },
  { name: 'Кольчужный доспех', type: 'equipment', system: {
    description: { value: '<p>Доспех из переплетённых металлических колец.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 55, price: { value: 75, denomination: 'gp' },
    armor: { value: 16, type: 'heavy', stealth: true },
    equipment: { type: 'suit' }
  } },
  { name: 'Латы', type: 'equipment', system: {
    description: { value: '<p>Полный комплект сочленённых пластин.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 65, price: { value: 1500, denomination: 'gp' },
    armor: { value: 18, type: 'heavy', stealth: true },
    equipment: { type: 'suit' }
  } },
  { name: 'Щит', type: 'equipment', system: {
    description: { value: '<p>Деревянный или металлический щит.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 6, price: { value: 10, denomination: 'gp' },
    armor: { value: 2, type: 'shield' },
    equipment: { type: 'shield' },
    proficient: 1
  } },
  // Снаряжение
  { name: 'Рюкзак', type: 'container', system: {
    description: { value: '<p>Вместительный рюкзак для хранения предметов.</p>' },
    quantity: 1, weight: 5, price: { value: 2, denomination: 'gp' },
    capacity: { weight: 30 }
  } },
  { name: 'Верёвка пеньковая (50 фт)', type: 'loot', system: {
    description: { value: '<p>Прочная пеньковая верёвка длиной 50 футов.</p>' },
    quantity: 1, weight: 10, price: { value: 1, denomination: 'gp' }
  } },
  { name: 'Факел', type: 'consumable', system: {
    description: { value: '<p>Освещает область радиусом 20 футов на 1 час.</p>' },
    quantity: 1, weight: 1, price: { value: 0.01, denomination: 'gp' },
    uses: { max: '1', autoDestroy: true }
  } },
  { name: 'Сухой паёк (1 день)', type: 'consumable', system: {
    description: { value: '<p>Сушёная еда на один день пути.</p>' },
    quantity: 1, weight: 2, price: { value: 0.5, denomination: 'gp' },
    uses: { max: '1', autoDestroy: true },
    consumableType: 'food'
  } },
  { name: 'Бурдюк', type: 'container', system: {
    description: { value: '<p>Кожаный мешок для воды, вмещает 4 пинты.</p>' },
    quantity: 1, weight: 5, price: { value: 0.2, denomination: 'gp' }
  } },
  { name: 'Набор целителя', type: 'tool', system: {
    description: { value: '<p>Содержит бинты, мази и шины. 10 использований.</p>' },
    quantity: 1, weight: 3, price: { value: 5, denomination: 'gp' },
    uses: { max: '10' }
  } },
  { name: 'Воровские инструменты', type: 'tool', system: {
    description: { value: '<p>Набор для вскрытия замков и обезвреживания ловушек.</p>' },
    quantity: 1, weight: 1, price: { value: 25, denomination: 'gp' }
  } },
  { name: 'Священный символ', type: 'equipment', system: {
    description: { value: '<p>Амулет, эмблема или реликвия, используемая как заклинательная фокусировка.</p>' },
    quantity: 1, weight: 1, price: { value: 5, denomination: 'gp' },
    equipment: { type: 'trinket' }
  } },
  // Зелья
  { name: 'Зелье лечения', type: 'consumable', system: {
    description: { value: '<p>Красная жидкость, восстанавливающая 2к4+2 хитов.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 0.5, price: { value: 50, denomination: 'gp' },
    uses: { max: '1', autoDestroy: true },
    consumableType: 'potion',
    damage: { parts: [['2d4+2', 'healing']] }
  } },
  { name: 'Зелье старшего лечения', type: 'consumable', system: {
    description: { value: '<p>Восстанавливает 4к4+4 хитов.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 0.5, price: { value: 150, denomination: 'gp' },
    uses: { max: '1', autoDestroy: true },
    consumableType: 'potion',
    damage: { parts: [['4d4+4', 'healing']] }
  } },
  { name: 'Зелье высшего лечения', type: 'consumable', system: {
    description: { value: '<p>Восстанавливает 8к4+8 хитов.</p>' },
    source: 'Книга Игрока 2014',
    quantity: 1, weight: 0.5, price: { value: 450, denomination: 'gp' },
    uses: { max: '1', autoDestroy: true },
    consumableType: 'potion',
    damage: { parts: [['8d4+8', 'healing']] }
  } }
];

const SPELLS_DATA = [
  // Заговоры
  { name: 'Огненный снаряд', type: 'spell', system: {
    description: { value: '<p>Вы бросаете сгусток огня в существо или предмет. Совершите дальнобойную атаку заклинанием. При попадании цель получает 1к10 урона огнём.</p>' },
    source: 'Книга Игрока 2014',
    level: 0,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 120, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['1d10', 'fire']] },
    preparation: { mode: 'always', prepared: true }
  } },
  { name: 'Свет', type: 'spell', system: {
    description: { value: '<p>Вы касаетесь одного предмета. До окончания действия он излучает яркий свет в радиусе 20 футов и тусклый свет ещё на 20 футов.</p>' },
    source: 'Книга Игрока 2014',
    level: 0,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, m: { value: 'Светлячок или фосфоресцирующий мох' } },
    duration: { value: 1, units: 'hour' },
    preparation: { mode: 'always', prepared: true }
  } },
  { name: 'Волшебная рука', type: 'spell', system: {
    description: { value: '<p>Призрачная парящая рука появляется в указанной точке. Рука может манипулировать предметами и открывать двери.</p>' },
    source: 'Книга Игрока 2014',
    level: 0,
    school: 'con',
    activation: { type: 'action', cost: 1 },
    range: { value: 30, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: 1, units: 'minute' },
    preparation: { mode: 'always', prepared: true }
  } },
  { name: 'Потусторонний разряд', type: 'spell', system: {
    description: { value: '<p>Луч потрескивающей энергии устремляется к существу. Совершите дальнобойную атаку заклинанием. При попадании — 1к10 урона силовым полем.</p>' },
    source: 'Книга Игрока 2014',
    level: 0,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 120, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['1d10', 'force']] },
    preparation: { mode: 'always', prepared: true }
  } },
  { name: 'Руководство', type: 'spell', system: {
    description: { value: '<p>Вы касаетесь одного существа. Один раз до окончания действия цель может бросить к4 и прибавить результат к одной проверке характеристики.</p>' },
    source: 'Книга Игрока 2014',
    level: 0,
    school: 'div',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true },
    duration: { value: 1, units: 'minute' },
    concentration: true,
    preparation: { mode: 'always', prepared: true }
  } },
  // Заклинания 1-го уровня
  { name: 'Волшебная стрела', type: 'spell', system: {
    description: { value: '<p>Вы создаёте три светящихся дротика магической силы. Каждый дротик попадает автоматически и наносит 1к4+1 урона силовым полем.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 120, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['3d4+3', 'force']] },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Щит', type: 'spell', system: {
    description: { value: '<p>Невидимый барьер магической силы появляется и защищает вас. До начала вашего следующего хода вы получаете +5 к КД.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'abj',
    activation: { type: 'reaction', cost: 1 },
    range: { value: 0, units: 'self' },
    components: { v: true, s: true },
    duration: { value: 1, units: 'round' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Лечащее слово', type: 'spell', system: {
    description: { value: '<p>Существо на вашем выборе восстанавливает хиты, равные 1к4 + ваш модификатор заклинательной характеристики.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'con',
    activation: { type: 'bonus', cost: 1 },
    range: { value: 60, units: 'ft' },
    components: { v: true },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['1d4', 'healing']] },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Лечение ран', type: 'spell', system: {
    description: { value: '<p>Существо восстанавливает хиты, равные 1к8 + модификатор заклинательной характеристики.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'con',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['1d8', 'healing']] },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Обнаружение магии', type: 'spell', system: {
    description: { value: '<p>Вы чувствуете присутствие магии в пределах 30 футов. Вы можете использовать действие, чтобы узнать школу магии.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'div',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'self' },
    components: { v: true, s: true },
    duration: { value: 10, units: 'minute' },
    concentration: true,
    ritual: true,
    preparation: { mode: 'prepared' }
  } },
  { name: 'Благословение', type: 'spell', system: {
    description: { value: '<p>Вы благословляете до трёх существ. Каждый раз, когда они совершают атаку или спасбросок, они могут бросить к4 и прибавить к броску.</p>' },
    source: 'Книга Игрока 2014',
    level: 1,
    school: 'enc',
    activation: { type: 'action', cost: 1 },
    range: { value: 30, units: 'ft' },
    components: { v: true, s: true, m: { value: 'Мазок святой воды' } },
    duration: { value: 1, units: 'minute' },
    concentration: true,
    preparation: { mode: 'prepared' }
  } },
  // Заклинания 2-го уровня
  { name: 'Туманный шаг', type: 'spell', system: {
    description: { value: '<p>Вы телепортируетесь на расстояние до 30 футов в незанятое пространство, которое вы видите.</p>' },
    source: 'Книга Игрока 2014',
    level: 2,
    school: 'con',
    activation: { type: 'bonus', cost: 1 },
    range: { value: 0, units: 'self' },
    components: { v: true },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Невидимость', type: 'spell', system: {
    description: { value: '<p>Существо, которого вы касаетесь, становится невидимым до окончания действия.</p>' },
    source: 'Книга Игрока 2014',
    level: 2,
    school: 'ill',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true, m: { value: 'Ресничка в смоле' } },
    duration: { value: 1, units: 'hour' },
    concentration: true,
    preparation: { mode: 'prepared' }
  } },
  { name: 'Духовное оружие', type: 'spell', system: {
    description: { value: '<p>Вы создаёте парящее призрачное оружие. При создании совершите рукопашную атаку заклинанием: 1к8 + модификатор заклинательной характеристики.</p>' },
    source: 'Книга Игрока 2014',
    level: 2,
    school: 'con',
    activation: { type: 'bonus', cost: 1 },
    range: { value: 60, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: 1, units: 'minute' },
    damage: { parts: [['1d8', 'force']] },
    preparation: { mode: 'prepared' }
  } },
  // Заклинания 3-го уровня
  { name: 'Огненный шар', type: 'spell', system: {
    description: { value: '<p>Яркий луч вылетает из вас и взрывается в точке. Каждое существо в 20-футовом радиусе получает 8к6 урона огнём.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 150, units: 'ft' },
    components: { v: true, s: true, m: { value: 'Крошечный шарик из гуано летучей мыши и серы' } },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['8d6', 'fire']] },
    save: { ability: 'dex', scaling: 'half' },
    area: { radius: 20, units: 'ft' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Контрзаклинание', type: 'spell', system: {
    description: { value: '<p>Вы пытаетесь прервать существо в процессе сотворения заклинания. Если заклинание 3 уровня или ниже — оно проваливается.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'abj',
    activation: { type: 'reaction', cost: 1 },
    range: { value: 60, units: 'ft' },
    components: { s: true },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Полёт', type: 'spell', system: {
    description: { value: '<p>Вы касаетесь добровольного существа. Цель получает скорость полёта 60 футов на время действия.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'trs',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true, m: { value: 'Перо любой птицы' } },
    duration: { value: 10, units: 'minute' },
    concentration: true,
    preparation: { mode: 'prepared' }
  } },
  { name: 'Ускорение', type: 'spell', system: {
    description: { value: '<p>Выберите добровольное существо. Его скорость удваивается, оно получает +2 к КД, преимущество на спасброски Ловкости и дополнительное действие.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'trs',
    activation: { type: 'action', cost: 1 },
    range: { value: 30, units: 'ft' },
    components: { v: true, s: true, m: { value: 'Стружка корня солодки' } },
    duration: { value: 1, units: 'minute' },
    concentration: true,
    preparation: { mode: 'prepared' }
  } },
  { name: 'Рассеивание магии', type: 'spell', system: {
    description: { value: '<p>Выберите одно существо, предмет или магический эффект. Любое заклинание 3 уровня или ниже на цели оканчивается.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'abj',
    activation: { type: 'action', cost: 1 },
    range: { value: 120, units: 'ft' },
    components: { v: true, s: true },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Молния', type: 'spell', system: {
    description: { value: '<p>Разряд молнии формирует линию длиной 100 футов и шириной 5 футов. Каждое существо в линии получает 8к6 урона электричеством.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'self' },
    components: { v: true, s: true, m: { value: 'Кусочек меха и янтарный жезл' } },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['8d6', 'lightning']] },
    save: { ability: 'dex', scaling: 'half' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Воскрешение', type: 'spell', system: {
    description: { value: '<p>Вы касаетесь существа, умершего не более 1 минуты назад. Существо возвращается к жизни с 1 хитом.</p>' },
    source: 'Книга Игрока 2014',
    level: 3,
    school: 'nec',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true, m: { value: 'Алмазы на 300 зм, расходуемые' } },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  // Заклинания 4-го уровня
  { name: 'Врата измерений', type: 'spell', system: {
    description: { value: '<p>Вы телепортируетесь в любую точку в пределах дистанции. Вы можете взять с собой одно существо.</p>' },
    source: 'Книга Игрока 2014',
    level: 4,
    school: 'con',
    activation: { type: 'action', cost: 1 },
    range: { value: 500, units: 'ft' },
    components: { v: true },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Полиморф', type: 'spell', system: {
    description: { value: '<p>Вы превращаете существо, которое видите, в зверя. Новая форма может быть любым зверем с ПО не выше уровня цели.</p>' },
    source: 'Книга Игрока 2014',
    level: 4,
    school: 'trs',
    activation: { type: 'action', cost: 1 },
    range: { value: 60, units: 'ft' },
    components: { v: true, s: true, m: { value: 'Кокон гусеницы' } },
    duration: { value: 1, units: 'hour' },
    concentration: true,
    preparation: { mode: 'prepared' }
  } },
  // Заклинания 5-го уровня
  { name: 'Оживление', type: 'spell', system: {
    description: { value: '<p>Вы возвращаете к жизни мёртвое существо, умершее не более 10 дней назад. Существо возвращается с 1 хитом.</p>' },
    source: 'Книга Игрока 2014',
    level: 5,
    school: 'nec',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'touch' },
    components: { v: true, s: true, m: { value: 'Алмаз стоимостью 500 зм, расходуемый' } },
    duration: { value: '', units: 'inst' },
    preparation: { mode: 'prepared' }
  } },
  { name: 'Конус холода', type: 'spell', system: {
    description: { value: '<p>Поток холодного воздуха вырывается из вас. Каждое существо в конусе получает 8к8 урона холодом.</p>' },
    source: 'Книга Игрока 2014',
    level: 5,
    school: 'evo',
    activation: { type: 'action', cost: 1 },
    range: { value: 0, units: 'self' },
    components: { v: true, s: true, m: { value: 'Маленький кристаллический конус' } },
    duration: { value: '', units: 'inst' },
    damage: { parts: [['8d8', 'cold']] },
    save: { ability: 'con', scaling: 'half' },
    preparation: { mode: 'prepared' }
  } }
];

/**
 * Регистрация данных в компендиумах
 */
export async function registerCompendiumData() {
  // Регистрируем расы
  const racePack = game.packs.get('dnd5e-2014-ru.dnd5e-2014-races-ru');
  if (racePack) {
    const existing = await racePack.getDocuments();
    if (existing.length === 0) {
      await Item.createDocuments(RACES_DATA, { pack: 'dnd5e-2014-ru.dnd5e-2014-races-ru' });
      console.log('D&D 5e (2014) RU | Расы добавлены в компендиум');
    }
  }

  // Регистрируем классы
  const classPack = game.packs.get('dnd5e-2014-ru.dnd5e-2014-classes-ru');
  if (classPack) {
    const existing = await classPack.getDocuments();
    if (existing.length === 0) {
      await Item.createDocuments(CLASSES_DATA, { pack: 'dnd5e-2014-ru.dnd5e-2014-classes-ru' });
      console.log('D&D 5e (2014) RU | Классы добавлены в компендиум');
    }
  }

  // Регистрируем предметы
  const itemPack = game.packs.get('dnd5e-2014-ru.dnd5e-2014-items-ru');
  if (itemPack) {
    const existing = await itemPack.getDocuments();
    if (existing.length === 0) {
      await Item.createDocuments(ITEMS_DATA, { pack: 'dnd5e-2014-ru.dnd5e-2014-items-ru' });
      console.log('D&D 5e (2014) RU | Предметы добавлены в компендиум');
    }
  }

  // Регистрируем заклинания
  const spellPack = game.packs.get('dnd5e-2014-ru.dnd5e-2014-spells-ru');
  if (spellPack) {
    const existing = await spellPack.getDocuments();
    if (existing.length === 0) {
      await Item.createDocuments(SPELLS_DATA, { pack: 'dnd5e-2014-ru.dnd5e-2014-spells-ru' });
      console.log('D&D 5e (2014) RU | Заклинания добавлены в компендиум');
    }
  }
}
