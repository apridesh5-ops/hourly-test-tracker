// src/utils/timeHelper.ts

/**
 * Parse time string to Date object
 * Supports format: "2025/11/24 23:59:17"
 */
export const parseTimeString = (timeString: string): Date | null => {
  if (!timeString) return null;
  
  try {
    // Handle format: "2025/11/24 23:59:17"
    const [datePart, timePart] = timeString.split(' ');
    
    if (!timePart) return null;
    
    const [year, month, day] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    
    return new Date(year, month - 1, day, hours, minutes, seconds);
  } catch (error) {
    console.error('Error parsing time string:', timeString, error);
    return null;
  }
};

/**
 * Extract hour and minute from time string
 * Returns in format { hour: number, minute: number }
 */
export const extractTime = (timeString: string): { hour: number; minute: number } | null => {
  if (!timeString) return null;
  
  try {
    const parts = timeString.split(' ');
    if (parts.length < 2) return null;
    
    const timePart = parts[1]; // "23:59:17"
    const [hour, minute] = timePart.split(':').map(Number);
    
    return { hour, minute };
  } catch (error) {
    console.error('Error extracting time:', timeString, error);
    return null;
  }
};

/**
 * Compare two times (hour and minute only)
 * Returns true if time1 is between startTime and endTime
 */
export const isTimeBetween = (
  time: { hour: number; minute: number },
  startTime: { hour: number; minute: number },
  endTime: { hour: number; minute: number }
): boolean => {
  const timeInMinutes = time.hour * 60 + time.minute;
  const startInMinutes = startTime.hour * 60 + startTime.minute;
  const endInMinutes = endTime.hour * 60 + endTime.minute;

  // Handle case where end time is on next day (e.g., 22:00 to 06:00)
  if (endInMinutes < startInMinutes) {
    // Time range crosses midnight
    return timeInMinutes >= startInMinutes || timeInMinutes <= endInMinutes;
  } else {
    // Normal time range within same day
    return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
  }
};

/**
 * Check if a timestamp falls within the specified time range
 */
export const isTimeInRange = (
  timestamp: string,
  startTime: Date | null,
  endTime: Date | null
): boolean => {
  if (!startTime && !endTime) return true; // No time filter
  
  const time = extractTime(timestamp);
  if (!time) return true; // Can't parse, include by default
  
  const start = startTime ? { hour: startTime.getHours(), minute: startTime.getMinutes() } : null;
  const end = endTime ? { hour: endTime.getHours(), minute: endTime.getMinutes() } : null;
  
  // If only start time specified
  if (start && !end) {
    const timeInMinutes = time.hour * 60 + time.minute;
    const startInMinutes = start.hour * 60 + start.minute;
    return timeInMinutes >= startInMinutes;
  }
  
  // If only end time specified
  if (!start && end) {
    const timeInMinutes = time.hour * 60 + time.minute;
    const endInMinutes = end.hour * 60 + end.minute;
    return timeInMinutes <= endInMinutes;
  }
  
  // Both start and end time specified
  if (start && end) {
    return isTimeBetween(time, start, end);
  }
  
  return true;
};
