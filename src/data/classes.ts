export interface CharacterClass {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: string;
  savingThrows: string[];
  skillChoices: string[];
  skillCount: number;
  armorProficiencies: string[];
  weaponProficiencies: string[];
  spellcaster: boolean;
  spellAbility?: string;
  levels: ClassLevel[];
}

export interface ClassLevel {
  level: number;
  proficiencyBonus: number;
  features: string[];
  spellSlots?: { [key: string]: number };
}

export const classes: CharacterClass[] = [
  {
    id: 'barbarian',
    name: 'Варвар',
    description: 'Свирепый воин, который может входить в боевую ярость.',
    hitDie: 12,
    primaryAbility: 'Сила',
    savingThrows: ['Сила', 'Телосложение'],
    skillChoices: ['Атлетика', 'Запугивание', 'Природа', 'Восприятие', 'Выживание', 'Обращение с животными'],
    skillCount: 2,
    armorProficiencies: ['Лёгкие доспехи', 'Средние доспехи', 'Щиты'],
    weaponProficiencies: ['Простое оружие', 'Воинское оружие'],
    spellcaster: false,
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getBarbarianFeatures(i + 1)
    }))
  },
  {
    id: 'bard',
    name: 'Бард',
    description: 'Вдохновляющий маг, чья сила усиливается музыкой и поэзией.',
    hitDie: 8,
    primaryAbility: 'Харизма',
    savingThrows: ['Ловкость', 'Харизма'],
    skillChoices: ['Акробатика', 'Анатомия', 'Атлетика', 'Выступление', 'Запугивание', 'История', 'Ловкость рук', 'Магия', 'Медицина', 'Обман', 'Природа', 'Проницательность', 'Религия', 'Убеждение', 'Восприятие', 'Выживание', 'Обращение с животными'],
    skillCount: 3,
    armorProficiencies: ['Лёгкие доспехи'],
    weaponProficiencies: ['Простое оружие', 'Ручные арбалеты', 'Длинные мечи', 'Рапиры', 'Короткие мечи'],
    spellcaster: true,
    spellAbility: 'Харизма',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getBardFeatures(i + 1),
      spellSlots: getBardSpellSlots(i + 1)
    }))
  },
  {
    id: 'cleric',
    name: 'Жрец',
    description: 'Священный заклинатель, наделённый божественной магией.',
    hitDie: 8,
    primaryAbility: 'Мудрость',
    savingThrows: ['Мудрость', 'Харизма'],
    skillChoices: ['История', 'Проницательность', 'Медицина', 'Убеждение', 'Религия'],
    skillCount: 2,
    armorProficiencies: ['Лёгкие доспехи', 'Средние доспехи', 'Щиты'],
    weaponProficiencies: ['Простое оружие'],
    spellcaster: true,
    spellAbility: 'Мудрость',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getClericFeatures(i + 1),
      spellSlots: getClericSpellSlots(i + 1)
    }))
  },
  {
    id: 'druid',
    name: 'Друид',
    description: 'Заклинатель природы, черпающий силу из стихий.',
    hitDie: 8,
    primaryAbility: 'Мудрость',
    savingThrows: ['Интеллект', 'Мудрость'],
    skillChoices: ['Анатомия', 'Обращение с животными', 'Проницательность', 'Медицина', 'Природа', 'Восприятие', 'Религия', 'Выживание'],
    skillCount: 2,
    armorProficiencies: ['Лёгкие доспехи (не металл)', 'Средние доспехи (не металл)', 'Щиты (не металл)'],
    weaponProficiencies: ['Дубины', 'Кинжалы', 'Дротик', 'Копья', 'Боевые посохи', 'Серпы', 'Пращи', 'Сколы'],
    spellcaster: true,
    spellAbility: 'Мудрость',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getDruidFeatures(i + 1),
      spellSlots: getDruidSpellSlots(i + 1)
    }))
  },
  {
    id: 'fighter',
    name: 'Воин',
    description: 'Мастер боевых искусств, использующий множество видов оружия и доспехов.',
    hitDie: 10,
    primaryAbility: 'Сила или Ловкость',
    savingThrows: ['Сила', 'Телосложение'],
    skillChoices: ['Акробатика', 'Атлетика', 'История', 'Проницательность', 'Запугивание', 'Восприятие', 'Выживание'],
    skillCount: 2,
    armorProficiencies: ['Все доспехи', 'Щиты'],
    weaponProficiencies: ['Простое оружие', 'Воинское оружие'],
    spellcaster: false,
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getFighterFeatures(i + 1)
    }))
  },
  {
    id: 'monk',
    name: 'Монах',
    description: 'Мастер боевых искусств, использующий силу ки.',
    hitDie: 8,
    primaryAbility: 'Ловкость',
    savingThrows: ['Сила', 'Ловкость'],
    skillChoices: ['Акробатика', 'Атлетика', 'История', 'Проницательность', 'Религия', 'Скрытность'],
    skillCount: 2,
    armorProficiencies: [],
    weaponProficiencies: ['Простое оружие', 'Короткие мечи'],
    spellcaster: false,
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getMonkFeatures(i + 1)
    }))
  },
  {
    id: 'paladin',
    name: 'Паладин',
    description: 'Святой воин, связанный священной клятвой.',
    hitDie: 10,
    primaryAbility: 'Сила',
    savingThrows: ['Мудрость', 'Харизма'],
    skillChoices: ['Атлетика', 'Проницательность', 'Запугивание', 'Медицина', 'Убеждение', 'Религия'],
    skillCount: 2,
    armorProficiencies: ['Все доспехи', 'Щиты'],
    weaponProficiencies: ['Простое оружие', 'Воинское оружие'],
    spellcaster: true,
    spellAbility: 'Харизма',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getPaladinFeatures(i + 1),
      spellSlots: getPaladinSpellSlots(i + 1)
    }))
  },
  {
    id: 'ranger',
    name: 'Следопыт',
    description: 'Воин дикой природы, использующий тактику и магию.',
    hitDie: 10,
    primaryAbility: 'Ловкость',
    savingThrows: ['Сила', 'Ловкость'],
    skillChoices: ['Атлетика', 'Обращение с животными', 'Проницательность', 'Расследование', 'Природа', 'Восприятие', 'Скрытность', 'Выживание'],
    skillCount: 3,
    armorProficiencies: ['Лёгкие доспехи', 'Средние доспехи', 'Щиты'],
    weaponProficiencies: ['Простое оружие', 'Воинское оружие'],
    spellcaster: true,
    spellAbility: 'Мудрость',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getRangerFeatures(i + 1),
      spellSlots: getRangerSpellSlots(i + 1)
    }))
  },
  {
    id: 'rogue',
    name: 'Плут',
    description: 'Ловкий мошенник, использующий хитрость и скрытность.',
    hitDie: 8,
    primaryAbility: 'Ловкость',
    savingThrows: ['Ловкость', 'Интеллект'],
    skillChoices: ['Акробатика', 'Атлетика', 'Обман', 'Проницательность', 'Запугивание', 'Расследование', 'Восприятие', 'Выступление', 'Ловкость рук', 'Скрытность', 'Обращение с животными'],
    skillCount: 4,
    armorProficiencies: ['Лёгкие доспехи'],
    weaponProficiencies: ['Простое оружие', 'Ручные арбалеты', 'Длинные мечи', 'Рапиры', 'Короткие мечи'],
    spellcaster: false,
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getRogueFeatures(i + 1)
    }))
  },
  {
    id: 'sorcerer',
    name: 'Чародей',
    description: 'Заклинатель, черпающий магию из врождённой силы.',
    hitDie: 6,
    primaryAbility: 'Харизма',
    savingThrows: ['Телосложение', 'Харизма'],
    skillChoices: ['Обман', 'Проницательность', 'Запугивание', 'Убеждение', 'Религия'],
    skillCount: 2,
    armorProficiencies: [],
    weaponProficiencies: ['Кинжалы', 'Дротик', 'Сколы', 'Боевые посохи', 'Лёгкие арбалеты'],
    spellcaster: true,
    spellAbility: 'Харизма',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getSorcererFeatures(i + 1),
      spellSlots: getSorcererSpellSlots(i + 1)
    }))
  },
  {
    id: 'warlock',
    name: 'Колдун',
    description: 'Заклинатель, получивший силу от потустороннего покровителя.',
    hitDie: 8,
    primaryAbility: 'Харизма',
    savingThrows: ['Мудрость', 'Харизма'],
    skillChoices: ['Магия', 'Обман', 'История', 'Запугивание', 'Расследование', 'Природа', 'Религия'],
    skillCount: 2,
    armorProficiencies: ['Лёгкие доспехи'],
    weaponProficiencies: ['Простое оружие'],
    spellcaster: true,
    spellAbility: 'Харизма',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getWarlockFeatures(i + 1),
      spellSlots: getWarlockSpellSlots(i + 1)
    }))
  },
  {
    id: 'wizard',
    name: 'Волшебник',
    description: 'Учёный маг, изучающий магию по книгам заклинаний.',
    hitDie: 6,
    primaryAbility: 'Интеллект',
    savingThrows: ['Интеллект', 'Мудрость'],
    skillChoices: ['Магия', 'Анатомия', 'История', 'Проницательность', 'Расследование', 'Медицина', 'Религия'],
    skillCount: 2,
    armorProficiencies: [],
    weaponProficiencies: ['Кинжалы', 'Дротик', 'Сколы', 'Боевые посохи', 'Лёгкие арбалеты'],
    spellcaster: true,
    spellAbility: 'Интеллект',
    levels: Array.from({ length: 20 }, (_, i) => ({
      level: i + 1,
      proficiencyBonus: Math.ceil((i + 1) / 4) + 1,
      features: getWizardFeatures(i + 1),
      spellSlots: getWizardSpellSlots(i + 1)
    }))
  }
];

function getBarbarianFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Ярость', 'Защита без доспехов');
  if (level >= 2) features.push('Безрассудная атака', 'Чувство опасности');
  if (level >= 3) features.push('Первобытный путь');
  if (level >= 5) features.push('Дополнительная атака', 'Быстрое передвижение');
  if (level >= 7) features.push('Медвежья стойкость (путник)', 'Медвежья стойкость (тотем)');
  if (level >= 9) features.push('Критический удар (грубая сила)');
  if (level >= 11) features.push('Безжалостный ярость');
  if (level >= 13) features.push('Медвежья стойкость (магический)');
  if (level >= 15) features.push('Неукротимый');
  if (level >= 18) features.push('Неукротимая ярость');
  return features;
}

function getBardFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Заклинания', 'Бардовское вдохновение (к6)');
  if (level >= 2) features.push('Мастер на все руки', 'Песнь отдыха (1к6)');
  if (level >= 3) features.push('Коллегия бардов', 'Экспертиза');
  if (level >= 5) features.push('Бардовское вдохновение (к8)', 'Источник вдохновения');
  if (level >= 6) features.push('Контрочарование', 'Бардовское вдохновение (к8)');
  if (level >= 9) features.push('Бардовское вдохновение (к10)');
  if (level >= 10) features.push('Экспертиза 2', 'Магические секреты');
  if (level >= 11) features.push('Бардовское вдохновение (к12)');
  if (level >= 14) features.push('Магические секреты', 'Песнь отдыха (2к6)');
  if (level >= 18) features.push('Песнь отдыха (3к6)');
  return features;
}

function getClericFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Заклинания', 'Божественный домен');
  if (level >= 2) features.push('Направление божественности', 'Каналирование божественности');
  if (level >= 5) features.push('Уничтожение нежити (ОС 1/2)');
  if (level >= 8) features.push('Улучшение характеристики');
  if (level >= 10) features.push('Божественное вмешательство');
  if (level >= 11) features.push('Уничтожение нежити (ОС 1)');
  if (level >= 14) features.push('Уничтожение нежити (ОС 2)');
  if (level >= 17) features.push('Высшее божественное вмешательство');
  return features;
}

function getDruidFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Заклинания', 'Друидический круг', 'Дикая форма');
  if (level >= 2) features.push('Круги друидов');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Уничтожение нежити (ОС 1/2)');
  if (level >= 8) features.push('Улучшение дикой формы', 'Уничтожение нежити (ОС 1)');
  if (level >= 10) features.push('Элементальное дикое превращение');
  if (level >= 14) features.push('Дикая форма (зверь)');
  if (level >= 18) features.push('Вечная дикая форма', 'Дикое тело');
  if (level >= 20) features.push('Архидруид');
  return features;
}

function getFighterFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Боевой стиль', 'Второе дыхание');
  if (level >= 2) features.push('Всплеск действий (1)');
  if (level >= 3) features.push('Воинский архетип');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Дополнительная атака');
  if (level >= 6) features.push('Улучшение характеристики');
  if (level >= 8) features.push('Улучшение характеристики', 'Всплеск действий (2)');
  if (level >= 9) features.push('Неукротимость');
  if (level >= 10) features.push('Дополнительный боевой стиль');
  if (level >= 11) features.push('Дополнительная атака (2)');
  if (level >= 13) features.push('Неукротимость (2)');
  if (level >= 14) features.push('Улучшение характеристики');
  if (level >= 15) features.push('Всплеск действий (3)');
  if (level >= 17) features.push('Неукротимость (3)');
  if (level >= 18) features.push('Улучшение характеристики');
  if (level >= 20) features.push('Дополнительная атака (3)');
  return features;
}

function getMonkFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Защита без доспехов', 'Боевые искусства');
  if (level >= 2) features.push('Ки', 'Безоружный удар', 'Порыв ветра');
  if (level >= 3) features.push('Монашеская традиция', 'Отклонение снарядов');
  if (level >= 4) features.push('Медленное падение', 'Улучшение характеристики');
  if (level >= 5) features.push('Дополнительная атака', 'Ошеломляющий удар');
  if (level >= 6) features.push('Удар ки', 'Монашеские движения');
  if (level >= 7) features.push('Уклонение', 'Неуязвимость разума');
  if (level >= 9) features.push('Улучшенная безоружность');
  if (level >= 10) features.push('Чистота тела');
  if (level >= 13) features.push('Языки солнца и луны');
  if (level >= 14) features.push('Алмазное тело');
  if (level >= 15) features.push('Чистое тело');
  if (level >= 17) features.push('Непоколебимость');
  if (level >= 18) features.push('Пустое тело');
  if (level >= 20) features.push('Совершенное я');
  return features;
}

function getPaladinFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Божественное чувство', 'Наложение рук');
  if (level >= 2) features.push('Боевой стиль', 'Заклинания', 'Божественный удар');
  if (level >= 3) features.push('Божественное здоровье', 'Священная клятва');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Дополнительная атака');
  if (level >= 6) features.push('Аура защиты');
  if (level >= 8) features.push('Улучшение характеристики', 'Верность клятвы');
  if (level >= 10) features.push('Защита от зла и добра (аура)');
  if (level >= 11) features.push('Улучшенный божественный удар');
  if (level >= 14) features.push('Очищение от болезней');
  if (level >= 18) features.push('Присутствие клятвы');
  return features;
}

function getRangerFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Избранный враг', 'Естественный исследователь');
  if (level >= 2) features.push('Боевой стиль', 'Заклинания', 'Магический стрелок');
  if (level >= 3) features.push('Архетип следопыта', 'Первобытное знание');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Дополнительная атака');
  if (level >= 6) features.push('Улучшенный избранный враг', 'Улучшенное естественное исследование');
  if (level >= 8) features.push('Улучшение характеристики', 'Ловкость на земле');
  if (level >= 10) features.push('Скрытие в природе');
  if (level >= 14) features.push('Защита от избранного врага');
  if (level >= 15) features.push('Неуловимый');
  if (level >= 18) features.push('Фантомный странник');
  if (level >= 20) features.push('Охотник на врагов');
  return features;
}

function getRogueFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Экспертиза', 'Комплектная работа', 'Скрытая атака 1к6', 'Воровской жаргон');
  if (level >= 2) features.push('Хитрое действие');
  if (level >= 3) features.push('Моральный компас', 'Плутский архетип');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Скрытая атака 2к6', 'Уклонение');
  if (level >= 6) features.push('Экспертиза (2)');
  if (level >= 7) features.push('Уклонение от ловушек');
  if (level >= 8) features.push('Улучшение характеристики');
  if (level >= 10) features.push('Улучшение характеристики');
  if (level >= 11) features.push('Надёжный');
  if (level >= 14) features.push('Скольжение');
  if (level >= 15) features.push('Чужое сознание');
  if (level >= 17) features.push('Скрытая атака 4к6');
  if (level >= 18) features.push('Ускользание');
  if (level >= 20) features.push('Удар смерти');
  return features;
}

function getSorcererFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Заклинания', 'Чародейское происхождение');
  if (level >= 2) features.push('Волшебные очки (2)');
  if (level >= 3) features.push('Чародейский метаморфизм (2)');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Волшебные очки (5)');
  if (level >= 6) features.push('Чародейское происхождение (2)');
  if (level >= 8) features.push('Улучшение характеристики');
  if (level >= 9) features.push('Волшебные очки (6)');
  if (level >= 10) features.push('Чародейский метаморфизм (3)');
  if (level >= 11) features.push('Волшебные очки (7)');
  if (level >= 12) features.push('Улучшение характеристики');
  if (level >= 13) features.push('Волшебные очки (8)');
  if (level >= 14) features.push('Чародейское происхождение (3)');
  if (level >= 15) features.push('Волшебные очки (9)');
  if (level >= 16) features.push('Улучшение характеристики');
  if (level >= 17) features.push('Волшебные очки (10)', 'Чародейский метаморфизм (4)');
  if (level >= 18) features.push('Чародейское происхождение (4)');
  if (level >= 19) features.push('Волшебные очки (11)');
  if (level >= 20) features.push('Чародейское происхождение (5)');
  return features;
}

function getWarlockFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Потусторонний покровитель', 'Магическое сознание');
  if (level >= 2) features.push('Мистические воззвания (2)');
  if (level >= 3) features.push('Дар покровителя', 'Магическое сознание (2)');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Мистические воззвания (3)');
  if (level >= 6) features.push('Дар покровителя (2)');
  if (level >= 7) features.push('Мистические воззвания (4)');
  if (level >= 8) features.push('Улучшение характеристики');
  if (level >= 9) features.push('Дар покровителя (3)');
  if (level >= 10) features.push('Мистические воззвания (5)');
  if (level >= 11) features.push('Мистическая тайна');
  if (level >= 12) features.push('Улучшение характеристики');
  if (level >= 13) features.push('Мистические воззвания (6)');
  if (level >= 14) features.push('Дар покровителя (4)');
  if (level >= 15) features.push('Мистические воззвания (7)');
  if (level >= 16) features.push('Улучшение характеристики');
  if (level >= 17) features.push('Мистические воззвания (8)', 'Мистическая тайна (2)');
  if (level >= 18) features.push('Дар покровителя (5)');
  if (level >= 19) features.push('Мистические воззвания (9)');
  if (level >= 20) features.push('Мистическая тайна (3)');
  return features;
}

function getWizardFeatures(level: number): string[] {
  const features: string[] = [];
  if (level >= 1) features.push('Заклинания', 'Магическое восстановление', 'Волшебная школа');
  if (level >= 2) features.push('Магическое сознание');
  if (level >= 3) features.push('Волшебная школа (2)');
  if (level >= 4) features.push('Улучшение характеристики');
  if (level >= 5) features.push('Волшебная школа (3)');
  if (level >= 6) features.push('Улучшение характеристики');
  if (level >= 7) features.push('Волшебная школа (4)');
  if (level >= 8) features.push('Улучшение характеристики');
  if (level >= 9) features.push('Волшебная школа (5)');
  if (level >= 10) features.push('Волшебная школа (6)');
  if (level >= 11) features.push('Волшебная школа (7)');
  if (level >= 12) features.push('Улучшение характеристики');
  if (level >= 13) features.push('Волшебная школа (8)');
  if (level >= 14) features.push('Волшебная школа (9)');
  if (level >= 15) features.push('Волшебная школа (10)');
  if (level >= 16) features.push('Улучшение характеристики');
  if (level >= 17) features.push('Волшебная школа (11)');
  if (level >= 18) features.push('Мастер заклинаний');
  if (level >= 19) features.push('Волшебная школа (12)');
  if (level >= 20) features.push('Подписанное заклинание');
  return features;
}

