const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full">
      <h1 className="px-4 py-2 text-xl font-bold">TikTok</h1>
      <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-background">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
