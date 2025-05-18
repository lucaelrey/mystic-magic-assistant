
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const returnPath = new URLSearchParams(location.search).get("returnTo") || "/";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Reload the page after successful sign in
        window.location.href = returnPath;
      }
      if (event === "USER_UPDATED") {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            setErrorMessage(getErrorMessage(error));
          }
        } catch (error) {
          console.error("Error checking session:", error);
        }
      }
      if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, returnPath]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          return "Ungültige E-Mail oder Passwort. Bitte überprüfen Sie Ihre Anmeldedaten.";
        case "email_not_confirmed":
          return "Bitte bestätigen Sie Ihre E-Mail-Adresse vor der Anmeldung.";
        case "user_not_found":
          return "Kein Benutzer mit diesen Anmeldedaten gefunden.";
        case "invalid_grant":
          return "Ungültige Anmeldedaten.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Anmelden</h1>
          
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <SupabaseAuth
            supabaseClient={supabase as any}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                    inputText: 'hsl(var(--foreground))',
                  },
                },
              },
              style: {
                input: {
                  color: 'hsl(var(--foreground))',
                },
              },
            }}
            providers={[]}
            view="sign_in"
            showLinks={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: "E-Mail",
                  password_label: "Passwort",
                  button_label: "Anmelden",
                },
              },
            }}
          />
        </Card>
      </main>
    </div>
  );
};

export default Auth;
