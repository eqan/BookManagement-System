import {
  Args,
  Query,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';

@Resolver((of) => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
  ) {}

  @Query((returns) => [Book])
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query((returns) => Book, { name: 'bookById' })
  getBookById(
    @Args({ name: 'bookId', type: () => Int })
    id: number,
  ) {
    return this.bookService.findBookById(id);
  }

  @Mutation((returns) => String, {
    name: 'deleteBook',
  })
  deleteBookById(
    @Args({ name: 'bookId', type: () => Int })
    id: number,
  ) {
    return this.bookService.deleteBook(id);
  }

  @Mutation((returns) => String, {
    name: 'addBook',
  })
  addBookById(
    @Args('addBookArgs')
    addBookArgs: AddBookArgs,
  ) {
    return this.bookService.addbook(addBookArgs);
  }

  @Mutation((returns) => String, {
    name: 'updateBook',
  })
  updateBook(
    @Args('updateBookArgs')
    updateBookArgs: UpdateBookArgs,
  ) {
    return this.bookService.addbook(
      updateBookArgs,
    );
  }
}
