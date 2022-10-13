import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import customersRepository from "../repositories/customers.repository";
import { getOnlyNumbers } from "../utils/format.util";

class CustomersController {
  async create(request: Request, response: Response) {
    const { name, phone, type } = request.body;

    if (!name || !phone || !type) {
      const missingFields = [];

      if (!name) missingFields.push("name");
      if (!phone) missingFields.push("phone");
      if (!type) missingFields.push("type");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    const parsedPhone = getOnlyNumbers(phone);

    const customer = await customersRepository.create({ name, phone: parsedPhone, type });

    return response.status(201).json(customer);
  }

  async findAll(request: Request, response: Response) {
    const { search, type } = request.query;

    const customers = await customersRepository.findAll({
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
    });

    return response.json(customers);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Cliente não encontrado", 404);
    }

    return response.json(customer);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, phone, type } = request.body;

    const stored = await customersRepository.findById(id);

    if (!stored) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const parsedPhone = phone ? getOnlyNumbers(phone) : undefined;

    const customer = await customersRepository.update(id, { name, phone: parsedPhone, type });

    return response.json(customer);
  }
}

export default new CustomersController();
