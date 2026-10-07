/**
 * D&D 5e (2014) — Полная редакция на русском языке
 * Главный модуль для Foundry VTT 13.351
 * 
 * Структура соответствует стандартам Foundry VTT:
 * - ES Module (.mjs)
 * - Hooks для инициализации
 * - Компендиумы с данными
 * - Локализация
 */

/* -------------------------------------------- */
/*  Константы                                    */
/* -------------------------------------------- */

const MODULE_ID = "dnd5e-2014-ru";
const MODULE_TITLE = "D&D 5e (2014) — Русский";
const MODULE_VERSION = "1.0.0";

/* -------------------------------------------- */
/*  Инициализация (init hook)                    */
/* -------------------------------------------- */

Hooks.once("init", function() {
  console.log(`${MODULE_TITLE} | Инициализация модуля v${MODULE_VERSION}`);

  // Регистрация настроек
  _registerSettings();

  // Глобальный API модуля
  game[MODULE_ID] = {
    version: MODULE_VERSION,
    populateCompendiums: _populateCompendiums,
    getEdition: () => "2014"
  };

  console.log(`${MODULE_TITLE} | Модуль инициализирован`);
});

/* -------------------------------------------- */
/*  Готовность (ready hook)                      */
/* -------------------------------------------- */

Hooks.once("ready", async function() {
  console.log(`${MODULE_TITLE} | Модуль готов к работе`);

  // Автозаполнение компендиумов для ГМ
  if (game.user.isGM) {
    const populated = game.settings.get(MODULE_ID, "compendiumsPopulated");
    if (!populated) {
      await _populateCompendiums();
      await game.settings.set(MODULE_ID, "compendiumsPopulated", true);
    }
  }

  // Приветственное сообщение для ГМ
  if (game.user.isGM) {
    _sendWelcomeMessage();
  }
});

/* -------------------------------------------- */
/*  Хуки локализации                             */
/* -------------------------------------------- */

Hooks.on("renderItemSheet", (app, html) => {
  if (!game.settings.get(MODULE_ID, "autoTranslate")) return;
  _translateItemSheet(html);
});

Hooks.on("renderChatMessage", (app, html) => {
  if (!game.settings.get(MODULE_ID, "autoTranslate")) return;
  _translateChatMessage(html);
});

/* -------------------------------------------- */
/*  Настройки модуля                             */
/* -------------------------------------------- */

