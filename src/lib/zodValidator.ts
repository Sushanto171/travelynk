import { ZodObject } from "zod";

export const zodValidator = <T>(payload: T, schema: ZodObject) => {
  const validate = schema.safeParse(payload)

  if (!validate.success && validate.error) {
    const issues = validate.error.issues.map(issue => ({
      message: issue.message,
      field: issue.path[0]
    }))
    return {
      success: false,
      error: issues,
      FormData: payload
    }
  } else {
    return {
      success: true,
      data: validate.data,
      FormData: payload
    }
  }
}