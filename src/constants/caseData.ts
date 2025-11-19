/**
 * Case-related constant data
 * Import this file wherever you need to use these constants
 */

// Example: Case types
export const CASE_TYPES = [
  { id: "1", name: "قضية مدنية", value: "civil" },
  { id: "2", name: "قضية جنائية", value: "criminal" },
  { id: "3", name: "قضية تجارية", value: "commercial" },
  { id: "4", name: "قضية عمالية", value: "labor" },
  { id: "5", name: "قضية أسرية", value: "family" },
] as const;

// Example: Objectives
export const OBJECTIVES = [
  { id: "1", name: "استئناف", value: "appeal" },
  { id: "2", name: "تنفيذ", value: "execution" },
  { id: "3", name: "تعويض", value: "compensation" },
  { id: "4", name: "إلغاء", value: "cancellation" },
] as const;

// Example: Judges
export const JUDGES = [
  { id: "1", name: "القاضي أحمد محمد" },
  { id: "2", name: "القاضي فاطمة علي" },
  { id: "3", name: "القاضي خالد حسن" },
] as const;

// Example: Case status options
export const CASE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ARCHIVED: "archived",
} as const;

// Type exports for TypeScript
export type CaseType = (typeof CASE_TYPES)[number];
export type Objective = (typeof OBJECTIVES)[number];
export type Judge = (typeof JUDGES)[number];
export type CaseStatus = (typeof CASE_STATUS)[keyof typeof CASE_STATUS];
