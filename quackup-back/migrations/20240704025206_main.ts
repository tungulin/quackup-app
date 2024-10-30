import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.bigInteger('telegramId').unsigned().notNullable().unique();
    table.boolean('isBot').defaultTo(false);
    table.string('firstName').notNullable();
    table.string('lastName');
    table.string('username');
    table.string('languageCode');
    table.boolean('isPremium').defaultTo(false);
    table.boolean('addedToAttachmentMenu').defaultTo(false);
    table.boolean('allowsWriteToPm').defaultTo(false);
    table.string('photoUrl');
    table.timestamp('created', { useTz: false }).defaultTo(knex.fn.now()).notNullable();
    table.integer('coinBalance').unsigned().defaultTo(0);
    table.integer('coinDuckBalance').unsigned().defaultTo(0);
    table.string('tonWallet');
  });

  await knex.schema.createTable('ducks', function (table) {
    table.increments('id').primary();
    table.integer('level').notNullable().unique();
    table.integer('price').notNullable().unsigned();
    table.integer('profitPerSecond').notNullable().unsigned();
    table.string('image').notNullable();
  });

  await knex.schema.createTable('userDucks', function (table) {
    table.increments('id').primary();
    table.bigInteger('userId').unsigned().notNullable();
    table.integer('duckId').notNullable();
    table.integer('position').notNullable();

    table.foreign('userId').references('telegramId').inTable('users');
    table.foreign('duckId').references('id').inTable('ducks');
  });

  await knex.schema.createTable('shop', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('count').notNullable();
    table.string('price').notNullable();
    table.string('image').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
