# Device Management API - Clean Architecture

## 📁 Struktur Folder

```
src/
├── core/
│   ├── domain/                          # Business Logic Layer
│   │   ├── entities/
│   │   │   └── Device.ts               # Device entity & DTOs
│   │   └── repositories/
│   │       └── IDeviceRepository.ts    # Repository interface
│   │
│   ├── application/                     # Use Cases Layer
│   │   └── use-cases/
│   │       └── devices/
│   │           ├── CreateDevice.ts     # Create device use case
│   │           ├── GetAllDevices.ts    # Get all devices use case
│   │           ├── DeleteDevice.ts     # Delete device use case
│   │           └── UpdateDevice.ts     # Update device use case
│   │
│   └── infrastructure/                  # Infrastructure Layer
│       └── api/
│           ├── apiClient.ts            # Axios instance with interceptors
│           └── repositories/
│               └── DeviceRepository.ts # API implementation
│
└── shared/
    └── hooks/
        └── useDevices.ts               # React hook for device operations
```

## 🏗️ Clean Architecture Layers

### 1️⃣ **Domain Layer** (`core/domain/`)
**Pure business logic - tidak tergantung pada framework apapun**

- **Entities** (`entities/Device.ts`):
  ```typescript
  interface Device {
    id: string;
    name: string;
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
    mqttTopic: string;
    deviceId: string;
    ipAddress: string;
    status: "online" | "offline";
    // ...
  }
  
  interface CreateDeviceDTO {
    name: string;
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
    mqttTopic: string;
  }
  ```

- **Repository Interfaces** (`repositories/IDeviceRepository.ts`):
  ```typescript
  interface IDeviceRepository {
    getAllDevices(): Promise<Device[]>;
    createDevice(device: CreateDeviceDTO): Promise<Device>;
    deleteDevice(id: string): Promise<void>;
    // ...
  }
  ```

### 2️⃣ **Application Layer** (`core/application/`)
**Use cases / business rules**

- **CreateDevice.ts**:
  ```typescript
  export class CreateDevice {
    constructor(private deviceRepository: IDeviceRepository) {}
    
    async execute(deviceData: CreateDeviceDTO): Promise<Device> {
      // Validation
      if (!deviceData.name) throw new Error("Name required");
      // Business logic
      return await this.deviceRepository.createDevice(deviceData);
    }
  }
  ```

### 3️⃣ **Infrastructure Layer** (`core/infrastructure/`)
**Implementation details - API calls, database, dll**

- **DeviceRepository.ts**:
  ```typescript
  export class DeviceRepository implements IDeviceRepository {
    private readonly endpoint = "/devices";
    
    async createDevice(device: CreateDeviceDTO): Promise<Device> {
      const response = await apiClient.post<Device>(this.endpoint, device);
      return response.data;
    }
  }
  ```

- **apiClient.ts**: Axios instance dengan interceptors untuk auth & error handling

### 4️⃣ **Presentation Layer** (`shared/hooks/`)
**React hooks untuk UI**

- **useDevices.ts**:
  ```typescript
  export function useDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const createDevice = async (data: CreateDeviceDTO) => {
      await createDeviceUseCase.execute(data);
      // Update state
    };
    
    return { devices, isLoading, createDevice, ... };
  }
  ```

## 🔄 Data Flow

```
UI Component (page.tsx)
    ↓
React Hook (useDevices.ts)
    ↓
Use Case (CreateDevice.ts) → Validation & Business Logic
    ↓
Repository Interface (IDeviceRepository.ts)
    ↓
Repository Implementation (DeviceRepository.ts)
    ↓
API Client (apiClient.ts)
    ↓
Backend API (http://localhost:3000/devices)
```

## 📡 API Endpoints

### **POST** `/devices`
Create new device

**Request Body:**
```json
{
  "name": "ESP32 Greenhouse A",
  "type": "CONTROLLER",
  "mqttTopic": "device1"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "ESP32 Greenhouse A",
  "type": "CONTROLLER",
  "mqttTopic": "device1",
  "deviceId": "ESP32-001",
  "ipAddress": "192.168.1.100",
  "status": "offline",
  "uptime": "0 hari",
  "lastActive": "2026-02-01T10:30:00Z",
  "createdAt": "2026-02-01T10:30:00Z",
  "updatedAt": "2026-02-01T10:30:00Z"
}
```

### **GET** `/devices`
Get all devices

**Response:**
```json
[
  {
    "id": "123",
    "name": "ESP32 Greenhouse A",
    "type": "CONTROLLER",
    ...
  }
]
```

### **DELETE** `/devices/:id`
Delete device by ID

**Response:** `204 No Content`

### **PUT** `/devices/:id`
Update device

**Request Body:**
```json
{
  "name": "Updated Name",
  "type": "SENSOR"
}
```

## 🎯 Cara Penggunaan

### Di Component:

```typescript
import { useDevices } from "@/src/shared/hooks/useDevices";

export default function DevicesPage() {
  const { 
    devices, 
    isLoading, 
    error, 
    createDevice, 
    deleteDevice 
  } = useDevices();

  const handleAdd = async () => {
    try {
      await createDevice({
        name: "New Device",
        type: "CONTROLLER",
        mqttTopic: "device123"
      });
      console.log("Success!");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return <DeviceList devices={devices} />;
}
```

## ✨ Keuntungan Arsitektur Ini

1. **Separation of Concerns**: Setiap layer punya tanggung jawab jelas
2. **Testable**: Use cases bisa ditest tanpa UI/API
3. **Maintainable**: Mudah ubah implementation tanpa ubah business logic
4. **Scalable**: Mudah tambah fitur baru
5. **Dependency Inversion**: High-level module tidak depend ke low-level

## 🔧 Error Handling

- **Use Case Layer**: Validation errors
- **Repository Layer**: API/Network errors
- **Hook Layer**: UI state management
- **API Client**: Global error handling (401, 403, 500, dll)

## 🚀 Next Steps

- [ ] Add toast notifications (react-hot-toast)
- [ ] Add loading skeleton components
- [ ] Add retry mechanism untuk failed requests
- [ ] Add WebSocket untuk real-time device status
- [ ] Add caching dengan React Query/SWR (optional)

---

**Author**: Smart Farming Team  
**Last Updated**: February 2026
