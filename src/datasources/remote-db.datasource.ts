import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'remoteDB',
  connector: 'postgresql',
  url: 'postgres://database_ff6v_user:GbraptCpLFQT2zSi9UsC3zbTjYYdgmHq@dpg-dajtp9p5efls73aaqf6g-a.frankfurt-postgres.render.com/database_ff6v?ssl=true',
  host: 'dpg-dajtp9p5efls73aaqf6g-a.frankfurt-postgres.render.com',
  port: 5432,
  user: 'database_ff6v_user',
  password: 'GbraptCpLFQT2zSi9UsC3zbTjYYdgmHq',
  database: 'database_ff6v'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RemoteDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'remoteDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.remoteDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
