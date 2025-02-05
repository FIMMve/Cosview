import { Providers } from "./providers";

export default function ManageUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}