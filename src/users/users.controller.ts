import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user and sign in
   */
  @Post('/signup')
  createUser(@Body() body: CreateUserDTO): void {
    this.usersService.create(body.email, body.password);
  }

  /**
   * Sign in as an existing user
   */
  @Post('/signin')
  login(@Body() body: { email: string; password: string }) {}

  /**
   * Find a user with a given id
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.throwOrFindOne(id);
  }

  /**
   * Find all users with the given email
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */
  @Get()
  findAllUsers(@Query('email') email: string): Promise<UserEntity[]> {
    return this.usersService.find(email);
  }

  /**
   * Update a user with the given id
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */
  @Patch('/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO): Promise<UserEntity> {
    return this.usersService.update(id, body);
  }

  /**
   * Delete a user with the given id
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */
  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.remove(id);
  }
}
