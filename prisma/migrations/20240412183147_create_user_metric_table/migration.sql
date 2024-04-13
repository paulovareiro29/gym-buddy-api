-- CreateTable
CREATE TABLE "UserMetric" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMetric_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMetric" ADD CONSTRAINT "UserMetric_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetric" ADD CONSTRAINT "UserMetric_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetric" ADD CONSTRAINT "UserMetric_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "MetricType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
