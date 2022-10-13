import { prisma } from "../infra/prisma/connection";

interface MedicineProps {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUri?: string;
  needsPrescription: boolean;
  prescription?: string;
  categoryId: string;
}

interface FindAllProps {
  search?: string;
  categoryId?: string;
}

class MedicinesRepository {
  async create(medicine: MedicineProps) {
    const stored = await prisma.medicine.create({
      data: medicine,
    });

    return stored;
  }

  async findAll({ search, categoryId }: FindAllProps) {
    const medicines = await prisma.medicine.findMany({
      where: {
        name: { contains: search },
        categoryId,
      },
    });

    return medicines;
  }

  async findById(id: string) {
    const medicine = await prisma.medicine.findUnique({
      where: {
        id,
      },
    });

    return medicine;
  }

  async update(id: string, medicine: MedicineProps) {
    const stored = await prisma.medicine.update({
      where: {
        id,
      },
      data: medicine,
    });

    return stored;
  }
}

export default new MedicinesRepository();
