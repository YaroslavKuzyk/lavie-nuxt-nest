import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from '../auth/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create(dto.email, hashed);
    const tokens = this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
    await this.tokensService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const tokens = this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
    await this.tokensService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async refresh(token: string) {
    const user = await this.tokensService.validateRefreshToken(token);
    if (!user) throw new UnauthorizedException('Invalid token');

    const tokens = this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
    await this.tokensService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async logout(token: string) {
    await this.tokensService.removeRefreshToken(token);
  }

  async getMe(userId: number) {
    const user = await this.usersService.findById(userId);
    if (user) {
      return {
        id: user.id,
        email: user.email,
        type: user.type,
      };
    }
    return null;
  }
}
