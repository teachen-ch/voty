export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <a href="/">
        <img src="/images/voty_logo.svg" alt="voty" className="logoPage" />
      </a>
      <main className="max-800">{children}</main>
    </div>
  );
}
