
      import { Model } from 'mongoose';
import { z } from 'zod';
import { I_STATUS, I_YN } from '../../../global/enum_constant_type';
import { IUserRef } from '../allUser/typesAndConst';
import { OoptestmodualValidation } from './validation.Ooptestmodual';

export type IOoptestmodualFilters = {
  searchTerm?: string;
  status?: I_STATUS;
  serialNumber?: number;
  delete?: string;
  children?: string;
  cache?: string;
  isDelete?: string | boolean;
  productId?: string;
  'author.userId'?: string;
  'author.roleBaseUserId'?: string;
  //
  createdAtFrom?: string;
  createdAtTo?: string;
  needProperty?: string;
  //
};

export type IOoptestmodual = z.infer<
  typeof OoptestmodualValidation.createOoptestmodual_BodyData
> &
  z.infer<typeof OoptestmodualValidation.updateOoptestmodual_BodyData> & {
    isDelete: boolean;
    author: IUserRef;
  };

export type OoptestmodualModel = Model<
  IOoptestmodual,
  Record<string, unknown>
>;

      
