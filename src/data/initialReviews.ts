import { CustomerReview } from '../types';

export const initialReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Carlos Mendoza',
    city: 'Agustín Codazzi · Vereda San Ramón',
    rating: 5,
    comment: 'Instalamos una bomba sumergible solar de 3 HP para 180 reses. Antes gastábamos una fortuna en combustible para la planta eléctrica; hoy tenemos agua abundante y fresca todo el día sin ruido ni gastos.',
    date: 'Hace 2 semanas',
    projectType: 'Bomba Sumergible Solar',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Dra. María Elena Restrepo',
    city: 'Agustín Codazzi · Casco Urbano',
    rating: 5,
    comment: 'Los cortes de energía en el pueblo afectaban los equipos de refrigeración de nuestra microempresa. Con el sistema híbrido solar con baterías nos olvidamos por completo de los apagones.',
    date: 'Hace 1 mes',
    projectType: 'Sistema Híbrido Residencial/Comercial',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Hernán Darío Baute',
    city: 'Becerril · Finca La Primavera',
    rating: 5,
    comment: 'Excelente atención en el almacén de Codazzi. Compré cables fotovoltaicos, reflectores solares y el impulsor para la cerca. Los asesores conocen de verdad el terreno y las necesidades del ganadero.',
    date: 'Hace 1 mes',
    projectType: 'Suministros y Cerca Solar',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Gustavo Adolfo Díaz',
    city: 'La Jagua de Ibirico · Parcela El Edén',
    rating: 5,
    comment: 'Montaron 12 paneles de 550W y el inversor en solo tres días. Muy formales, organizados y dejaron la instalación con tubería metálica y sus protecciones puestas a tierra de primera.',
    date: 'Hace 2 meses',
    projectType: 'Paneles Solares Aislados',
    verified: true,
  }
];
