/**
 * Регистрация настроек модуля
 */
export function registerSettings() {
  game.settings.register('dnd5e-2014-ru', 'enableCustomSheet', {
    name: 'DND5E-2014-RU.SettingsEnableCustomSheet',
    hint: 'DND5E-2014-RU.SettingsEnableCustomSheetHint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });

  game.settings.register('dnd5e-2014-ru', 'autoTranslate', {
    name: 'DND5E-2014-RU.SettingsAutoTranslate',
    hint: 'DND5E-2014-RU.SettingsAutoTranslateHint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
    requiresReload: false
  });

  game.settings.register('dnd5e-2014-ru', 'moduleVersion', {
    name: 'Версия модуля',
    scope: 'world',
    config: false,
    type: String,
    default: '1.0.0'
  });

  game.settings.register('dnd5e-2014-ru', 'edition', {
    name: 'Редакция',
    scope: 'world',
    config: false,
    type: String,
    default: '2014'
  });
}
