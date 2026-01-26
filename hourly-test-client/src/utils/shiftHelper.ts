// src/utils/shiftHelper.ts

export type Shift = 'A' | 'B' | 'C' | 'All';

export interface ShiftConfig {
  name: Shift;
  startHour: number;
  endHour: number;
}

export const SHIFTS: ShiftConfig[] = [
  { name: 'A', startHour: 6, endHour: 14 },   // 6 AM - 2 PM
  { name: 'B', startHour: 14, endHour: 22 },  // 2 PM - 10 PM
  { name: 'C', startHour: 22, endHour: 6 },   // 10 PM - 6 AM (crosses midnight)
];

/**
 * Determine shift based on hour (0-23)
 */
export const getShiftFromHour = (hour: number): Shift => {
  if (hour >= 6 && hour < 14) {
    return 'A';
  } else if (hour >= 14 && hour < 22) {
    return 'B';
  } else {
    return 'C'; // 22-24 and 0-6
  }
};

/**
 * Parse time string and return shift
 * Supports formats: "2025/11/24 23:59:17" or "25/11/2025"
 */
export const getShiftFromTimeString = (timeString: string): Shift => {
  if (!timeString) return 'A'; // Default fallback
  
  try {
    // Parse the time string
    const parts = timeString.split(' ');
    if (parts.length < 2) {
      // No time component, default to Shift A
      return 'A';
    }
    
    const timePart = parts[1]; // "23:59:17"
    const hour = parseInt(timePart.split(':')[0], 10);
    
    return getShiftFromHour(hour);
  } catch (error) {
    console.error('Error parsing time string:', timeString, error);
    return 'A';
  }
};

/**
 * Get shift label for display
 */
export const getShiftLabel = (shift: Shift): string => {
  const labels: Record<Shift, string> = {
    'A': 'Shift A (6 AM - 2 PM)',
    'B': 'Shift B (2 PM - 10 PM)',
    'C': 'Shift C (10 PM - 6 AM)',
    'All': 'All Shifts',
  };
  return labels[shift];
};
