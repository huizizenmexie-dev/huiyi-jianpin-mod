import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import React, { Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import { I18nProvider, useI18nContext, DEFAULT_LOCALE, buildLocalizedPath } from "@/i18n";

// Lazy load page components for code splitting
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const IndustrySolutions = React.lazy(() => import("./pages/IndustrySolutions"));
const Quality = React.lazy(() => import("./pages/Quality"));
const Contact = React.lazy(() => import("./pages/Contact"));

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

function Router() {
  const [location] = useLocation();
  const { locale } = useI18nContext();

  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          {/* Language-prefixed routes */}
          <Route path="/:lang/" component={Home} />
          <Route path="/:lang/about" component={About} />
          <Route path="/:lang/products" component={Products} />
          <Route path="/:lang/products/:slug" component={ProductDetail} />
          <Route path="/:lang/industry-solutions" component={IndustrySolutions} />
          <Route path="/:lang/quality" component={Quality} />
          <Route path="/:lang/contact" component={Contact} />

          {/* Redirect root to default language */}
          <Route path="/" component={RootRedirect} />

          {/* 404 */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
