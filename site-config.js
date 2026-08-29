/**
 * Конфигурационный файл настроек и контактов для лендинга и презентации «РОБОСТОК»
 * Все контактные данные, реквизиты, телефоны и ссылки меняются здесь в одном месте.
 */

const SITE_CONFIG = {
  // Основные контакты
  contacts: {
    brandName: "РОБОСТОК",
    brandTagline: "Автономное электропитание и зарядные станции",
    phoneDisplay: "+7 985 674 75 74",
    phoneTel: "+79856747574",
    telegramUser: "@killa_xx",
    telegramLink: "https://t.me/killa_xx",
    email: "info@robostok.ru",
    workHours: "Пн-Вс: 08:00 – 21:00 (Аварийный выезд 24/7)"
  },

  // Юридические реквизиты и география
  legal: {
    entityName: "ИП Орлов Дмитрий Валериевич",
    inn: "930901079909",
    compliance: "152-ФЗ РФ (Защита персональных данных)",
    cityMain: "Донецк",
    addressFull: "г. Донецк, ул. Артема, д. 1",
    regionsServed: "ДНР (Донецк, Макеевка, Мариуполь), Ростовская обл., Москва и вся РФ"
  },

  // Коммерческие условия и гарантии
  commercial: {
    advancePercent: "50%",
    postpayPercent: "50%",
    warrantyPeriod: "12–36 месяцев",
    surveyCost: "0 ₽ (Бесплатный выезд инженера)"
  },

  // Модели оборудования в калькуляторе
  models: [
    { id: "f1200", name: "FOSSiBOT F1200", capacityWh: 1024, maxWatts: 1200, eff: 0.85 },
    { id: "f2400", name: "FOSSiBOT F2400", capacityWh: 2048, maxWatts: 2400, eff: 0.85 },
    { id: "e3800", name: "PECRON E3800LFP", capacityWh: 3840, maxWatts: 3600, eff: 0.88 },
    { id: "f5000", name: "PECRON F5000", capacityWh: 5000, maxWatts: 5000, eff: 0.90 },
    { id: "rezerv", name: "«Народный резерв» 6.2 кВт", capacityWh: 5120, maxWatts: 6200, eff: 0.90 },
    { id: "deye", name: "Deye Премиум 12 кВт 3Ф", capacityWh: 15360, maxWatts: 12000, eff: 0.92 }
  ]
};

// Функция немедленной и отложенной гидратации данных на странице
function applySiteConfig() {
  if (typeof document === 'undefined') return;

  // 1. Телефоны
  document.querySelectorAll('[data-config="phoneDisplay"]').forEach(el => {
    el.textContent = SITE_CONFIG.contacts.phoneDisplay;
  });
  document.querySelectorAll('[data-config="phoneTel"]').forEach(el => {
    el.setAttribute('href', `tel:${SITE_CONFIG.contacts.phoneTel}`);
  });
  document.querySelectorAll('[data-config="phoneButtonHero"]').forEach(el => {
    el.setAttribute('href', `tel:${SITE_CONFIG.contacts.phoneTel}`);
    el.innerHTML = `<span class="material-symbols-outlined text-[18px]">call</span> Позвонить: ${SITE_CONFIG.contacts.phoneDisplay}`;
  });
  document.querySelectorAll('[data-config="phoneButtonCalc"]').forEach(el => {
    el.setAttribute('href', `tel:${SITE_CONFIG.contacts.phoneTel}`);
    el.innerHTML = `<span class="material-symbols-outlined text-[16px]">phone</span> Заказать подбор по телефону ${SITE_CONFIG.contacts.phoneDisplay}`;
  });
  document.querySelectorAll('[data-config="phoneButtonFooter"]').forEach(el => {
    el.setAttribute('href', `tel:${SITE_CONFIG.contacts.phoneTel}`);
    el.textContent = `Вызвать инженера: ${SITE_CONFIG.contacts.phoneDisplay}`;
  });

  // 2. Telegram
  document.querySelectorAll('[data-config="telegramUser"]').forEach(el => {
    el.textContent = SITE_CONFIG.contacts.telegramUser;
  });
  document.querySelectorAll('[data-config="telegramLink"]').forEach(el => {
    el.setAttribute('href', SITE_CONFIG.contacts.telegramLink);
  });

  // 3. Реквизиты
  document.querySelectorAll('[data-config="entityName"]').forEach(el => {
    el.textContent = SITE_CONFIG.legal.entityName;
  });
  document.querySelectorAll('[data-config="inn"]').forEach(el => {
    el.textContent = SITE_CONFIG.legal.inn;
  });
  document.querySelectorAll('[data-config="regionsServed"]').forEach(el => {
    el.textContent = SITE_CONFIG.legal.regionsServed;
  });
}

// Запуск сразу и по готовности DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applySiteConfig);
} else {
  applySiteConfig();
}
window.addEventListener('load', applySiteConfig);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
