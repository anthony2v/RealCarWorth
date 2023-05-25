import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public create(email: string, password: string): Promise<UserEntity> {
    // we create a UserEntity instance here to facilitate typeorm logging hooks
    const userEntity: UserEntity = this.repository.create({ email, password });
    return this.repository.save(userEntity);
  }

  public find(email: string): Promise<UserEntity[]> {
    return this.repository.find({ where: { email } });
  }

  public async throwOrFindOne(id: number): Promise<UserEntity> {
    const userEntity: UserEntity | null = await this.repository.findOneBy({
      id,
    });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  public async update(id: number, attributes: Partial<UserEntity>): Promise<UserEntity> {
    const userEntity: UserEntity = await this.throwOrFindOne(id);
    Object.assign(userEntity, attributes);
    return this.repository.save(userEntity);
  }

  public async remove(id: number): Promise<UserEntity> {
    const userEntity: UserEntity = await this.throwOrFindOne(id);
    return this.repository.remove(userEntity);
  }
}
