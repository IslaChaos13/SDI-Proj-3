/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('wishlist', table => {
        table.increments('wishlist_id');
        table.integer('user_id').references('user_id').inTable('users').onDelete('CASCADE');

        table.integer('product_id').references('product_id').inTable('product').onDelete('CASCADE');

        table.timestamp('created_at').default(knex.fn.now());
        table.unique(['user_id', 'product_id']);
    })
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('wishlist');

};
