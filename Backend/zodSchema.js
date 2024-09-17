const z = require("zod");

const zodSchema = z.object({
    title: z.string().refine((val) => isNaN(val), {
        message: "Title must be a string and cannot be a number"
    }),
    description: z.string(),

})


module.exports = { zodSchema };