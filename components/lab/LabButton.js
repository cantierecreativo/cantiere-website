import Link from "next/link";
import Icon from "components/layout/Icon";
import t from "lib/locales";
import { trackLab, CALENDLY_URL } from "lib/lab";

const variants = {
  yellow: "bg-yellow text-black hover:-translate-y-0.5",
  blue: "bg-blue text-white hover:-translate-y-0.5",
  ghost: "border border-white text-white hover:bg-white hover:text-blue",
  outline: "border border-black hover:bg-black hover:text-white",
};

const sizes = {
  md: "px-6 py-3",
  lg: "px-7 py-4",
};

const iconFill = {
  yellow: undefined,
  blue: "white",
  ghost: "currentColor",
  outline: "currentColor",
};

// Bottone a pillola delle pagine Lab: link interno, ancora o link esterno.
export default function LabButton({
  href,
  variant = "yellow",
  size = "md",
  icon = "arrow",
  iconClassName = "",
  external = false,
  locale = "it",
  onClick,
  className = "",
  children,
}) {
  const classes = `inline-flex items-center gap-x-2 rounded-full text-sm font-bold uppercase tracking-wider duration-300 ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {external && <span className="sr-only">{t("lab_new_tab", locale)}</span>}
      {icon && <Icon name={icon} size="20" fill={iconFill[variant]} className={iconClassName} />}
    </>
  );
  if (external || href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}

// Video call su Calendly, con l'evento di misura.
export function CalendlyButton({ project, position, locale = "it", variant = "yellow", size = "md", className = "", children }) {
  return (
    <LabButton
      href={CALENDLY_URL}
      external
      locale={locale}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackLab("cta_videocall", { project, position })}
    >
      {children}
    </LabButton>
  );
}
