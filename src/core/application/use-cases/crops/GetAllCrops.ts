import { ICropRepository } from "@/src/core/domain/repositories/ICropRepository";
import { Crop } from "@/src/core/domain/entities/Crop";

export class GetAllCropsUseCase {
    constructor(private cropRepository: ICropRepository) {}

    async execute(): Promise<Crop[]> {
        try {
            const crops = await this.cropRepository.getAllCrop();
            // Additional business logic can be added here if needed
            // For example, filtering or sorting crops based on certain criteria

            return crops.sort((a,b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        } catch (error) {
            console.error("Error fetching crops:", error);
            throw new Error("Failed to retrieve crops");
        }
    }
}