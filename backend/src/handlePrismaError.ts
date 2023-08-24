import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

export function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
): never {
  switch (error.code) {
    case 'P2025':
      throw new NotFoundException('Post not found');
    case 'P2003':
      throw new NotFoundException('No User ID');
    // Add more cases as needed
    default:
      throw error;
  }
}
