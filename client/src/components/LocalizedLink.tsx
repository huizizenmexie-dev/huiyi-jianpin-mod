import { Link } from "wouter";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

interface LocalizedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function LocalizedLink({ to, children, className }: LocalizedLinkProps) {
  const { locale } = useI18nContext();
  const localizedPath = buildLocalizedPath(locale, to);

  return (
    <Link href={localizedPath} className={className}>
      {children}
    </Link>
  );
}
