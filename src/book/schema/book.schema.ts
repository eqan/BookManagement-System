import {
  ObjectType,
  Field,
  Int,
} from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  price: number;
}
