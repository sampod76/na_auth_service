import { Types } from 'mongoose';
import { ENUM_REDIS_KEY } from '../../redis/consent.redis';
import {
  RedisAllQueryServiceOop,
  RedisAllSetterServiceOop,
} from '../../redis/service.redis';
import { IOoptestmodual } from './interface.Ooptestmodual';
import { Ooptestmodual } from './model.Ooptestmodual';

export class OoptestmodualOop {
  private id: string;
  cacheData: IOoptestmodual | null = null;
  constructor(id: string) {
    this.id = id.toString();
  }
  async getAndSetCase(patten?: string) {
    const getCase = new RedisAllQueryServiceOop();
    const key = patten || `${ENUM_REDIS_KEY.RIS_Ooptestmodual}${this.id}`;
    const getOoptestmodual = await getCase.getAnyDataByKey(key);
    if (getOoptestmodual) {
      return getOoptestmodual;
    }
    const cacheData = await Ooptestmodual.findOne({
      _id: new Types.ObjectId(this.id),
      isDelete: false,
    });
    if (!cacheData) {
      return null;
    }
    this.cacheData = cacheData;
    const setter = new RedisAllSetterServiceOop();
    await setter.redisSetter([{ key: key, value: cacheData }]);
    return cacheData;
  }
}
