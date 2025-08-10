# TPSTime Codebase Documentation

## Overview
TPSTime is a React-based school schedule application that displays current periods, countdown timers, and weekly schedules. The app uses Clerk for authentication and fetches user-specific schedule data from a backend API.

## Problem Identified
**The clockDescription component shows "7" instead of period names because it receives the raw schedule (aSchedule, bSchedule, cSchedule) which uses period numbers as names, but doesn't receive the mapped schedule with actual period names.**

## Data Flow Analysis

### 1. Schedule Data Sources

#### Static Schedules (src/types/schedule.ts)
- **aSchedule**: Uses period numbers ("1", "2", "3", etc.) as names with period numbers (1, 2, 3, etc.)
- **bSchedule**: Uses subject names ("English", "Math", etc.) as names, no period numbers
- **cSchedule**: Uses subject names ("Science", "Math", etc.) as names, no period numbers

#### Database Schedule (via useSchedule hook)
- Fetches from API endpoint: `/schedule/{userId}`
- Returns array of objects: `{ id, user_id, period, subject }`
- Used to customize period names for the user

### 2. Components and Their Data Usage

#### Home Component (src/pages/home.tsx)
- **Purpose**: Main page that orchestrates the entire schedule display
- **Data Flow**:
  1. Fetches user schedule from database via `useSchedule()`
  2. Creates `classNames` array mapping period numbers to custom names
  3. Passes RAW schedule to `ClockDescription` (LINE 84) ❌ **PROBLEM HERE**
  4. Passes MAPPED schedule to `Schedule` component (LINE 92-95) ✅ **CORRECT**

#### ClockDescription Component (src/components/clockDescription.tsx)
- **Purpose**: Shows "Until [Period Name] Ends/Starts" text
- **Current Input**: Raw schedule with period numbers as names
- **Expected Input**: Mapped schedule with actual period names
- **Output**: Description text based on current time and schedule status

#### Schedule Component (src/components/schedule.tsx)
- **Purpose**: Lists all periods with times
- **Input**: Properly mapped schedule with period names
- **Uses**: `getActivePeriod()` hook to highlight current period

### 3. Hooks and Utilities

#### useSchedule Hook (src/hooks/useSchedule.ts)
- **Purpose**: Fetches user's custom period names from database
- **Returns**: `{ schedule, loading, error, refetch }`
- **Schedule Format**: `Array<{ id, user_id, period, subject }>`

#### useScheduleOperations Hook (src/hooks/useScheduleOperations.ts)
- **Purpose**: CRUD operations for schedule items
- **Functions**: `updateClassPeriod()`, `deleteClassPeriod()`

#### Schedule Status Functions (src/hooks/scheduleStatus.ts)
- **getScheduleStatus()**: Returns current/next period and timing info
- **getActivePeriod()**: Returns which period is active for highlighting

#### Utility Functions (src/utils/utils.ts)
- **mapScheduleWithClassNames()**: ✅ **KEY FUNCTION**
  - Maps period numbers to custom names
  - Takes raw schedule + classNames array
  - Returns new schedule with updated names
- **getTodayIndex()**: Returns which day of week (currently hardcoded to return 1)

### 4. Type Definitions

#### ClassPeriod (src/types/classPeriod.ts)
- **Properties**: `name`, `start`, `end`, `period?`
- **Methods**: `getStartUnix()`, `getEndUnix()`, `getDurationSeconds()`

#### ClassName (src/types/className.ts)
- **Properties**: `name`, `period`
- Used for mapping period numbers to custom names

## Key Issues Found

### 1. ClockDescription Gets Wrong Data ❌
```typescript
// home.tsx line 84 - WRONG
<ClockDescription schedule={thisWeek[getTodayIndex()].schedule} />

// Should be:
<ClockDescription schedule={mapScheduleWithClassNames(
  thisWeek[getTodayIndex()].schedule, 
  classNames
)} />
```

### 2. Period Number vs Name Confusion
- **aSchedule** periods use numbers as names: "1", "2", "7" etc.
- **bSchedule/cSchedule** periods use subject names: "Math", "English" etc.
- ClockDescription receives aSchedule directly, so shows "7" instead of user's custom name

### 3. Data Loading Pattern
- Each component that needs schedule data receives it as props
- Database data is loaded once in Home component
- Mapping happens in Home component
- Not all components receive the mapped data (ClockDescription issue)

## Component Communication Flow

```
Home Component
├── Fetches DB schedule (useSchedule)
├── Creates classNames mapping
├── Passes RAW schedule → ClockDescription ❌
├── Passes MAPPED schedule → Schedule ✅
└── Manages weekly schedule selection
```

## Recommended Fixes

### 1. Fix ClockDescription Data
Update home.tsx line 84 to pass mapped schedule:
```typescript
<ClockDescription
  schedule={mapScheduleWithClassNames(
    thisWeek[getTodayIndex()].schedule,
    classNames
  )}
/>
```

### 2. Consider Centralized Schedule Context
For better data consistency, consider creating a ScheduleContext that provides:
- Mapped schedule data
- Loading states  
- Current period status
- Schedule operations

## File Structure Summary
```
src/
├── components/           # UI components
│   ├── clockDescription.tsx  # Shows period countdown text
│   ├── schedule.tsx          # Shows full schedule list
│   └── clock.tsx            # Shows current time
├── hooks/               # Custom React hooks
│   ├── useSchedule.ts       # Fetches user schedule from DB
│   ├── useScheduleOperations.ts  # CRUD for schedule
│   └── scheduleStatus.ts    # Current period calculations
├── pages/               # Page components  
│   └── home.tsx            # Main page - coordinates everything
├── types/               # TypeScript type definitions
│   ├── classPeriod.ts      # ClassPeriod class definition
│   ├── className.ts        # ClassName interface
│   └── schedule.ts         # Static schedule definitions
└── utils/               # Utility functions
    └── utils.ts            # Including mapScheduleWithClassNames
```

This documentation shows that the "7" issue stems from ClockDescription receiving unmapped schedule data, while the Schedule component correctly receives mapped data with proper period names.