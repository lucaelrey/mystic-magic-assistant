
// This is a mock supabase client for development
// Replace with the actual client when ready to connect to supabase

export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => ({ 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    }),
    signOut: () => Promise.resolve({ error: null })
  },
  rpc: (name: string, params?: any) => Promise.resolve({ data: false, error: null }),
  functions: {
    invoke: (name: string, options?: any) => Promise.resolve({ data: null, error: null })
  },
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        eq: (column: string, value: any) => ({
          order: (column: string, { ascending }: { ascending: boolean }) => ({
            single: () => Promise.resolve({ data: null, error: null }),
            then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
          }),
          then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
        }),
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
      }),
      then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback),
      single: () => Promise.resolve({ data: null, error: null })
    }),
    insert: (data: any) => ({
      select: (columns: string = '*') => ({
        single: () => Promise.resolve({ data: null, error: null })
      }),
      onConflict: (column: string) => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
    }),
    upsert: (data: any) => ({
      select: (columns: string = '*') => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      match: (params: any) => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      match: (params: any) => ({
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      })
    }),
    single: () => Promise.resolve({ data: null, error: null })
  }),
  // Add missing properties to make it compatible with SupabaseClient
  supabaseUrl: 'mock-url',
  supabaseKey: 'mock-key',
  realtime: {
    channel: () => ({
      on: () => ({
        subscribe: () => {},
      })
    })
  },
  realtimeUrl: 'mock-realtime-url',
};
