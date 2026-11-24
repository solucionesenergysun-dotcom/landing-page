export interface CodazziZone {
  id: string;
  name: string;
  sector: string;
  hsp: number; // Horas Sol Pico promedio diario
  tariffCOP: number; // Tarifa eléctrica promedio COP/kWh
  monthlySunDays: number;
  description: string;
  powerGridStability: string;
}

export const CODAZZI_ZONES: CodazziZone[] = [
  {
    id: 'urbano',
    name: 'Casco Urbano',
    sector: 'Codazzi Centro / Las Flores / El Carmen',
    hsp: 5.2,
    tariffCOP: 1080,
    monthlySunDays: 30,
    description: 'Excelente radiación solar con cortes frecuentes de red eléctrica.',
    powerGridStability: 'Intermitente (15 a 25 horas de corte/mes)'
  },
  {
    id: 'san_ramon',
    name: 'Vereda San Ramón',
    sector: 'Zona Ganadera Plana / Vía Becerril',
    hsp: 5.4,
    tariffCOP: 1120,
    monthlySunDays: 30,
    description: 'Máxima insolación del municipio, despejado y óptimo para fincas ganaderas.',
    powerGridStability: 'Rural dispersa (alta fluctuación de voltaje)'
  },
  {
    id: 'perija',
    name: 'Serranía del Perijá',
    sector: 'Fincas Cafeteras / Veredas Altas',
    hsp: 4.9,
    tariffCOP: 1250,
    monthlySunDays: 30,
    description: 'Zona de montaña con alta sustitución de plantas diésel o gasolina.',
    powerGridStability: 'Sin red o transformadores aislados'
  },
  {
    id: 'casacara',
    name: 'Casacará',
    sector: 'Corregimiento Sur de Codazzi',
    hsp: 5.3,
    tariffCOP: 1100,
    monthlySunDays: 30,
    description: 'Gran actividad agropecuaria y comercial con alto consumo en refrigeración.',
    powerGridStability: 'Frecuentes caídas de tensión'
  },
  {
    id: 'llerasca',
    name: 'Llerasca',
    sector: 'Corregimiento Norte / Sabana',
    hsp: 5.3,
    tariffCOP: 1090,
    monthlySunDays: 30,
    description: 'Óptima orientación solar para sistemas residenciales e industriales.',
    powerGridStability: 'Red eléctrica regular'
  }
];

export interface SavingsCalculationResult {
  zone: CodazziZone;
  systemSizeKWp: number;
  panelsCount: number;
  monthlySolarGenerationKWh: number;
  currentMonthlyBillCOP: number;
  monthlySavingsCOP: number;
  newMonthlyBillCOP: number;
  savingsPercentage: number;
  annualSavingsCOP: number;
  fiveYearSavingsCOP: number;
  tenYearSavingsCOP: number;
  estimatedSystemCostCOP: number;
  paybackYears: number;
  co2OffsetKgPerMonth: number;
  treesEquivalent: number;
}

export const calculateEnergySavings = (
  zoneId: string,
  systemSizeKWp: number,
  currentMonthlyBillCOP: number,
  batteryType: 'none' | 'gel' | 'lithium' = 'gel'
): SavingsCalculationResult => {
  const zone = CODAZZI_ZONES.find((z) => z.id === zoneId) || CODAZZI_ZONES[0];
  const panelsCount = Math.max(2, Math.ceil((systemSizeKWp * 1000) / 550));

  // Performance ratio (PR) considering ambient temperature in Cesar (34°C - 38°C) = 0.81
  const performanceRatio = 0.81;
  const monthlySolarGenerationKWh = Math.round(systemSizeKWp * zone.hsp * 30 * performanceRatio);

  // Maximum solar savings: can offset up to 94% of bill (6% typically base grid/alumbrado publico connection charge)
  const grossMonthlySavings = monthlySolarGenerationKWh * zone.tariffCOP;
  const maxPossibleSavings = Math.round(currentMonthlyBillCOP * 0.94);
  const monthlySavingsCOP = Math.min(grossMonthlySavings, maxPossibleSavings);

  const newMonthlyBillCOP = Math.max(Math.round(currentMonthlyBillCOP * 0.06), currentMonthlyBillCOP - monthlySavingsCOP);
  const savingsPercentage = currentMonthlyBillCOP > 0 
    ? Math.min(94, Math.round((monthlySavingsCOP / currentMonthlyBillCOP) * 100))
    : 0;

  const annualSavingsCOP = monthlySavingsCOP * 12;

  // Annual electricity inflation estimate in Caribbean Colombia: ~6% per year
  const inflationRate = 0.06;
  let fiveYearSavingsCOP = 0;
  let tenYearSavingsCOP = 0;
  for (let year = 1; year <= 10; year++) {
    const yearSavings = annualSavingsCOP * Math.pow(1 + inflationRate, year - 1);
    if (year <= 5) fiveYearSavingsCOP += yearSavings;
    tenYearSavingsCOP += yearSavings;
  }
  fiveYearSavingsCOP = Math.round(fiveYearSavingsCOP);
  tenYearSavingsCOP = Math.round(tenYearSavingsCOP);

  // System cost estimate
  const inverterKW = systemSizeKWp > 6 ? 8 : systemSizeKWp > 4 ? 5 : systemSizeKWp > 2 ? 3.5 : 2;
  let baseCost = panelsCount * 750000 + inverterKW * 1200000 + 3500000;
  if (batteryType === 'gel') {
    baseCost += 2700000;
  } else if (batteryType === 'lithium') {
    baseCost += 5900000;
  }

  // Payback years
  const paybackYears = annualSavingsCOP > 0 ? Number((baseCost / annualSavingsCOP).toFixed(1)) : 4.0;

  // CO2 offset: 0.475 kg CO2 per kWh in Colombian energy mix
  const co2OffsetKgPerMonth = Math.round(monthlySolarGenerationKWh * 0.475);
  // 1 tree absorbs ~21 kg CO2/year = ~1.75 kg/month
  const treesEquivalent = Math.round(co2OffsetKgPerMonth / 1.75);

  return {
    zone,
    systemSizeKWp,
    panelsCount,
    monthlySolarGenerationKWh,
    currentMonthlyBillCOP,
    monthlySavingsCOP,
    newMonthlyBillCOP,
    savingsPercentage,
    annualSavingsCOP,
    fiveYearSavingsCOP,
    tenYearSavingsCOP,
    estimatedSystemCostCOP: baseCost,
    paybackYears,
    co2OffsetKgPerMonth,
    treesEquivalent
  };
};
