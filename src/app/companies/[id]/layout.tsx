import { Providers } from "./providers";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}