/*
  Warnings:

  - You are about to drop the `_VendorAdvances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VendorAdvances" DROP CONSTRAINT "_VendorAdvances_A_fkey";

-- DropForeignKey
ALTER TABLE "_VendorAdvances" DROP CONSTRAINT "_VendorAdvances_B_fkey";

-- DropTable
DROP TABLE "_VendorAdvances";

-- AddForeignKey
ALTER TABLE "Advance" ADD CONSTRAINT "Advance_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
