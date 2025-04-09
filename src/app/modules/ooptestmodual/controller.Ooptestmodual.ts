/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../global/constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';

import { IUserRef } from '../allUser/typesAndConst';
import { RequestToRefUserObject } from '../allUser/user/user.utils';
import { Ooptestmodual_FILTERABLE_FIELDS } from './constant.Ooptestmodual';
import { IOoptestmodual } from './interface.Ooptestmodual';
import { OoptestmodualServiceClass } from './service.Ooptestmodual';

export class OoptestmodualControllerClass {
  public service: OoptestmodualServiceClass;
  constructor() {
    this.service = new OoptestmodualServiceClass();
  }

  createOoptestmodual = catchAsync(async (req: Request, res: Response) => {
    req.body = {
      ...req.body,
      author: RequestToRefUserObject(req.user as IUserRef),
    };
    const result = await this.service.createOoptestmodualByDb(req.body, req);
    sendResponse<IOoptestmodual>(req, res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successful create Ooptestmodual',
      data: result,
    });
  });

  getAllOoptestmodual = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, Ooptestmodual_FILTERABLE_FIELDS);
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result = await this.service.getAllOoptestmodualFromDb(
      filters,
      paginationOptions,
      req,
    );

    sendResponse<IOoptestmodual[]>(req, res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfully Get all Ooptestmodual',
      meta: result.meta,
      data: result.data,
    });
    // next();
  });

  getSingleOoptestmodual = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    /*   if (!globalImport.ObjectId.isValid(id)) {
        throw new ApiError(400, 'invalid id sampod');
      } */

    const filters = pick(req.query, Ooptestmodual_FILTERABLE_FIELDS);

    const result = await this.service.getSingleOoptestmodualFromDb(
      id,
      filters,
      req,
    );

    sendResponse<IOoptestmodual>(req, res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfully get Ooptestmodual',
      data: result,
    });
  });
  updateOoptestmodual = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const result = await this.service.updateOoptestmodualFromDb(
      id,
      updateData,
      req,
    );

    sendResponse<IOoptestmodual>(req, res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfully update Ooptestmodual',
      data: result,
    });
  });
  updateOoptestmodualSerialNumber = catchAsync(
    async (req: Request, res: Response) => {
      const result = await this.service.updateOoptestmodualSerialNumberFromDb(
        req.body,
      );

      sendResponse<IOoptestmodual[]>(req, res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'successfully update Ooptestmodual',
        data: result,
      });
    },
  );

  deleteOoptestmodual = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.deleteOoptestmodualByIdFromDb(
      id,
      req.query,
      req,
    );
    sendResponse<IOoptestmodual>(req, res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfully delete Ooptestmodual',
      data: result,
    });
  });
}