function getBardSpellSlots(level: number): { [key: string]: number } | undefined {
  const slots: { [key: string]: number } = {};
  const table: number[][] = [
    [2,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],
    [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],
    [4,3,3,0,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],
    [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],
    [4,3,3,3,2,0,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1],
    [4,3,3,3,3,1,1,1,1],
    [4,3,3,3,3,2,1,1,1],
    [4,3,3,3,3,2,2,1,1],
  ];
  if (level < 1) return undefined;
  const row = table[level - 1];
  for (let i = 0; i < 9; i++) {
    if (row[i] > 0) slots[`${i + 1}`] = row[i];
  }
  return Object.keys(slots).length > 0 ? slots : undefined;
}

function getClericSpellSlots(level: number): { [key: string]: number } | undefined {
  const slots: { [key: string]: number } = {};
  const table: number[][] = [
    [3,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],
    [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],
    [4,3,3,0,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],
    [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],
    [4,3,3,3,2,0,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1],
    [4,3,3,3,3,1,1,1,1],
    [4,3,3,3,3,2,1,1,1],
    [4,3,3,3,3,2,2,1,1],
  ];
  if (level < 1) return undefined;
  const row = table[level - 1];
  for (let i = 0; i < 9; i++) {
    if (row[i] > 0) slots[`${i + 1}`] = row[i];
  }
  return Object.keys(slots).length > 0 ? slots : undefined;
}

function getDruidSpellSlots(level: number): { [key: string]: number } | undefined {
  return getClericSpellSlots(level);
}

function getPaladinSpellSlots(level: number): { [key: string]: number } | undefined {
  if (level < 2) return undefined;
  const slots: { [key: string]: number } = {};
  const table: number[][] = [
    [2,0,0,0,0],
    [3,0,0,0,0],
    [3,0,0,0,0],
    [4,2,0,0,0],
    [4,2,0,0,0],
    [4,2,0,0,0],
    [4,3,2,0,0],
    [4,3,2,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,1],
    [4,3,3,1,1],
  ];
  const row = table[level - 2];
  for (let i = 0; i < 5; i++) {
    if (row[i] > 0) slots[`${i + 1}`] = row[i];
  }
  return Object.keys(slots).length > 0 ? slots : undefined;
}

function getRangerSpellSlots(level: number): { [key: string]: number } | undefined {
  if (level < 2) return undefined;
  const slots: { [key: string]: number } = {};
  const table: number[][] = [
    [2,0,0,0,0],
    [3,0,0,0,0],
    [3,0,0,0,0],
    [4,2,0,0,0],
    [4,2,0,0,0],
    [4,2,0,0,0],
    [4,3,2,0,0],
    [4,3,2,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,0,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,0],
    [4,3,3,1,1],
    [4,3,3,1,1],
  ];
  const row = table[level - 2];
  for (let i = 0; i < 5; i++) {
    if (row[i] > 0) slots[`${i + 1}`] = row[i];
  }
  return Object.keys(slots).length > 0 ? slots : undefined;
}

function getSorcererSpellSlots(level: number): { [key: string]: number } | undefined {
  return getBardSpellSlots(level);
}

function getWarlockSpellSlots(level: number): { [key: string]: number } | undefined {
  if (level < 1) return undefined;
  const slots: { [key: string]: number } = {};
  const table: number[][] = [
    [1,1],[2,1],[2,2],[3,2],[3,2],[3,2],[3,2],[3,2],[3,2],[3,2],
    [3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,4],[3,4],[3,4],[4,4]
  ];
  const row = table[level - 1];
  slots[`${row[0]}`] = row[1];
  return slots;
}

function getWizardSpellSlots(level: number): { [key: string]: number } | undefined {
  return getBardSpellSlots(level);
}
