import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type Tab = 'install' | 'contents' | 'preview';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('install');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const manifestUrl = window.location.origin + '/foundry-module/module.json';

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
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

      // Загружаем все файлы модуля
      const files = [
        'module.json',
        'README.md',
        'CHANGELOG.md',
        'LICENSE',
        'lang/ru.json',
        'scripts/dnd5e-2014.js',
        'scripts/settings.js',
        'scripts/templates.js',
        'scripts/sheets/character-sheet.js',
        'scripts/data/compendium-data.js',
        'styles/dnd5e-2014.css',
        'templates/actor-sheet.hbs',
        'templates/parts/header.hbs',
        'templates/parts/abilities.hbs',
        'templates/parts/combat.hbs',
        'templates/parts/skills.hbs',
        'templates/parts/inventory.hbs',
        'templates/parts/spells.hbs',
        'templates/parts/features.hbs',
        'templates/parts/biography.hbs'
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
          <div className="flex items-center justify-between">
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

      {/* Version Badge */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-700">
            ✅ Версия 1.0.0
          </span>
          <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700">
            🎲 Foundry VTT 13.351
          </span>
          <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-700">
            📖 Редакция 2014
          </span>
          <span className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-xs font-medium border border-red-700">
            🇷🇺 Русский язык
          </span>
          <span className="bg-amber-900/50 text-amber-300 px-3 py-1 rounded-full text-xs font-medium border border-amber-700">
            ⚙️ Система dnd5e v4.x
          </span>
        </div>
      </div>

      {/* Tabs */}
      <nav className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-1 border-b border-gray-700">
          {[
            { id: 'install' as Tab, label: '📥 Установка', },
            { id: 'contents' as Tab, label: '📚 Содержимое' },
            { id: 'preview' as Tab, label: '🖥️ Превью листа' },
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
                      <span>Перейдите в настройки вашего мира и <strong>активируйте модуль</strong></span>
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
                  <h3 className="text-sm font-bold text-white mb-2">Рекомендуемые:</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>🌐 Последняя версия Foundry VTT</li>
                    <li>📖 Полное понимание правил D&D 5e</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div className="space-y-6">
            {/* Races */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🧬 Расы (9 + подрасы)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'Человек', subraces: [], bonuses: '+1 ко всем' },
                  { name: 'Эльф', subraces: ['Высший', 'Лесной', 'Дроу'], bonuses: '+2 Лвк' },
                  { name: 'Дварф', subraces: ['Горный', 'Холмовой'], bonuses: '+2 Тел' },
                  { name: 'Полурослик', subraces: ['Легконогий', 'Крепкий'], bonuses: '+2 Лвк' },
                  { name: 'Драконорождённый', subraces: [], bonuses: '+2 Сил, +1 Хар' },
                  { name: 'Гном', subraces: ['Лесной', 'Скальный'], bonuses: '+2 Инт' },
                  { name: 'Полуэльф', subraces: [], bonuses: '+2 Хар' },
                  { name: 'Полуорк', subraces: [], bonuses: '+2 Сил, +1 Тел' },
                  { name: 'Тифлинг', subraces: [], bonuses: '+2 Хар, +1 Инт' },
                ].map(race => (
                  <div key={race.name} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="font-medium text-white text-sm">{race.name}</div>
                    <div className="text-xs text-amber-400 mt-1">{race.bonuses}</div>
                    {race.subraces.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        Подрасы: {race.subraces.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Classes */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">⚔️ Классы (12)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'Варвар', die: 'к12', caster: false, primary: 'Сила' },
                  { name: 'Бард', die: 'к8', caster: true, primary: 'Харизма' },
                  { name: 'Жрец', die: 'к8', caster: true, primary: 'Мудрость' },
                  { name: 'Друид', die: 'к8', caster: true, primary: 'Мудрость' },
                  { name: 'Воин', die: 'к10', caster: false, primary: 'Сила/Ловкость' },
                  { name: 'Монах', die: 'к8', caster: false, primary: 'Ловкость' },
                  { name: 'Паладин', die: 'к10', caster: true, primary: 'Сила' },
                  { name: 'Следопыт', die: 'к10', caster: true, primary: 'Ловкость' },
                  { name: 'Плут', die: 'к8', caster: false, primary: 'Ловкость' },
                  { name: 'Чародей', die: 'к6', caster: true, primary: 'Харизма' },
                  { name: 'Колдун', die: 'к8', caster: true, primary: 'Харизма' },
                  { name: 'Волшебник', die: 'к6', caster: true, primary: 'Интеллект' },
                ].map(cls => (
                  <div key={cls.name} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-white text-sm">{cls.name}</div>
                      <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded">{cls.die}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Главная: {cls.primary}</div>
                    {cls.caster && (
                      <div className="text-xs text-purple-400 mt-1">✨ Заклинатель</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🎒 Предметы (40+)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { category: '⚔️ Оружие', count: '15+', items: 'Кинжал, Длинный меч, Двуручный меч, Секира, Рапира, Длинный лук...' },
                  { category: '🛡️ Доспехи', count: '9', items: 'Кожаный, Кольчужная рубаха, Кираса, Полулаты, Кольчужный, Латы...' },
                  { category: '🎒 Снаряжение', count: '10+', items: 'Рюкзак, Верёвка, Факел, Сухой паёк, Бурдюк, Набор целителя...' },
                  { category: '🧪 Зелья', count: '4', items: 'Зелье лечения, Старшего лечения, Высшего лечения, Великого лечения' },
                ].map(cat => (
                  <div key={cat.category} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="font-medium text-white text-sm">{cat.category}</div>
                    <div className="text-xs text-amber-400 mt-1">{cat.count} предметов</div>
                    <div className="text-xs text-gray-400 mt-1 truncate">{cat.items}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spells */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">✨ Заклинания (30+)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { level: 'Заговоры', spells: 'Огненный снаряд, Свет, Волшебная рука, Потусторонний разряд, Руководство...' },
                  { level: '1-й круг', spells: 'Волшебная стрела, Щит, Лечащее слово, Лечение ран, Обнаружение магии, Благословение...' },
                  { level: '2-й круг', spells: 'Туманный шаг, Невидимость, Духовное оружие, Зеркальный образ, Палящий луч...' },
                  { level: '3-й круг', spells: 'Огненный шар, Контрзаклинание, Полёт, Ускорение, Рассеивание магии, Молния...' },
                  { level: '4-й круг', spells: 'Врата измерений, Высшая невидимость, Полиморф, Стена огня...' },
                  { level: '5-й круг', spells: 'Оживление, Конус холода, Воскрешение...' },
                ].map(lvl => (
                  <div key={lvl.level} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="font-medium text-purple-300 text-sm">{lvl.level}</div>
                    <div className="text-xs text-gray-400 mt-1">{lvl.spells}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compendiums */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📚 Компендиумы (5)</h2>
              <div className="space-y-2">
                {[
                  { name: 'Расы D&D 5e (2014) — RU', icon: '🧬', desc: '9 рас с подрасами и расовыми чертами' },
                  { name: 'Классы D&D 5e (2014) — RU', icon: '⚔️', desc: '12 классов с таблицами уровней и способностями' },
                  { name: 'Предметы D&D 5e (2014) — RU', icon: '🎒', desc: 'Оружие, доспехи, снаряжение, зелья, инструменты' },
                  { name: 'Заклинания D&D 5e (2014) — RU', icon: '✨', desc: 'Заговоры и заклинания 1-5 кругов с параметрами' },
                  { name: 'Способности D&D 5e (2014) — RU', icon: '⭐', desc: 'Расовые и классовые способности с описаниями' },
                ].map(pack => (
                  <div key={pack.name} className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <span className="text-2xl">{pack.icon}</span>
                    <div>
                      <div className="font-medium text-white text-sm">{pack.name}</div>
                      <div className="text-xs text-gray-400">{pack.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">🖥️ Превью русского листа персонажа</h2>
              <p className="text-sm text-gray-400 mb-4">
                Так будет выглядеть лист персонажа в Foundry VTT после активации модуля:
              </p>

              {/* Preview Sheet */}
              <div className="bg-gray-900 rounded-xl border border-gray-600 overflow-hidden">
                {/* Sheet Header */}
                <div className="bg-gradient-to-r from-red-900 to-red-800 p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-gray-700 rounded-lg border-2 border-amber-500 flex items-center justify-center text-3xl">
                    🧙
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-amber-300">Эльдар Серебряный Ветер</div>
                    <div className="text-xs text-red-200 mt-1">Полуэльф • Волшебник • Уровень 5 • Нейтральный добрый</div>
                    <div className="flex gap-4 mt-2 text-xs text-red-200">
                      <span>Предыстория: Мудрец</span>
                      <span>Опыт: 6500</span>
                      <span className="text-amber-300 font-bold">Бонус мастерства: +3</span>
                      <span>⭐ Вдохновение</span>
                    </div>
                  </div>
                </div>

                {/* Sheet Tabs */}
                <div className="flex bg-gray-800 border-b border-gray-700">
                  {['👤 Персонаж', '🎒 Инвентарь', '✨ Заклинания', '⭐ Способности', '📝 Биография'].map((tab, i) => (
                    <div key={tab} className={`px-4 py-2 text-xs ${i === 0 ? 'text-amber-300 border-b-2 border-amber-400' : 'text-gray-400'}`}>
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Sheet Body */}
                <div className="p-4 grid grid-cols-2 gap-4">
                  {/* Abilities */}
                  <div>
                    <div className="text-xs text-amber-300 font-bold mb-2 border-b border-gray-700 pb-1">💪 Характеристики</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'Сила', val: 8, mod: -1 },
                        { name: 'Ловкость', val: 14, mod: 2 },
                        { name: 'Телосложение', val: 12, mod: 1 },
                        { name: 'Интеллект', val: 18, mod: 4 },
                        { name: 'Мудрость', val: 13, mod: 1 },
                        { name: 'Харизма', val: 10, mod: 0 },
                      ].map(ab => (
                        <div key={ab.name} className="text-center bg-gray-800 rounded-lg p-2 border border-gray-700">
                          <div className="text-[10px] text-gray-400">{ab.name}</div>
                          <div className="text-lg font-bold text-white">{ab.val}</div>
                          <div className={`text-xs font-bold ${ab.mod >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {ab.mod >= 0 ? '+' : ''}{ab.mod}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combat */}
                  <div>
                    <div className="text-xs text-amber-300 font-bold mb-2 border-b border-gray-700 pb-1">⚔️ Боевые параметры</div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center bg-gray-800 rounded-lg p-2 border border-gray-700">
                        <div className="text-[10px] text-gray-400">КД</div>
                        <div className="text-lg font-bold text-amber-300">13</div>
                      </div>
                      <div className="text-center bg-gray-800 rounded-lg p-2 border border-gray-700">
                        <div className="text-[10px] text-gray-400">Инициатива</div>
                        <div className="text-lg font-bold text-green-400">+2</div>
                      </div>
                      <div className="text-center bg-gray-800 rounded-lg p-2 border border-gray-700">
                        <div className="text-[10px] text-gray-400">Скорость</div>
                        <div className="text-lg font-bold text-blue-400">30</div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Хиты</span>
                        <span>28 / 28</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-xs text-green-400 font-bold">28</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="col-span-2">
                    <div className="text-xs text-amber-300 font-bold mb-2 border-b border-gray-700 pb-1">🎯 Навыки</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {[
                        { name: 'Магия', mod: '+7', prof: true },
                        { name: 'История', mod: '+6', prof: true },
                        { name: 'Расследование', mod: '+7', prof: true },
                        { name: 'Восприятие', mod: '+1', prof: false },
                        { name: 'Проницательность', mod: '+1', prof: false },
                        { name: 'Религия', mod: '+4', prof: false },
                      ].map(skill => (
                        <div key={skill.name} className="flex items-center gap-2 text-xs py-0.5">
                          <div className={`w-3 h-3 rounded-full border ${skill.prof ? 'bg-amber-500 border-amber-400' : 'border-gray-600'}`} />
                          <span className={`font-bold ${parseInt(skill.mod) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{skill.mod}</span>
                          <span className="text-gray-300">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                * Это предварительный просмотр. Фактический вид может отличаться в зависимости от темы Foundry VTT.
              </div>
            </div>

            {/* File Structure */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-amber-300 mb-4">📁 Структура файлов модуля</h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 border border-gray-700">
                <pre>{`dnd5e-2014-ru/
├── module.json          ← Манифест модуля
├── README.md            ← Документация
├── CHANGELOG.md         ← Список изменений
├── LICENSE              ← Лицензия MIT
├── lang/
│   └── ru.json          ← Локализация (500+ строк)
├── scripts/
│   ├── dnd5e-2014.js    ← Главный скрипт
│   ├── settings.js      ← Настройки модуля
│   ├── templates.js     ← Загрузка шаблонов
│   ├── sheets/
│   │   └── character-sheet.js  ← Лист персонажа
│   └── data/
│       └── compendium-data.js  ← Данные компендиумов
├── styles/
│   └── dnd5e-2014.css   ← Стили листа
└── templates/
    ├── actor-sheet.hbs  ← Главный шаблон
    └── parts/
        ├── header.hbs   ← Заголовок
        ├── abilities.hbs ← Характеристики
        ├── combat.hbs   ← Боевые параметры
        ├── skills.hbs   ← Навыки
        ├── inventory.hbs ← Инвентарь
        ├── spells.hbs   ← Заклинания
        ├── features.hbs ← Способности
        └── biography.hbs ← Биография`}</pre>
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
            Совместимо с Foundry VTT 13.351 | Система dnd5e v4.x | Редакция 2014
          </p>
        </div>
      </footer>
    </div>
  );
}
