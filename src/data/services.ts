import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'solar-panels',
    badge: 'Fotovoltaico',
    title: 'Instalación de paneles solares',
    description: 'Energía limpia para tu hogar, finca o negocio',
    image: '/assets/aistudio/image_301585a4.png',
    gallery: [
      '/assets/aistudio/image_301585a4.png',
      '/assets/aistudio/image_6b9f4977.png'
    ],
    priceNote: 'Consultar precio',
    ctaText: 'Cotizar paneles solares',
    details: {
      features: [
        'Módulos monocristalinos Tier 1 de 550W a 670W de alta eficiencia',
        'Inversores híbridos conmutables con red o baterías de litio',
        'Estructura de montaje en aluminio anodizado resistente a vientos del Caribe',
        'Monitoreo en tiempo real desde la aplicación móvil en tu celular'
      ],
      typicalApplications: 'Casas de campo, fincas lecheras, talleres, almacenes y residencias urbanas en Codazzi.',
      warranty: '12 años de garantía de producto y 25 años en generación lineal al 85%.',
      estimatedDelivery: 'Instalación y puesta en marcha en 3 a 5 días hábiles tras visita técnica.'
    }
  },
  {
    id: 'solar-pumps',
    badge: 'Bombeo Solar',
    title: 'Bombas sumergibles',
    description: 'Agua en el campo sin depender de la red eléctrica',
    image: '/assets/aistudio/image_edfc7328.png',
    gallery: [
      '/assets/aistudio/image_edfc7328.png'
    ],
    priceNote: 'Consultar precio',
    ctaText: 'Cotizar bomba sumergible',
    details: {
      features: [
        'Bombas sumergibles solares de acero inoxidable para pozos profundos',
        'Controlador MPPT inteligente con arranque suave y protección por pozo seco',
        'Caudales desde 1.5 m³/hora hasta más de 25 m³/hora según requerimiento',
        'Operación 100% solar directa con opción de respaldo de motobomba/generador'
      ],
      typicalApplications: 'Abrevaderos de ganado, riego por goteo, llenado de tanques elevados y fincas ganaderas.',
      warranty: '2 años de garantía en motor y electrónica de control.',
      estimatedDelivery: 'Instalación de tubería, cable sumergible y calibración en 2 a 4 días.'
    }
  },
  {
    id: 'supplies-store',
    badge: 'Local Codazzi',
    title: 'Almacén de suministros',
    description: 'Todo lo que necesita tu instalación en un solo lugar',
    image: '/assets/images/service_supplies_store_1791987903690.jpg',
    priceNote: 'Consultar precio',
    ctaText: 'Consultar suministros',
    details: {
      features: [
        'Cables solares fotovoltaicos XLPE 4mm² y 6mm² certificados RETIE',
        'Inversores solares off-grid y on-grid de 1kW a 10kW con entrega inmediata',
        'Baterías de ciclo profundo GEL, AGM y bancos de litio LiFePO4 de 48V',
        'Reflectores solares LED de alta potencia para patios, corrales y vías'
      ],
      typicalApplications: 'Técnicos electricistas, instaladores independientes, mayordomos y ganaderos de la serranía.',
      warranty: 'Garantía directa de almacén con factura legal y asesoría técnica sin costo.',
      estimatedDelivery: 'Disponibilidad inmediata para retiro en Agustín Codazzi o despacho a municipios vecinos.'
    }
  }
];
