import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Friend, FriendRelations, Address} from '../models';
import {AddressRepository} from './address.repository';

export class FriendRepository extends DefaultCrudRepository<
  Friend,
  typeof Friend.prototype.id,
  FriendRelations
> {

  public readonly addresses: HasManyRepositoryFactory<Address, typeof Friend.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Friend, dataSource);
    this.addresses = this.createHasManyRepositoryFactoryFor('addresses', addressRepositoryGetter,);
    this.registerInclusionResolver('addresses', this.addresses.inclusionResolver);
  }
}
