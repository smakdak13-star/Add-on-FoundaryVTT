/**
 * D&D 5e (2014) — Полная редакция на русском языке
 * Модуль для Foundry VTT 13.351
 */

import { registerSettings } from './settings.js';
import { DnD5e2014CharacterSheet } from './sheets/character-sheet.js';
import { registerCompendiumData } from './data/compendium-data.js';
import { preloadTemplates } from './templates.js';

/* -------------------------------------------- */
/*  Инициализация модуля                         */
/* -------------------------------------------- */

const MODULE_ID = 'dnd5e-2014-ru';
const MODULE_TITLE = 'D&D 5e (2014) — Русский';

Hooks.once('init', async function() {
  console.log(`${MODULE_TITLE} | Инициализация модуля`);

  // Регистрация настроек
  registerSettings();

  // Регистрация листа персонажа
  Actors.registerSheet('dnd5e', DnD5e2014CharacterSheet, {
    types: ['character'],
    makeDefault: false,
    label: 'D&D 5e (2014) — Русский лист'
  });

  // Предзагрузка шаблонов
  await preloadTemplates();

  // Глобальный API
  game.dnd5e2014ru = {
    DnD5e2014CharacterSheet,
    registerCompendiumData,
    version: '1.0.0'
  };

  console.log(`${MODULE_TITLE} | Модуль инициализирован (v1.0.0)`);
});

/* -------------------------------------------- */
/*  Готовность модуля                            */
/* -------------------------------------------- */

Hooks.once('ready', async function() {
  console.log(`${MODULE_TITLE} | Модуль готов к работе`);

  // Регистрация данных в компендиумах
  if (game.user.isGM) {
    await registerCompendiumData();
  }

  // Приветственное сообщение
  if (game.user.isGM) {
    const content = `
      <div class="dnd5e-2014-welcome">
        <h2>⚔️ D&D 5e (2014) — Русский</h2>
        <p>Модуль успешно загружен! Все материалы переведены на русский язык.</p>
        <h3>Включённые компендиумы:</h3>
        <ul>
          <li>🧬 <strong>Расы</strong> — 9 рас с подрасами</li>
          <li>⚔️ <strong>Классы</strong> — 12 классов с таблицами уровней</li>
          <li>🎒 <strong>Предметы</strong> — оружие, доспехи, снаряжение</li>
          <li>✨ <strong>Заклинания</strong> — заговоры и заклинания 1-9 кругов</li>
          <li>⭐ <strong>Способности</strong> — расовые и классовые черты</li>
        </ul>
        <p><em>Совместимо с Foundry VTT 13.351 и системой dnd5e v4.x</em></p>
      </div>
    `;
    ChatMessage.create({
      content,
      whisper: ChatMessage.getWhisperRecipients('GM')
    });
  }
});

/* -------------------------------------------- */
/*  Хуки для перевода                            */
/* -------------------------------------------- */

Hooks.on('renderActorSheet', (app, html, data) => {
  // Добавляем CSS-класс для стилизации
  if (app.options.classes?.includes('dnd5e-2014-ru')) {
    html.addClass('dnd5e-2014-ru-sheet');
  }
});

Hooks.on('renderItemSheet', (app, html, data) => {
  // Перевод типов предметов
  const typeLabels = {
    'weapon': 'Оружие',
    'equipment': 'Снаряжение',
    'consumable': 'Расходник',
    'tool': 'Инструмент',
    'loot': 'Добыча',
    'container': 'Контейнер',
    'spell': 'Заклинание',
    'feat': 'Способность',
    'background': 'Предыстория',
    'class': 'Класс',
    'subclass': 'Подкласс',
    'race': 'Раса'
  };

  const type = data.document?.type;
  if (type && typeLabels[type]) {
    const typeElement = html.find('.item-type');
    if (typeElement.length) {
      typeElement.text(typeLabels[type]);
    }
  }
});

/* -------------------------------------------- */
/*  Обработка чата                               */
/* -------------------------------------------- */

Hooks.on('renderChatMessage', (app, html, data) => {
  // Перевод типов урона в карточках бросков
  const damageTypes = {
    'bludgeoning': 'дробящий',
    'piercing': 'колющий',
    'slashing': 'рубящий',
    'fire': 'огонь',
    'cold': 'холод',
    'lightning': 'электричество',
    'thunder': 'звук',
    'poison': 'яд',
    'acid': 'кислота',
    'necrotic': 'некротический',
    'radiant': 'излучение',
    'force': 'силовое поле',
    'psychic': 'психический'
  };

  html.find('.damage-type').each((i, el) => {
    const text = el.textContent?.toLowerCase().trim();
    if (text && damageTypes[text]) {
      el.textContent = damageTypes[text];
    }
  });
});

/* -------------------------------------------- */
/*  Утилиты                                      */
/* -------------------------------------------- */

/**
 * Получение модификатора характеристики
 * @param {number} score - Значение характеристики
 * @returns {number} Модификатор
 */
export function getAbilityModifier(score) {
  return Math.floor((score - 10) / 2);
}

/**
 * Форматирование модификатора со знаком
 * @param {number} mod - Модификатор
 * @returns {string} Отформатированная строка
 */
export function formatModifier(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/**
 * Вычисление бонуса мастерства по уровню
 * @param {number} level - Уровень персонажа
 * @returns {number} Бонус мастерства
 */
export function getProficiencyBonus(level) {
  return Math.ceil(level / 4) + 1;
}

/**
 * Вычисление максимальных хитов
 * @param {number} level - Уровень
 * @param {number} conMod - Модификатор телосложения
 * @param {number} hitDie - Кость хитов
 * @returns {number} Максимальные хиты
 */
export function calculateMaxHP(level, conMod, hitDie) {
  const avgPerLevel = Math.floor(hitDie / 2) + 1 + conMod;
  return hitDie + conMod + (level - 1) * avgPerLevel;
}

console.log(`${MODULE_TITLE} | Скрипты загружены`);
