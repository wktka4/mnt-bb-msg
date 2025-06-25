'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { AuthProvider, useAuth } from "react-oidc-context";

import Menu from "./_component/menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/",
  client_id: "",
  redirect_uri: "http://localhost",
  response_type: "code",
  scope: "email openid phone",
};

export default function RootLayout({ children }) {


  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider {...cognitoAuthConfig}>
          <Container fluid>
            {children}
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
