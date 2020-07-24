import {DefaultCrudRepository} from '@loopback/repository';
import {Post, PostRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Post, dataSource);
  }
}
