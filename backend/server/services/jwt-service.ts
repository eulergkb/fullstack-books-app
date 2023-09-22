import * as jwt from "jsonwebtoken";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

class JwtService {
  constructor(private jwtSecret: string) {}

  signToken(userId: number): string {
    return jwt.sign({ userId }, this.jwtSecret, {
      algorithm: "HS256",
      expiresIn: -1,
    });
  }

  decodeToken(token: string, ignoreExp: boolean = true): JwtPayload | string {
    return jwt.verify(token, this.jwtSecret, {
      ignoreExpiration: ignoreExp,
      algorithms: ["HS256"],
    });
  }
}

export default new JwtService(config.JWT_SECRET);
