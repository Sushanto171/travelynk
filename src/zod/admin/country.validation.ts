import z from "zod";

export const createCountriesArraySchemaZod = z.array(
  z.object({
    code: z.string().nonempty("Country code must be required"),
    name: z.string().nonempty("Country name must be required"),
  })
) 
