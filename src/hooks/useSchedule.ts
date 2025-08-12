import { useState, useEffect } from "react";
import React from "react";

interface UseScheduleReturn {
  schedule: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSchedule(): UseScheduleReturn {
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  console.log("API_URL:", API_URL);

  const fetchSchedule = async () => {
  // Fetch schedule for all users or generic

    setLoading(true);
    setError(null);

    try {
  const response = await fetch(`${API_URL}/schedule`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        if (text.includes("<!DOCTYPE html>")) {
          throw new Error(
            `API server not found at ${API_URL}. Please ensure your backend server is running on port 3001.`
          );
        }
        throw new Error(
          `Expected JSON response but received: ${contentType}. Response: ${text.substring(
            0,
            200
          )}...`
        );
      }

      const data = await response.json();
      setSchedule(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch schedule";
      setError(errorMessage);
      console.error("Error fetching schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return {
    schedule,
    loading,
    error,
    refetch: fetchSchedule,
  };
}
