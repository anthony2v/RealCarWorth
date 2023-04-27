import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

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
  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const userEntity: UserEntity | null = await this.usersService.findOne(id);
    if (!userEntity)
      throw new BadRequestException('User not found');
    return userEntity;
  }

  /**
   * Find all users with the given email
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */

  /**
   * Update a user with the given id
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */

  /**
   * Delete a user with the given id
   * NOTE: Not needed for the production app, it is for understanding TypeORM
   */
}
