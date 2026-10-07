import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type Tab = 'install' | 'contents' | 'structure';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('install');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const manifestUrl = 'https://github.com/dnd5e-ru/foundry-dnd5e-2014/releases/latest/download/module.json';

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const downloadModule = useCallback(async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();

      const files = [
        'module.json',
        'README.md',
        'CHANGELOG.md',
        'LICENSE',
        'lang/ru.json',
        'scripts/dnd5e-2014-ru.mjs',
        'styles/dnd5e-2014-ru.css',
        'packs/races-ru.db',
        'packs/classes-ru.db',
        'packs/items-ru.db',
        'packs/spells-ru.db',
        'packs/features-ru.db',
        'packs/backgrounds-ru.db',
        'packs/rules-ru.db'
      ];

      for (const file of files) {
        const response = await fetch(`/foundry-module/${file}`);
        if (response.ok) {
          const content = await response.text();
          zip.file(`dnd5e-2014-ru/${file}`, content);
        }
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'dnd5e-2014-ru.zip');
    } catch (error) {
      console.error('Ошибка при создании архива:', error);
      alert('Ошибка при создании архива. Попробуйте ещё раз.');
    } finally {
      setDownloading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-lg border-b border-red-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚔️</div>
              <div>
                <h1 className="text-2xl font-bold text-amber-200">D&D 5e (2014) — Русский</h1>
                <p className="text-sm text-red-200">Модуль для Foundry VTT 13.351</p>
              </div>
            </div>
            <button
              onClick={downloadModule}
              disabled={downloading}
              className="bg-amber-600 hover:bg-amber-500 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold text-sm transition flex items-center gap-2 shadow-lg"
            >
              {downloading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Создание архива...
                </>
              ) : (
                <>
                  📦 Скачать модуль (.zip)
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Version Badges */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-700">✅ v1.0.0</span>
          <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700">🎲 Foundry 13.351</span>
          <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-700">📖 Редакция 2014</span>
          <span className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-xs font-medium border border-red-700">🇷🇺 Русский</span>
          <span className="bg-amber-900/50 text-amber-300 px-3 py-1 rounded-full text-xs font-medium border border-amber-700">⚙️ dnd5e v4.x</span>
          <span className="bg-cyan-900/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium border border-cyan-700">📦 ES Module (.mjs)</span>
        </div>
      </div>

      {/* Tabs */}
      <nav className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-1 border-b border-gray-700">
          {[
            { id: 'install' as Tab, label: '📥 Установка' },
            { id: 'contents' as Tab, label: '📚 Содержимое' },
            { id: 'structure' as Tab, label: '📁 Структура' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
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

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'install' && (
          <div className="space-y-6">
            {/* Quick Install */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🚀 Быстрая установка через манифест</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    Скопируйте URL манифеста и вставьте его в Foundry VTT:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={manifestUrl}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm font-mono text-amber-300"
                    />
                    <button
                      onClick={() => copyToClipboard(manifestUrl)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        copied ? 'bg-green-600 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white'
                      }`}
                    >
                      {copied ? '✅ Скопировано!' : '📋 Копировать'}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h3 className="text-sm font-bold text-white mb-3">Инструкция по установке:</h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">1.</span>
                      <span>Откройте <strong>Foundry VTT</strong> → <strong>Настройки</strong> → <strong>Управление модулями</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">2.</span>
                      <span>Нажмите <strong>"Установить модуль"</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">3.</span>
                      <span>Вставьте скопированный URL манифеста в поле</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">4.</span>
                      <span>Нажмите <strong>"Установить"</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">5.</span>
                      <span>Перейдите в настройки вашего мира → <strong>Модули</strong> → <strong>Активируйте</strong> модуль</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">6.</span>
                      <span>Компендиумы заполнятся автоматически при первом запуске (только для ГМ)</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Alternative Install */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📦 Альтернативная установка (ZIP-архив)</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-300">
                  Если установка через манифест не работает, скачайте ZIP-архив и установите вручную:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">1.</span>
                      <span>Нажмите кнопку <strong>"Скачать модуль"</strong> выше</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">2.</span>
                      <span>Распакуйте архив в папку: <code className="bg-gray-600 px-2 py-0.5 rounded text-amber-300">Data/modules/dnd5e-2014-ru/</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">3.</span>
                      <span>Перезапустите Foundry VTT</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-bold">4.</span>
                      <span>Активируйте модуль в настройках мира</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">⚠️ Требования</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h3 className="text-sm font-bold text-white mb-2">Обязательные:</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>✅ Foundry VTT версии 13.351 или выше</li>
                    <li>✅ Система dnd5e версии 4.0.0 или выше</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h3 className="text-sm font-bold text-white mb-2">Особенности:</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>📦 ES Module (.mjs) — современный формат</li>
                    <li>🗃️ NeDB компендиумы — заполняются автоматически</li>
                    <li>🌐 Полная локализация на русский язык</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Module Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📋 Информация о модуле</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 text-center">
                  <div className="text-2xl font-bold text-amber-300">7</div>
                  <div className="text-xs text-gray-400">Компендиумов</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 text-center">
                  <div className="text-2xl font-bold text-green-400">9</div>
                  <div className="text-xs text-gray-400">Рас</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 text-center">
                  <div className="text-2xl font-bold text-blue-400">12</div>
                  <div className="text-xs text-gray-400">Классов</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 text-center">
                  <div className="text-2xl font-bold text-purple-400">25+</div>
                  <div className="text-xs text-gray-400">Заклинаний</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div className="space-y-6">
            {/* Compendiums */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📚 Компендиумы модуля</h2>
              <div className="space-y-3">
                {[
                  { name: 'races-ru', label: 'Расы (RU)', type: 'Item', count: '9 записей', desc: 'Человек, Эльф, Дварф, Полурослик, Драконорождённый, Гном, Полуэльф, Полуорк, Тифлинг' },
                  { name: 'classes-ru', label: 'Классы (RU)', type: 'Item', count: '12 записей', desc: 'Варвар, Бард, Жрец, Друид, Воин, Монах, Паладин, Следопыт, Плут, Чародей, Колдун, Волшебник' },
                  { name: 'items-ru', label: 'Предметы (RU)', type: 'Item', count: '23+ записей', desc: 'Оружие, доспехи, щиты, снаряжение, зелья, инструменты' },
                  { name: 'spells-ru', label: 'Заклинания (RU)', type: 'Item', count: '25+ записей', desc: 'Заговоры и заклинания 1-5 кругов с полными параметрами' },
                  { name: 'features-ru', label: 'Способности (RU)', type: 'Item', count: '16 записей', desc: 'Расовые и классовые способности с описаниями' },
                  { name: 'backgrounds-ru', label: 'Предыстории (RU)', type: 'Item', count: '13 записей', desc: 'Все 13 предысторий из Книги Игрока' },
                  { name: 'rules-ru', label: 'Правила (RU)', type: 'JournalEntry', count: '1 запись', desc: 'Основные правила: характеристики, бой, отдых, путешествия' },
                ].map(pack => (
                  <div key={pack.name} className="flex items-start gap-4 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="bg-gray-600 rounded-lg p-2 text-center min-w-[60px]">
                      <div className="text-xs text-gray-400">{pack.type === 'Item' ? '📦' : '📖'}</div>
                      <div className="text-[10px] text-gray-500">{pack.type}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{pack.label}</span>
                        <code className="text-xs bg-gray-600 px-2 py-0.5 rounded text-gray-400">{pack.name}</code>
                        <span className="text-xs text-amber-400">{pack.count}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{pack.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Races Detail */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🧬 Расы</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'Человек', bonuses: '+1 ко всем', traits: 'Универсальность' },
                  { name: 'Эльф', bonuses: '+2 Лвк', traits: 'Тёмное зрение, Наследие Фей, Транс' },
                  { name: 'Дварф', bonuses: '+2 Тел', traits: 'Тёмное зрение, Стойкость, Знание камня' },
                  { name: 'Полурослик', bonuses: '+2 Лвк', traits: 'Везучий, Храбрый, Проворство' },
                  { name: 'Драконорождённый', bonuses: '+2 Сил, +1 Хар', traits: 'Оружие дыхания, Сопротивление' },
                  { name: 'Гном', bonuses: '+2 Инт', traits: 'Тёмное зрение, Гномья хитрость' },
                  { name: 'Полуэльф', bonuses: '+2 Хар', traits: 'Тёмное зрение, Наследие Фей' },
                  { name: 'Полуорк', bonuses: '+2 Сил, +1 Тел', traits: 'Неукротимая стойкость, Свирепые атаки' },
                  { name: 'Тифлинг', bonuses: '+2 Хар, +1 Инт', traits: 'Адское сопротивление, Инфернальное наследие' },
                ].map(race => (
                  <div key={race.name} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="font-medium text-white text-sm">{race.name}</div>
                    <div className="text-xs text-amber-400 mt-1">{race.bonuses}</div>
                    <div className="text-xs text-gray-400 mt-1">{race.traits}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Classes Detail */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">⚔️ Классы</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: 'Варвар', die: 'к12', caster: false },
                  { name: 'Бард', die: 'к8', caster: true },
                  { name: 'Жрец', die: 'к8', caster: true },
                  { name: 'Друид', die: 'к8', caster: true },
                  { name: 'Воин', die: 'к10', caster: false },
                  { name: 'Монах', die: 'к8', caster: false },
                  { name: 'Паладин', die: 'к10', caster: true },
                  { name: 'Следопыт', die: 'к10', caster: true },
                  { name: 'Плут', die: 'к8', caster: false },
                  { name: 'Чародей', die: 'к6', caster: true },
                  { name: 'Колдун', die: 'к8', caster: true },
                  { name: 'Волшебник', die: 'к6', caster: true },
                ].map(cls => (
                  <div key={cls.name} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-white text-sm">{cls.name}</div>
                      <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded">{cls.die}</span>
                    </div>
                    {cls.caster && <div className="text-xs text-purple-400 mt-1">✨ Заклинатель</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-6">
            {/* File Structure */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📁 Структура модуля</h2>
              <p className="text-sm text-gray-400 mb-4">
                Модуль следует официальным стандартам Foundry VTT для модулей:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 border border-gray-700 overflow-x-auto">
                <pre>{`dnd5e-2014-ru/
├── module.json              ← Манифест модуля (обязательный)
├── README.md                ← Документация
├── CHANGELOG.md             ← Список изменений
├── LICENSE                  ← Лицензия MIT
├── lang/
│   └── ru.json              ← Локализация (200+ ключей)
├── scripts/
│   └── dnd5e-2014-ru.mjs    ← ES Module (главный скрипт)
├── styles/
│   └── dnd5e-2014-ru.css    ← Стили модуля
└── packs/                   ← Компендиумы (NeDB формат)
    ├── races-ru.db           ← Расы
    ├── classes-ru.db         ← Классы
    ├── items-ru.db           ← Предметы
    ├── spells-ru.db          ← Заклинания
    ├── features-ru.db        ← Способности
    ├── backgrounds-ru.db     ← Предыстории
    └── rules-ru.db           ← Правила (журнал)`}</pre>
              </div>
            </div>

            {/* module.json */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📋 module.json (ключевые поля)</h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 border border-gray-700 overflow-x-auto">
                <pre>{`{
  "id": "dnd5e-2014-ru",
  "title": "D&D 5e (2014) — Полная редакция на русском",
  "version": "1.0.0",
  "compatibility": {
    "minimum": "13",
    "verified": "13.351",
    "maximum": "13"
  },
  "esmodules": ["scripts/dnd5e-2014-ru.mjs"],
  "styles": ["styles/dnd5e-2014-ru.css"],
  "languages": [{ "lang": "ru", "name": "Русский", "path": "lang/ru.json" }],
  "relationships": {
    "systems": [{
      "id": "dnd5e",
      "type": "system",
      "compatibility": { "minimum": "4.0.0", "verified": "4.1.0" }
    }]
  },
  "packs": [
    { "name": "races-ru", "label": "Расы (RU)", "type": "Item", "system": "dnd5e", ... },
    { "name": "classes-ru", "label": "Классы (RU)", "type": "Item", "system": "dnd5e", ... },
    ...
  ],
  "packFolders": [{
    "name": "D&D 5e (2014) — Русский",
    "color": "#8B0000",
    "packs": ["rules-ru", "races-ru", "classes-ru", ...]
  }]
}`}</pre>
              </div>
            </div>

            {/* Hooks */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🪝 Хуки и события</h2>
              <div className="space-y-3">
                {[
                  { hook: 'init', desc: 'Регистрация настроек, API модуля' },
                  { hook: 'ready', desc: 'Автозаполнение компендиумов, приветственное сообщение' },
                  { hook: 'renderItemSheet', desc: 'Перевод элементов интерфейса предметов' },
                  { hook: 'renderChatMessage', desc: 'Перевод типов урона в чате' },
                ].map(h => (
                  <div key={h.hook} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-purple-300 bg-gray-800 px-2 py-0.5 rounded">Hooks.on("{h.hook}")</code>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🔄 Соответствие стандартам Foundry VTT</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-gray-400">Требование</th>
                      <th className="text-left py-2 text-gray-400">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700/50"><td className="py-2">module.json в корне</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">ES Module (.mjs)</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">Компендиумы в packs/</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">Локализация в lang/</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">Стили в styles/</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">packFolders для организации</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">relationships для зависимостей</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">compatibility field</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr className="border-b border-gray-700/50"><td className="py-2">manifest + download URLs</td><td className="py-2 text-green-400">✅</td></tr>
                    <tr><td className="py-2">Hooks для инициализации</td><td className="py-2 text-green-400">✅</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            D&D 5e (2014) — Полная редакция на русском языке для Foundry VTT 13.351
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Dungeons & Dragons является торговой маркой Wizards of the Coast LLC.
            Данный модуль создан сообществом и распространяется бесплатно.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Совместимо с Foundry VTT 13.351 | Система dnd5e v4.x | Редакция 2014 | ES Module (.mjs)
          </p>
        </div>
      </footer>
    </div>
  );
}
