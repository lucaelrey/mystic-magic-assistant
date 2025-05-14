
// This is a mock supabase client for development
// Replace with the actual client when ready to connect to supabase

export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ 
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
            then: () => Promise.resolve({ data: [], error: null })
          }),
          then: () => Promise.resolve({ data: [], error: null })
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          then: () => Promise.resolve({ data: [], error: null })
        }),
        then: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        then: () => Promise.resolve({ data: [], error: null })
      }),
      then: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null })
    }),
    insert: (data: any) => ({
      select: (columns: string = '*') => ({
        single: () => Promise.resolve({ data: null, error: null })
      }),
      onConflict: (column: string) => ({
        then: () => Promise.resolve({ data: null, error: null })
      }),
      then: () => Promise.resolve({ data: null, error: null })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null }),
      match: (params: any) => Promise.resolve({ error: null }),
      then: () => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null }),
      match: (params: any) => Promise.resolve({ error: null })
    })
  })
};
