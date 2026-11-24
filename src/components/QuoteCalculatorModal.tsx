import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sun, 
  Droplets, 
  Zap, 
  CheckCircle2, 
  MessageSquare, 
  BookmarkCheck, 
  ArrowRight, 
  Shield, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  Leaf, 
  PiggyBank, 
  Flame,
  Gauge
} from 'lucide-react';
import { formatCOP, saveQuote, WHATSAPP_PHONE } from '../utils/storage';
import { CODAZZI_ZONES, calculateEnergySavings, CodazziZone } from '../data/codazziZones';
import confetti from 'canvas-confetti';

interface QuoteCalculatorModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  onQuoteSaved: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  darkMode,
  isOpen,
  onClose,
  initialType = 'solar-panels',
  onQuoteSaved,
}) => {
  const isPumpInitial = initialType === 'solar-pumps';
  const isSavingsInitial = initialType === 'energy-savings';
  
  const [tab, setTab] = useState<'solar' | 'pump' | 'savings'>(
    isSavingsInitial ? 'savings' : isPumpInitial ? 'pump' : 'solar'
  );

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('Agustín Codazzi, Cesar');

  // Solar & Savings inputs
  const [selectedZoneId, setSelectedZoneId] = useState<string>('urbano');
  const [monthlyBillCOP, setMonthlyBillCOP] = useState(450000); // 450k COP monthly
  const [hasBatteries, setHasBatteries] = useState<'none' | 'gel' | 'lithium'>('gel');
  const [systemSizeKWp, setSystemSizeKWp] = useState(3.5); // Slider in savings estimator

  // Pump inputs
  const [wellDepthMeters, setWellDepthMeters] = useState(40);
  const [cattleCount, setCattleCount] = useState(100);
  const [irrigationM3, setIrrigationM3] = useState(10);

  // Selected Codazzi Zone
  const selectedZone = useMemo(() => {
    return CODAZZI_ZONES.find((z) => z.id === selectedZoneId) || CODAZZI_ZONES[0];
  }, [selectedZoneId]);

  // Standard Solar Calculation
  const solarEstimate = useMemo(() => {
    const tariff = selectedZone.tariffCOP;
    const estimatedMonthlyKWh = Math.round(monthlyBillCOP / tariff);
    const dailyKWh = estimatedMonthlyKWh / 30;
    const psh = selectedZone.hsp;
    const requiredKwp = Math.max(1.1, Number(((dailyKWh / psh) * 1.22).toFixed(2)));
    const panelsCount = Math.max(2, Math.ceil((requiredKwp * 1000) / 550));
    
    const inverterKW = requiredKwp > 6 ? 8 : requiredKwp > 4 ? 5 : requiredKwp > 2 ? 3.5 : 2;

    let baseSystemCost = panelsCount * 750000 + inverterKW * 1200000 + 3500000;
    
    if (hasBatteries === 'gel') {
      baseSystemCost += 2700000;
    } else if (hasBatteries === 'lithium') {
      baseSystemCost += 5900000;
    }

    const estimatedAnnualSavings = Math.round(monthlyBillCOP * 12 * 0.92);

    return {
      monthlyKWh: estimatedMonthlyKWh,
      kwp: requiredKwp,
      panelsCount,
      inverterKW,
      costCOP: baseSystemCost,
      annualSavings: estimatedAnnualSavings,
    };
  }, [monthlyBillCOP, hasBatteries, selectedZone]);

  // Energy Savings Estimator Calculation
  const savingsEstimate = useMemo(() => {
    return calculateEnergySavings(selectedZoneId, systemSizeKWp, monthlyBillCOP, hasBatteries);
  }, [selectedZoneId, systemSizeKWp, monthlyBillCOP, hasBatteries]);

  // Pump Calculation
  const pumpEstimate = useMemo(() => {
    const totalDailyLiters = cattleCount * 50 + irrigationM3 * 1000;
    const dailyM3 = Math.round(totalDailyLiters / 1000);
    const flowPerHourM3 = Number((dailyM3 / 6).toFixed(1));

    let hp = 1.0;
    if (wellDepthMeters > 70 || flowPerHourM3 > 5) {
      hp = 3.0;
    } else if (wellDepthMeters > 40 || flowPerHourM3 > 2.5) {
      hp = 2.0;
    }

    const panelsRequired = hp === 3 ? 8 : hp === 2 ? 6 : 4;
    const pumpCostCOP = hp * 3200000 + panelsRequired * 750000 + 4200000;

    return {
      dailyLiters: totalDailyLiters,
      dailyM3,
      flowPerHourM3,
      hp,
      panelsRequired,
      costCOP: pumpCostCOP,
    };
  }, [wellDepthMeters, cattleCount, irrigationM3]);

  if (!isOpen) return null;

  const handleSaveQuote = () => {
    if (tab === 'savings') {
      saveQuote({
        clientName: clientName.trim() || 'Propietario en Codazzi',
        clientLocation: clientLocation.trim() || `Agustín Codazzi (${selectedZone.name})`,
        systemType: hasBatteries === 'none' ? 'solar_on_grid' : 'solar_off_grid',
        powerKW: savingsEstimate.systemSizeKWp,
        panelsCount: savingsEstimate.panelsCount,
        estimatedCostCOP: savingsEstimate.estimatedSystemCostCOP,
        monthlySavingsCOP: savingsEstimate.monthlySavingsCOP,
        codazziZone: selectedZone.name,
        monthlySolarKWh: savingsEstimate.monthlySolarGenerationKWh,
        paybackYears: savingsEstimate.paybackYears,
        tenYearSavingsCOP: savingsEstimate.tenYearSavingsCOP,
        notes: `Estimador de Ahorro: Factura actual ${formatCOP(monthlyBillCOP)}/mes -> Factura solar ${formatCOP(savingsEstimate.newMonthlyBillCOP)}/mes (-${savingsEstimate.savingsPercentage}%) en ${selectedZone.sector}`,
      });
    } else if (tab === 'solar') {
      saveQuote({
        clientName: clientName.trim() || 'Propietario en Codazzi',
        clientLocation: clientLocation.trim() || `Agustín Codazzi (${selectedZone.name})`,
        systemType: hasBatteries === 'none' ? 'solar_on_grid' : 'solar_off_grid',
        powerKW: solarEstimate.kwp,
        panelsCount: solarEstimate.panelsCount,
        estimatedCostCOP: solarEstimate.costCOP,
        monthlySavingsCOP: Math.round(solarEstimate.annualSavings / 12),
        codazziZone: selectedZone.name,
        notes: `Factura mensual actual: ${formatCOP(monthlyBillCOP)} - Baterías: ${hasBatteries} - Sector: ${selectedZone.name}`,
      });
    } else {
      saveQuote({
        clientName: clientName.trim() || 'Ganadero en Codazzi',
        clientLocation: clientLocation.trim() || 'Agustín Codazzi, Cesar',
        systemType: 'bomba_sumergible',
        pumpHP: pumpEstimate.hp,
        panelsCount: pumpEstimate.panelsRequired,
        dailyWaterM3: pumpEstimate.dailyM3,
        estimatedCostCOP: pumpEstimate.costCOP,
        notes: `Pozo a ${wellDepthMeters}m - Ganado: ${cattleCount} reses + ${irrigationM3}m³ riego`,
      });
    }

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });

    onQuoteSaved();
  };

  const handleSendWhatsApp = () => {
    handleSaveQuote();
    let text = '';

    if (tab === 'savings') {
      text = `¡Hola Soluciones en Energía Solar! He utilizado el Estimador de Ahorro Energético para Agustín Codazzi:
- Cliente: ${clientName || 'Cliente interesado'}
- Ubicación / Sector: Agustín Codazzi - ${selectedZone.name} (${selectedZone.sector})
- Radiación solar local: ${selectedZone.hsp} Horas Sol Pico (HSP)
- Tamaño del sistema solar: ${savingsEstimate.systemSizeKWp} kWp (${savingsEstimate.panelsCount} paneles de 550W)
- Baterías: ${hasBatteries === 'none' ? 'Sin baterías (On-Grid)' : hasBatteries === 'gel' ? 'Baterías GEL' : 'Baterías Litio'}
- Factura mensual actual: ${formatCOP(monthlyBillCOP)}/mes
- Factura estimada con Solar: ${formatCOP(savingsEstimate.newMonthlyBillCOP)}/mes (Ahorro de ${savingsEstimate.savingsPercentage}%)
- Ahorro mensual estimado: ${formatCOP(savingsEstimate.monthlySavingsCOP)}/mes
- Ahorro a 10 años: ${formatCOP(savingsEstimate.tenYearSavingsCOP)}
- Retorno de inversión (Payback): ${savingsEstimate.paybackYears} años
- Inversión estimada llave en mano: ${formatCOP(savingsEstimate.estimatedSystemCostCOP)}
Deseo agendar una visita técnica para validar este dimensionamiento en mi propiedad.`;
    } else if (tab === 'solar') {
      text = `¡Hola Soluciones en Energía Solar! He cotizado una instalación solar en su web:
- Cliente: ${clientName || 'Cliente interesado'}
- Ubicación: ${clientLocation} (Sector: ${selectedZone.name})
- Sistema: Solar Fotovoltaico (${hasBatteries === 'none' ? 'Sin baterías' : hasBatteries === 'gel' ? 'Con Baterías GEL' : 'Con Baterías de Litio'})
- Factura promedio actual: ${formatCOP(monthlyBillCOP)}/mes
- Potencia recomendada: ${solarEstimate.kwp} kWp (${solarEstimate.panelsCount} paneles de 550W + Inversor ${solarEstimate.inverterKW} kW)
- Presupuesto estimado: ${formatCOP(solarEstimate.costCOP)}
Deseo agendar visita técnica en Codazzi o recibir la propuesta formal.`;
    } else {
      text = `¡Hola Soluciones en Energía Solar! He cotizado un sistema de bombeo sumergible:
- Cliente: ${clientName || 'Ganadero interesado'}
- Ubicación: ${clientLocation}
- Profundidad del pozo: ${wellDepthMeters} metros
- Demanda de agua: ${pumpEstimate.dailyM3} m³/día (${cattleCount} reses + riego)
- Bomba recomendada: ${pumpEstimate.hp} HP (${pumpEstimate.panelsRequired} paneles solares)
- Presupuesto estimado: ${formatCOP(pumpEstimate.costCOP)}
Deseo conocer la disponibilidad e instalación en mi finca.`;
    }

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-6 ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Cotizador & Estimador Solar
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Agustín Codazzi y Serranía del Cesar • Ingeniería y ahorro en tiempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            aria-label="Cerrar cotizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tab Switchers: Solar, Bomba, Estimador de Ahorro */}
        <div className="px-6 sm:px-8 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 gap-1 sm:gap-0">
            <button
              onClick={() => setTab('solar')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                tab === 'solar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Paneles Solares</span>
            </button>
            <button
              onClick={() => setTab('pump')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                tab === 'pump'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Bomba Sumergible</span>
            </button>
            <button
              onClick={() => setTab('savings')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer relative ${
                tab === 'savings'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-orange-600 dark:text-orange-400 hover:text-orange-700 font-extrabold'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>Estimador de Ahorro</span>
              {tab !== 'savings' && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping absolute top-2 right-2 hidden sm:block"></span>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Client Info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-600 dark:text-slate-300">
                Tu nombre o Finca
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Finca San José / Carlos Mendoza"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-600 dark:text-slate-300">
                Ubicación / Municipio
              </label>
              <input
                type="text"
                value={clientLocation}
                onChange={(e) => setClientLocation(e.target.value)}
                placeholder="Ej: Agustín Codazzi · Vereda San Ramón"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Location in Agustín Codazzi Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Sector o Vereda en Agustín Codazzi (Radiación & Red):</span>
              </label>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {selectedZone.hsp} Horas Sol Pico (HSP)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {CODAZZI_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-900 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs truncate leading-tight">{zone.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {zone.hsp} HSP · ${zone.tariffCOP}/kWh
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Sector activo: <strong>{selectedZone.name}</strong> ({selectedZone.sector}). {selectedZone.description}
            </p>
          </div>

          {/* TAB 1: ENERGY SAVINGS ESTIMATOR FEATURE */}
          {tab === 'savings' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Feature Intro Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Estimador de Ahorro en Factura de Electricidad (Agustín Codazzi)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                    Calcula cuánto dinero dejarás de pagar a la empresa de energía en función de la radiación real de <strong>{selectedZone.name}</strong> ({selectedZone.hsp} HSP) y la potencia de tu sistema fotovoltaico.
                  </p>
                </div>
              </div>

              {/* Slider 1: System Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-500" />
                    <span>Tamaño del Sistema Solar Fotovoltaico:</span>
                  </label>
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {systemSizeKWp} kWp
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                      ({savingsEstimate.panelsCount} paneles de 550W)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="15.0"
                  step="0.5"
                  value={systemSizeKWp}
                  onChange={(e) => setSystemSizeKWp(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>1.5 kWp (Residencial pequeño)</span>
                  <span>5.0 kWp (Finca / Casa grande)</span>
                  <span>15.0 kWp (Comercial / Lácteo)</span>
                </div>
              </div>

              {/* Slider 2: Current Monthly Bill */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>Factura mensual actual que pagas a la red eléctrica:</span>
                  </label>
                  <span className="text-base sm:text-lg font-black text-orange-500 font-mono">
                    {formatCOP(monthlyBillCOP)}/mes
                  </span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="3500000"
                  step="50000"
                  value={monthlyBillCOP}
                  onChange={(e) => setMonthlyBillCOP(Number(e.target.value))}
                  className="w-full accent-orange-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Battery Choice */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Configuración de almacenamiento nocturno:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHasBatteries('none')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      hasBatteries === 'none'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs mb-0.5">On-Grid (Sin Baterías)</div>
                    <div className="text-[10px] text-slate-500">Ahorro máximo de día, menor inversión inicial.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBatteries('gel')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      hasBatteries === 'gel'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs mb-0.5">Baterías Ciclo GEL</div>
                    <div className="text-[10px] text-slate-500">Respaldo frente a apagones continuos de Codazzi.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBatteries('lithium')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      hasBatteries === 'lithium'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs mb-0.5">Batería Litio LiFePO4</div>
                    <div className="text-[10px] text-slate-500">&gt;6.000 ciclos, máxima durabilidad (15+ años).</div>
                  </button>
                </div>
              </div>

              {/* Energy Savings Comparison Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Before vs After Card */}
                <div className={`p-5 rounded-2xl border ${
                  darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-slate-200'
                } flex flex-col justify-between`}>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                      Comparativa de Factura Mensual
                    </span>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                          Factura actual sin solar:
                        </span>
                        <span className="text-base font-bold text-rose-600 dark:text-rose-400 font-mono">
                          {formatCOP(monthlyBillCOP)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                            Nueva factura estimada con Solar:
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            Solo cargo fijo de red
                          </span>
                        </div>
                        <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatCOP(savingsEstimate.newMonthlyBillCOP)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Porcentaje neto de ahorro:</span>
                    <span className="px-2.5 py-1 rounded-full font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-500/30 font-mono text-sm">
                      -{savingsEstimate.savingsPercentage}%
                    </span>
                  </div>
                </div>

                {/* Savings in Money & Payback Card */}
                <div className={`p-5 rounded-2xl border ${
                  darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-emerald-50/80 border-emerald-200'
                } flex flex-col justify-between`}>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-3">
                      Ahorro en tu Bolsillo ({selectedZone.name})
                    </span>
                    
                    <div className="grid grid-cols-2 gap-3 text-center mb-3">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                        <span className="block text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatCOP(savingsEstimate.monthlySavingsCOP)}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Ahorro mensual</span>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                        <span className="block text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatCOP(savingsEstimate.annualSavingsCOP)}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Ahorro por año</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                        <span className="block text-lg font-black text-slate-900 dark:text-white font-mono">
                          {savingsEstimate.paybackYears} años
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Retorno inversión</span>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                        <span className="block text-lg font-black text-amber-500 font-mono">
                          {formatCOP(savingsEstimate.tenYearSavingsCOP)}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Ahorro a 10 años</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{savingsEstimate.co2OffsetKgPerMonth} kg CO₂ evitados/mes</span>
                    </span>
                    <span>~{savingsEstimate.treesEquivalent} árboles equiv.</span>
                  </div>
                </div>

              </div>

              {/* Energy Production Details strip */}
              <div className={`p-4 rounded-2xl border text-xs ${
                darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-100/70 border-slate-200'
              } flex flex-wrap items-center justify-between gap-3`}>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>
                    Generación solar estimada: <strong>{savingsEstimate.monthlySolarGenerationKWh} kWh/mes</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-emerald-500" />
                  <span>
                    Inversión estimada llave en mano: <strong>{formatCOP(savingsEstimate.estimatedSystemCostCOP)}</strong>
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: STANDARD SOLAR CALCULATION */}
          {tab === 'solar' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                    Valor promedio de tu recibo de luz actual (COP):
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatCOP(monthlyBillCOP)}
                  </span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="3500000"
                  step="50000"
                  value={monthlyBillCOP}
                  onChange={(e) => setMonthlyBillCOP(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$150.000 (Consumo básico)</span>
                  <span>$1.500.000</span>
                  <span>$3.500.000+ (Comercial / Finca grande)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Tipo de almacenamiento / Baterías para la noche:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasBatteries('none')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      hasBatteries === 'none'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm mb-1">Sin Baterías (On-Grid)</div>
                    <div className="text-[11px] leading-snug">Genera durante el día y se sincroniza con la red eléctrica.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBatteries('gel')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      hasBatteries === 'gel'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm mb-1">Baterías GEL Ciclo Prof.</div>
                    <div className="text-[11px] leading-snug">Excelente relación costo/beneficio para fincas y casas.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasBatteries('lithium')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      hasBatteries === 'lithium'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm mb-1">Baterías Litio LiFePO4</div>
                    <div className="text-[11px] leading-snug">Vida útil &gt;15 años, máxima durabilidad y cero mantenimiento.</div>
                  </button>
                </div>
              </div>

              {/* Solar Output Card */}
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-emerald-50/70 border-emerald-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Dimensionamiento Recomendado
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSystemSizeKWp(solarEstimate.kwp);
                      setTab('savings');
                    }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Ver simulación de ahorro detallada →</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {solarEstimate.panelsCount}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Paneles 550W</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {solarEstimate.kwp}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Potencia (kWp)</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {solarEstimate.inverterKW} kW
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Inversor Híbrido</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      ~92%
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Ahorro en factura</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Inversión Estimada Llave en Mano:</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCOP(solarEstimate.costCOP)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Ahorro Anual Estimado:</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      +{formatCOP(solarEstimate.annualSavings)}/año
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUMP CALCULATION */}
          {tab === 'pump' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                    Profundidad del pozo (metros):
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {wellDepthMeters} m
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={wellDepthMeters}
                  onChange={(e) => setWellDepthMeters(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                    Número de cabezas de ganado bovino:
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {cattleCount} reses
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={cattleCount}
                  onChange={(e) => setCattleCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                    Agua adicional para riego o vivienda (m³/día):
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {irrigationM3} m³ ({(irrigationM3 * 1000).toLocaleString('es-CO')} L)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={irrigationM3}
                  onChange={(e) => setIrrigationM3(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Pump Output Card */}
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-emerald-50/70 border-emerald-200'
              }`}>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                  Equipo de Bombeo Solar Sugerido
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {pumpEstimate.hp} HP
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Potencia Bomba</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {pumpEstimate.panelsRequired}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Paneles 550W</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {pumpEstimate.dailyM3} m³
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Producción / día</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                    <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {pumpEstimate.flowPerHourM3} m³/h
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Caudal efectivo</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Costo Llave en Mano con Estructura y Bomba:</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCOP(pumpEstimate.costCOP)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Shield className="w-4 h-4" />
                    <span>Garantía de 2 años en bomba</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Buttons */}
        <div className="p-6 sm:p-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSaveQuote}
            className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Guardar en mis cotizaciones</span>
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>
              {tab === 'savings' ? 'Solicitar asesoría de ahorro por WhatsApp' : 'Enviar y cotizar por WhatsApp'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
