export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      master_categories: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      master_kelas: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_lembaga: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_roles: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_status_rumah: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_step: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          step_order: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          step_order: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          step_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      master_tahun_ajaran: {
        Row: {
          code: string
          created_at: string
          end_year: number
          id: number
          is_active: boolean
          label: string
          semester: Database["public"]["Enums"]["semester_enum"]
          start_year: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          end_year: number
          id?: never
          is_active?: boolean
          label: string
          semester: Database["public"]["Enums"]["semester_enum"]
          start_year: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          end_year?: number
          id?: never
          is_active?: boolean
          label?: string
          semester?: Database["public"]["Enums"]["semester_enum"]
          start_year?: number
          updated_at?: string
        }
        Relationships: []
      }
      master_tinggal_bersama: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_tipe_dokumen: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          is_required: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          is_required?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          is_required?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          phone: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          role_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          role_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          role_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "master_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_can_manage_spmb: { Args: never; Returns: boolean }
      fn_can_manage_user_role: {
        Args: { p_target_role_id: number }
        Returns: boolean
      }
      fn_can_read_master_data: {
        Args: { p_is_active: boolean }
        Returns: boolean
      }
      fn_is_administrator: { Args: never; Returns: boolean }
      fn_is_high_level_admin: { Args: never; Returns: boolean }
      fn_is_superadmin: { Args: never; Returns: boolean }
    }
    Enums: {
      admission_status_enum: "PROCESS" | "AWAITING" | "ACCEPTED" | "REJECTED"
      audit_operation_enum: "INSERT" | "UPDATE" | "SOFT_DELETE" | "DELETE"
      document_status_enum: "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED"
      family_relation_enum: "AYAH" | "IBU" | "WALI"
      gender_enum: "MALE" | "FEMALE" | "OTHER"
      life_status_enum: "HIDUP" | "MENINGGAL" | "LAINNYA"
      payment_status_enum: "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED"
      post_status: "DRAFT" | "PUBLISHED"
      registration_form_status_enum: "DRAFT" | "FINALIZED"
      semester_enum: "GANJIL" | "GENAP"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      admission_status_enum: ["PROCESS", "AWAITING", "ACCEPTED", "REJECTED"],
      audit_operation_enum: ["INSERT", "UPDATE", "SOFT_DELETE", "DELETE"],
      document_status_enum: ["PENDING", "SUBMITTED", "VERIFIED", "REJECTED"],
      family_relation_enum: ["AYAH", "IBU", "WALI"],
      gender_enum: ["MALE", "FEMALE", "OTHER"],
      life_status_enum: ["HIDUP", "MENINGGAL", "LAINNYA"],
      payment_status_enum: ["PENDING", "SUBMITTED", "VERIFIED", "REJECTED"],
      post_status: ["DRAFT", "PUBLISHED"],
      registration_form_status_enum: ["DRAFT", "FINALIZED"],
      semester_enum: ["GANJIL", "GENAP"],
    },
  },
} as const
