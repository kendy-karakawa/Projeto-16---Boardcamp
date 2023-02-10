import { Router } from "express";
import { listCustomers, listCustomersById, postCustomer, setCustomer } from "../controller/customersController.js";
import { validateSchema } from "../middleware/validationSchema.js";
import { postCustomerSchema } from "../schema/customersSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers)
customersRouter.get("/customers/:id",listCustomersById )
customersRouter.post("/customers",validateSchema(postCustomerSchema), postCustomer)
customersRouter.put("/customers/:id",validateSchema(postCustomerSchema), setCustomer)

export default customersRouter;