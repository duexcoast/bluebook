import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { User } from '@prisma/client';
import { UsersService } from '../users.service';

// This is adding currentUser a property
// on the Express Request interface (optional)
// and we're deifning the type as a User Entity instance
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // changed the Request interface to accept currentUser
      req.currentUser = user;
    }

    next();
  }
}
