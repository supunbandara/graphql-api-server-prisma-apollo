import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import BaseService from "./base.service.js";

const prisma = new PrismaClient();
const HASH_ROUNDS = 12;

class UserService extends BaseService {
  constructor() {
    super(prisma.user);
  }

  async login(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return;
    if (!(await compare(password, user.password))) return;

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async createUser({ fullName, email, password, rePassword, role }) {
    const hashed = await hash(password, HASH_ROUNDS);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashed,
        role: role || "USER",
      },
    });
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async editUser(id, { fullName, email }) {
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== id) {
        throw new Error("Email address exists!");
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        fullName: fullName || undefined,
        email: email || undefined,
      },
    });

    const { password: _, ...safeUser } = updated;
    return safeUser;
  }

  async deleteUser(id) {
    const user = await prisma.user.delete({ where: { id } });
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async findAll() {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }
}

export const userService = new UserService();
