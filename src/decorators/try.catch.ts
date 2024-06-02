import { InternalServerErrorException } from '@nestjs/common';

export function TryCatch(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    };

    return descriptor;
  };
}
