
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
      single: () => Promise.resolve({ data: null, error: null }),
      // Adding missing select
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback),
          single: () => Promise.resolve({ data: null, error: null })
        }),
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback),
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: (data: any) => ({
      select: (columns: string = '*') => ({
        single: () => Promise.resolve({ data: null, error: null }),
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
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
  authUrl: 'mock-auth-url',
  storageUrl: 'mock-storage-url',
  functionsUrl: 'mock-functions-url',
  rest: { 
    headers: {} as any 
  },
  realtime: {
    channel: (name: string) => ({
      on: (event: string, callback: any) => ({
        subscribe: () => {},
      })
    })
  },
  realtimeUrl: 'mock-realtime-url',
  // Add other missing properties that SupabaseClient expects
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: any) => Promise.resolve({ data: null, error: null }),
      download: (path: string) => Promise.resolve({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `mock-url/${bucket}/${path}` } }),
      list: (path?: string) => Promise.resolve({ data: [], error: null }),
      remove: (paths: string[]) => Promise.resolve({ data: null, error: null })
    })
  },
  
  // Added for type compatibility
  channel: (name: string) => ({
    on: (event: string, callback: any) => ({ subscribe: () => {} }),
    subscribe: () => Promise.resolve()
  }),
  removeAllChannels: () => {},
  removeChannel: () => {},
  getChannels: () => [],
  removeSubscription: () => {},
  constructor: {},
  setAuth: (token: string) => {},
  getSubscriptions: () => ({}),
  _listenForChanges: () => {},
  _closeSubscription: () => {},
  _handleError: () => {},
  _logConnectionError: () => {}
};
