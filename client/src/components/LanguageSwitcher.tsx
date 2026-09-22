import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocation } from "wouter";
import {
  useI18nContext,
  LOCALES,
  LOCALE_NAMES,
  LOCALE_FLAGS,
  buildLocalizedPath,
  getPathWithoutLocale,
  type Locale,
} from "@/i18n";

export default function LanguageSwitcher() {
  const [location, setLocation] = useLocation();
  const { locale: currentLocale, isRTL, t } = useI18nContext();

  const currentName = LOCALE_NAMES[currentLocale];

  const handleLanguageChange = (langCode: Locale) => {
    const pathWithoutLocale = getPathWithoutLocale(location);
    const newPath = buildLocalizedPath(langCode, pathWithoutLocale);
    setLocation(newPath);
  };

  return (
    <DropdownMenu dir={isRTL ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="language-trigger"
          aria-label={`${t("common.language", "Language")}: ${currentName}`}
          title={currentName}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span>
            {currentLocale === "zh-CN"
              ? "中文"
              : currentLocale === "ar"
                ? "العربية"
                : currentLocale.split("-")[0].toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 p-2">
        {LOCALES.map(lang => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`min-h-10 gap-3 ${currentLocale === lang ? "bg-accent font-semibold" : ""}`}
            lang={lang}
            aria-current={currentLocale === lang ? "true" : undefined}
          >
            <span aria-hidden="true">{LOCALE_FLAGS[lang]}</span>
            {LOCALE_NAMES[lang]}
            {currentLocale === lang && (
              <Check className="ms-auto h-4 w-4" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
