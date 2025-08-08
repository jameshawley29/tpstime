import React, { useState, useEffect, useRef } from "react";
import { useSchedule } from "../hooks/useSchedule";
import { useScheduleOperations } from "../hooks/useScheduleOperations";

interface ScheduleItem {
  id?: number;
  user_id?: string;
  period: number;
  subject: string;
}

interface EditingState {
  period: number | null;
  value: string;
}

const ScheduleEditor: React.FC = () => {
  const {
    schedule,
    loading: scheduleLoading,
    error: scheduleError,
    refetch,
  } = useSchedule();
  const {
    updateClassPeriod,
    loading: updateLoading,
    error: updateError,
  } = useScheduleOperations(refetch);

  const [editing, setEditing] = useState<EditingState>({
    period: null,
    value: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultPeriods = Array.from({ length: 7 }, (_, i) => ({
    period: i + 1,
    subject: `Period ${i + 1}`,
  }));

  const scheduleItems: ScheduleItem[] = React.useMemo(() => {
    if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
      return defaultPeriods;
    }

    const periodMap = new Map<number, string>();
    schedule.forEach((item: any) => {
      if (item.period && item.subject) {
        periodMap.set(item.period, item.subject);
      }
    });

    return defaultPeriods.map((defaultPeriod) => ({
      ...defaultPeriod,
      subject: periodMap.get(defaultPeriod.period) || defaultPeriod.subject,
    }));
  }, [schedule]);

  const handleEditClick = (period: number, currentSubject: string) => {
    setEditing({ period, value: currentSubject });
  };

  const handleSave = async () => {
    if (editing.period && editing.value.trim()) {
      const success = await updateClassPeriod(
        editing.period,
        editing.value.trim()
      );
      if (success) {
        setEditing({ period: null, value: "" });
      }
    }
  };

  const handleCancel = () => {
    setEditing({ period: null, value: "" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  useEffect(() => {
    if (editing.period !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing.period]);

  if (scheduleLoading) {
    return (
      <div className="border border-primary p-4 rounded-lg bg-muted">
        <h2 className="text-lg font-semibold mb-2">Your Schedule</h2>
        <p className="text-secondary">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="border border-primary p-4 rounded-lg bg-muted">
      <h2 className="text-lg font-semibold mb-2">Your Schedule</h2>

      {(scheduleError || updateError) && (
        <div className="mb-4 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          Error: {scheduleError || updateError}
        </div>
      )}

      <div className="space-y-2">
        {scheduleItems.map((item) => {
          const isEditing = editing.period === item.period;
          const isDefaultName = item.subject === `Period ${item.period}`;

          return (
            <div
              key={item.period}
              className="p-2 rounded bg-background border border-accent group hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="font-medium text-text text-sm w-16">
                    Period {item.period}:
                  </span>

                  {isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={editing.value}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      onKeyDown={handleKeyPress}
                      className="flex-1 px-2 py-1 text-sm bg-background border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={updateLoading}
                      placeholder="Enter class name..."
                    />
                  ) : (
                    <button
                      onClick={() => handleEditClick(item.period, item.subject)}
                      className={`flex-1 text-left px-2 py-1 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDefaultName
                          ? "text-secondary hover:text-text hover:bg-accent"
                          : "text-text hover:bg-accent"
                      }`}
                      disabled={updateLoading}
                    >
                      {item.subject}
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={updateLoading || !editing.value.trim()}
                        className="p-1 text-green-600 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Save"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={updateLoading}
                        className="p-1 text-red-600 hover:text-red-700 disabled:opacity-50"
                        title="Cancel"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item.period, item.subject)}
                      className="p-1 text-secondary hover:text-text opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={updateLoading}
                      title="Edit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  )}

                  {updateLoading && editing.period === item.period && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-secondary">
        <p className="mt-1">
          Click on any class name to edit it. Click the green checkmark to save
          changes. Gray items show default names - click to customize them.
        </p>
      </div>
    </div>
  );
};

export default ScheduleEditor;
