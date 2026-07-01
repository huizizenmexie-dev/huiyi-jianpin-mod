import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { buildLocalizedPath, useI18nContext } from "@/i18n";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { locale } = useI18nContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-ivory pt-16">
      <div className="max-w-md mx-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-harvest-gold/15 flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-harvest-gold" />
        </div>
        <h1 className="font-heading font-bold text-5xl text-deep-brown mb-2">404</h1>
        <h2 className="font-heading font-semibold text-xl text-deep-brown mb-4">
          Page Not Found
        </h2>
        <p className="text-medium-gray mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist.
          <br />
          It may have been moved or deleted.
        </p>
        <button
          onClick={() => setLocation(buildLocalizedPath(locale, "/"))}
          className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
        >
          <Home className="w-4 h-4" />
          Go Home
        </button>
      </div>
    </div>
  );
}
