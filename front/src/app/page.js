"use client";

import { useEffect, useState } from "react";

import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";

import Link from 'next/link';

import { useAuth } from "react-oidc-context";

import Menu from "./_component/menu";

export default function LoginPage() {

  const auth = useAuth();

  return (<>
    <div>TOPページ</div>
    {auth.isAuthenticated ?
      <>
        <Menu />
        <div> Hello: {auth.user?.profile.email} </div>
        <div> ID Token: {auth.user?.id_token} </div>
        <div> JWT: {JSON.parse(window.atob(auth.user?.id_token.split(".")[1]))["cognito:groups"].includes("admin")} </div>
        {/* <div> Access Token: {auth.user?.access_token} </div>
        <div> Refresh Token: {auth.user?.refresh_token} </div> */}
      </>
      :
      <>
        <div>ログインしてください。</div>
        <Button onClick={() => auth.signinRedirect()}>Sign In</Button>
      </>
    }
  </>);
}
