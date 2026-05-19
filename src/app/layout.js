import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RC리더십개발 성적 계산기",
  description: "RC리더십개발 프로그램의 하우스 프로그램, 명사 특강, 비교과 참여 시간 등을 성적으로 환산하는 웹 애플리케이션입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
