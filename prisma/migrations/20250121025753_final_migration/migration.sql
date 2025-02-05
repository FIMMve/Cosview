-- AlterTable
ALTER TABLE "Capacitation" ALTER COLUMN "topic" DROP NOT NULL,
ALTER COLUMN "dynamics" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ElectricalPrevention" ALTER COLUMN "emergency_lights" DROP NOT NULL,
ALTER COLUMN "operative_lights" DROP NOT NULL,
ALTER COLUMN "electric_generator" DROP NOT NULL,
ALTER COLUMN "solar_panel" DROP NOT NULL,
ALTER COLUMN "emergency_batteries" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FireExtinguisher" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "items" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FirstAid" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Inspection" ALTER COLUMN "inspection_date" DROP NOT NULL,
ALTER COLUMN "inspector_name" DROP NOT NULL,
ALTER COLUMN "inspection_notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Signaling" ALTER COLUMN "emergency_exit" DROP NOT NULL,
ALTER COLUMN "electric_risk" DROP NOT NULL,
ALTER COLUMN "fire_extinguisher" DROP NOT NULL,
ALTER COLUMN "first_aid_kit" DROP NOT NULL,
ALTER COLUMN "area_signaling" DROP NOT NULL,
ALTER COLUMN "danger_drop" DROP NOT NULL,
ALTER COLUMN "no_smoking" DROP NOT NULL,
ALTER COLUMN "weapons_prohibition" DROP NOT NULL;
