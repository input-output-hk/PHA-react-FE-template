import { z } from "zod";
import { ZText, ZNumber, ZBoolean, ZDate, ZEmail, ZPhone, ZPassword, ZUrl, ZHash } from "./zodPrimitives";

// Define a mapping of types to their respective Zod primitives
const typeMap: Record<string, () => z.ZodTypeAny> = {
  string: ZText,
  number: ZNumber,
  boolean: ZBoolean,
  date: ZDate,
  email: ZEmail,
  phone: ZPhone,
  password: ZPassword,
  url: ZUrl,
  hash: ZHash,
};

interface FieldConfig {
  name: string;
  type: string;
}

// Function to create a Zod schema from an object
export const createZodSchemaFromFields = (
  fields: FieldConfig[]
): z.ZodObject<any> => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const { name, type } = field;

    const getZodSchema = typeMap[type];
    if (!getZodSchema) {
      throw new Error(`Unsupported type "${type}" for field "${name}"`);
    }

    schemaShape[name] = getZodSchema();
  });

  return z.object(schemaShape);
};