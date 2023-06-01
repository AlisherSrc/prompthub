import '@styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title:"PromptHub",
    description: 'Share & Discover AI Prompts'
}

export type RootLayoutProps = {
    children: ReactNode;
}

const RootLayout =({children} : RootLayoutProps) => {
    return <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                {children}
            </main>
        </body>

    </html>

}

export default RootLayout;