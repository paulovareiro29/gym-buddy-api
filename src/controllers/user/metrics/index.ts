import { Request, Response } from 'express';
import MetricService from '../../../services/user/metrics';

export default class MetricController {
  static async getNumberOfClients(req: Request, res: Response) {
    try {
      const { user_id: trainerId } = req.params;
      const numberOfClients = await MetricService.getNumberOfClients(trainerId);
      return res.status(200).json({ numberOfClients });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getNumberOfTrainingPlansByTrainer(req: Request, res: Response) {
    try {
      const { user_id: trainerId } = req.params;
      const numberOfTrainingPlans = await MetricService.getNumberOfTrainingPlansByTrainer(trainerId);
      return res.status(200).json({ numberOfTrainingPlans });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getNumberOfTrainingPlansByClient(req: Request, res: Response) {
    try {
      const { user_id: clientId } = req.params;
      const numberOfTrainingPlans = await MetricService.getNumberOfTrainingPlansByClient(clientId);
      return res.status(200).json({ numberOfTrainingPlans });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
