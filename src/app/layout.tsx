import { Providers } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Task Management Application',
  description: 'An application to manage your tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute='class'>
      <html lang="en">
        <body className={inter.className}>
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </body>
      </html>
    </ThemeProvider>
  )
}
