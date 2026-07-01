import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
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
  const { locale: currentLocale } = useI18nContext();

  const currentName = LOCALE_NAMES[currentLocale];
  const currentFlag = LOCALE_FLAGS[currentLocale];

  const handleLanguageChange = (langCode: Locale) => {
    const pathWithoutLocale = getPathWithoutLocale(location);
    const newPath = buildLocalizedPath(langCode, pathWithoutLocale);
    setLocation(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentFlag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={currentLocale === lang ? "bg-accent" : ""}
          >
            <span className="mr-2">{LOCALE_FLAGS[lang]}</span>
            {LOCALE_NAMES[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
