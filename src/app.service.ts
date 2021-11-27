import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>)
  {

  }

  getAll(): Promise<User[]>
  {
    return this.usersRepository.find({
      relations: ['pets']
    }); // SELECT * from user JOIN pets
  }

  getOneById(id: number): Promise<User>
  {
    try {
      return this.usersRepository.findOneOrFail(id); // SELECT * from user WHERE user.id = id;
    }
    catch( e )
    {
      // handle an error;
      throw e;
    }
  }

  createUser(name: string): Promise<User>
  {
    const newUser = this.usersRepository.create({name}); // const newUser = new User(); newUser.name = name;

    return this.usersRepository.save(newUser); // INSERT
  }

  async updateUser( id: number, name: string): Promise<User>
  {
    const user = await this.getOneById(id);

    user.name = name;

    return this.usersRepository.save(user); // UPDATE
  }

  async deleteUser(id: number): Promise<User>
  {
    const user = await this.getOneById(id);

    return this.usersRepository.remove(user);
  }

  // customQuery()
  // {
  //   return this.usersRepository
  //       .createQueryBuilder('user')
  //       .select('name')
  //       .where()
  // }

  getHello(): string {
    return 'Hello World from Maxim!';
  }
}
