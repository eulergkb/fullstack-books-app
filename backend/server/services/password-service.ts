import * as bcrypt from "bcrypt";

class PasswordService {
  constructor(private saltRounds: number) {}

  hashPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, this.saltRounds);
  }

  isSamePassword(hashedPassword: string, plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default new PasswordService(10);
