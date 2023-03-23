import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) public repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id: id } });
    }

    find(email: string) {
        return this.repo.find({ where: { email: email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOne({ where: { id: id } });
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id: id } });

        return this.repo.remove(user);
    }
}