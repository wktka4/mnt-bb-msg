'use client';

import Button from 'react-bootstrap/Button';

import { useAuth } from "react-oidc-context";

import Menu from "../_component/menu";

export default function Layout({ children }) {

  const auth = useAuth();
  return (
    <>
      {auth?.isAuthenticated ?
        <>
          <Menu />
          <Button onClick={() => auth.removeUser()}>Sign out</Button>
        </>
        :
        <Button onClick={() => auth.signinRedirect()}>Sign In</Button>
      }
      {children}
    </>
  );
}
