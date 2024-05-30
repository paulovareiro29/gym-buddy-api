import { Request, Response } from 'express';
import PlanExerciseService from '../../../services/trainingPlan/exercise';
import {
  CreatePlanExerciseRequest,
  FindPlanExerciseRequest,
  PatchPlanExerciseRequest,
  PlanRequest
} from './types';
import { handlePrismaError } from '../../../lib/handle-prisma-error';
import ExerciseService from '../../../services/exercise';
import TrainingPlanService from '../../../services/trainingPlan';

export default class PlanExerciseController {
  static async getAll(_: Request, response: Response) {
    try {
      const planExercises = await PlanExerciseService.getAll();
      return response.success({ data: { planExercises } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindPlanExerciseRequest;
    if (!id) {
      return response.badrequest({ errors: { id: 'ID is required' } });
    }

    const planExercise = await PlanExerciseService.find({ id });

    if (!planExercise) {
      return response.notfound({ errors: { plan_id: 'Plan Exercise not found' } });
    }

    return response.success({ data: { planExercise } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreatePlanExerciseRequest;
    const { plan_id } = request.params as any as PlanRequest;

    if (!body.exercise_id) {
      return response.badrequest({ errors: { exercise_id: 'Exercise ID is required' } });
    }

    if (!body.repetitions) {
      return response.badrequest({ errors: { repetitions: 'Repetition is required' } });
    }

    if (!body.rest_between_sets) {
      return response.badrequest({ errors: { rest_between_sets: 'Rest between is required' } });
    }

    if (!body.sets) {
      return response.badrequest({ errors: { sets: 'Sets are required' } });
    }

    if (!body.day) {
      return response.badrequest({ errors: { day: 'Day is required' } });
    }

    try {
      const plan = await TrainingPlanService.find({ id: plan_id });

      if (!plan) {
        return response.badrequest({ errors: { plan_id: 'Invalid Plan ID provided' } });
      }

      const exercise = await ExerciseService.find({ id: body.exercise_id });

      if (!exercise) {
        return response.badrequest({ errors: { machine_id: 'Invalid Exercise ID provided' } });
      }

      const planExercise = await PlanExerciseService.create({
        plan_id,
        exercise_id: body.exercise_id,
        repetitions: body.repetitions,
        rest_between_sets: body.rest_between_sets,
        sets: body.sets,
        day: body.day
      });

      return response.success({ data: { planExercise } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindPlanExerciseRequest;
    const body = request.body as any as PatchPlanExerciseRequest;

    try {
      if (body.plan_id) {
        const plan = await TrainingPlanService.find({ id: body.plan_id });

        if (!plan) {
          return response.badrequest({ errors: { plan_id: 'Invalid Plan ID provided' } });
        }
      }

      if (body.exercise_id) {
        const exercise = await ExerciseService.find({ id: body.exercise_id });

        if (!exercise) {
          return response.badrequest({ errors: { exercise_id: 'Invalid Exercise ID provided' } });
        }
      }

      const planExercise = await PlanExerciseService.patch(id, {
        plan_id: body.plan_id,
        exercise_id: body.exercise_id,
        repetitions: body.repetitions,
        rest_between_sets: body.rest_between_sets,
        sets: body.sets,
        day: body.day
      });

      return response.success({ data: { planExercise } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params as any as FindPlanExerciseRequest;

    try {
      const planExercise = await PlanExerciseService.delete(id);

      if (!planExercise) {
        return response.notfound({ errors: { plan_id: 'Plan Exercise not found' } });
      }

      return response.success({ data: { planExercise } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
