export const GroupStatus = {
  NEW: "new",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  PENDING: "pending",
} as const;

export interface GroupFormValues {
  name: string;
  course_id: number;
  start_date: string;
  end_date: string;
  status: GroupStatus;
}

export type GroupStatus = (typeof GroupStatus)[keyof typeof GroupStatus];

export interface Group extends GroupFormValues {
  id: number;
}
