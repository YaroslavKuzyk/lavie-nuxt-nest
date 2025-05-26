import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  generateTokens(payload: { sub: number; email: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(user: User, refreshToken: string) {
    const existing = await this.tokenRepository.find({ where: { user } });

    if (existing.length >= 5) {
      const oldest = existing.sort((a, b) => +a.createdAt - +b.createdAt)[0];
      await this.tokenRepository.remove(oldest);
    }

    const token = this.tokenRepository.create({ user, refreshToken });
    return this.tokenRepository.save(token);
  }

  async removeRefreshToken(refreshToken: string) {
    await this.tokenRepository.delete({ refreshToken });
  }

  async validateRefreshToken(token: string): Promise<User | null> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { refreshToken: token },
      relations: ['user'],
    });
    return tokenEntity?.user ?? null;
  }
}
