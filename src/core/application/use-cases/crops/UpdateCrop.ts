import { ICropRepository } from "@/src/core/domain/repositories/ICropRepository";
import { Crop } from "@/src/core/domain/entities/Crop";

export class UpdateCropUseCase {
    constructor(private cropRepository: ICropRepository) {}

    async execute(id: string, data : Partial<Crop>): Promise<Crop>{
        //validation logic can be added here
        if (!id) {
            throw new Error("Crop ID is required for update");
        }

        try {
            return await this.cropRepository.updateCrop(id,data);
        } catch (error) {
            console.error("Error updating crop:", error);
            throw new Error("Failed to update crop");
        }
    }

}