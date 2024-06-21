-- CreateTable
CREATE TABLE "PlanExercise" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "rest_between_sets" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "TrainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
