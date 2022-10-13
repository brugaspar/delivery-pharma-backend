import { prisma } from "../infra/prisma/connection";

interface CustomerProps {
  name: string;
  phone?: string;
  type: "customer" | "employee" | "delivery";
}

interface FindAllProps {
  search?: string;
  type?: string;
}

class CustomersRepository {
  async create(customer: CustomerProps) {
    const stored = await prisma.customer.create({
      data: customer,
    });

    return stored;
  }

  async findAll({ search, type }: FindAllProps) {
    const customers = await prisma.customer.findMany({
      where: {
        name: {
          contains: search,
        },
        type: {
          equals: type,
        },
      },
    });

    return customers;
  }

  async findById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async update(id: string, customer: CustomerProps) {
    const stored = await prisma.customer.update({
      where: {
        id,
      },
      data: customer,
    });

    return stored;
  }
}

export default new CustomersRepository();
