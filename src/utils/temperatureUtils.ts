
// Temperature conversion functions
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine' | 'reaumur';

export const temperatureUnitLabels: Record<TemperatureUnit, string> = {
  celsius: 'Celsius (°C)',
  fahrenheit: 'Fahrenheit (°F)',
  kelvin: 'Kelvin (K)',
  rankine: 'Rankine (°R)',
  reaumur: 'Réaumur (°Ré)'
};

export const temperatureUnitSymbols: Record<TemperatureUnit, string> = {
  celsius: '°C',
  fahrenheit: '°F',
  kelvin: 'K',
  rankine: '°R',
  reaumur: '°Ré'
};

// Convert from any unit to celsius (base unit for our conversions)
export const toCelsius = (value: number, from: TemperatureUnit): number => {
  if (from === 'celsius') return value;
  
  switch (from) {
    case 'fahrenheit':
      return (value - 32) * 5/9;
    case 'kelvin':
      return value - 273.15;
    case 'rankine':
      return (value - 491.67) * 5/9;
    case 'reaumur':
      return value * 5/4;
    default:
      return value;
  }
};

// Convert from celsius to any other unit
export const fromCelsius = (celsius: number, to: TemperatureUnit): number => {
  if (to === 'celsius') return celsius;
  
  switch (to) {
    case 'fahrenheit':
      return celsius * 9/5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'rankine':
      return (celsius + 273.15) * 9/5;
    case 'reaumur':
      return celsius * 4/5;
    default:
      return celsius;
  }
};

// Convert between any two temperature units
export const convertTemperature = (
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number => {
  if (from === to) return value;
  const celsius = toCelsius(value, from);
  return fromCelsius(celsius, to);
};

// Format temperature with appropriate decimal places
export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  let decimalPlaces = 2;
  if (Math.abs(temp) >= 100) decimalPlaces = 1;
  if (Math.abs(temp) >= 1000) decimalPlaces = 0;
  
  return `${temp.toFixed(decimalPlaces)}${temperatureUnitSymbols[unit]}`;
};

// Heat transfer calculations (basic)
interface HeatTransferParams {
  conductivity: number; // W/(m·K)
  area: number; // m²
  thickness: number; // m
  tempHot: number; // °C
  tempCold: number; // °C
}

export const calculateHeatTransfer = ({
  conductivity,
  area,
  thickness,
  tempHot,
  tempCold
}: HeatTransferParams): number => {
  // Q = k * A * (T_hot - T_cold) / L
  // Returns heat transfer rate in Watts
  return conductivity * area * Math.abs(tempHot - tempCold) / thickness;
};

// Material thermal conductivity values (W/(m·K))
export const materialConductivity: Record<string, number> = {
  copper: 385,
  aluminum: 205,
  iron: 80,
  steel: 50.2,
  concrete: 1.7,
  glass: 0.8,
  wood: 0.13,
  air: 0.026,
  water: 0.6,
  ice: 2.18
};

// Used for educational info
export const temperatureScaleInfo: Record<TemperatureUnit, { description: string, referencePoints: string[] }> = {
  celsius: {
    description: "The Celsius scale is based on water's freezing and boiling points (0°C and 100°C at standard atmospheric pressure).",
    referencePoints: [
      "0°C: Water freezes", 
      "37°C: Human body temperature",
      "100°C: Water boils"
    ]
  },
  fahrenheit: {
    description: "The Fahrenheit scale sets water's freezing point at 32°F and boiling at 212°F, with 180 divisions between them.",
    referencePoints: [
      "32°F: Water freezes", 
      "98.6°F: Human body temperature", 
      "212°F: Water boils"
    ]
  },
  kelvin: {
    description: "The Kelvin is an absolute temperature scale with 0K representing absolute zero, the theoretical absence of all thermal energy.",
    referencePoints: [
      "0K: Absolute zero",
      "273.15K: Water freezes", 
      "373.15K: Water boils"
    ]
  },
  rankine: {
    description: "The Rankine scale is an absolute temperature scale using Fahrenheit degrees, with 0°R at absolute zero.",
    referencePoints: [
      "0°R: Absolute zero",
      "491.67°R: Water freezes", 
      "671.67°R: Water boils"
    ]
  },
  reaumur: {
    description: "The Réaumur scale sets 0°Ré at water's freezing point and 80°Ré at water's boiling point, historically used in Europe.",
    referencePoints: [
      "0°Ré: Water freezes", 
      "80°Ré: Water boils"
    ]
  }
};
