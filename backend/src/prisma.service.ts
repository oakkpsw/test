import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // await this.$connect();
    try {
      await this.$connect();
      // const data = await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      // log error
      console.log(error);
      console.log('keys: ', Object.keys(error));
      console.log('error.errorCode: ', error.errorCode);
      console.log('error.code: ', error.code);
      console.error(JSON.stringify(error, null, 2));
    }
  }
}
