import { ICropRepository } from "@/src/core/domain/repositories/ICropRepository";
import { Crop } from "@/src/core/domain/entities/Crop";

export class CreateCropUseCase {
    constructor(private cropRepository: ICropRepository){}

    async execute(
        crop : Omit<Crop,'id' | 'createdAt' | 'updatedAt' >
    ): Promise<Crop> {
        //validation logic can be added here
        this.validateCrop(crop);

        try {
            return await this.cropRepository.createCrop(crop);
        } catch (error) {
            console.error("Error creating crop:", error);
            throw new Error("Failed to create crop");
        }
    }

    private validateCrop(crop: Omit<Crop,'id' | 'createdAt' | 'updatedAt' >) {
        if(!crop.name || crop.name.length < 3){
            throw new Error("Crop name must be at least 3 characters long");
        }

        if (crop.area <=0) {
            throw new Error("Area must be greater than zero");
        }

        if (crop.healthScore <0 || crop.healthScore >100) {
            throw new Error("Health score must be between 0 and 100");
        }

        if (new Date(crop.plantedDate) > new Date(crop.expectedHarvest)) {
            throw new Error("Expected harvest date must be after planted date");
        }

        
    }
}

