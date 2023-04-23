import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

    public create(email: string, password: string): Promise<UserEntity> {
        const user: UserEntity = this.repository.create({ email, password });
        return this.repository.save(user);
    }
}
