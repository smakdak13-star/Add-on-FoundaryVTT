/**
 * Предзагрузка Handlebars-шаблонов
 */
export async function preloadTemplates() {
  const templatePaths = [
    'modules/dnd5e-2014-ru/templates/actor-sheet.hbs',
    'modules/dnd5e-2014-ru/templates/parts/header.hbs',
    'modules/dnd5e-2014-ru/templates/parts/abilities.hbs',
    'modules/dnd5e-2014-ru/templates/parts/combat.hbs',
    'modules/dnd5e-2014-ru/templates/parts/skills.hbs',
    'modules/dnd5e-2014-ru/templates/parts/inventory.hbs',
    'modules/dnd5e-2014-ru/templates/parts/spells.hbs',
    'modules/dnd5e-2014-ru/templates/parts/features.hbs',
    'modules/dnd5e-2014-ru/templates/parts/biography.hbs'
  ];
  return loadTemplates(templatePaths);
}
