import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

    public create(email: string, password: string): Promise<UserEntity> {
        // we create a UserEntity instance here to facilitate typeorm logging hooks
        const user: UserEntity = this.repository.create({ email, password });
        return this.repository.save(user);
    }

    public find(email: string): Promise<UserEntity[]> {
        return this.repository.find({ where: { email } });
    }

    public findOne(id: number): Promise<UserEntity | null> {
        return this.repository.findOneBy({ id });
    }
}
