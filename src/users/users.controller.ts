import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    /**
     * Create a new user and sign in
     */
    @Post('/signup')
    createUser(@Body() body: CreateUserDTO) {
        console.log(body);
    }

    /**
     * Sign in as an existing user
     */
    @Post('/signin')
    login(@Body() body: { email: string, password: string }) {}

    /**
     * Find a user with a given id
     * NOTE: Not needed for the production app, it is for understanding TypeORM
     */

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
