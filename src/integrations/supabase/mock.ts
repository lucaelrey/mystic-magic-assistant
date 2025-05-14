
// This file provides type-safe mocks for Supabase client
// It's used when the app is running without a real Supabase connection

export const mockSupabaseClient = {
  // Auth methods
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signOut: async () => ({ error: null }),
  },
  
  // Database methods
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          single: async () => ({ data: null, error: null }),
          then: async (callback: any) => ({ data: [], error: null })
        }),
        then: async (callback: any) => ({ data: [], error: null }),
        single: async () => ({ data: null, error: null }),
        eq: (column: string, value: any) => ({
          order: (column: string, { ascending }: { ascending: boolean }) => ({
            single: async () => ({ data: null, error: null }),
            then: async (callback: any) => ({ data: [], error: null })
          }),
          then: async (callback: any) => ({ data: [], error: null })
        })
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        single: async () => ({ data: null, error: null }),
        then: async (callback: any) => ({ data: [], error: null })
      }),
      then: async (callback: any) => ({ data: [], error: null }),
      in: (column: string, values: any[]) => ({
        then: async (callback: any) => ({ data: [], error: null })
      })
    }),
    insert: (data: any) => ({
      select: (columns?: string) => ({
        then: async (callback: any) => ({ data: [], error: null })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        then: async (callback: any) => ({ data: null, error: null })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        then: async (callback: any) => ({ data: null, error: null })
      })
    }),
    upsert: (data: any) => ({
      then: async (callback: any) => ({ data: null, error: null })
    })
  }),
  
  // RPC methods
  rpc: (name: string, params?: any) => ({
    then: async (callback: any) => ({ data: null, error: null })
  }),
  
  // Functions methods
  functions: {
    invoke: async (name: string, params?: any) => ({ data: null, error: null })
  },
  
  // Required properties for SupabaseClient type
  supabaseUrl: 'https://example.com',
  supabaseKey: 'mock-key',
  authUrl: 'https://example.com/auth',
  storageUrl: 'https://example.com/storage',
  functionsUrl: 'https://example.com/functions',
  realtimeUrl: 'https://example.com/realtime',
  rest: {} as any,
  realtime: {} as any,
  storage: {} as any,
  channel: () => ({}) as any
};

export default mockSupabaseClient;
