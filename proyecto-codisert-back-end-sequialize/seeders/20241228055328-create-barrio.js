'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('barrio', [
      { Barrio: '12 De Abril', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: '14 De Julio', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: '20 De Junio', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: '6 De Enero', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Alfonso Lopez Michelsen', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Alfonso Lopez Pumarejo', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Americas', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Andalucia', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Antonio Nariño', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Bahia', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Bellavista', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Bolivar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Bosque', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Brisas Del Mar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Brisas Del Pacifico', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Buenos Aires', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Cabal Pombo', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Caldas', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Camilo Torres', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Campin', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Cascajal', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Centenario', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Centro', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Ciudadela Colpuertos', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Ciudadela Nueva Buenaventura', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Colinas de Comfamar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Colon', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Comfamar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Cordoba', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Cristal', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Dona Ceci', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Cambio', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Carmen', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Dorado', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Progreso', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Ruiz', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'El Triunfo', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Eucaristico', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Firme', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Fortaleza', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Gaitan', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Galeon', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Gran Colombiana', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Independencia', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Inmaculada', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Jardin', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Jorge', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Juan 23', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Kennedy', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'La Campiña', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'La Comuna', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'La Dignidad', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'La Libertad', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'La Piña', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Las Palmas', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Lleras', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Los Alamos', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Los Pinos', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Manglares', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Maria Eugenia', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Matias Mulumba', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Miraflores', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Miramar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Modelo', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Muroyusti', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Naval', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nayita', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nueva Colombia', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nueva Floresta', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nueva Frontera', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nueva Granada', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nuevo Amanecer', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Nuevo Horizonte', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Obrero', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Olimpico', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Oriente', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Paloseco', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Pampalinda', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Panamericano', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Playita', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Porvenir', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Pueblo Nuevo', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Puertas Del Mar', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Punta Del Este', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Rockefeller', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'San Buenaventura', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'San Francisco', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'San Luis', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Santa Cruz', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Santa Fe', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Santa Rosa', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Transformacion', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Trapiche', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Turbay Ayala', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Union De Vivienda', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Urb. San Antonio 1', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Urb. San Antonio 2', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Urbanizacion Los Angeles', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Uribe Uribe', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Viento Libre', createdAt: new Date(), updatedAt: new Date() },
      { Barrio: 'Vista Hermosa', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('barrio', null, {});
  }
};
