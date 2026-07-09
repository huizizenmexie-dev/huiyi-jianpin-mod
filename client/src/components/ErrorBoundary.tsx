import { cn } from "@/lib/utils";
import { buildPublicPath } from "@/content/url";
import { getLocaleFromPath } from "@/i18n/locale";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getTranslationValue } from "@/i18n/loadTranslations";
import { getMessagesSync } from "@/i18n/messages.sync";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function currentLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return getLocaleFromPath(window.location.pathname);
}

function errorCopy(key: string, fallback: string): string {
  return getTranslationValue(getMessagesSync(currentLocale()), `error_boundary.${key}`, fallback);
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    if (import.meta.env.PROD) {
      console.error("Error caught by boundary:", error, errorInfo);
      // TODO: Send to error monitoring service (e.g., Sentry)
    }
  }

  render() {
    if (this.state.hasError) {
      // In development, show detailed error
      if (import.meta.env.DEV) {
        return (
          <div className="flex items-center justify-center min-h-screen p-8 bg-background">
            <div className="flex flex-col items-center w-full max-w-2xl p-8">
              <AlertTriangle
                size={48}
                className="text-destructive mb-6 flex-shrink-0"
              />

              <h2 className="text-xl mb-4">{errorCopy("dev_title", "An unexpected error occurred.")}</h2>

              <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
                <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                  {this.state.error?.stack}
                </pre>
              </div>

              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer"
                )}
              >
                <RotateCcw size={16} />
                {errorCopy("reload_page", "Reload Page")}
              </button>
            </div>
          </div>
        );
      }

      // In production, show user-friendly error message
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-warm-ivory">
          <div className="flex flex-col items-center w-full max-w-md p-8 text-center">
            <AlertTriangle
              size={64}
              className="text-harvest-gold mb-6"
            />

            <h1 className="font-heading text-3xl font-bold text-deep-brown mb-4">
              {errorCopy("title", "Something Went Wrong")}
            </h1>

            <p className="text-medium-gray mb-8 leading-relaxed">
              {errorCopy("description", "We apologize for the inconvenience. Our team has been notified and is working to fix this issue.")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
                  "bg-earth-green text-white font-medium",
                  "hover:bg-earth-green-dark transition-colors"
                )}
              >
                <RotateCcw size={18} />
                {errorCopy("try_again", "Try Again")}
              </button>

              <a
                href={buildPublicPath("en", "/")}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
                  "border-2 border-earth-green text-earth-green font-medium",
                  "hover:bg-earth-green hover:text-white transition-colors"
                )}
              >
                <Home size={18} />
                {errorCopy("go_home", "Go to Homepage")}
              </a>
            </div>

            <p className="text-xs text-medium-gray mt-8">
              {errorCopy("contact_prefix", "If this problem persists, please contact us at")}{" "}
              <a href="mailto:jojowei@huiyijianpin.cn" className="text-earth-green hover:underline">
                jojowei@huiyijianpin.cn
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
