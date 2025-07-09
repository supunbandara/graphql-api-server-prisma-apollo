import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default class BaseService {
  constructor(modelName) {
    if (typeof modelName.name !== "string" || !(modelName.name in prismaClient)) {
      throw new Error(`Invalid Prisma model name: ${modelName.name}`);
    }

    this.model = prismaClient[modelName.name];
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: Number(id) },
    });
  }

  async findByIds(ids) {
    return this.model.findMany({
      where: { id: { in: ids.map(Number) } },
    });
  }

  async findAll(first = 100, offset = 0) {
    return this.model.findMany({
      skip: offset,
      take: first,
    });
  }
}
