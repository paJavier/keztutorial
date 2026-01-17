import "./globals.css";

export const metadata = {
  title: "Kez Tutorial Services",
  description: "Fun English lessons for kids",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-blue-900 antialiased">
        {children}
      </body>
    </html>
  );
}
