# Tank Control - Clean Architecture Implementation

## Overview
The Tank Control feature has been implemented following Clean Architecture principles, ensuring separation of concerns, maintainability, and testability.

## File Structure

```
src/core/
├── domain/                                    # Domain Layer (Business Entities)
│   ├── entities/
│   │   └── Tank.ts                           # Tank entity & DTOs
│   └── repositories/
│       └── ITankRepository.ts                # Repository contract
│
├── infrastructure/                            # Infrastructure Layer (External Systems)
│   └── api/
│       └── repositories/
│           └── TankRepository.ts             # API implementation
│
└── application/                               # Application Layer (Use Cases)
    └── use-cases/
        └── tanks/
            ├── GetTankInfo.ts                # Fetch tank data
            ├── GetWaterStats.ts              # Fetch statistics
            ├── UpdateTankConfig.ts           # Update settings
            ├── ControlMixer.ts               # Control mixer
            └── ControlPump.ts                # Control pump

src/shared/
└── hooks/
    └── useTank.ts                            # React hook for state management

app/(protected-pages)/
└── tandon/
    └── control/
        └── page.tsx                          # Tank control UI page
```

## Architecture Layers

### 1. Domain Layer (`src/core/domain/`)

#### Entities (`entities/Tank.ts`)
Defines the core business models and data structures:
- **Tank**: Main entity representing the water tank
- **WaterUsageStats**: Water consumption statistics
- **UpdateTankConfigDTO**: Data transfer object for configuration updates
- **ControlMixerDTO**: DTO for mixer control operations
- **ControlPumpDTO**: DTO for pump control operations
- **TankResponse**: API response wrapper
- **WaterUsageResponse**: Statistics response wrapper

#### Repository Interface (`repositories/ITankRepository.ts`)
Defines the contract for tank data operations:
- `getTankInfo()`: Fetch current tank information
- `getWaterStats()`: Retrieve water usage statistics
- `updateConfig(data)`: Update tank configuration settings
- `controlMixer(data)`: Control mixer on/off
- `controlPump(data)`: Control pump operations

### 2. Infrastructure Layer (`src/core/infrastructure/`)

#### Repository Implementation (`api/repositories/TankRepository.ts`)
Implements the ITankRepository interface using the API client:
- Handles HTTP requests to `/tanks` endpoints
- Transforms API responses to domain entities
- Manages error handling at the API level
- Singleton pattern for repository instance

**API Endpoints:**
- `GET /tanks` - Get tank information
- `GET /tanks/stats` - Get water usage statistics
- `PUT /tanks/config` - Update tank configuration
- `POST /tanks/mixer` - Control mixer
- `POST /tanks/pump` - Control pump

### 3. Application Layer (`src/core/application/`)

#### Use Cases (`use-cases/tanks/`)
Encapsulates business logic and orchestrates operations:

1. **GetTankInfo**: Retrieves current tank state
2. **GetWaterStats**: Fetches water usage statistics
3. **UpdateTankConfig**: Updates tank settings (max fill, auto-fill, min/target levels)
4. **ControlMixer**: Toggles mixer on/off
5. **ControlPump**: Controls pump operations (on/off/auto with duration)

Each use case:
- Takes repository as dependency (Dependency Inversion)
- Contains single responsibility
- Returns domain entities
- Is easily testable

### 4. Presentation Layer

#### Custom Hook (`src/shared/hooks/useTank.ts`)
React hook providing state management and API integration:

**State Management:**
- `tank`: Current tank data
- `waterStats`: Water usage statistics
- `isLoading`: Loading state
- `error`: Error messages

**Operations:**
- `refreshTank()`: Reload tank information
- `refreshStats()`: Reload statistics
- `updateConfig(data)`: Update configuration
- `toggleMixer(isActive)`: Control mixer
- `controlPump(data)`: Control pump

**Features:**
- Automatic initial data loading
- Error handling with user-friendly messages
- Optimistic updates
- Loading states for better UX

#### UI Component (`app/(protected-pages)/tandon/control/page.tsx`)
Main page component for tank control:

**Features:**
1. **Mixer Control**: Toggle mixer on/off with visual feedback
2. **Manual Pump Control**: Start/stop pump manually
3. **Max Fill Level**: Slider to set maximum fill percentage (50-100%)
4. **Auto-Fill Settings**:
   - Toggle auto-fill on/off
   - Set minimum level trigger
   - Set target fill level
5. **Water Usage Statistics**: Display today, week, and month consumption

**State Synchronization:**
- Local state for immediate slider feedback
- Syncs with backend on change
- Updates from `useTank` hook
- Loading and error states

## Data Flow

```
User Interaction (UI Component)
        ↓
Custom Hook (useTank)
        ↓
Use Case (Business Logic)
        ↓
Repository Interface (Contract)
        ↓
Repository Implementation (API)
        ↓
Backend API
```

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Testability**: Use cases and repositories can be easily unit tested
3. **Maintainability**: Changes in one layer don't affect others
4. **Flexibility**: Can swap implementation (e.g., mock repository for testing)
5. **Scalability**: Easy to add new features following the same pattern
6. **Type Safety**: TypeScript interfaces ensure type correctness
7. **Reusability**: Use cases can be reused across different UI components

## Backend Integration

The implementation is ready for backend integration. When the backend `/tanks` API is available:

1. Tank data will be fetched on page load
2. All control operations will persist to backend
3. Real-time updates will reflect in the UI
4. Error handling will show user-friendly messages

## Future Enhancements

- Real-time WebSocket updates for tank level
- Historical water usage charts
- Alerts/notifications for critical levels
- Scheduling for mixer operations
- Integration with weather data for smart auto-fill

## Comparison with Other Features

This tank control implementation follows the same clean architecture pattern as:
- **Zone Management** (manual drip control)
- **Schedule Management** (automatic drip schedules)
- **Device Management**

All features share:
- Same layered structure
- Consistent naming conventions
- Similar error handling patterns
- Unified API client usage
