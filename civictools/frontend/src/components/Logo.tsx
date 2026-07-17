import { tenant } from "../tenant";

export function Logo({ className = "" }: { className?: string }) {
  if (tenant.logo) {
    return <img src={tenant.logo} alt={tenant.name} className={className} />;
  }
  return (
    <span
      className={`font-extrabold text-primary-600 text-lg leading-none whitespace-nowrap ${className}`}
    >
      {tenant.name}
    </span>
  );
}
