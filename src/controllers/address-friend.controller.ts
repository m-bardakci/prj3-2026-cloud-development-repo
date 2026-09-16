import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Address,
  Friend,
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressFriendController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/friend', {
    responses: {
      '200': {
        description: 'Friend belonging to Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Friend),
          },
        },
      },
    },
  })
  async getFriend(
    @param.path.number('id') id: typeof Address.prototype.id,
  ): Promise<Friend> {
    return this.addressRepository.friend(id);
  }
}
