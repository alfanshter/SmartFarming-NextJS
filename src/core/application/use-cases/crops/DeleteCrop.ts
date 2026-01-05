import { ICropRepository } from "@/src/core/domain/repositories/ICropRepository";
import { Crop } from "@/src/core/domain/entities/Crop";

export class DeleteCropUseCase {
    constructor(private cropRepository:  ICropRepository) {}

    async execute(id:string) : Promise<void> {
        if (!id) {
            throw new Error("Crop ID is required for deletion");
        }

        try {
            await this.cropRepository.deleteCrop(id);
        } catch (error) {
           console.error("Error deleting crop:", error);
              throw new Error("Failed to delete crop");
        }
    }
}