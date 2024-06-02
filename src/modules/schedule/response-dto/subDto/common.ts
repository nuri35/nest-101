import { Expose } from 'class-transformer';

export class CommonFields {
  @Expose({
    name: 'id',
  })
  publicId: number;

  @Expose()
  name: string;
}
