export interface Topic {
  id: string
  name: string
}

export interface Objective {
  id: string
  name: string
}

export interface Judge {
  id: string
  name: string
}

export interface Case {
  id: string
  case_number: string
  supply_date: string
  case_type: string
  case_type_title: string | null
  prosecutor: string | null
  defendant: string | null
  topic_id: string | null
  objective_id: string | null
  judge_id: string | null
  history_of_ruling: string | null
  judgment_date: string | null
  comments: string | null
  created_at?: string
  updated_at?: string
  // Joined data
  topic?: Topic
  objective?: Objective
  judge?: Judge
}

export interface AppUser {
  id: string
  full_name: string
  email: string
  phone: string | null
  auth_user_id: string
  created_at?: string
  updated_at?: string
}

export interface Role {
  id: string
  name: string
  description: string | null
}

export interface UserRole {
  id: string
  user_id: string
  role_id: string
  role?: Role
}

export interface CaseFormData {
  case_number: string
  supply_date: string
  case_type: string
  case_type_title?: string
  prosecutor?: string
  defendant?: string
  topic_id?: string
  objective_id?: string
  judge_id?: string
  history_of_ruling?: string
  judgment_date?: string
  comments?: string
}

export interface DashboardStats {
  totalCases: number
  casesByType: Record<string, number>
  casesByJudge: Record<string, number>
  latestCases: Case[]
}

