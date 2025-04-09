import express from "express";
import { z } from "zod";
import { ENUM_USER_ROLE } from "../../../global/enums/users";
import authMiddleware from "../../middlewares/authMiddleware";
import parseBodyData from "../../middlewares/utils/parseBodyData";
import validateRequestZod from "../../middlewares/validateRequestZod";
import { uploadAwsS3Bucket } from "../aws/utls.aws";
import { OoptestmodualControllerClass } from "./controller.Ooptestmodual";
import { OoptestmodualValidationClass } from "./validation.Ooptestmodual";

export class OoptestmodualRouteClass {
  public router: express.Router;
  private controller: OoptestmodualControllerClass;
  private validator: OoptestmodualValidationClass;
  constructor() {
    this.controller = new OoptestmodualControllerClass();
    this.validator = new OoptestmodualValidationClass();
    this.router = express.Router();
    this.router
      .route("/")
      // This route is open
      .get(
        authMiddleware(
          ENUM_USER_ROLE.admin,
          ENUM_USER_ROLE.superAdmin,
          ENUM_USER_ROLE.generalUser,
        ),
        this.controller.getAllOoptestmodual,
      )
      .post(
        authMiddleware(
          ENUM_USER_ROLE.admin,
          ENUM_USER_ROLE.superAdmin,
          ENUM_USER_ROLE.generalUser,
        ),
        uploadAwsS3Bucket.array("images"),
        parseBodyData({}),
        validateRequestZod(this.validator.createOoptestmodualZodSchema),
        this.controller.createOoptestmodual,
      );
    this.router.route("/serialnumber-update").patch(
      authMiddleware(
        ENUM_USER_ROLE.admin,
        ENUM_USER_ROLE.superAdmin,
        ENUM_USER_ROLE.generalUser,
      ),

      validateRequestZod(
        z.object({
          body: z.array(z.object({ _id: z.string(), number: z.number() })),
        }),
      ),
      this.controller.updateOoptestmodualSerialNumber,
    );

    this.router
      .route("/:id")
      // This route is open
      .get(
        authMiddleware(
          ENUM_USER_ROLE.admin,
          ENUM_USER_ROLE.superAdmin,
          ENUM_USER_ROLE.generalUser,
        ),
        this.controller.getSingleOoptestmodual,
      )
      .patch(
        authMiddleware(
          ENUM_USER_ROLE.admin,
          ENUM_USER_ROLE.superAdmin,
          ENUM_USER_ROLE.generalUser,
        ),
        uploadAwsS3Bucket.array("images"),
        parseBodyData({}),
        validateRequestZod(this.validator.updateOoptestmodualZodSchema),
        this.controller.updateOoptestmodual,
      )
      .delete(
        authMiddleware(
          ENUM_USER_ROLE.admin,
          ENUM_USER_ROLE.superAdmin,
          ENUM_USER_ROLE.generalUser,
        ),

        this.controller.deleteOoptestmodual,
      );
  }
}
