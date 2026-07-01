const { faker } = require('@faker-js/faker');

function createProducts(rows){
  let products = [];

  for (let i = 1; i <= rows; i++){

    products.push({

      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      image_url: faker.image.url(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    })
  }
  return products
}

/**


* @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product').del()
  await knex('product').insert(createProducts(3));


};
