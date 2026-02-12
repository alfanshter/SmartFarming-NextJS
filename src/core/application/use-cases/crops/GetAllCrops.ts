import { ICropRepository } from "../../../domain/repositories/ICropRepository";
import { Crop } from "../../../domain/entities/Crop";

export class GetAllCropsUseCase {
    constructor(private cropRepository: ICropRepository) {}

    async execute(): Promise<Crop[]> {
        try {
            const crops = await this.cropRepository.getAllCrops();
            // Additional business logic can be added here if needed
            // For example, filtering or sorting crops based on certain criteria

            return crops.sort((a: Crop, b: Crop) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        } catch (error) {
            console.error("Error fetching crops:", error);
            throw new Error("Failed to retrieve crops");
        }
    }
}