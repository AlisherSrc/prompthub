import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

export type ProviderProps = {
    children : ReactNode;
    session : Session | null | undefined;
}

const Provider = ({children,session} : ProviderProps) => {
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
}

export default Provider;