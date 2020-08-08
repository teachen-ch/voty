export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <img src="/images/voty_logo.svg" alt="voty" className="logoPage" />
      <main className="max-800">{children}</main>
    </div>
  );
}
