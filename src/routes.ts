import { Router } from "express";
import categoriesController from "./controllers/categories.controller";
import customersController from "./controllers/customers.controller";
import medicinesController from "./controllers/medicines.controller";

const router = Router();

router.get("/", (_request, response) => {
  const { name, version } = require("../package.json");
  return response.json({
    name,
    version,
  });
});

router.post("/customers", customersController.create);
router.get("/customers", customersController.findAll);
router.get("/customers/:id", customersController.findById);
router.put("/customers/:id", customersController.update);

router.post("/categories", categoriesController.create);
router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.put("/categories/:id", categoriesController.update);

router.post("/medicines", medicinesController.create);
router.get("/medicines", medicinesController.findAll);
router.get("/medicines/:id", medicinesController.findById);
router.put("/medicines/:id", medicinesController.update);

export { router };
