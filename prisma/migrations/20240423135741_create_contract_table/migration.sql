-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "beneficiary_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_contract_beneficiary" ON "Contract"("beneficiary_id");

-- CreateIndex
CREATE INDEX "idx_contract_provider" ON "Contract"("provider_id");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ContractCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
