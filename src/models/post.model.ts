import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model()
export class Post extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  content?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
  user?: UserWithRelations;
}

export type PostWithRelations = Post & PostRelations;
