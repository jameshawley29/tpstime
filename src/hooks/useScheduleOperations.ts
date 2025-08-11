import { useState, useCallback } from "react";

interface ScheduleItem {
  id?: number;
  user_id: string;
  period: number;
  subject: string;
}

interface UseScheduleOperationsReturn {
  updateClassPeriod: (period: number, subject: string) => Promise<boolean>;
  deleteClassPeriod: (period: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useScheduleOperations(
  onSuccess?: () => void
): UseScheduleOperationsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const userId = "default-user";

  const updateClassPeriod = useCallback(
    async (period: number, subject: string): Promise<boolean> => {
      if (!subject.trim()) {
        setError("Subject name cannot be empty");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/schedule/${userId}/${period}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject: subject.trim() }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (onSuccess) {
          onSuccess();
        }
        
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update class period";
        setError(errorMessage);
        console.error("Error updating class period:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userId, API_URL, onSuccess]
  );

  const deleteClassPeriod = useCallback(
    async (period: number): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/schedule/${userId}/${period}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (onSuccess) {
          onSuccess();
        }
        
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete class period";
        setError(errorMessage);
        console.error("Error deleting class period:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userId, API_URL, onSuccess]
  );

  return {
    updateClassPeriod,
    deleteClassPeriod,
    loading,
    error,
  };
}