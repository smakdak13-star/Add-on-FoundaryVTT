export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'shield' | 'adventuring' | 'consumable' | 'tool' | 'treasure';
  category: string;
  weight: number;
  cost: string;
  description: string;
  properties?: string[];
  damage?: string;
  damageType?: string;
  armorClass?: number;
  stealth?: boolean;
}

export const items: Item[] = [
  // Оружие
  {
    id: 'dagger',
    name: 'Кинжал',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 1,
    cost: '2 зм',
    description: 'Маленький обоюдоострый клинок.',
    properties: ['Фехтовальное', 'Лёгкое', 'Метательное'],
    damage: '1к4',
    damageType: 'Колющий'
  },
  {
    id: 'handaxe',
    name: 'Ручной топор',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 2,
    cost: '5 зм',
    description: 'Компактный боевой топор.',
    properties: ['Лёгкое', 'Метательное'],
    damage: '1к6',
    damageType: 'Рубящий'
  },
  {
    id: 'javelin',
    name: 'Дротик',
    type: 'weapon',
    category: 'Простое метательное',
    weight: 2,
    cost: '5 сп',
    description: 'Лёгкое копьё для метания.',
    properties: ['Метательное'],
    damage: '1к6',
    damageType: 'Колющий'
  },
  {
    id: 'light-hammer',
    name: 'Лёгкий молот',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 2,
    cost: '2 зм',
    description: 'Небольшой боевой молот.',
    properties: ['Лёгкое', 'Метательное'],
    damage: '1к4',
    damageType: 'Дробящий'
  },
  {
    id: 'mace',
    name: 'Булава',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 4,
    cost: '5 зм',
    description: 'Тяжёлая металлическая головка на древке.',
    properties: [],
    damage: '1к6',
    damageType: 'Дробящий'
  },
  {
    id: 'quarterstaff',
    name: 'Боевой посох',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 4,
    cost: '2 сп',
    description: 'Длинный деревянный посох.',
    properties: ['Универсальное'],
    damage: '1к6',
    damageType: 'Дробящий'
  },
  {
    id: 'shortbow',
    name: 'Короткий лук',
    type: 'weapon',
    category: 'Простое дальнобойное',
    weight: 2,
    cost: '25 зм',
    description: 'Короткий лук для стрельбы.',
    properties: ['Боеприпасы', 'Двуручное'],
    damage: '1к6',
    damageType: 'Колющий'
  },
  {
    id: 'sickle',
    name: 'Серп',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 2,
    cost: '1 зм',
    description: 'Изогнутый клинок на короткой рукояти.',
    properties: ['Лёгкое'],
    damage: '1к4',
    damageType: 'Рубящий'
  },
  {
    id: 'spear',
    name: 'Копьё',
    type: 'weapon',
    category: 'Простое рукопашное',
    weight: 3,
    cost: '1 зм',
    description: 'Длинное древко с острым наконечником.',
    properties: ['Метательное', 'Универсальное'],
    damage: '1к6',
    damageType: 'Колющий'
  },
  {
    id: 'battleaxe',
    name: 'Боевой топор',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 4,
    cost: '10 зм',
    description: 'Тяжёлый боевой топор.',
    properties: ['Универсальное'],
    damage: '1к8',
    damageType: 'Рубящий'
  },
  {
    id: 'flail',
    name: 'Цеп',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 2,
    cost: '10 зм',
    description: 'Шар на цепи, прикреплённый к рукояти.',
    properties: [],
    damage: '1к8',
    damageType: 'Дробящий'
  },
  {
    id: 'glaive',
    name: 'Глефа',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 6,
    cost: '20 зм',
    description: 'Длинное древко с клинком.',
    properties: ['Тяжёлое', 'Двуручное', 'Досягаемость'],
    damage: '1к10',
    damageType: 'Рубящий'
  },
  {
    id: 'greataxe',
    name: 'Секира',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 7,
    cost: '30 зм',
    description: 'Огромный двуручный топор.',
    properties: ['Тяжёлое', 'Двуручное'],
    damage: '1к12',
    damageType: 'Рубящий'
  },
  {
    id: 'greatsword',
    name: 'Двуручный меч',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 6,
    cost: '50 зм',
    description: 'Массивный двуручный меч.',
    properties: ['Тяжёлое', 'Двуручное'],
    damage: '2к6',
    damageType: 'Рубящий'
  },
  {
    id: 'halberd',
    name: 'Алебарда',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 6,
    cost: '20 зм',
    description: 'Древко с топором и шипом.',
    properties: ['Тяжёлое', 'Двуручное', 'Досягаемость'],
    damage: '1к10',
    damageType: 'Рубящий'
  },
  {
    id: 'longsword',
    name: 'Длинный меч',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 3,
    cost: '15 зм',
    description: 'Элегантный длинный клинок.',
    properties: ['Универсальное'],
    damage: '1к8',
    damageType: 'Рубящий'
  },
  {
    id: 'maul',
    name: 'Молот',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 10,
    cost: '10 зм',
    description: 'Тяжёлый двуручный молот.',
    properties: ['Тяжёлое', 'Двуручное'],
    damage: '2к6',
    damageType: 'Дробящий'
  },
  {
    id: 'rapier',
    name: 'Рапира',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 2,
    cost: '25 зм',
    description: 'Тонкий длинный клинок.',
    properties: ['Фехтовальное'],
    damage: '1к8',
    damageType: 'Колющий'
  },
  {
    id: 'scimitar',
    name: 'Скимитар',
    type: 'weapon',
    category: 'Воинское рукопашное',
    weight: 3,
    cost: '25 зм',
    description: 'Изогнутый клинок.',
    properties: ['Фехтовальное', 'Лёгкое'],
    damage: '1к6',
    damageType: 'Рубящий'
  },
  {
    id: 'longbow',
    name: 'Длинный лук',
    type: 'weapon',
    category: 'Воинское дальнобойное',
    weight: 2,
    cost: '50 зм',
    description: 'Большой мощный лук.',
    properties: ['Боеприпасы', 'Тяжёлое', 'Двуручное'],
    damage: '1к8',
    damageType: 'Колющий'
  },
  {
    id: 'crossbow-heavy',
    name: 'Тяжёлый арбалет',
    type: 'weapon',
    category: 'Воинское дальнобойное',
    weight: 18,
    cost: '50 зм',
    description: 'Мощный арбалет с зарядным механизмом.',
    properties: ['Боеприпасы', 'Тяжёлое', 'Двуручное', 'Перезарядка'],
    damage: '1к10',
    damageType: 'Колющий'
  },
  // Доспехи
  {
    id: 'padded',
    name: 'Стёганый доспех',
    type: 'armor',
    category: 'Лёгкий доспех',
    weight: 8,
    cost: '5 зм',
    description: 'Простой стёганый доспех.',
    armorClass: 11,
    stealth: true
  },
  {
    id: 'leather',
    name: 'Кожаный доспех',
    type: 'armor',
    category: 'Лёгкий доспех',
    weight: 10,
    cost: '10 зм',
    description: 'Доспех из жёсткой кожи.',
    armorClass: 11
  },
  {
    id: 'studded-leather',
    name: 'Клёпаный кожаный доспех',
    type: 'armor',
    category: 'Лёгкий доспех',
    weight: 13,
    cost: '45 зм',
    description: 'Кожаный доспех с металлическими заклёпками.',
    armorClass: 12
  },
  {
    id: 'chain-shirt',
    name: 'Кольчужная рубаха',
    type: 'armor',
    category: 'Средний доспех',
    weight: 20,
    cost: '50 зм',
    description: 'Рубаха из переплетённых колец.',
    armorClass: 13
  },
  {
    id: 'hide',
    name: 'Шкурный доспех',
    type: 'armor',
    category: 'Средний доспех',
    weight: 12,
    cost: '10 зм',
    description: 'Доспех из грубых шкур.',
    armorClass: 12
  },
  {
    id: 'scale-mail',
    name: 'Чешуйчатый доспех',
    type: 'armor',
    category: 'Средний доспех',
    weight: 45,
    cost: '50 зм',
    description: 'Доспех из металлических чешуек.',
    armorClass: 14,
    stealth: true
  },
  {
    id: 'breastplate',
    name: 'Кираса',
    type: 'armor',
    category: 'Средний доспех',
    weight: 20,
    cost: '400 зм',
    description: 'Подогнанная металлическая кираса.',
    armorClass: 14
  },
  {
    id: 'half-plate',
    name: 'Полулаты',
    type: 'armor',
    category: 'Средний доспех',
    weight: 40,
    cost: '750 зм',
    description: 'Частичные латы из металлических пластин.',
    armorClass: 15,
    stealth: true
  },
  {
    id: 'ring-mail',
    name: 'Кольчатый доспех',
    type: 'armor',
    category: 'Тяжёлый доспех',
    weight: 40,
    cost: '30 зм',
    description: 'Тяжёлый доспех из колец.',
    armorClass: 14,
    stealth: true
  },
  {
    id: 'chain-mail',
    name: 'Кольчужный доспех',
    type: 'armor',
    category: 'Тяжёлый доспех',
    weight: 55,
    cost: '75 зм',
    description: 'Доспех из переплетённых металлических колец.',
    armorClass: 16,
    stealth: true
  },
  {
    id: 'splint',
    name: 'Наборный доспех',
    type: 'armor',
    category: 'Тяжёлый доспех',
    weight: 60,
    cost: '200 зм',
    description: 'Доспех из узких металлических полос.',
    armorClass: 17,
    stealth: true
  },
  {
    id: 'plate',
    name: 'Латы',
    type: 'armor',
    category: 'Тяжёлый доспех',
    weight: 65,
    cost: '1500 зм',
    description: 'Полный комплект сочленённых пластин.',
    armorClass: 18,
    stealth: true
  },
  {
    id: 'shield',
    name: 'Щит',
    type: 'shield',
    category: 'Щит',
    weight: 6,
    cost: '10 зм',
    description: 'Деревянный или металлический щит.',
    armorClass: 2
  },
  // Приключенческое снаряжение
  {
    id: 'backpack',
    name: 'Рюкзак',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 5,
    cost: '2 зм',
    description: 'Вместительный рюкзак для хранения предметов.'
  },
  {
    id: 'bedroll',
    name: 'Спальный мешок',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 7,
    cost: '1 зм',
    description: 'Тёплый спальный мешок для ночлега.'
  },
  {
    id: 'rope',
    name: 'Верёвка пеньковая (50 фт)',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 10,
    cost: '1 зм',
    description: 'Прочная пеньковая верёвка длиной 50 футов.'
  },
  {
    id: 'torch',
    name: 'Факел',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 1,
    cost: '1 м',
    description: 'Освещает область радиусом 20 футов на 1 час.'
  },
  {
    id: 'rations',
    name: 'Сухой паёк (1 день)',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 2,
    cost: '5 сп',
    description: 'Сушёная еда на один день пути.'
  },
  {
    id: 'water-skin',
    name: 'Бурдюк',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 5,
    cost: '2 сп',
    description: 'Кожаный мешок для воды, вмещает 4 пинты.'
  },
  {
    id: 'healers-kit',
    name: 'Набор целителя',
    type: 'adventuring',
    category: 'Снаряжение',
    weight: 3,
    cost: '5 зм',
    description: 'Содержит бинты, мази и шины. 10 использований.'
  },
  {
    id: 'thieves-tools',
    name: 'Воровские инструменты',
    type: 'tool',
    category: 'Инструменты',
    weight: 1,
    cost: '25 зм',
    description: 'Набор для вскрытия замков и обезвреживания ловушек.'
  },
  {
    id: 'climber-kit',
    name: 'Набор альпиниста',
    type: 'tool',
    category: 'Инструменты',
    weight: 12,
    cost: '25 зм',
    description: 'Крюки, ботинки с шипами, перчатки для лазания.'
  },
  {
    id: 'holy-symbol',
    name: 'Священный символ',
    type: 'adventuring',
    category: 'Магическая фокусировка',
    weight: 1,
    cost: '5 зм',
    description: 'Амулет, эмблема или реликвия, используемая как заклинательная фокусировка.'
  },
  {
    id: 'arcane-focus',
    name: 'Магическая фокусировка',
    type: 'adventuring',
    category: 'Магическая фокусировка',
    weight: 1,
    cost: '10 зм',
    description: 'Кристалл, жезл, посох или другой предмет для направления магии.'
  },
  // Расходники
  {
    id: 'potion-healing',
    name: 'Зелье лечения',
    type: 'consumable',
    category: 'Зелье',
    weight: 0.5,
    cost: '50 зм',
    description: 'Красная жидкость, восстанавливающая 2к4+2 ОЗ.'
  },
  {
    id: 'potion-greater-healing',
    name: 'Зелье старшего лечения',
    type: 'consumable',
    category: 'Зелье',
    weight: 0.5,
    cost: '150 зм',
    description: 'Восстанавливает 4к4+4 ОЗ.'
  },
  {
    id: 'potion-superior-healing',
    name: 'Зелье высшего лечения',
    type: 'consumable',
    category: 'Зелье',
    weight: 0.5,
    cost: '450 зм',
    description: 'Восстанавливает 8к4+8 ОЗ.'
  },
  {
    id: 'potion-supreme-healing',
    name: 'Зелье великого лечения',
    type: 'consumable',
    category: 'Зелье',
    weight: 0.5,
    cost: '1350 зм',
    description: 'Восстанавливает 10к4+20 ОЗ.'
  },
  // Сокровища
  {
    id: 'gem-ruby',
    name: 'Рубин',
    type: 'treasure',
    category: 'Драгоценный камень',
    weight: 0,
    cost: '1000 зм',
    description: 'Драгоценный красный камень стоимостью 1000 зм.'
  },
  {
    id: 'gem-diamond',
    name: 'Алмаз',
    type: 'treasure',
    category: 'Драгоценный камень',
    weight: 0,
    cost: '5000 зм',
    description: 'Превосходный бриллиант стоимостью 5000 зм.'
  },
  {
    id: 'gem-sapphire',
    name: 'Сапфир',
    type: 'treasure',
    category: 'Драгоценный камень',
    weight: 0,
    cost: '1000 зм',
    description: 'Драгоценный синий камень стоимостью 1000 зм.'
  }
];
