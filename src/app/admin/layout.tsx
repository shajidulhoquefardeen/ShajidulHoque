export const metadata = {
  title: "Portfolio CMS — Admin",
  description: "Content management studio for the portfolio.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Isolated layout: no Navbar, no Footer, no space background.
  // The Studio provides its own full-page UI.
  return <>{children}</>;
}
