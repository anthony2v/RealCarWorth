import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

    public create(email: string, password: string): Promise<UserEntity> {
        // we create a UserEntity instance here to facilitate typeorm logging hooks
        const userEntity: UserEntity = this.repository.create({ email, password });
        return this.repository.save(userEntity);
    }

    public find(email: string): Promise<UserEntity[]> {
        return this.repository.find({ where: { email } });
    }

    public findOne(id: number): Promise<UserEntity | null> {
        return this.repository.findOneBy({ id });
    }

    public async update(id: number, attributes: Partial<UserEntity>): Promise<UserEntity> {
        const userEntity: UserEntity | null = await this.findOne(id);
        if (!userEntity)
            throw new BadRequestException('User not found');
        Object.assign(userEntity, attributes);
        return this.repository.save(userEntity);
    }

    public async remove(id: number): Promise<UserEntity> {
        const userEntity: UserEntity | null = await this.findOne(id);
        if (!userEntity)
            throw new BadRequestException('User not found');
        return this.repository.remove(userEntity);
    }
}
