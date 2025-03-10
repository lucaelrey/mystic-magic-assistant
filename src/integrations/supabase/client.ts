
// This is a placeholder file to maintain imports in the codebase.
// The actual Supabase functionality has been removed.

export const supabase = {
  // Mock methods to prevent errors
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
  },
  // Mock database methods
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          data: [], 
          error: null
        }),
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        data: [],
        error: null
      }),
      data: [],
      error: null
    }),
    insert: (values: any) => ({
      select: (columns?: string) => ({
        single: async () => ({ data: null, error: null }),
        data: null,
        error: null
      }),
      data: null,
      error: null
    }),
    update: (values: any) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        data: null,
        error: null
      }),
      data: null,
      error: null
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        data: null,
        error: null
      }),
      data: null,
      error: null
    }),
    upsert: (values: any, options?: any) => ({
      data: null,
      error: null
    }),
    data: null,
    error: null
  }),
  rpc: async () => ({ data: false, error: null }),
  functions: {
    // Updated invoke method that accepts parameters
    invoke: async (name: string, options?: any) => ({ data: null, error: null }),
  },
  // Additional properties required by SupabaseClient
  supabaseUrl: "",
  supabaseKey: "",
  realtime: {},
  realtimeUrl: "",
  // Add any other missing properties as needed
};
