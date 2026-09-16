import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Friend, FriendWithRelations} from './friend.model';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  postcode: string;

  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
    required: true,
  })
  house_number: string;

  @belongsTo(() => Friend)
  friendId: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
  Friend?: FriendWithRelations;
}

export type AddressWithRelations = Address & AddressRelations;
