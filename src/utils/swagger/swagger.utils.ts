import prisma from "../../app/share/prisma";
import { parsePrismaSchema } from "./modelConverterDocs";

export const swaggerTags = [
  // use different text icons for different tags
  {
    name: "User",
    description: "👤 User profile related API",
  },
  {
    name: "Auth",
    description: "🔑 Auth related API",
  },
  {
    name: "Auth2",
    description: "🔑 Auth related API Auth2",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaModel: any = prisma;

export const swaggerDefinition = parsePrismaSchema(
  prismaModel._engineConfig.inlineSchema as string,
);
