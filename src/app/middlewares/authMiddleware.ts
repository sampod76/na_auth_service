import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { ENUM_STATUS } from "../../global/enum_constant_type";
import { jwtHelpers } from "../../helper/jwtHelpers";
import ApiError from "../errors/ApiError";
import { validateUserInDbOrRedis } from "../modules/allUser/user/user.utils";
import { redisClient } from "../redis/redis";
// Dedicated Redis service
const getUserFromCache = async (token: string) => {
  const cachedUser = await redisClient.get(token);
  return cachedUser ? JSON.parse(cachedUser) : null;
};
//
const cacheUser = async (token: string, data: any, ttl: number) => {
  if (ttl > 0) {
    await redisClient.set(token, JSON.stringify(data), "EX", ttl);
  } else {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Your token is expired",
    );
  }
};
// Token verification with TTL calculation
/* const verifyAndGetCacheToken = async (token: string, secret: Secret) => {
  const verifiedUser = jwtHelpers.verifyToken(token, secret);
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const llt = Math.max(verifiedUser.exp! - currentTimestampInSeconds, 0);

  if (llt > 0) {
    verifiedUser.status = ENUM_STATUS.ACTIVE;
    await cacheUser(token, verifiedUser, llt);
  } else {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Your token is expired",
    );
  }
  return verifiedUser;
}; */
const verifyAndGetCacheToken = async (token: string, secret: Secret) => {
  const verifiedUser = jwtHelpers.verifyToken(token, secret);
  const cacheUser = await getUserFromCache(token);
  if (!cacheUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  } else if (cacheUser.status !== ENUM_STATUS.ACTIVE) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Your account is not active",
    );
  } else if (cacheUser.status === ENUM_STATUS.BLOCK) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Your account is blocked",
    );
  } else if (cacheUser.is) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Your account is deleted",
    );
  }
  return verifiedUser;
};

const authMiddleware =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      let verifiedUser = null;
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }

      verifiedUser = await verifyAndGetCacheToken(
        token,
        config.jwt.secret as Secret,
      );
      req.user = verifiedUser;
      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "forbidden access");
      }
      //--validation in database or raids--
      const user = await validateUserInDbOrRedis([verifiedUser?.userId]);
      req.user = {
        ...req.user,
        details: user[0],
      };

      next();
    } catch (error) {
      next(error);
    }
  };

export default authMiddleware;
