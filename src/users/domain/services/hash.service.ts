import { HashInterface } from '../interfaces/hash.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService implements HashInterface {
  constructor(private configService: ConfigService) {}

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.configService.get<string>('BCRYPT_SALT'));
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText);
  }
}
