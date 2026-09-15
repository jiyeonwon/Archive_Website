import "./globals.css";

export const metadata = {
  title: "Won Jiyeon Archive",
  description: "Won Jiyeon project archive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
