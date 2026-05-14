const CURRENCIES = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    decimalPlaces: 2,
    indianFormat: true
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    decimalPlaces: 2,
    indianFormat: false
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    decimalPlaces: 2,
    indianFormat: false
  },
  AED: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
    decimalPlaces: 2,
    indianFormat: false
  },
  SAR: {
    code: "SAR",
    symbol: "SAR",
    name: "Saudi Riyal",
    decimalPlaces: 2,
    indianFormat: false
  },
  BDT: {
    code: "BDT",
    symbol: "৳",
    name: "Bangladeshi Taka",
    decimalPlaces: 2,
    indianFormat: false
  },
  PKR: {
    code: "PKR",
    symbol: "₨",
    name: "Pakistani Rupee",
    decimalPlaces: 2,
    indianFormat: false
  },
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    decimalPlaces: 2,
    indianFormat: false
  },
  KES: {
    code: "KES",
    symbol: "KSh",
    name: "Kenyan Shilling",
    decimalPlaces: 2,
    indianFormat: false
  },
  BRL: {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    decimalPlaces: 2,
    indianFormat: false
  },
  ZAR: {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    decimalPlaces: 2,
    indianFormat: false
  },
  MYR: {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    decimalPlaces: 2,
    indianFormat: false
  },
  IDR: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    decimalPlaces: 0,
    indianFormat: false
  },
  PHP: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    decimalPlaces: 2,
    indianFormat: false
  },
  THB: {
    code: "THB",
    symbol: "฿",
    name: "Thai Baht",
    decimalPlaces: 2,
    indianFormat: false
  },
  VND: {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
    decimalPlaces: 0,
    indianFormat: false
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    decimalPlaces: 2,
    indianFormat: false
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    decimalPlaces: 0,
    indianFormat: false
  },
  KRW: {
    code: "KRW",
    symbol: "₩",
    name: "Korean Won",
    decimalPlaces: 0,
    indianFormat: false
  },
  TRY: {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    decimalPlaces: 2,
    indianFormat: false
  },
  RUB: {
    code: "RUB",
    symbol: "₽",
    name: "Russian Ruble",
    decimalPlaces: 2,
    indianFormat: false
  },
  MXN: {
    code: "MXN",
    symbol: "$",
    name: "Mexican Peso",
    decimalPlaces: 2,
    indianFormat: false
  },
  ARS: {
    code: "ARS",
    symbol: "$",
    name: "Argentine Peso",
    decimalPlaces: 2,
    indianFormat: false
  },
  COP: {
    code: "COP",
    symbol: "$",
    name: "Colombian Peso",
    decimalPlaces: 0,
    indianFormat: false
  },
  CLP: {
    code: "CLP",
    symbol: "$",
    name: "Chilean Peso",
    decimalPlaces: 0,
    indianFormat: false
  },
  PEN: {
    code: "PEN",
    symbol: "S/.",
    name: "Peruvian Sol",
    decimalPlaces: 2,
    indianFormat: false
  },
  EGP: {
    code: "EGP",
    symbol: "£",
    name: "Egyptian Pound",
    decimalPlaces: 2,
    indianFormat: false
  },
  GHS: {
    code: "GHS",
    symbol: "₵",
    name: "Ghanaian Cedi",
    decimalPlaces: 2,
    indianFormat: false
  },
  TZS: {
    code: "TZS",
    symbol: "TSh",
    name: "Tanzanian Shilling",
    decimalPlaces: 0,
    indianFormat: false
  },
  UGX: {
    code: "UGX",
    symbol: "USh",
    name: "Ugandan Shilling",
    decimalPlaces: 0,
    indianFormat: false
  },
  ETB: {
    code: "ETB",
    symbol: "Br",
    name: "Ethiopian Birr",
    decimalPlaces: 2,
    indianFormat: false
  },
  XOF: {
    code: "XOF",
    symbol: "CFA",
    name: "West African CFA",
    decimalPlaces: 0,
    indianFormat: false
  },
  MAD: {
    code: "MAD",
    symbol: "MAD",
    name: "Moroccan Dirham",
    decimalPlaces: 2,
    indianFormat: false
  },
  DZD: {
    code: "DZD",
    symbol: "DA",
    name: "Algerian Dinar",
    decimalPlaces: 2,
    indianFormat: false
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  HKD: {
    code: "HKD",
    symbol: "HK$",
    name: "Hong Kong Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  TWD: {
    code: "TWD",
    symbol: "NT$",
    name: "New Taiwan Dollar",
    decimalPlaces: 0,
    indianFormat: false
  },
  NZD: {
    code: "NZD",
    symbol: "NZ$",
    name: "New Zealand Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    decimalPlaces: 2,
    indianFormat: false
  },
  CHF: {
    code: "CHF",
    symbol: "CHF",
    name: "Swiss Franc",
    decimalPlaces: 2,
    indianFormat: false
  },
  SEK: {
    code: "SEK",
    symbol: "kr",
    name: "Swedish Krona",
    decimalPlaces: 2,
    indianFormat: false
  },
  NOK: {
    code: "NOK",
    symbol: "kr",
    name: "Norwegian Krone",
    decimalPlaces: 2,
    indianFormat: false
  },
  DKK: {
    code: "DKK",
    symbol: "kr",
    name: "Danish Krone",
    decimalPlaces: 2,
    indianFormat: false
  },
  PLN: {
    code: "PLN",
    symbol: "zł",
    name: "Polish Zloty",
    decimalPlaces: 2,
    indianFormat: false
  },
  CZK: {
    code: "CZK",
    symbol: "Kč",
    name: "Czech Koruna",
    decimalPlaces: 2,
    indianFormat: false
  },
  HUF: {
    code: "HUF",
    symbol: "Ft",
    name: "Hungarian Forint",
    decimalPlaces: 0,
    indianFormat: false
  },
  RON: {
    code: "RON",
    symbol: "lei",
    name: "Romanian Leu",
    decimalPlaces: 2,
    indianFormat: false
  },
  BYN: {
    code: "BYN",
    symbol: "Br",
    name: "Belarusian Ruble",
    decimalPlaces: 2,
    indianFormat: false
  },
  UAH: {
    code: "UAH",
    symbol: "₴",
    name: "Ukrainian Hryvnia",
    decimalPlaces: 2,
    indianFormat: false
  },
  NPR: {
    code: "NPR",
    symbol: "रू",
    name: "Nepalese Rupee",
    decimalPlaces: 2,
    indianFormat: true
  },
  LKR: {
    code: "LKR",
    symbol: "Rs",
    name: "Sri Lankan Rupee",
    decimalPlaces: 2,
    indianFormat: false
  },
  MMK: {
    code: "MMK",
    symbol: "K",
    name: "Myanmar Kyat",
    decimalPlaces: 0,
    indianFormat: false
  },
  QAR: {
    code: "QAR",
    symbol: "QR",
    name: "Qatari Riyal",
    decimalPlaces: 2,
    indianFormat: false
  },
  KWD: {
    code: "KWD",
    symbol: "KD",
    name: "Kuwaiti Dinar",
    decimalPlaces: 3,
    indianFormat: false
  },
  BHD: {
    code: "BHD",
    symbol: "BD",
    name: "Bahraini Dinar",
    decimalPlaces: 3,
    indianFormat: false
  },
  OMR: {
    code: "OMR",
    symbol: "OMR",
    name: "Omani Rial",
    decimalPlaces: 3,
    indianFormat: false
  },
  IQD: {
    code: "IQD",
    symbol: "IQD",
    name: "Iraqi Dinar",
    decimalPlaces: 0,
    indianFormat: false
  },
  JOD: {
    code: "JOD",
    symbol: "JD",
    name: "Jordanian Dinar",
    decimalPlaces: 3,
    indianFormat: false
  }
};
function formatIndian(n) {
  const parts = n.toFixed(2).split(".");
  const intPart = parts[0];
  const decPart = parts[1];
  let result = "";
  const len = intPart.length;
  if (len <= 3) {
    result = intPart;
  } else {
    result = intPart.slice(-3);
    let remaining = intPart.slice(0, -3);
    while (remaining.length > 2) {
      result = `${remaining.slice(-2)},${result}`;
      remaining = remaining.slice(0, -2);
    }
    if (remaining.length > 0) result = `${remaining},${result}`;
  }
  return decPart ? `${result}.${decPart}` : result;
}
function formatInternational(n, decimals) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
function formatCurrency(amount, currencyCode, useIndianFormat = false) {
  const config = CURRENCIES[currencyCode] ?? {
    symbol: currencyCode,
    decimalPlaces: 2,
    indianFormat: false
  };
  const isIndian = config.indianFormat || useIndianFormat;
  let formatted;
  if (isIndian) {
    const roundedForIndian = Math.abs(amount);
    formatted = formatIndian(roundedForIndian);
    if (config.decimalPlaces === 0) formatted = formatted.split(".")[0];
  } else {
    formatted = formatInternational(Math.abs(amount), config.decimalPlaces);
  }
  const withSymbol = `${config.symbol}${formatted}`;
  return amount < 0 ? `-${withSymbol}` : withSymbol;
}
function getCurrencyConfig(currencyCode) {
  return CURRENCIES[currencyCode] ?? {
    code: currencyCode,
    symbol: currencyCode,
    name: currencyCode,
    decimalPlaces: 2,
    indianFormat: false
  };
}
function getAllCurrencies() {
  return Object.values(CURRENCIES).sort((a, b) => a.name.localeCompare(b.name));
}
export {
  getAllCurrencies as a,
  formatCurrency as f,
  getCurrencyConfig as g
};
