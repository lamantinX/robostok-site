/**
 * РОБОСТОК — База коммерческих предложений (КП)
 * Для добавления нового КП достаточно добавить объект в KP_DATABASE или использовать встроенный визуальный конструктор.
 */

const KP_DATABASE = {
  "kp-205-for-dmitriy-orlov": {
    id: "205",
    slug: "kp-205-for-dmitriy-orlov",
    pin: "72014",
    clientName: "Дмитрий Орлов",
    clientObject: "Частный дом / Резервное энергоснабжение",
    clientPhone: "+7 985 674 75 74",
    createdDate: "2026-08-31",
    validUntil: "2026-09-10",
    status: "active",
    variants: [
      {
        id: "var-1",
        title: "Вариант 1 (Премиум Резерв + СЭС)",
        description: "Гибридный инвертор Deye 6.6 кВт с накопителем Dyness LiFePO4 5 кВт·ч и солнечной панелью TOPCon",
        items: [
          {
            num: 1,
            name: "Deye SUN-6.6K-OG03LP1-EU-AM2",
            desc: "Однофазный гибридный инвертор номинальной мощностью 6,6 кВт с возможностью подключения ДГУ и чистым синусом 220V",
            qty: 1,
            unit: "шт.",
            price: 98000,
            sum: 98000
          },
          {
            num: 2,
            name: "Dyness DL5.0C Euro Version (LiFePO4 5.12 кВт·ч)",
            desc: "Литий-железо-фосфатная батарея для хранения энергии, ресурс 6000+ циклов (15+ лет), встроенная BMS",
            qty: 1,
            unit: "шт.",
            price: 148300,
            sum: 148300
          },
          {
            num: 3,
            name: "Delta PV TOP 500-54/2BF M210 HC (500 Вт)",
            desc: "Солнечная панель премиум-качества по технологии TOPCon для дневной подзарядки АКБ",
            qty: 1,
            unit: "шт.",
            price: 17600,
            sum: 17600
          }
        ],
        terms: {
          deliveryTime: "В наличии на складе",
          paymentTerms: "50% аванс на закупку / 50% после проверки под нагрузкой",
          paymentMethod: "Официальный договор с ИП (Безналичный / Наличный расчет)",
          deliveryType: "Доставка до объекта включена",
          installation: "Профессиональный монтаж сертифицированными электриками"
        },
        engineerNotes: "Аккумуляторные батареи Dyness укомплектованы заводскими силовыми медными кабелями для подключения к инвертору. Комплекс обеспечивает мгновенный ввод резерва (0–10 мс) без моргания света и сбоев автоматики котла. Оплата вторых 50% производится строго после монтажа и проведения теста под реальной нагрузкой."
      }
    ],
    manager: {
      name: "Дмитрий Орлов",
      role: "Ведущий инженер / Руководитель проектов",
      phoneDisplay: "+7 985 674 75 74",
      phoneTel: "+798****7574",
      telegramUser: "@killa_xx",
      telegramLink: "https://t.me/killa_xx",
      email: "[EMAIL_REDACTED]"
    }
  },
  "kp-101-narodny-rezerv": {
    id: "101",
    slug: "kp-101-narodny-rezerv",
    pin: "12345",
    clientName: "Александр Владимирович",
    clientObject: "Коттедж 160 м² (отопление, скважина, холодильник, освещение)",
    clientPhone: "",
    createdDate: "2026-08-31",
    validUntil: "2026-09-15",
    status: "active",
    variants: [
      {
        id: "var-1",
        title: "Вариант 1 · «Народный Резерв 6.2 кВт» под ключ",
        description: "Гибридный инвертор Sunways 6.2 кВт + LiFePO4 накопитель 5.12 кВт·ч + щит АВР и монтаж",
        items: [
          {
            num: 1,
            name: "Гибридный инвертор Sunways 6.2 кВт (Чистый синус 220V)",
            desc: "Пиковая мощность до 12 кВт для пуска скважинных насосов, встроенный MPPT контроллер 120–450V, бесшумная работа",
            qty: 1,
            unit: "шт.",
            price: 89000,
            sum: 89000
          },
          {
            num: 2,
            name: "Накопительный блок LiFePO4 5.12 кВт·ч (51.2V 100Ah)",
            desc: "Литий-железо-фосфатный аккумулятор, 6000 циклов (15+ лет), встроенная умная BMS с защитой от КЗ и перегрузок",
            qty: 1,
            unit: "шт.",
            price: 135000,
            sum: 135000
          },
          {
            num: 3,
            name: "Щит автоматического ввода резерва (АВР 10 мс) + Байпас",
            desc: "Реле контроля напряжения от высоковольтных скачков, силовые автоматы, рубильник ручного обхода",
            qty: 1,
            unit: "компл.",
            price: 25000,
            sum: 25000
          },
          {
            num: 4,
            name: "Монтаж, силовая кабельная трасса ГОСТ и пусконаладка",
            desc: "Установка в электрощит, гидравлическая опрессовка наконечников, стресс-тест под нагрузкой объекта",
            qty: 1,
            unit: "услуга",
            price: 20000,
            sum: 20000
          }
        ],
        terms: {
          deliveryTime: "В наличии (монтаж за 1 рабочий день)",
          paymentTerms: "50% аванс на закупку / 50% только после проверки под нагрузкой",
          paymentMethod: "Официальный договор с ИП (Безналичный / Наличный расчет)",
          deliveryType: "Доставка на объект включена",
          installation: "Монтаж под ключ с гарантией 36 месяцев"
        },
        engineerNotes: "Система гарантирует 100% совместимость с чувствительными платами газовых котлов (Baxi, Protherm, Vaillant). При отключении сети свет не моргает, компьютеры и роутеры продолжают работать без перезагрузки."
      }
    ],
    manager: {
      name: "Дмитрий Орлов",
      role: "Инженер-энергетик / Руководитель РОБОСТОК",
      phoneDisplay: "+7 985 674 75 74",
      phoneTel: "+798****7574",
      telegramUser: "@killa_xx",
      telegramLink: "https://t.me/killa_xx",
      email: "[EMAIL_REDACTED]"
    }
  }
};

/**
 * Получить КП по ID, Slug или URL
 */
function getProposalByParam(param) {
  if (!param) return null;
  const cleanParam = param.toString().toLowerCase().trim().replace(/\/$/, "");
  
  // 1. Прямой поиск по ключу
  if (KP_DATABASE[cleanParam]) {
    return KP_DATABASE[cleanParam];
  }
  
  // 2. Поиск по ID или Slug
  for (const key in KP_DATABASE) {
    const item = KP_DATABASE[key];
    if (item.id === cleanParam || item.slug.toLowerCase() === cleanParam) {
      return item;
    }
    // Если параметр kp-205, а id 205
    if (cleanParam.replace(/^kp-/, "") === item.id) {
      return item;
    }
  }
  return null;
}
