import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import React, { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import { I18nProvider, useI18nContext, DEFAULT_LOCALE, buildLocalizedPath, isValidLocale } from "@/i18n";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import IndustrySolutions from "./pages/IndustrySolutions";
import Quality from "./pages/Quality";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import InsightsArticle from "./pages/InsightsArticle";
import { ROUTER_BASE_PATH, stripBasePath } from "@/content/url";

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
}

// Redirect component for root path
function RootRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to default language
    setLocation(buildLocalizedPath(DEFAULT_LOCALE, "/"));
  }, [setLocation]);

  return <LoadingFallback />;
}

// Locale guard component - redirects invalid locales to /en/
function LocaleGuard({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const lang = params.lang;

    // Check if locale is valid
    if (!isValidLocale(lang)) {
      // Get current path without locale
      const currentPath = stripBasePath(window.location.pathname);
      const pathWithoutLocale = currentPath.replace(/^\/[^/]+/, "") || "/";
      // Redirect to default locale
      setLocation(buildLocalizedPath(DEFAULT_LOCALE, pathWithoutLocale), { replace: true });
    }
  }, [params.lang, setLocation]);

  // If locale is valid, render children
  if (isValidLocale(params.lang)) {
    return <>{children}</>;
  }

  // Otherwise show loading while redirecting
  return <LoadingFallback />;
}

function Router() {
  useLocation();
  useI18nContext();

  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Switch>
          {/* Language-prefixed routes with locale guard */}
          <Route path="/:lang/">
            {(params) => (
              <LocaleGuard params={params}>
                <Home />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/about">
            {(params) => (
              <LocaleGuard params={params}>
                <About />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/products">
            {(params) => (
              <LocaleGuard params={params}>
                <Products />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/products/:slug">
            {(params) => (
              <LocaleGuard params={params}>
                <ProductDetail />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/industry-solutions">
            {(params) => (
              <LocaleGuard params={params}>
                <IndustrySolutions />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/quality">
            {(params) => (
              <LocaleGuard params={params}>
                <Quality />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/contact">
            {(params) => (
              <LocaleGuard params={params}>
                <Contact />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/insights">
            {(params) => (
              <LocaleGuard params={params}>
                <Insights />
              </LocaleGuard>
            )}
          </Route>
          <Route path="/:lang/insights/:slug">
            {(params) => (
              <LocaleGuard params={params}>
                <InsightsArticle />
              </LocaleGuard>
            )}
          </Route>

          {/* Redirect root to default language */}
          <Route path="/" component={RootRedirect} />

          {/* 404 */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <ErrorBoundary>
      <WouterRouter ssrPath={ssrPath} base={ROUTER_BASE_PATH || undefined}>
        <I18nProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
