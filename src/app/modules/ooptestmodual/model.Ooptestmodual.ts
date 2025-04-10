import { Schema, model } from "mongoose";

import { ENUM_STATUS, STATUS_ARRAY } from "../../../global/enum_constant_type";
import { mongooseIUserRef } from "../allUser/typesAndConst";
import { OoptestmodualModel, IOoptestmodual } from "./interface.Ooptestmodual";

const OoptestmodualSchema = new Schema<IOoptestmodual, OoptestmodualModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    productTitle: String,
    author: mongooseIUserRef,
    serialNumber: {
      type: Number,
    },
    status: {
      type: String,
      enum: STATUS_ARRAY,
      default: ENUM_STATUS.ACTIVE,
    },
    isDelete: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
      virtuals: true,
    },
  },
);
// after findOneAndDelete then data then call this hook
OoptestmodualSchema.post("findOneAndDelete", async function () {
  try {
    // const res = await redisClient.del(ENUM_REDIS_KEY.RIS_All_Categories);
  } catch (error: any) {
    // console.log('🚀 ~ error:', error);
  }
});
// after findOneAndUpdate then data then call this hook
OoptestmodualSchema.post(
  "findOneAndUpdate",
  async function (data: any & { _id: string }, next: any) {
    try {
      // console.log('update');
      next();
    } catch (error: any) {
      next(error);
    }
  },
);
// before save/create then data then call this hook
OoptestmodualSchema.post("save", async function (data: IOoptestmodual, next) {
  try {
    // const res = await redisClient.del(ENUM_REDIS_KEY.RIS_All_Categories);

    next();
  } catch (error: any) {
    next(error);
  }
});

export const Ooptestmodual = model<IOoptestmodual, OoptestmodualModel>(
  "Ooptestmodual",
  OoptestmodualSchema,
);
