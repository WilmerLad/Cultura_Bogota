export const defaultUsers = [
  
  {
    id: 'u1',
    name: 'Wilmer Ladino',
    email: 'wilmer.ladinom@cun.edu.co',
    password: 'admin123',
    isAdmin: true,
    interests: ['Teatro', 'Ferias', 'Gastronomía'],
    savedEvents: [
      { id: 'e2', title: 'Obra de Teatro: La Casa de Bernarda Alba', date: '2024-07-22' },
      { id: 'e5', title: 'Feria Gastronómica de La Candelaria', date: '2024-08-01' },
    ],
  },
  {
    id: 'u2',
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    password: 'Prueba123',
    isAdmin: false,
    interests: ['Música', 'Cine'],
    savedEvents: [
      { id: 'e1', title: 'Concierto de Rock en el Parque', date: '2024-07-20' },
      { id: 'e3', title: 'Festival de Cine Independiente', date: '2024-07-25' },
    ],
  },
];