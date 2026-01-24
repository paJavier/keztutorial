import "./globals.css";

export const metadata = {
  title: "Kez Tutorial Services",
  description: "Fun English lessons for kids",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <meta name="google-site-verification" content="RV-WI9BSY9nUty7BGPUnH5Q1spTrvR6eSbRKw3rn9pk" />
      </head>

      <body className="bg-white text-blue-900 antialiased">
        {children}
      </body>
    </html>
  );
}
