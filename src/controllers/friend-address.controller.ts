import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Friend,
  Address,
} from '../models';
import {FriendRepository} from '../repositories';

export class FriendAddressController {
  constructor(
    @repository(FriendRepository) protected friendRepository: FriendRepository,
  ) { }

  @get('/friends/{id}/addresses', {
    responses: {
      '200': {
        description: 'Array of Friend has many Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Address)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.friendRepository.addresses(id).find(filter);
  }

  @post('/friends/{id}/addresses', {
    responses: {
      '200': {
        description: 'Friend model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Friend.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInFriend',
            exclude: ['id'],
            optional: ['friendId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.friendRepository.addresses(id).create(address);
  }

  @patch('/friends/{id}/addresses', {
    responses: {
      '200': {
        description: 'Friend.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.friendRepository.addresses(id).patch(address, where);
  }

  @del('/friends/{id}/addresses', {
    responses: {
      '200': {
        description: 'Friend.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.friendRepository.addresses(id).delete(where);
  }
}
