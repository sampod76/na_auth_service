import { Types } from 'mongoose';
import { z } from 'zod';
import { I_STATUS, STATUS_ARRAY } from '../../../global/enum_constant_type';

export class OoptestmodualValidationClass {
  public readonly createOoptestmodual_BodyData = z
    .object({
      productId: z.string().or(z.instanceof(Types.ObjectId)),
      productTitle: z.string(),
      status: z.enum(STATUS_ARRAY as [I_STATUS, ...I_STATUS[]]).optional(),
      serialNumber: z.number().optional(),
      quantity: z.number().optional(),
    })
    .strict();
  public readonly updateOoptestmodual_BodyData = z.object({
    isDelete: z.boolean().optional(),
  });
  public readonly createOoptestmodualZodSchema = z.object({
    body: this.createOoptestmodual_BodyData,
  });

  public readonly updateOoptestmodualZodSchema = z.object({
    body: this.createOoptestmodual_BodyData
      .merge(this.updateOoptestmodual_BodyData)
      .deepPartial(),
  });
  constructor() {
    // constructor
  }
}
