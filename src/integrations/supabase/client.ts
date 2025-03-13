// This is a placeholder file to maintain imports in the codebase.
// The actual Supabase functionality has been removed.

export const supabase = {
  // Mock methods to prevent errors
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  rpc: async () => ({ data: false, error: null }),
  functions: {
    invoke: async () => ({ data: null, error: null }),
  },
};
