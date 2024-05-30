-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ContractCategory" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "MetricType" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PlanExercise" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TrainingPlan" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserPlan" ADD COLUMN     "deleted_on" TIMESTAMP(3);
