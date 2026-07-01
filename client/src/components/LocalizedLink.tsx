import { Link, type LinkProps } from "wouter";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

interface LocalizedLinkProps extends Omit<LinkProps, "href"> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function LocalizedLink({ to, children, className, ...props }: LocalizedLinkProps) {
  const { locale } = useI18nContext();
  const localizedPath = buildLocalizedPath(locale, to);

  return (
    <Link href={localizedPath} className={className} {...props}>
      {children}
    </Link>
  );
}
