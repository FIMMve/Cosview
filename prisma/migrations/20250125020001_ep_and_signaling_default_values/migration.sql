-- AlterTable
ALTER TABLE "ElectricalPrevention" ALTER COLUMN "emergency_lights" SET DEFAULT 0,
ALTER COLUMN "operative_lights" SET DEFAULT 0,
ALTER COLUMN "electric_generator" SET DEFAULT false,
ALTER COLUMN "solar_panel" SET DEFAULT false,
ALTER COLUMN "emergency_batteries" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Signaling" ALTER COLUMN "emergency_exit" SET DEFAULT false,
ALTER COLUMN "electric_risk" SET DEFAULT false,
ALTER COLUMN "fire_extinguisher" SET DEFAULT false,
ALTER COLUMN "first_aid_kit" SET DEFAULT false,
ALTER COLUMN "area_signaling" SET DEFAULT false,
ALTER COLUMN "danger_drop" SET DEFAULT false,
ALTER COLUMN "no_smoking" SET DEFAULT false,
ALTER COLUMN "weapons_prohibition" SET DEFAULT false;
