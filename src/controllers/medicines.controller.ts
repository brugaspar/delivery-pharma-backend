import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import medicinesRepository from "../repositories/medicines.repository";

class MedicinesController {
  async create(request: Request, response: Response) {
    const { name, description, price, stock, imageUri, needsPrescription, prescription, categoryId } = request.body;

    if (!name || !price || !stock || !categoryId) {
      const missingFields = [];

      if (!name) missingFields.push("name");
      if (!price) missingFields.push("price");
      if (!stock) missingFields.push("stock");
      if (!categoryId) missingFields.push("categoryId");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    const medicine = await medicinesRepository.create({
      name,
      description,
      price,
      stock,
      imageUri,
      needsPrescription,
      prescription,
      categoryId,
    });

    return response.status(201).json(medicine);
  }

  async findAll(request: Request, response: Response) {
    const { search, categoryId } = request.query;

    const medicines = await medicinesRepository.findAll({
      search: search ? String(search) : undefined,
      categoryId: categoryId ? String(categoryId) : undefined,
    });

    return response.json(medicines);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const medicine = await medicinesRepository.findById(id);

    if (!medicine) {
      throw new AppError("Medicamento não encontrado", 404);
    }

    return response.json(medicine);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, price, stock, imageUri, needsPrescription, prescription, categoryId } = request.body;

    const stored = await medicinesRepository.findById(id);

    if (!stored) {
      throw new AppError("Medicamento não encontrado", 404);
    }

    const medicine = await medicinesRepository.update(id, {
      name,
      description,
      price,
      stock,
      imageUri,
      needsPrescription,
      prescription,
      categoryId,
    });

    return response.json(medicine);
  }
}

export default new MedicinesController();