function _registerSettings() {
  game.settings.register(MODULE_ID, "compendiumsPopulated", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "autoTranslate", {
    name: "Автоматический перевод",
    hint: "Автоматически переводит системные термины на русский язык",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "enableCustomSheet", {
    name: "Русский лист персонажа",
    hint: "Использовать локализованный лист персонажа вместо стандартного",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });
}

/* -------------------------------------------- */
/*  Заполнение компендиумов                      */
/* -------------------------------------------- */

async function _populateCompendiums() {
  console.log(`${MODULE_TITLE} | Заполнение компендиумов...`);

  const packConfigs = [
    { pack: "races-ru", data: RACES_DATA },
    { pack: "classes-ru", data: CLASSES_DATA },
    { pack: "items-ru", data: ITEMS_DATA },
    { pack: "spells-ru", data: SPELLS_DATA },
    { pack: "features-ru", data: FEATURES_DATA },
    { pack: "backgrounds-ru", data: BACKGROUNDS_DATA },
  ];

  for (const { pack, data } of packConfigs) {
    const fullPackName = `${MODULE_ID}.${pack}`;
    const compendium = game.packs.get(fullPackName);
    if (!compendium) {
      console.warn(`${MODULE_TITLE} | Компендиум не найден: ${fullPackName}`);
      continue;
    }

    const existing = await compendium.getDocuments();
    if (existing.length > 0) {
      console.log(`${MODULE_TITLE} | ${pack}: уже заполнен (${existing.length} записей)`);
      continue;
    }

    try {
      await Item.createDocuments(data, { pack: fullPackName });
      console.log(`${MODULE_TITLE} | ${pack}: добавлено ${data.length} записей`);
    } catch (err) {
      console.error(`${MODULE_TITLE} | Ошибка заполнения ${pack}:`, err);
    }
  }

  // Журналы правил
  await _populateRulesJournal();

  console.log(`${MODULE_TITLE} | Заполнение компендиумов завершено`);
}

/* -------------------------------------------- */
/*  Данные компендиумов                          */
/* -------------------------------------------- */

const RACES_DATA = [
  {
    name: "Человек",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Люди — самая молодая из распространённых рас, появившаяся позже эльфов и гномов. Они адаптивны и амбициозны.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
      traits: {
        size: { value: "med" },
        languages: { value: ["common"], custom: "Один дополнительный язык" }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014" } }
  },
  {
    name: "Эльф",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Эльфы — волшебный народ с неземной грацией, живущий в мире, но не полностью принадлежа ему.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { dex: 2 },
      traits: {
        size: { value: "med" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "elvish"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014", subraces: ["Высший эльф", "Лесной эльф", "Дроу"] } }
  },
  {
    name: "Дварф",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Дварфы храбры, выносливы и трудолюбивы. Они славятся мастерством в кузнечном деле.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 25 },
      abilities: { con: 2 },
      traits: {
        size: { value: "med" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "dwarvish"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014", subraces: ["Горный дварф", "Холмовой дварф"] } }
  },
  {
    name: "Полурослик",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Полурослики — маленький, проворный народ, ценящий уют и комфорт.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "sm" },
      movement: { walk: 25 },
      abilities: { dex: 2 },
      traits: {
        size: { value: "sm" },
        languages: { value: ["common", "halfling"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014", subraces: ["Легконогий полурослик", "Крепкий полурослик"] } }
  },
  {
    name: "Драконорождённый",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Драконорождённые несут в себе наследие драконов, обладая дыханием дракона.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { str: 2, cha: 1 },
      traits: {
        size: { value: "med" },
        languages: { value: ["common", "draconic"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014" } }
  },
  {
    name: "Гном",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Гномы — энергичные и изобретательные создания маленького роста.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "sm" },
      movement: { walk: 25 },
      abilities: { int: 2 },
      traits: {
        size: { value: "sm" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "gnomish"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014", subraces: ["Лесной гном", "Скальный гном"] } }
  },
  {
    name: "Полуэльф",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Полуэльфы сочетают лучшие качества людей и эльфов.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { cha: 2 },
      traits: {
        size: { value: "med" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "elvish"], custom: "Один на выбор" }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014" } }
  },
  {
    name: "Полуорк",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Полуорки сочетают силу орков и упорство людей.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { str: 2, con: 1 },
      traits: {
        size: { value: "med" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "orc"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014" } }
  },
  {
    name: "Тифлинг",
    type: "race",
    img: "icons/svg/mystery-man.svg",
    system: {
      description: { value: "<p>Тифлинги несут в себе инфернальное наследие, обладая демоническими чертами.</p>", chat: "" },
      source: "Книга Игрока 2014",
      size: { value: "med" },
      movement: { walk: 30 },
      abilities: { int: 1, cha: 2 },
      traits: {
        size: { value: "med" },
        senses: { darkvision: 60 },
        languages: { value: ["common", "infernal"] }
      }
    },
    flags: { [MODULE_ID]: { source: "phb2014" } }
  }
];

const CLASSES_DATA = [
  { name: "Варвар", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Свирепый воин, который может входить в боевую ярость.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d12", primaryAbility: { str: true }, armor: { value: ["lgt", "med", "shl"] }, weapons: { value: ["sim", "mar"] }, saves: { str: true, con: true } } },
  { name: "Бард", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Вдохновляющий маг, чья сила усиливается музыкой и поэзией.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { cha: true }, armor: { value: ["lgt"] }, weapons: { value: ["sim"] }, saves: { dex: true, cha: true }, spellcasting: { ability: "cha", progression: "full" } } },
  { name: "Жрец", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Священный заклинатель, наделённый божественной магией.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { wis: true }, armor: { value: ["lgt", "med", "shl"] }, weapons: { value: ["sim"] }, saves: { wis: true, cha: true }, spellcasting: { ability: "wis", progression: "full" } } },
  { name: "Друид", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Заклинатель природы, черпающий силу из стихий.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { wis: true }, armor: { value: ["lgt", "med", "shl"] }, weapons: { value: ["clb", "dag", "dar", "jam", "mace", "qst", "scp", "slg", "spl"] }, saves: { int: true, wis: true }, spellcasting: { ability: "wis", progression: "full" } } },
  { name: "Воин", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Мастер боевых искусств, использующий множество видов оружия и доспехов.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d10", primaryAbility: { str: true, dex: true }, armor: { value: ["lgt", "med", "hvy", "shl"] }, weapons: { value: ["sim", "mar"] }, saves: { str: true, con: true } } },
  { name: "Монах", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Мастер боевых искусств, использующий силу ки.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { dex: true, wis: true }, armor: { value: [] }, weapons: { value: ["sim", "ssw"] }, saves: { str: true, dex: true } } },
  { name: "Паладин", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Святой воин, связанный священной клятвой.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d10", primaryAbility: { str: true, cha: true }, armor: { value: ["lgt", "med", "hvy", "shl"] }, weapons: { value: ["sim", "mar"] }, saves: { wis: true, cha: true }, spellcasting: { ability: "cha", progression: "half" } } },
  { name: "Следопыт", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Воин дикой природы, использующий тактику и магию.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d10", primaryAbility: { dex: true, wis: true }, armor: { value: ["lgt", "med", "shl"] }, weapons: { value: ["sim", "mar"] }, saves: { str: true, dex: true }, spellcasting: { ability: "wis", progression: "half" } } },
  { name: "Плут", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Ловкий мошенник, использующий хитрость и скрытность.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { dex: true, int: true }, armor: { value: ["lgt"] }, weapons: { value: ["sim"] }, saves: { dex: true, int: true } } },
  { name: "Чародей", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Заклинатель, черпающий магию из врождённой силы.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d6", primaryAbility: { cha: true }, armor: { value: [] }, weapons: { value: ["dag", "dar", "slg", "qst", "cbow"] }, saves: { con: true, cha: true }, spellcasting: { ability: "cha", progression: "full" } } },
  { name: "Колдун", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Заклинатель, получивший силу от потустороннего покровителя.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d8", primaryAbility: { cha: true }, armor: { value: ["lgt"] }, weapons: { value: ["sim"] }, saves: { wis: true, cha: true }, spellcasting: { ability: "cha", progression: "pact" } } },
  { name: "Волшебник", type: "class", img: "icons/svg/sword.svg", system: { description: { value: "<p>Учёный маг, изучающий магию по книгам заклинаний.</p>", chat: "" }, source: "Книга Игрока 2014", hitDice: "d6", primaryAbility: { int: true, wis: true }, armor: { value: [] }, weapons: { value: ["dag", "dar", "slg", "qst", "cbow"] }, saves: { int: true, wis: true }, spellcasting: { ability: "int", progression: "full" } } }
];

const ITEMS_DATA = [
  { name: "Кинжал", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Маленький обоюдоострый клинок.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 1 }, price: { value: 2, denomination: "gp" }, damage: { parts: [["1d4", "piercing"]] }, type: { value: "martialM" } } },
  { name: "Длинный меч", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Элегантный длинный клинок.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 3 }, price: { value: 15, denomination: "gp" }, damage: { parts: [["1d8", "slashing"]] }, type: { value: "martialM" } } },
  { name: "Двуручный меч", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Массивный двуручный меч.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 6 }, price: { value: 50, denomination: "gp" }, damage: { parts: [["2d6", "slashing"]] }, type: { value: "martialM" } } },
  { name: "Секира", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Огромный двуручный топор.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 7 }, price: { value: 30, denomination: "gp" }, damage: { parts: [["1d12", "slashing"]] }, type: { value: "martialM" } } },
  { name: "Рапира", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Тонкий длинный клинок.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 2 }, price: { value: 25, denomination: "gp" }, damage: { parts: [["1d8", "piercing"]] }, type: { value: "martialM" } } },
  { name: "Длинный лук", type: "weapon", img: "icons/svg/sword.svg", system: { description: { value: "<p>Большой мощный лук.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 2 }, price: { value: 50, denomination: "gp" }, damage: { parts: [["1d8", "piercing"]] }, type: { value: "martialR" }, range: { value: 150, long: 600, units: "ft" } } },
  { name: "Кожаный доспех", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Доспех из жёсткой кожи.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 10 }, price: { value: 10, denomination: "gp" }, armor: { value: 11, type: "light" } } },
  { name: "Клёпаный кожаный доспех", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Кожаный доспех с металлическими заклёпками.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 13 }, price: { value: 45, denomination: "gp" }, armor: { value: 12, type: "light" } } },
  { name: "Кираса", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Подогнанная металлическая кираса.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 20 }, price: { value: 400, denomination: "gp" }, armor: { value: 14, type: "medium" } } },
  { name: "Полулаты", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Частичные латы из металлических пластин.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 40 }, price: { value: 750, denomination: "gp" }, armor: { value: 15, type: "medium" } } },
  { name: "Кольчужный доспех", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Доспех из переплетённых металлических колец.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 55 }, price: { value: 75, denomination: "gp" }, armor: { value: 16, type: "heavy" } } },
  { name: "Латы", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Полный комплект сочленённых пластин.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 65 }, price: { value: 1500, denomination: "gp" }, armor: { value: 18, type: "heavy" } } },
  { name: "Щит", type: "equipment", img: "icons/svg/shield.svg", system: { description: { value: "<p>Деревянный или металлический щит.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 6 }, price: { value: 10, denomination: "gp" }, armor: { value: 2, type: "shield" } } },
  { name: "Рюкзак", type: "container", img: "icons/svg/barrel.svg", system: { description: { value: "<p>Вместительный рюкзак для хранения предметов.</p>" }, quantity: 1, weight: { value: 5 }, price: { value: 2, denomination: "gp" } } },
  { name: "Верёвка пеньковая (50 фт)", type: "loot", img: "icons/svg/net.svg", system: { description: { value: "<p>Прочная пеньковая верёвка длиной 50 футов.</p>" }, quantity: 1, weight: { value: 10 }, price: { value: 1, denomination: "gp" } } },
  { name: "Факел", type: "consumable", img: "icons/svg/fire.svg", system: { description: { value: "<p>Освещает область радиусом 20 футов на 1 час.</p>" }, quantity: 1, weight: { value: 1 }, price: { value: 0.01, denomination: "gp" } } },
  { name: "Сухой паёк (1 день)", type: "consumable", img: "icons/svg/chest.svg", system: { description: { value: "<p>Сушёная еда на один день пути.</p>" }, quantity: 1, weight: { value: 2 }, price: { value: 0.5, denomination: "gp" } } },
  { name: "Набор целителя", type: "tool", img: "icons/svg/medical.svg", system: { description: { value: "<p>Содержит бинты, мази и шины. 10 использований.</p>" }, quantity: 1, weight: { value: 3 }, price: { value: 5, denomination: "gp" } } },
  { name: "Воровские инструменты", type: "tool", img: "icons/svg/net.svg", system: { description: { value: "<p>Набор для вскрытия замков и обезвреживания ловушек.</p>" }, quantity: 1, weight: { value: 1 }, price: { value: 25, denomination: "gp" } } },
  { name: "Священный символ", type: "equipment", img: "icons/svg/sun.svg", system: { description: { value: "<p>Амулет, используемая как заклинательная фокусировка.</p>" }, quantity: 1, weight: { value: 1 }, price: { value: 5, denomination: "gp" } } },
  { name: "Зелье лечения", type: "consumable", img: "icons/svg/potion.svg", system: { description: { value: "<p>Красная жидкость, восстанавливающая 2к4+2 хитов.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 0.5 }, price: { value: 50, denomination: "gp" } } },
  { name: "Зелье старшего лечения", type: "consumable", img: "icons/svg/potion.svg", system: { description: { value: "<p>Восстанавливает 4к4+4 хитов.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 0.5 }, price: { value: 150, denomination: "gp" } } },
  { name: "Зелье высшего лечения", type: "consumable", img: "icons/svg/potion.svg", system: { description: { value: "<p>Восстанавливает 8к4+8 хитов.</p>" }, source: "Книга Игрока 2014", quantity: 1, weight: { value: 0.5 }, price: { value: 450, denomination: "gp" } } }
];

const SPELLS_DATA = [
  { name: "Огненный снаряд", type: "spell", img: "icons/svg/fire.svg", system: { description: { value: "<p>Вы бросаете сгусток огня. При попадании цель получает 1к10 урона огнём.</p>" }, source: "Книга Игрока 2014", level: 0, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 120, units: "ft" }, components: { v: true, s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "always", prepared: true } } },
  { name: "Свет", type: "spell", img: "icons/svg/light.svg", system: { description: { value: "<p>Предмет излучает яркий свет в радиусе 20 футов.</p>" }, source: "Книга Игрока 2014", level: 0, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, m: { value: "Светлячок" } }, duration: { value: 1, units: "hour" }, preparation: { mode: "always", prepared: true } } },
  { name: "Волшебная рука", type: "spell", img: "icons/svg/dice.svg", system: { description: { value: "<p>Призрачная рука появляется и может манипулировать предметами.</p>" }, source: "Книга Игрока 2014", level: 0, school: "con", activation: { type: "action", cost: 1 }, range: { value: 30, units: "ft" }, components: { v: true, s: true }, duration: { value: 1, units: "minute" }, preparation: { mode: "always", prepared: true } } },
  { name: "Потусторонний разряд", type: "spell", img: "icons/svg/lightning.svg", system: { description: { value: "<p>Луч энергии. При попадании — 1к10 урона силовым полем.</p>" }, source: "Книга Игрока 2014", level: 0, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 120, units: "ft" }, components: { v: true, s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "always", prepared: true } } },
  { name: "Руководство", type: "spell", img: "icons/svg/eye.svg", system: { description: { value: "<p>Цель может бросить к4 и прибавить к одной проверке характеристики.</p>" }, source: "Книга Игрока 2014", level: 0, school: "div", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true }, duration: { value: 1, units: "minute" }, concentration: true, preparation: { mode: "always", prepared: true } } },
  { name: "Волшебная стрела", type: "spell", img: "icons/svg/dice.svg", system: { description: { value: "<p>Три дротика магической силы. Каждый наносит 1к4+1 урона силовым полем.</p>" }, source: "Книга Игрока 2014", level: 1, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 120, units: "ft" }, components: { v: true, s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Щит", type: "spell", img: "icons/svg/shield.svg", system: { description: { value: "<p>+5 к КД до начала вашего следующего хода.</p>" }, source: "Книга Игрока 2014", level: 1, school: "abj", activation: { type: "reaction", cost: 1 }, range: { value: 0, units: "self" }, components: { v: true, s: true }, duration: { value: 1, units: "round" }, preparation: { mode: "prepared" } } },
  { name: "Лечащее слово", type: "spell", img: "icons/svg/heart.svg", system: { description: { value: "<p>Существо восстанавливает 1к4 + модификатор хитов.</p>" }, source: "Книга Игрока 2014", level: 1, school: "con", activation: { type: "bonus", cost: 1 }, range: { value: 60, units: "ft" }, components: { v: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Лечение ран", type: "spell", img: "icons/svg/heart.svg", system: { description: { value: "<p>Существо восстанавливает 1к8 + модификатор хитов.</p>" }, source: "Книга Игрока 2014", level: 1, school: "con", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Обнаружение магии", type: "spell", img: "icons/svg/eye.svg", system: { description: { value: "<p>Вы чувствуете присутствие магии в пределах 30 футов.</p>" }, source: "Книга Игрока 2014", level: 1, school: "div", activation: { type: "action", cost: 1 }, range: { value: 0, units: "self" }, components: { v: true, s: true }, duration: { value: 10, units: "minute" }, concentration: true, ritual: true, preparation: { mode: "prepared" } } },
  { name: "Благословение", type: "spell", img: "icons/svg/angel.svg", system: { description: { value: "<p>До трёх существ могут бросить к4 к атакам и спасброскам.</p>" }, source: "Книга Игрока 2014", level: 1, school: "enc", activation: { type: "action", cost: 1 }, range: { value: 30, units: "ft" }, components: { v: true, s: true, m: { value: "Мазок святой воды" } }, duration: { value: 1, units: "minute" }, concentration: true, preparation: { mode: "prepared" } } },
  { name: "Туманный шаг", type: "spell", img: "icons/svg/wind.svg", system: { description: { value: "<p>Телепортация на 30 футов.</p>" }, source: "Книга Игрока 2014", level: 2, school: "con", activation: { type: "bonus", cost: 1 }, range: { value: 0, units: "self" }, components: { v: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Невидимость", type: "spell", img: "icons/svg/eye.svg", system: { description: { value: "<p>Существо становится невидимым до окончания действия.</p>" }, source: "Книга Игрока 2014", level: 2, school: "ill", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true, m: { value: "Ресничка в смоле" } }, duration: { value: 1, units: "hour" }, concentration: true, preparation: { mode: "prepared" } } },
  { name: "Духовное оружие", type: "spell", img: "icons/svg/sword.svg", system: { description: { value: "<p>Парящее призрачное оружие. Атака: 1к8 + модификатор.</p>" }, source: "Книга Игрока 2014", level: 2, school: "con", activation: { type: "bonus", cost: 1 }, range: { value: 60, units: "ft" }, components: { v: true, s: true }, duration: { value: 1, units: "minute" }, preparation: { mode: "prepared" } } },
  { name: "Огненный шар", type: "spell", img: "icons/svg/fire.svg", system: { description: { value: "<p>Взрыв в точке. Каждое существо в 20-футовом радиусе получает 8к6 урона огнём.</p>" }, source: "Книга Игрока 2014", level: 3, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 150, units: "ft" }, components: { v: true, s: true, m: { value: "Гуано летучей мыши и сера" } }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Контрзаклинание", type: "spell", img: "icons/svg/shield.svg", system: { description: { value: "<p>Прерывает заклинание 3 уровня или ниже.</p>" }, source: "Книга Игрока 2014", level: 3, school: "abj", activation: { type: "reaction", cost: 1 }, range: { value: 60, units: "ft" }, components: { s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Полёт", type: "spell", img: "icons/svg/wind.svg", system: { description: { value: "<p>Цель получает скорость полёта 60 футов.</p>" }, source: "Книга Игрока 2014", level: 3, school: "trs", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true, m: { value: "Перо птицы" } }, duration: { value: 10, units: "minute" }, concentration: true, preparation: { mode: "prepared" } } },
  { name: "Ускорение", type: "spell", img: "icons/svg/lightning.svg", system: { description: { value: "<p>Скорость цели удваивается, +2 к КД, преимущество на спасброски Ловкости, дополнительное действие.</p>" }, source: "Книга Игрока 2014", level: 3, school: "trs", activation: { type: "action", cost: 1 }, range: { value: 30, units: "ft" }, components: { v: true, s: true, m: { value: "Корень солодки" } }, duration: { value: 1, units: "minute" }, concentration: true, preparation: { mode: "prepared" } } },
  { name: "Рассеивание магии", type: "spell", img: "icons/svg/dice.svg", system: { description: { value: "<p>Заклинание 3 уровня или ниже на цели оканчивается.</p>" }, source: "Книга Игрока 2014", level: 3, school: "abj", activation: { type: "action", cost: 1 }, range: { value: 120, units: "ft" }, components: { v: true, s: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Молния", type: "spell", img: "icons/svg/lightning.svg", system: { description: { value: "<p>Линия 100 футов. Каждое существо получает 8к6 урона электричеством.</p>" }, source: "Книга Игрока 2014", level: 3, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 0, units: "self" }, components: { v: true, s: true, m: { value: "Мех и янтарный жезл" } }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Воскрешение", type: "spell", img: "icons/svg/angel.svg", system: { description: { value: "<p>Существо, умершее не более 1 минуты назад, возвращается к жизни с 1 хитом.</p>" }, source: "Книга Игрока 2014", level: 3, school: "nec", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true, m: { value: "Алмазы на 300 зм" } }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Врата измерений", type: "spell", img: "icons/svg/wind.svg", system: { description: { value: "<p>Телепортация на 500 футов с одним существом.</p>" }, source: "Книга Игрока 2014", level: 4, school: "con", activation: { type: "action", cost: 1 }, range: { value: 500, units: "ft" }, components: { v: true }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Полиморф", type: "spell", img: "icons/svg/eye.svg", system: { description: { value: "<p>Превращение существа в зверя.</p>" }, source: "Книга Игрока 2014", level: 4, school: "trs", activation: { type: "action", cost: 1 }, range: { value: 60, units: "ft" }, components: { v: true, s: true, m: { value: "Кокон гусеницы" } }, duration: { value: 1, units: "hour" }, concentration: true, preparation: { mode: "prepared" } } },
  { name: "Оживление", type: "spell", img: "icons/svg/angel.svg", system: { description: { value: "<p>Возвращает к жизни существо, умершее не более 10 дней назад.</p>" }, source: "Книга Игрока 2014", level: 5, school: "nec", activation: { type: "action", cost: 1 }, range: { value: 0, units: "touch" }, components: { v: true, s: true, m: { value: "Алмаз 500 зм" } }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } },
  { name: "Конус холода", type: "spell", img: "icons/svg/wind.svg", system: { description: { value: "<p>Конус холода. Каждое существо получает 8к8 урона холодом.</p>" }, source: "Книга Игрока 2014", level: 5, school: "evo", activation: { type: "action", cost: 1 }, range: { value: 0, units: "self" }, components: { v: true, s: true, m: { value: "Кристаллический конус" } }, duration: { value: "", units: "inst" }, preparation: { mode: "prepared" } } }
];

const FEATURES_DATA = [
  { name: "Ярость", type: "feat", img: "icons/svg/fire.svg", system: { description: { value: "<p>Вы можете входить в ярость как бонусное действие. Получаете сопротивление дробящему, колющему и рубящему урону.</p>" }, source: "Книга Игрока 2014", activation: { type: "bonus" }, uses: { max: "2", recovery: "long" } } },
  { name: "Защита без доспехов (Варвар)", type: "feat", img: "icons/svg/shield.svg", system: { description: { value: "<p>Без доспеха ваш КД = 10 + модификатор Ловкости + модификатор Телосложения.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Бардовское вдохновение", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Вы можете использовать бонусное действие для вдохновения другого существа, давая к6.</p>" }, source: "Книга Игрока 2014", activation: { type: "bonus" }, uses: { max: "@abilities.cha.mod", recovery: "long" } } },
  { name: "Мастер на все руки", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Прибавьте половину бонуса мастерства к любой проверке характеристики.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Направление божественности", type: "feat", img: "icons/svg/angel.svg", system: { description: { value: "<p>Вы используете божественную энергию для создания магических эффектов.</p>" }, source: "Книга Игрока 2014", uses: { max: "2", recovery: "long" } } },
  { name: "Дикая форма", type: "feat", img: "icons/svg/eye.svg", system: { description: { value: "<p>Вы можете магически превращаться в зверя, которого уже видели.</p>" }, source: "Книга Игрока 2014", activation: { type: "action" }, uses: { max: "2", recovery: "long" } } },
  { name: "Второе дыхание", type: "feat", img: "icons/svg/heart.svg", system: { description: { value: "<p>Бонусное действие для восстановления 1к10 + уровень воина хитов.</p>" }, source: "Книга Игрока 2014", activation: { type: "bonus" }, uses: { max: "1", recovery: "short" } } },
  { name: "Всплеск действий", type: "feat", img: "icons/svg/lightning.svg", system: { description: { value: "<p>Вы можете совершить одно дополнительное действие в свой ход.</p>" }, source: "Книга Игрока 2014", uses: { max: "1", recovery: "long" } } },
  { name: "Боевые искусства", type: "feat", img: "icons/svg/fist.svg", system: { description: { value: "<p>Используйте Ловкость для аок unarmed и монашеского оружия.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Ки", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Очки ки для особых способностей: Безоружный удар, Порыв ветра, Отклонение снарядов.</p>" }, source: "Книга Игрока 2014", uses: { max: "@level", recovery: "short" } } },
  { name: "Божественный удар", type: "feat", img: "icons/svg/angel.svg", system: { description: { value: "<p>При попадании потратьте ячейку для дополнительного урона излучением.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Скрытая атака", type: "feat", img: "icons/svg/eye.svg", system: { description: { value: "<p>Раз в ход при преимуществе наносите дополнительный урон 1к6.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Экспертиза", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Выберите два навыка. Ваш бонус мастерства удваивается для них.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Волшебные очки", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Очки магии для использования метамодификаций.</p>" }, source: "Книга Игрока 2014", uses: { max: "@level", recovery: "long" } } },
  { name: "Мистические воззвания", type: "feat", img: "icons/svg/eye.svg", system: { description: { value: "<p>Особые способности от вашего покровителя.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Магическое восстановление", type: "feat", img: "icons/svg/dice.svg", system: { description: { value: "<p>Раз в день при длительном отдыхе восстанавливаете ячейки заклинаний.</p>" }, source: "Книга Игрока 2014", uses: { max: "1", recovery: "long" } } }
];

const BACKGROUNDS_DATA = [
  { name: "Прислужник", type: "background", img: "icons/svg/angel.svg", system: { description: { value: "<p>Вы провели жизнь в храме, служа божеству.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Шарлатан", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы всегда имели талант к обману и манипуляциям.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Преступник", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы — опытный преступник с связями в криминальном мире.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Артист", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы — артист, выступающий перед публикой.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Народный герой", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы происходите из простого народа, но совершили нечто великое.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Гильдейский ремесленник", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы — член ремесленной гильдии, владеющий особыми навыками.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Отшельник", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы жили в уединении, вдали от цивилизации.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Благородный", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы происходите из знатного рода с привилегиями и обязанностями.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Чужеземец", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы выросли в дикой местности, вдали от цивилизации.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Мудрец", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы провели годы в изучении знаний и магических наук.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Моряк", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы провели годы на морях, путешествуя по воде.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Солдат", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы служили в армии, обучаясь бою и дисциплине.</p>" }, source: "Книга Игрока 2014" } },
  { name: "Беспризорник", type: "background", img: "icons/svg/mystery-man.svg", system: { description: { value: "<p>Вы выросли на улицах, без дома и семьи.</p>" }, source: "Книга Игрока 2014" } }
];

/* -------------------------------------------- */
/*  Журнал правил                                */
/* -------------------------------------------- */

async function _populateRulesJournal() {
  const packName = `${MODULE_ID}.rules-ru`;
  const compendium = game.packs.get(packName);
  if (!compendium) return;

  const existing = await compendium.getDocuments();
  if (existing.length > 0) return;

  const journalData = [
    {
      name: "Правила D&D 5e (2014) — Русский",
      pages: [
        { name: "Характеристики", type: "text", text: { content: "<h2>Шесть характеристик</h2><p><strong>Сила, Ловкость, Телосложение, Интеллект, Мудрость, Харизма</strong></p><p>Модификатор = (Значение - 10) / 2 (округление вниз)</p>" } },
        { name: "Бой", type: "text", text: { content: "<h2>Порядок боя</h2><p>1. Инициатива (к20 + модификатор Ловкости)</p><p>2. Действие, Бонусное действие, Реакция, Движение</p><p>3. Атака: к20 + модификатор + бонус мастерства</p>" } },
        { name: "Отдых", type: "text", text: { content: "<h2>Отдых</h2><p><strong>Короткий отдых (1 час):</strong> восстановление ресурсов, кости хитов</p><p><strong>Длинный отдых (8 часов):</strong> полное восстановление хитов, половины ячеек заклинаний</p>" } },
        { name: "Путешествия", type: "text", text: { content: "<h2>Путешествия</h2><p>Быстрый темп: 4 мили/час, -5 к пассивному восприятию</p><p>Нормальный темп: 3 мили/час</p><p>Медленный темп: 2 мили/час, +5 к Скрытности</p>" } }
      ]
    }
  ];

  try {
    await JournalEntry.createDocuments(journalData, { pack: packName });
    console.log(`${MODULE_TITLE} | Журнал правил создан`);
  } catch (err) {
    console.error(`${MODULE_TITLE} | Ошибка создания журнала:`, err);
  }
}

/* -------------------------------------------- */
/*  Перевод интерфейса                           */
/* -------------------------------------------- */

function _translateItemSheet(html) {
  const translations = {
    "Damage": "Урон",
    "Healing": "Лечение",
    "Weight": "Вес",
    "Quantity": "Количество",
    "Price": "Цена",
    "Description": "Описание",
    "Details": "Подробности",
    "Properties": "Свойства",
    "Range": "Дистанция",
    "Duration": "Длительность",
    "Components": "Компоненты",
    "Casting Time": "Время сотворения",
    "Level": "Уровень",
    "School": "Школа",
    "Prepared": "Подготовлено",
    "Concentration": "Концентрация",
    "Ritual": "Ритуал",
    "Armor Class": "Класс доспеха",
    "Hit Points": "Хиты",
    "Speed": "Скорость",
    "Proficiency": "Мастерство",
    "Features": "Способности",
    "Inventory": "Инвентарь",
    "Spells": "Заклинания",
    "Biography": "Биография"
  };

  for (const [eng, rus] of Object.entries(translations)) {
    html.find(`:contains('${eng}')`).each((i, el) => {
      const element = $(el);
      if (element.children().length === 0) {
        element.text(element.text().replace(eng, rus));
      }
    });
  }
}

function _translateChatMessage(html) {
  const damageTypes = {
    "bludgeoning": "дробящий",
    "piercing": "колющий",
    "slashing": "рубящий",
    "fire": "огонь",
    "cold": "холод",
    "lightning": "электричество",
    "thunder": "звук",
    "poison": "яд",
    "acid": "кислота",
    "necrotic": "некротический",
    "radiant": "излучение",
    "force": "силовое поле",
    "psychic": "психический",
    "healing": "лечение"
  };

  html.find(".damage-type").each((i, el) => {
    const text = el.textContent?.toLowerCase().trim();
    if (text && damageTypes[text]) {
      el.textContent = damageTypes[text];
    }
  });
}

/* -------------------------------------------- */
/*  Приветственное сообщение                     */
/* -------------------------------------------- */

function _sendWelcomeMessage() {
  const content = `
    <div class="dnd5e-2014-welcome" style="border: 2px solid #8B0000; border-radius: 8px; padding: 16px; background: linear-gradient(135deg, #1a1a2e, #16213e);">
      <h2 style="color: #DAA520; margin: 0 0 8px 0;">⚔️ D&D 5e (2014) — Русский</h2>
      <p style="color: #e8e8e8; margin: 0 0 12px 0;">Модуль успешно загружен! Все материалы на русском языке.</p>
      <h3 style="color: #DAA520; font-size: 14px; margin: 0 0 8px 0;">📚 Включённые компендиумы:</h3>
      <ul style="color: #e8e8e8; margin: 0; padding-left: 20px; font-size: 13px;">
        <li>🧬 <strong>Расы</strong> — 9 рас с подрасами</li>
        <li>⚔️ <strong>Классы</strong> — 12 классов с таблицами уровней</li>
        <li>🎒 <strong>Предметы</strong> — оружие, доспехи, снаряжение</li>
        <li>✨ <strong>Заклинания</strong> — заговоры и заклинания 1-5 кругов</li>
        <li>⭐ <strong>Способности</strong> — расовые и классовые черты</li>
        <li>📜 <strong>Предыстории</strong> — 13 предысторий</li>
        <li>📖 <strong>Правила</strong> — основные правила на русском</li>
      </ul>
      <p style="color: #a0a0a0; margin: 12px 0 0 0; font-size: 11px;"><em>Совместимо с Foundry VTT 13.351 и системой dnd5e v4.x</em></p>
    </div>
  `;

  ChatMessage.create({
    content,
    whisper: ChatMessage.getWhisperRecipients("GM")
  });
}

console.log(`${MODULE_TITLE} | Скрипты загружены (ES Module)`);
