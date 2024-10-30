import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('logs', function (table) {
    table.bigIncrements('id').primary();
    table.bigInteger('userId').unsigned();
    table.integer('duckId');
    table.string('type').notNullable();
    table.timestamp('time', { useTz: false }).defaultTo(knex.fn.now()).notNullable();

    table.foreign('userId').references('telegramId').inTable('users');
    table.foreign('duckId').references('id').inTable('ducks');
  });

  await knex.schema.createTable('locks', function (table) {
    table.increments('id').primary();
    table.double('coefficient').notNullable();
    table.integer('duckId').notNullable();
    table.jsonb('lockTime').notNullable();

    table.foreign('duckId').references('id').inTable('ducks');
  });

  await knex.schema.alterTable('userDucks', function (table) {
    table.dropColumn('position');
  });

  await knex.schema.alterTable('ducks', function (table) {
    table.renameColumn('profitPerSecond', 'profitPerMinute');
  });

  await knex.schema.renameTable('userDucks', 'slots');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('logs');
  await knex.schema.dropTable('locks');
  await knex.schema.renameTable('slots', 'userDucks');
  await knex.schema.alterTable('userDucks', function (table) {
    table.integer('position');
  });

  await knex.schema.alterTable('ducks', function (table) {
    table.renameColumn('profitPerMinute', 'profitPerSecond');
  });
}
