import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Token, User])],
  controllers: [AuthController],
  providers: [AuthService, TokensService, UsersService, JwtStrategy],
})
export class AuthModule {}
