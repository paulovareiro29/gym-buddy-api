import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class MetricService {
  // Número de clientes de um PT
  static async getNumberOfClients(trainerId: string): Promise<number> {
    const count = await prisma.contract.count({ where: { provider_id: trainerId } });
    return count;
  }

  // Número de planos de treino criados por um PT
  static async getNumberOfTrainingPlansByTrainer(trainerId: string): Promise<number> {
    const count = await prisma.trainingPlan.count({ where: { creator_id: trainerId } });
    return count;
  }

  // Número de planos de treino de um cliente
  static async getNumberOfTrainingPlansByClient(clientId: string): Promise<number> {
    const count = await prisma.userPlan.count({ where: { user_id: clientId } });
    return count;
  }
}
