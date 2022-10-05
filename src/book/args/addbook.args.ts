import {
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddBookArgs {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field((type) => Int)
  @IsNotEmpty()
  price: number;
}
