import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginFormDto } from 'src/dto';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async logout(user: User) {
    user.refreshToken = null;
    this.userRepository.save(user);

    return {
      status: 'success',
    };
  }

  async getNewAccessTokenFromRefreshToken(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY,
    ) as unknown as {
      type: 'access' | 'refresh';
      sub: string;
      name: string;
      iat: number;
      eat: number;
    };

    if (payload.eat < new Date().getTime() || payload.type !== 'refresh') {
      throw new UnauthorizedException({
        status: 'error',
        reason: 'Session Expired',
      });
    }

    const now = new Date();
    const fiveMinutesLater = new Date();

    fiveMinutesLater.setTime(fiveMinutesLater.getTime() + 5 + 60 * 1000);

    const accessToken = jwt.sign(
      {
        type: 'access',
        sub: payload.sub,
        name: payload.name,
        iat: now.getTime(),
        eat: fiveMinutesLater.getTime(),
      },
      process.env.JWT_SECRET_KEY,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(userLoginForm: UserLoginFormDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userLoginForm.userId,
      },
    });

    if (!user || userLoginForm.userId !== userLoginForm.password) {
      throw new UnauthorizedException({
        status: 'error',
        reason: 'UserId and Password did not match',
      });
    }

    const now = new Date();
    const fiveMinutesLater = new Date();
    const oneYearLater = new Date();

    fiveMinutesLater.setTime(fiveMinutesLater.getTime() + 5 + 60 * 1000);
    oneYearLater.setTime(oneYearLater.getTime() + 365 * 24 * 60 * 60 * 1000);

    const accessToken = jwt.sign(
      {
        type: 'access',
        sub: userLoginForm.userId,
        name: `${user.firstName} ${user.lastName}`.trim(),
        iat: now.getTime(),
        eat: fiveMinutesLater.getTime(),
      },
      process.env.JWT_SECRET_KEY,
    );

    const refreshToken = jwt.sign(
      {
        type: 'refresh',
        sub: userLoginForm.userId,
        name: `${user.firstName} ${user.lastName}`.trim(),
        iat: now.getTime(),
        eat: oneYearLater.getTime(),
      },
      process.env.JWT_SECRET_KEY,
    );

    user.refreshToken = refreshToken;

    this.userRepository.save(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async getUserFromRequest(req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
    ) as unknown as {
      type: 'access' | 'refresh';
      sub: string;
      name: string;
      iat: number;
      eat: number;
    };

    if (payload.eat < new Date().getTime() || payload.type === 'refresh') {
      throw new UnauthorizedException({
        status: 'error',
        reason: 'Session Expired',
      });
    }

    let user: User;
    try {
      user = await this.userRepository.findOneOrFail({
        where: {
          id: payload.sub,
          refreshToken: Not(IsNull()),
        },
      });
    } catch {
      throw new UnauthorizedException({
        status: 'error',
        reason: 'Session Expired',
      });
    }

    return user;
  }

  async getCashback(user: User) {
    const userOrders = await this.ordersRepository.find({
      where: {
        userId: user.id,
      },
      select: {
        cashback: true,
      },
    });

    let accumulatedCashback = 0;
    for (const userOrder of userOrders) {
      accumulatedCashback += userOrder.cashback;
    }

    return {
      accumulatedCashback,
    };
  }
}
