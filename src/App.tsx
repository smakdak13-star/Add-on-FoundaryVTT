import { useState, useCallback } from 'react';
import { races, Race } from './data/races';
import { classes, CharacterClass } from './data/classes';
import { items, Item } from './data/items';
import { spells, Spell } from './data/spells';

interface CharacterData {
  name: string;
  race: Race | null;
  class: CharacterClass | null;
  level: number;
  background: string;
  alignment: string;
  experiencePoints: number;
  abilities: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
  maxHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  armorClass: number;
  initiative: number;
  speed: number;
  proficiencyBonus: number;
  inspiration: boolean;
  skills: Record<string, { proficient: boolean; expertise: boolean }>;
  inventory: { item: Item; quantity: number }[];
  knownSpells: Spell[];
  spellSlots: Record<string, { max: number; current: number }>;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  features: string[];
  deathSaves: { successes: number; failures: number };
}

const skillList = [
  { key: 'acrobatics', name: 'Акробатика', ability: 'dex' },
  { key: 'animalHandling', name: 'Обращение с животными', ability: 'wis' },
  { key: 'arcana', name: 'Магия', ability: 'int' },
  { key: 'athletics', name: 'Атлетика', ability: 'str' },
  { key: 'deception', name: 'Обман', ability: 'cha' },
  { key: 'history', name: 'История', ability: 'int' },
  { key: 'insight', name: 'Проницательность', ability: 'wis' },
  { key: 'intimidation', name: 'Запугивание', ability: 'cha' },
  { key: 'investigation', name: 'Расследование', ability: 'int' },
  { key: 'medicine', name: 'Медицина', ability: 'wis' },
  { key: 'nature', name: 'Природа', ability: 'int' },
  { key: 'perception', name: 'Восприятие', ability: 'wis' },
  { key: 'performance', name: 'Выступление', ability: 'cha' },
  { key: 'persuasion', name: 'Убеждение', ability: 'cha' },
  { key: 'religion', name: 'Религия', ability: 'int' },
  { key: 'sleightOfHand', name: 'Ловкость рук', ability: 'dex' },
  { key: 'stealth', name: 'Скрытность', ability: 'dex' },
  { key: 'survival', name: 'Выживание', ability: 'wis' },
];

const abilityNames: Record<string, string> = {
  str: 'Сила',
  dex: 'Ловкость',
  con: 'Телосложение',
  int: 'Интеллект',
  wis: 'Мудрость',
  cha: 'Харизма'
};

const backgrounds = [
  'Прислужник', 'Шарлатан', 'Преступник', 'Артист', 'Народный герой',
  'Гильдейский ремесленник', 'Отшельник', 'Благородный', 'Чужеземец',
  'Мудрец', 'Моряк', 'Солдат', 'Беспризорник'
];

const alignments = [
  'Законопослушный добрый', 'Нейтральный добрый', 'Хаотичный добрый',
  'Законопослушный нейтральный', 'Истинно нейтральный', 'Хаотичный нейтральный',
  'Законопослушный злой', 'Нейтральный злой', 'Хаотичный злой'
];

function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function calculateMaxHP(level: number, conMod: number, hitDie: number): number {
  return hitDie + conMod + (level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);
}

