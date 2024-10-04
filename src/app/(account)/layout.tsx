interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        {children}
      </main>
    </>
  );
}
