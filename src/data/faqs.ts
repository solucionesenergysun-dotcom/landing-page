export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Instalan en zona rural?',
    answer: 'Sí, totalmente. Nuestra sede está en Agustín Codazzi, Cesar, y cubrimos fincas, parcelas, veredas y zonas montañosas de la Serranía del Perijá y municipios vecinos (Becerril, La Jagua de Ibirico, San Diego, La Paz, Curumaní). Contamos con vehículos 4x4 y equipo técnico capacitado para trasladar estructuras, paneles y bombas a terrenos de difícil acceso.'
  },
  {
    id: 'faq-2',
    question: '¿Cómo puedo cotizar?',
    answer: 'Es muy sencillo: puedes usar nuestro cotizador interactivo en la app para calcular la potencia estimada, o escribirnos directamente a nuestro WhatsApp (+57 301 497 1307). Solo necesitamos saber qué electrodomésticos deseas alimentar (o la profundidad de tu pozo y cabezas de ganado para bombeo). Te enviamos una propuesta detallada en menos de 2 horas sin ningún compromiso.'
  },
  {
    id: 'faq-3',
    question: '¿Venden suministros eléctricos y repuestos?',
    answer: 'Sí. En nuestro almacén físico en Agustín Codazzi mantenemos inventario permanente de cables solares certificados RETIE, cables concéntricos, inversores híbridos de onda pura, baterías de ciclo profundo (GEL y Litio), controladores MPPT, reflectores solares LED, impulsores para cercas ganaderas, varillas de puesta a tierra y protecciones térmicas y DPS.'
  },
  {
    id: 'faq-4',
    question: '¿Qué garantía tienen los paneles y bombas solares?',
    answer: 'Ofrecemos garantías directas respaldadas por fabricantes certificados: 12 años de garantía de producto y 25 años de rendimiento de generación al 80%+ en paneles solares Tier 1. En bombas sumergibles ofrecemos 2 años de garantía directa y soporte técnico local permanente con repuestos originales.'
  },
  {
    id: 'faq-5',
    question: '¿Los sistemas solares funcionan en días nublados o lluviosos?',
    answer: 'Sí. Los paneles solares modernos monocristalinos capturan la radiación difusa incluso bajo nubosidad. Además, si tu sistema incluye banco de baterías de ciclo profundo o litio, acumulas energía durante las horas de mayor sol para garantizar electricidad ininterrumpida las 24 horas del día, 7 días a la semana.'
  },
  {
    id: 'faq-6',
    question: '¿Cómo funciona la bomba sumergible solar sin baterías?',
    answer: 'Los sistemas de bombeo solar directo conectan los paneles fotovoltaicos al controlador inteligente MPPT y a la bomba de agua. La bomba arranca automáticamente al salir el sol y llena un tanque elevado o reservorio durante el día. De esta forma, el agua almacenada actúa como tu "batería natural", eliminando el costo de mantenimiento de acumuladores químicos.'
  }
];