type Tab = 'character' | 'inventory' | 'spells' | 'features' | 'notes';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('character');
  const [character, setCharacter] = useState<CharacterData>({
    name: 'Безымянный герой',
    race: null,
    class: null,
    level: 1,
    background: '',
    alignment: '',
    experiencePoints: 0,
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    maxHitPoints: 10,
    currentHitPoints: 10,
    temporaryHitPoints: 0,
    armorClass: 10,
    initiative: 0,
    speed: 30,
    proficiencyBonus: 2,
    inspiration: false,
    skills: Object.fromEntries(skillList.map(s => [s.key, { proficient: false, expertise: false }])),
    inventory: [],
    knownSpells: [],
    spellSlots: {},
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    features: [],
    deathSaves: { successes: 0, failures: 0 }
  });

  const [showRaceSelect, setShowRaceSelect] = useState(false);
  const [showClassSelect, setShowClassSelect] = useState(false);
  const [showItemSelect, setShowItemSelect] = useState(false);
  const [showSpellSelect, setShowSpellSelect] = useState(false);
  const [itemFilter, setItemFilter] = useState<string>('all');
  const [spellFilter, setSpellFilter] = useState<number>(-1);

  const updateCharacter = useCallback((updates: Partial<CharacterData>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  }, []);

  const setAbility = (ability: string, value: number) => {
    const clamped = Math.max(1, Math.min(30, value));
    const newAbilities = { ...character.abilities, [ability]: clamped };
    updateCharacter({ abilities: newAbilities });
  };

  const selectRace = (race: Race) => {
    const newAbilities = { ...character.abilities };
    Object.entries(race.abilityBonuses).forEach(([key, bonus]) => {
      newAbilities[key as keyof typeof newAbilities] += bonus;
    });
    updateCharacter({
      race,
      abilities: newAbilities,
      speed: race.speed
    });
    setShowRaceSelect(false);
  };

  const selectClass = (cls: CharacterClass) => {
    const conMod = getModifier(character.abilities.con);
    const newMaxHP = calculateMaxHP(character.level, conMod, cls.hitDie);
    const newProfBonus = Math.ceil(character.level / 4) + 1;
    const newSkills = { ...character.skills };
    
    // Mark class skills as proficient (auto-select first N)
    const availableSkills = cls.skillChoices.slice(0, cls.skillCount);
    availableSkills.forEach(skillName => {
      const skill = skillList.find(s => s.name === skillName);
      if (skill) {
        newSkills[skill.key] = { ...newSkills[skill.key], proficient: true };
      }
    });

    updateCharacter({
      class: cls,
      maxHitPoints: newMaxHP,
      currentHitPoints: newMaxHP,
      proficiencyBonus: newProfBonus,
      skills: newSkills,
      features: cls.levels[0]?.features || []
    });
    setShowClassSelect(false);
  };

  const changeLevel = (newLevel: number) => {
    const clampedLevel = Math.max(1, Math.min(20, newLevel));
    const conMod = getModifier(character.abilities.con);
    const hitDie = character.class?.hitDie || 8;
    const newMaxHP = calculateMaxHP(clampedLevel, conMod, hitDie);
    const newProfBonus = Math.ceil(clampedLevel / 4) + 1;
    const newFeatures = character.class?.levels[clampedLevel - 1]?.features || [];

    updateCharacter({
      level: clampedLevel,
      maxHitPoints: newMaxHP,
      proficiencyBonus: newProfBonus,
      features: newFeatures
    });
  };

  const addItem = (item: Item) => {
    const existing = character.inventory.find(i => i.item.id === item.id);
    if (existing) {
      updateCharacter({
        inventory: character.inventory.map(i =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      });
    } else {
      updateCharacter({ inventory: [...character.inventory, { item, quantity: 1 }] });
    }
    setShowItemSelect(false);
  };

  const removeItem = (itemId: string) => {
    updateCharacter({
      inventory: character.inventory.filter(i => i.item.id !== itemId)
    });
  };

  const addSpell = (spell: Spell) => {
    if (!character.knownSpells.find(s => s.id === spell.id)) {
      updateCharacter({ knownSpells: [...character.knownSpells, spell] });
    }
    setShowSpellSelect(false);
  };

  const removeSpell = (spellId: string) => {
    updateCharacter({
      knownSpells: character.knownSpells.filter(s => s.id !== spellId)
    });
  };

  const toggleSkillProficiency = (skillKey: string) => {
    const skill = character.skills[skillKey];
    updateCharacter({
      skills: {
        ...character.skills,
        [skillKey]: { ...skill, proficient: !skill.proficient, expertise: false }
      }
    });
  };

  const toggleSkillExpertise = (skillKey: string) => {
    const skill = character.skills[skillKey];
    if (!skill.proficient) return;
    updateCharacter({
      skills: {
        ...character.skills,
        [skillKey]: { ...skill, expertise: !skill.expertise }
      }
    });
  };

  const getSkillModifier = (skillKey: string): number => {
    const skillDef = skillList.find(s => s.key === skillKey);
    if (!skillDef) return 0;
    const abilityMod = getModifier(character.abilities[skillDef.ability as keyof typeof character.abilities]);
    const skill = character.skills[skillKey];
    let bonus = abilityMod;
    if (skill.proficient) bonus += character.proficiencyBonus;
    if (skill.expertise) bonus += character.proficiencyBonus;
    return bonus;
  };

  const getSavingThrow = (ability: string): number => {
    const mod = getModifier(character.abilities[ability as keyof typeof character.abilities]);
    const isProficient = character.class?.savingThrows.includes(abilityNames[ability]);
    return isProficient ? mod + character.proficiencyBonus : mod;
  };

  const filteredItems = items.filter(item => {
    if (itemFilter === 'all') return true;
    return item.type === itemFilter;
  });

  const filteredSpells = spells.filter(spell => {
    if (spellFilter === -1) return true;
    return spell.level === spellFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-lg border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚔️</div>
            <div>
              <h1 className="text-xl font-bold text-amber-200">D&D 5e (2014)</h1>
              <p className="text-xs text-red-200">Лист персонажа — Foundry VTT 13.351</p>
            </div>
          </div>
          <div className="text-sm text-red-200">
            <span className="bg-red-700/50 px-2 py-1 rounded">Редакция 2014</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-gray-800/80 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {[
            { id: 'character' as Tab, label: '👤 Персонаж', },
            { id: 'inventory' as Tab, label: '🎒 Инвентарь' },
            { id: 'spells' as Tab, label: '✨ Заклинания' },
            { id: 'features' as Tab, label: '⭐ Способности' },
            { id: 'notes' as Tab, label: '📝 Заметки' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-amber-300 border-b-2 border-amber-400 bg-gray-700/50'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'character' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              {/* Character Info */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">📋 Информация</h2>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400">Имя персонажа</label>
                    <input
                      type="text"
                      value={character.name}
                      onChange={e => updateCharacter({ name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400">Раса</label>
                      <button
                        onClick={() => setShowRaceSelect(true)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-left hover:bg-gray-600 transition"
                      >
                        {character.race?.name || 'Выбрать...'}
                      </button>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Класс</label>
                      <button
                        onClick={() => setShowClassSelect(true)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-left hover:bg-gray-600 transition"
                      >
                        {character.class?.name || 'Выбрать...'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400">Уровень</label>
                      <div className="flex items-center gap-1">
                        <button onClick={() => changeLevel(character.level - 1)} className="bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-xs">-</button>
                        <span className="flex-1 text-center bg-gray-700 rounded py-1 text-sm font-bold text-amber-300">{character.level}</span>
                        <button onClick={() => changeLevel(character.level + 1)} className="bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-xs">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Опыт</label>
                      <input
                        type="number"
                        value={character.experiencePoints}
                        onChange={e => updateCharacter({ experiencePoints: parseInt(e.target.value) || 0 })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-400">Предыстория</label>
                      <select
                        value={character.background}
                        onChange={e => updateCharacter({ background: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm"
                      >
                        <option value="">—</option>
                        {backgrounds.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Мировоззрение</label>
                      <select
                        value={character.alignment}
                        onChange={e => updateCharacter({ alignment: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm"
                      >
                        <option value="">—</option>
                        {alignments.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combat Stats */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">⚔️ Боевые параметры</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">КД</div>
                    <input
                      type="number"
                      value={character.armorClass}
                      onChange={e => updateCharacter({ armorClass: parseInt(e.target.value) || 10 })}
                      className="w-full text-center text-2xl font-bold bg-transparent text-amber-300 focus:outline-none"
                    />
                  </div>
                  <div className="text-center bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">Инициатива</div>
                    <div className="text-2xl font-bold text-green-400">
                      {formatModifier(getModifier(character.abilities.dex))}
                    </div>
                  </div>
                  <div className="text-center bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">Скорость</div>
                    <div className="text-2xl font-bold text-blue-400">{character.speed}</div>
                  </div>
                </div>
                {/* HP */}
                <div className="mt-3 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Хиты</span>
                    <span className="text-xs text-gray-400">{character.currentHitPoints} / {character.maxHitPoints}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min={0}
                      max={character.maxHitPoints}
                      value={character.currentHitPoints}
                      onChange={e => updateCharacter({ currentHitPoints: parseInt(e.target.value) })}
                      className="flex-1 accent-red-500"
                    />
                    <input
                      type="number"
                      value={character.currentHitPoints}
                      onChange={e => updateCharacter({ currentHitPoints: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-gray-600 rounded px-2 py-1 text-center text-sm"
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400">Временные хиты</label>
                      <input
                        type="number"
                        value={character.temporaryHitPoints}
                        onChange={e => updateCharacter({ temporaryHitPoints: parseInt(e.target.value) || 0 })}
                        className="w-full bg-gray-600 rounded px-2 py-1 text-center text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400">Кость хитов</label>
                      <div className="text-center bg-gray-600 rounded px-2 py-1 text-sm">
                        {character.class ? `к${character.class.hitDie}` : '—'}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Death Saves */}
                <div className="mt-3 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                  <div className="text-xs text-gray-400 mb-2">Спасброски от смерти</div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-green-400">Успехи:</span>
                      {[0, 1, 2].map(i => (
                        <button
                          key={i}
                          onClick={() => updateCharacter({
                            deathSaves: { ...character.deathSaves, successes: i < character.deathSaves.successes ? i : i + 1 }
                          })}
                          className={`w-5 h-5 rounded-full border-2 ${
                            i < character.deathSaves.successes ? 'bg-green-500 border-green-400' : 'border-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-red-400">Провалы:</span>
                      {[0, 1, 2].map(i => (
                        <button
                          key={i}
                          onClick={() => updateCharacter({
                            deathSaves: { ...character.deathSaves, failures: i < character.deathSaves.failures ? i : i + 1 }
                          })}
                          className={`w-5 h-5 rounded-full border-2 ${
                            i < character.deathSaves.failures ? 'bg-red-500 border-red-400' : 'border-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Inspiration */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => updateCharacter({ inspiration: !character.inspiration })}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      character.inspiration ? 'bg-amber-500 text-gray-900' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    ⭐ Вдохновение
                  </button>
                  <span className="text-xs text-gray-400">
                    Бонус мастерства: +{character.proficiencyBonus}
                  </span>
                </div>
              </div>
            </div>

            {/* Center Column - Abilities */}
            <div className="space-y-4">
              {/* Ability Scores */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">💪 Характеристики</h2>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(character.abilities).map(([key, value]) => (
                    <div key={key} className="text-center bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="text-xs text-gray-400 mb-1">{abilityNames[key]}</div>
                      <input
                        type="number"
                        value={value}
                        onChange={e => setAbility(key, parseInt(e.target.value) || 10)}
                        className="w-full text-center text-xl font-bold bg-transparent text-white focus:outline-none"
                      />
                      <div className={`text-sm font-bold mt-1 ${
                        getModifier(value) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formatModifier(getModifier(value))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saving Throws */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">🛡️ Спасброски</h2>
                <div className="space-y-1.5">
                  {Object.entries(abilityNames).map(([key, name]) => {
                    const isProficient = character.class?.savingThrows.includes(name);
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 ${isProficient ? 'bg-amber-500 border-amber-400' : 'border-gray-500'}`} />
                        <span className="text-sm text-gray-300 flex-1">{name}</span>
                        <span className={`text-sm font-bold ${
                          getSavingThrow(key) >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatModifier(getSavingThrow(key))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">🎯 Навыки</h2>
                <div className="space-y-1">
                  {skillList.map(skill => {
                    const mod = getSkillModifier(skill.key);
                    const skillData = character.skills[skill.key];
                    return (
                      <div key={skill.key} className="flex items-center gap-2 text-sm">
                        <button
                          onClick={() => toggleSkillProficiency(skill.key)}
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            skillData.proficient ? 'bg-amber-500 border-amber-400' : 'border-gray-500'
                          }`}
                        />
                        <button
                          onClick={() => toggleSkillExpertise(skill.key)}
                          className={`w-4 h-4 rounded border flex-shrink-0 text-[8px] font-bold ${
                            skillData.expertise ? 'bg-purple-500 border-purple-400 text-white' : 'border-gray-500 text-gray-500'
                          }`}
                          title="Экспертиза"
                        >
                          Э
                        </button>
                        <span className="text-gray-300 flex-1 truncate">{skill.name}</span>
                        <span className="text-xs text-gray-500">({abilityNames[skill.ability].slice(0, 3)})</span>
                        <span className={`font-bold ${mod >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatModifier(mod)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Passive & Race/Class Info */}
            <div className="space-y-4">
              {/* Passive Perception */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">👁️ Пассивное восприятие</h2>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {10 + getSkillModifier('perception')}
                  </div>
                </div>
              </div>

              {/* Race Info */}
              {character.race && (
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                  <h2 className="text-lg font-bold text-amber-300 mb-2">🧬 {character.race.name}</h2>
                  <p className="text-xs text-gray-400 mb-2">{character.race.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Размер:</span> {character.race.size}
                    </div>
                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Скорость:</span> {character.race.speed} фт.
                    </div>
                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Языки:</span> {character.race.languages.join(', ')}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Черты:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {character.race.traits.map(trait => (
                          <span key={trait} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Class Info */}
              {character.class && (
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                  <h2 className="text-lg font-bold text-amber-300 mb-2">⚔️ {character.class.name}</h2>
                  <p className="text-xs text-gray-400 mb-2">{character.class.description}</p>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div><span className="text-gray-500">Кость хитов:</span> к{character.class.hitDie}</div>
                    <div><span className="text-gray-500">Главная характеристика:</span> {character.class.primaryAbility}</div>
                    <div><span className="text-gray-500">Спасброски:</span> {character.class.savingThrows.join(', ')}</div>
                    {character.class.spellcaster && (
                      <div><span className="text-gray-500">Заклинательная хар-ка:</span> {character.class.spellAbility}</div>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Владение доспехами:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {character.class.armorProficiencies.map(p => (
                        <span key={p} className="text-xs bg-green-900/50 text-green-300 px-2 py-0.5 rounded">{p}</span>
                      ))}
                      {character.class.armorProficiencies.length === 0 && <span className="text-xs text-gray-500">Нет</span>}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Владение оружием:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {character.class.weaponProficiencies.map(p => (
                        <span key={p} className="text-xs bg-orange-900/50 text-orange-300 px-2 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Personality */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-amber-300 mb-3">🎭 Личность</h2>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400">Черты характера</label>
                    <textarea
                      value={character.personalityTraits}
                      onChange={e => updateCharacter({ personalityTraits: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs h-16 resize-none"
                      placeholder="Опишите черты характера..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Идеалы</label>
                    <textarea
                      value={character.ideals}
                      onChange={e => updateCharacter({ ideals: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs h-16 resize-none"
                      placeholder="Что движет вашим персонажем..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Привязанности</label>
                    <textarea
                      value={character.bonds}
                      onChange={e => updateCharacter({ bonds: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs h-16 resize-none"
                      placeholder="Что дорого вашему персонажу..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Слабости</label>
                    <textarea
                      value={character.flaws}
                      onChange={e => updateCharacter({ flaws: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs h-16 resize-none"
                      placeholder="Слабые стороны персонажа..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-300">🎒 Инвентарь</h2>
              <button
                onClick={() => setShowItemSelect(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                + Добавить предмет
              </button>
            </div>

            {/* Inventory List */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
              {character.inventory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Инвентарь пуст. Добавьте предметы.</p>
              ) : (
                <div className="space-y-2">
                  {character.inventory.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{item.name}</span>
                          <span className="text-xs bg-gray-600 px-2 py-0.5 rounded text-gray-300">{item.category}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                        {item.damage && (
                          <div className="text-xs text-red-400 mt-1">
                            Урон: {item.damage} ({item.damageType}) | {item.properties?.join(', ')}
                          </div>
                        )}
                        {item.armorClass && (
                          <div className="text-xs text-blue-400 mt-1">
                            КД: {item.armorClass} {item.type === 'shield' ? '(+2)' : ''}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-amber-300">×{quantity}</div>
                        <div className="text-xs text-gray-500">{item.weight * quantity} фн.</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {character.inventory.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-600 text-sm text-gray-400">
                  Общий вес: {character.inventory.reduce((sum, { item, quantity }) => sum + item.weight * quantity, 0)} фн.
                </div>
              )}
            </div>

            {/* Item Selection Modal */}
            {showItemSelect && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-600">
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-amber-300">Выберите предмет</h3>
                    <button onClick={() => setShowItemSelect(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                  </div>
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'all', label: 'Все' },
                        { value: 'weapon', label: '⚔️ Оружие' },
                        { value: 'armor', label: '🛡️ Доспехи' },
                        { value: 'shield', label: '🔰 Щиты' },
                        { value: 'adventuring', label: '🎒 Снаряжение' },
                        { value: 'consumable', label: '🧪 Расходники' },
                        { value: 'tool', label: '🔧 Инструменты' },
                        { value: 'treasure', label: '💎 Сокровища' },
                      ].map(f => (
                        <button
                          key={f.value}
                          onClick={() => setItemFilter(f.value)}
                          className={`px-3 py-1 rounded text-xs font-medium transition ${
                            itemFilter === f.value ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-[50vh] p-4">
                    <div className="space-y-2">
                      {filteredItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => addItem(item)}
                          className="w-full text-left bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:bg-gray-700 hover:border-amber-500 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-white">{item.name}</div>
                              <div className="text-xs text-gray-400">{item.category} | {item.cost} | {item.weight} фн.</div>
                            </div>
                            {item.damage && <span className="text-xs text-red-400">{item.damage}</span>}
                            {item.armorClass && <span className="text-xs text-blue-400">КД {item.armorClass}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'spells' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-300">✨ Заклинания</h2>
              {character.class?.spellcaster && (
                <button
                  onClick={() => setShowSpellSelect(true)}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  + Добавить заклинание
                </button>
              )}
            </div>

            {!character.class?.spellcaster && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <p className="text-gray-500">Ваш класс не является заклинателем.</p>
              </div>
            )}

            {character.class?.spellcaster && (
              <>
                {/* Spell Slots */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                  <h3 className="text-sm font-bold text-amber-300 mb-3">Ячейки заклинаний</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 9 }, (_, i) => {
                      const level = i + 1;
                      const maxSlots = character.class?.levels[character.level - 1]?.spellSlots?.[`${level}`] || 0;
                      if (maxSlots === 0) return null;
                      return (
                        <div key={level} className="text-center bg-gray-700/50 rounded-lg p-2 border border-gray-600">
                          <div className="text-xs text-gray-400">Ур. {level}</div>
                          <div className="text-lg font-bold text-purple-400">{maxSlots}</div>
                          <div className="text-xs text-gray-500">ячеек</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Known Spells */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                  <h3 className="text-sm font-bold text-amber-300 mb-3">Известные заклинания</h3>
                  {character.knownSpells.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Нет известных заклинаний.</p>
                  ) : (
                    <div className="space-y-2">
                      {character.knownSpells.sort((a, b) => a.level - b.level).map(spell => (
                        <div key={spell.id} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{spell.name}</span>
                                <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">
                                  {spell.level === 0 ? 'Заговор' : `Уровень ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {spell.school} | Время: {spell.castingTime} | Дистанция: {spell.range}
                              </div>
                              <div className="text-xs text-gray-400">
                                Компоненты: {spell.components} | Длительность: {spell.duration}
                              </div>
                              <p className="text-xs text-gray-300 mt-2">{spell.description}</p>
                            </div>
                            <button
                              onClick={() => removeSpell(spell.id)}
                              className="text-red-400 hover:text-red-300 p-1 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Spell Selection Modal */}
            {showSpellSelect && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-600">
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-amber-300">Выберите заклинание</h3>
                    <button onClick={() => setShowSpellSelect(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                  </div>
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: -1, label: 'Все' },
                        { value: 0, label: 'Заговоры' },
                        { value: 1, label: '1-й круг' },
                        { value: 2, label: '2-й круг' },
                        { value: 3, label: '3-й круг' },
                        { value: 4, label: '4-й круг' },
                        { value: 5, label: '5-й круг' },
                      ].map(f => (
                        <button
                          key={f.value}
                          onClick={() => setSpellFilter(f.value)}
                          className={`px-3 py-1 rounded text-xs font-medium transition ${
                            spellFilter === f.value ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-[50vh] p-4">
                    <div className="space-y-2">
                      {filteredSpells.map(spell => (
                        <button
                          key={spell.id}
                          onClick={() => addSpell(spell)}
                          className="w-full text-left bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:bg-gray-700 hover:border-purple-500 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-white">{spell.name}</div>
                              <div className="text-xs text-gray-400">
                                {spell.level === 0 ? 'Заговор' : `${spell.level}-й круг`} | {spell.school} | {spell.castingTime}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{spell.range}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-amber-300">⭐ Способности и черты</h2>
            
            {/* Racial Traits */}
            {character.race && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h3 className="text-sm font-bold text-blue-300 mb-3">🧬 Расовые черты — {character.race.name}</h3>
                <div className="space-y-2">
                  {character.race.traits.map(trait => (
                    <div key={trait} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="font-medium text-white text-sm">{trait}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {getTraitDescription(trait)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Class Features */}
            {character.class && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                <h3 className="text-sm font-bold text-orange-300 mb-3">⚔️ Классовые способности — {character.class.name} (Уровень {character.level})</h3>
                <div className="space-y-2">
                  {character.features.map((feature, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="font-medium text-white text-sm">{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!character.race && !character.class && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <p className="text-gray-500">Выберите расу и класс, чтобы увидеть способности.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-amber-300">📝 Заметки</h2>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
              <textarea
                className="w-full h-96 bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-sm text-gray-200 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Запишите здесь всё, что нужно для игры: предысторию, цели, контакты, карты, заметки о квестах..."
                defaultValue=""
              />
            </div>
          </div>
        )}
      </main>

      {/* Race Selection Modal */}
      {showRaceSelect && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-600">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-300">Выберите расу</h3>
              <button onClick={() => setShowRaceSelect(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              <div className="space-y-2">
                {races.map(race => (
                  <button
                    key={race.id}
                    onClick={() => selectRace(race)}
                    className="w-full text-left bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700 hover:border-amber-500 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">{race.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{race.description}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {Object.entries(race.abilityBonuses).map(([key, bonus]) => (
                            <span key={key} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                              {abilityNames[key]} +{bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {race.size} | {race.speed} фт.
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Class Selection Modal */}
      {showClassSelect && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-600">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-300">Выберите класс</h3>
              <button onClick={() => setShowClassSelect(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              <div className="space-y-2">
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => selectClass(cls)}
                    className="w-full text-left bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700 hover:border-amber-500 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">{cls.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{cls.description}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded">к{cls.hitDie}</span>
                          <span className="text-xs bg-green-900/50 text-green-300 px-2 py-0.5 rounded">{cls.primaryAbility}</span>
                          {cls.spellcaster && (
                            <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">Заклинатель</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 py-4 border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>D&D 5e (2014) — Лист персонажа для Foundry VTT 13.351</p>
          <p className="mt-1">Все материалы на русском языке. Совместимо с системой D&D5e для Foundry VTT.</p>
        </div>
      </footer>
    </div>
  );
}

function getTraitDescription(trait: string): string {
  const descriptions: Record<string, string> = {
    'Тёмное зрение': 'Вы видите в темноте на расстоянии 60 футов в оттенках серого.',
    'Наследие Фей': 'Вы совершаете с преимуществом спасброски против очарования, и вас невозможно магически усыпить.',
    'Транс': 'Эльфам не нужен сон. Вместо этого они входят в медитативное состояние на 4 часа.',
    'Острые чувства': 'Вы владеете навыком Восприятие.',
    'Дополнительный язык': 'Вы знаете один дополнительный язык на ваш выбор.',
    'Универсальность': 'Вы получаете дополнительный навык на ваш выбор.',
    'Везучий': 'Когда вам выпадает 1 на к20 при атаке, проверке характеристики или спасброске, вы можете перебросить кость.',
    'Храбрый': 'Вы совершаете с преимуществом спасброски против состояния испуга.',
    'Проворство полурослика': 'Вы можете перемещаться через пространство любого существа больше вас.',
    'Наследие дракона': 'Вы происходите от дракона. Выберите тип дракона.',
    'Оружие дыхания': 'Вы можете использовать действие для выдоха разрушительной энергии.',
    'Сопротивление урону': 'Вы получаете сопротивление к типу урона вашего предка-дракона.',
    'Гномья хитрость': 'Вы совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы против магии.',
    'Неукротимая стойкость': 'Когда ваши хиты опускаются до 0, но вы не убиты, вы можете остаться с 1 хитом.',
    'Свирепые атаки': 'При попадании критическим ударом рукопашным оружием вы бросаете одну дополнительную кость урона.',
    'Адское сопротивление': 'Вы получаете сопротивление урону огнём.',
    'Инфернальное наследие': 'Вы знаете заговор Чудотворство. На 3-м уровне — Адское возмездие. На 5-м — Тьма.',
    'Защита без доспехов': 'Без доспеха ваш КД = 10 + модификатор Ловкости + модификатор Телосложения.',
    'Ярость': 'Вы можете входить в ярость как бонусное действие. Получаете сопротивление дробящему, колющему и рубящему урону.',
    'Безрассудная атака': 'При атаке силой вы можете совершить её с преимуществом, но атаки по вам тоже с преимуществом до следующего хода.',
    'Чувство опасности': 'Вы чувствуете опасность. Вы не можете быть застигнуты врасплох, если не недееспособны.',
    'Заклинания': 'Вы можете сотворять заклинания, используя ячейки заклинаний вашего класса.',
    'Бардовское вдохновение (к6)': 'Вы можете использовать бонусное действие для вдохновения другого существа, давая к6.',
    'Мастер на все руки': 'Прибавьте половину бонуса мастерства (округлённое вниз) к любой проверке характеристики.',
    'Божественный домен': 'Выберите божественный домен, который даёт дополнительные заклинания и способности.',
    'Направление божественности': 'Вы используете божественную энергию для создания магических эффектов.',
    'Дикая форма': 'Вы можете магически превращаться в зверя, которого уже видели.',
    'Боевой стиль': 'Выберите боевой стиль, который даёт особые преимущества в бою.',
    'Второе дыхание': 'Вы можете использовать бонусное действие для восстановления 1к10 + уровень воина хитов.',
    'Всплеск действий (1)': 'Вы можете совершить одно дополнительное действие в свой ход.',
    'Боевые искусства': 'Вы можете использовать Ловкость вместо Силы для атак unarmed и монашеского оружия.',
    'Ки': 'Вы можете тратить очки ки для особых способностей: Безоружный удар, Порыв ветра, Отклонение снарядов.',
    'Божественный удар': 'При попадании атакой оружия вы можете потратить ячейку заклинания для дополнительного урона излучением.',
    'Избранный враг': 'Выберите тип избранного врага. Вы получаете преимущества против него.',
    'Естественный исследователь': 'Вы особенно эффективны при исследовании определённых типов местности.',
    'Экспертиза': 'Выберите два навыка. Ваш бонус мастерства удваивается для них.',
    'Комплектная работа': 'Вы можете использовать действие для поиска секретов и ловушек.',
    'Скрытая атака 1к6': 'Раз в ход, при преимуществе или когда союзник рядом с целью, вы наносите дополнительный урон.',
    'Чародейское происхождение': 'Выберите происхождение, которое даёт особые способности.',
    'Волшебные очки (2)': 'У вас есть 2 очка магии для использования метамодификаций.',
    'Потусторонний покровитель': 'Вы заключили пакт с потусторонней сущностью, получив магические способности.',
    'Магическое сознание': 'Вы восстанавливаете ячейки заклинаний при коротком отдыхе.',
    'Магическое восстановление': 'Раз в день при длительном отдыхе вы восстанавливаете ячейки заклинаний.',
    'Волшебная школа': 'Вы посвятили себя изучению одной школы магии.',
  };
  return descriptions[trait] || 'Особая расовая или классовая черта.';
}
