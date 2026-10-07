/**
 * Лист персонажа D&D 5e (2014) — Русский
 */
export class DnD5e2014CharacterSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['dnd5e', 'sheet', 'actor', 'character', 'dnd5e-2014-ru'],
      template: 'modules/dnd5e-2014-ru/templates/actor-sheet.hbs',
      width: 820,
      height: 780,
      tabs: [{
        navSelector: '.sheet-tabs',
        contentSelector: '.sheet-body',
        initial: 'character'
      }],
      dragDrop: [{ dragSelector: '.item-list .item', dropSelector: null }]
    });
  }

  /** @override */
  get template() {
    if (!game.user.isGM && this.actor.limited) {
      return 'modules/dnd5e-2014-ru/templates/actor-sheet-limited.hbs';
    }
    return 'modules/dnd5e-2014-ru/templates/actor-sheet.hbs';
  }

  /** @override */
  async getData() {
    const context = super.getData();
    const actorData = this.actor.toObject(false);

    context.system = actorData.system;
    context.flags = actorData.flags;
    context.rollData = this.actor.getRollData();

    // Характеристики
    context.abilities = Object.entries(actorData.system.abilities || {}).map(([key, abl]) => ({
      key,
      ...abl,
      label: this._getAbilityLabel(key),
      mod: Math.floor((abl.value - 10) / 2),
      modString: Math.floor((abl.value - 10) / 2) >= 0
        ? `+${Math.floor((abl.value - 10) / 2)}`
        : `${Math.floor((abl.value - 10) / 2)}`,
      proficient: abl.proficient || 0
    }));

    // Навыки
    context.skills = Object.entries(actorData.system.skills || {}).map(([key, skl]) => ({
      key,
      ...skl,
      label: this._getSkillLabel(key),
      abilityLabel: this._getAbilityLabel(this._getSkillAbility(key)),
      bonus: this._getSkillBonus(key),
      passive: 10 + this._getSkillBonus(key)
    }));

    // Спасброски
    context.savingThrows = Object.entries(actorData.system.abilities || {}).map(([key, abl]) => ({
      key,
      label: this._getAbilityLabel(key),
      mod: Math.floor((abl.value - 10) / 2) + (abl.proficient ? (actorData.system.attributes?.prof || 2) : 0),
      proficient: abl.proficient || 0
    }));

    // Предметы по категориям
    context.inventory = this._categorizeItems();

    // Заклинания
    context.spells = this._organizeSpells(actorData);

    // Способности и черты
    context.features = this._organizeFeatures();

    // Данные для вкладок
    context.biography = actorData.system.details?.biography || {};
    context.traits = actorData.system.traits || {};
    context.currency = actorData.system.currency || {};

    // Боевые параметры
    context.combat = {
      hp: actorData.system.attributes?.hp || { value: 0, max: 0, temp: 0 },
      ac: actorData.system.attributes?.ac || { value: 10 },
      initiative: Math.floor(((actorData.system.abilities?.dex?.value || 10) - 10) / 2),
      speed: actorData.system.attributes?.movement?.walk || 30,
      proficiency: actorData.system.attributes?.prof || 2,
      death: actorData.system.attributes?.death || { success: 0, failure: 0 },
      inspiration: actorData.system.details?.inspiration || false,
      exhaustion: actorData.system.attributes?.exhaustion || 0
    };

    // Пассивное восприятие
    context.passivePerception = 10 + this._getSkillBonus('prc');
    context.passiveInvestigation = 10 + this._getSkillBonus('inv');

    // Редакция
    context.edition = '2014';

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Кнопки бросков характеристик
    html.find('.ability-roll').click(this._onAbilityRoll.bind(this));

    // Кнопки бросков спасбросков
    html.find('.save-roll').click(this._onSaveRoll.bind(this));

    // Кнопки бросков навыков
    html.find('.skill-roll').click(this._onSkillRoll.bind(this));

    // Кнопки бросков хитов
    html.find('.death-save-roll').click(this._onDeathSave.bind(this));

    // Кнопки отдыха
    html.find('.short-rest').click(this._onShortRest.bind(this));
    html.find('.long-rest').click(this._onLongRest.bind(this));

    // Кнопки управления предметами
    html.find('.item-create').click(this._onItemCreate.bind(this));
    html.find('.item-edit').click(this._onItemEdit.bind(this));
    html.find('.item-delete').click(this._onItemDelete.bind(this));
    html.find('.item-roll').click(this._onItemRoll.bind(this));

    // Переключение владения
    html.find('.proficiency-toggle').click(this._onToggleProficiency.bind(this));

    // Броски заклинаний
    html.find('.spell-roll').click(this._onSpellRoll.bind(this));

    // Вдохновение
    html.find('.inspiration-toggle').click(this._onToggleInspiration.bind(this));
  }

  /* -------------------------------------------- */
  /*  Переводы                                     */
  /* -------------------------------------------- */

  _getAbilityLabel(key) {
    const labels = {
      str: 'Сила', dex: 'Ловкость', con: 'Телосложение',
      int: 'Интеллект', wis: 'Мудрость', cha: 'Харизма'
    };
    return labels[key] || key;
  }

  _getSkillLabel(key) {
    const labels = {
      acr: 'Акробатика', ani: 'Обращение с животными', arc: 'Магия',
      ath: 'Атлетика', dec: 'Обман', his: 'История',
      ins: 'Проницательность', itm: 'Запугивание', inv: 'Расследование',
      med: 'Медицина', nat: 'Природа', prc: 'Восприятие',
      prf: 'Выступление', per: 'Убеждение', rel: 'Религия',
      slt: 'Ловкость рук', ste: 'Скрытность', sur: 'Выживание'
    };
    return labels[key] || key;
  }

  _getSkillAbility(key) {
    const abilities = {
      acr: 'dex', ani: 'wis', arc: 'int', ath: 'str', dec: 'cha',
      his: 'int', ins: 'wis', itm: 'cha', inv: 'int', med: 'wis',
      nat: 'int', prc: 'wis', prf: 'cha', per: 'cha', rel: 'int',
      slt: 'dex', ste: 'dex', sur: 'wis'
    };
    return abilities[key] || 'str';
  }

  _getSkillBonus(key) {
    const abilityKey = this._getSkillAbility(key);
    const abilityValue = this.actor.system.abilities?.[abilityKey]?.value || 10;
    const abilityMod = Math.floor((abilityValue - 10) / 2);
    const skillProf = this.actor.system.skills?.[key]?.value || 0;
    const profBonus = this.actor.system.attributes?.prof || 2;
    return abilityMod + (skillProf * profBonus);
  }

  /* -------------------------------------------- */
  /*  Организация данных                           */
  /* -------------------------------------------- */

  _categorizeItems() {
    const items = this.actor.items.contents;
    return {
      weapons: items.filter(i => i.type === 'weapon'),
      equipment: items.filter(i => i.type === 'equipment'),
      consumables: items.filter(i => i.type === 'consumable'),
      tools: items.filter(i => i.type === 'tool'),
      containers: items.filter(i => i.type === 'container'),
      loot: items.filter(i => i.type === 'loot')
    };
  }

  _organizeSpells(actorData) {
    const spells = this.actor.items.filter(i => i.type === 'spell');
    const spellbook = {};

    for (const spell of spells) {
      const level = spell.system.level || 0;
      if (!spellbook[level]) spellbook[level] = [];
      spellbook[level].push({
        ...spell,
        levelLabel: level === 0 ? 'Заговор' : `${level}-й круг`,
        prepared: spell.system.preparation?.prepared || false,
        uses: spell.system.uses || {}
      });
    }

    // Ячейки заклинаний
    const spellSlots = actorData.system.spells || {};

    return { spellbook, spellSlots };
  }

  _organizeFeatures() {
    const items = this.actor.items.contents;
    return {
      classes: items.filter(i => i.type === 'class'),
      feats: items.filter(i => i.type === 'feat'),
      backgrounds: items.filter(i => i.type === 'background'),
      races: items.filter(i => i.type === 'race' || i.type === 'species')
    };
  }

  /* -------------------------------------------- */
  /*  Обработчики событий                          */
  /* -------------------------------------------- */

  async _onAbilityRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const abilityKey = element.dataset.ability;
    const label = this._getAbilityLabel(abilityKey);
    await this.actor.rollAbility(abilityKey, { flavor: `Проверка характеристики: ${label}` });
  }

  async _onSaveRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const abilityKey = element.dataset.ability;
    const label = this._getAbilityLabel(abilityKey);
    await this.actor.rollAbility(abilityKey, { flavor: `Спасбросок: ${label}` });
  }

  async _onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const skillKey = element.dataset.skill;
    const label = this._getSkillLabel(skillKey);
    await this.actor.rollSkill(skillKey, { flavor: `Проверка навыка: ${label}` });
  }

  async _onDeathSave(event) {
    event.preventDefault();
    if (this.actor.system.attributes?.death) {
      await this.actor.rollDeathSave();
    }
  }

  async _onShortRest(event) {
    event.preventDefault();
    await this.actor.shortRest();
  }

  async _onLongRest(event) {
    event.preventDefault();
    await this.actor.longRest();
  }

  async _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const type = element.dataset.type || 'loot';
    const typeLabels = {
      weapon: 'новое оружие',
      equipment: 'новое снаряжение',
      consumable: 'новый расходник',
      tool: 'новый инструмент',
      container: 'новый контейнер',
      loot: 'новый предмет',
      spell: 'новое заклинание',
      feat: 'новая способность'
    };
    const itemData = {
      name: typeLabels[type] || 'Новый предмет',
      type,
      system: {}
    };
    return await Item.create(itemData, { parent: this.actor });
  }

  async _onItemEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item')?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  async _onItemDelete(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item')?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const confirmed = await Dialog.confirm({
      title: 'Удаление предмета',
      content: `<p>Вы уверены, что хотите удалить <strong>${item.name}</strong>?</p>`
    });
    if (confirmed) await item.delete();
  }

  async _onItemRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item')?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) await item.roll();
  }

  async _onToggleProficiency(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const key = element.dataset.key;
    const type = element.dataset.type; // 'ability' or 'skill'

    if (type === 'skill') {
      const current = this.actor.system.skills?.[key]?.value || 0;
      const newValue = (current + 1) % 3; // 0 -> 1 -> 2 -> 0
      await this.actor.update({ [`system.skills.${key}.value`]: newValue });
    } else if (type === 'ability') {
      const current = this.actor.system.abilities?.[key]?.proficient || 0;
      await this.actor.update({ [`system.abilities.${key}.proficient`]: current ? 0 : 1 });
    }
  }

  async _onSpellRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item')?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) await item.roll();
  }

  async _onToggleInspiration(event) {
    event.preventDefault();
    const current = this.actor.system.details?.inspiration || false;
    await this.actor.update({ 'system.details.inspiration': !current });
  }
}
