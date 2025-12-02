import type { PropsWithChildren } from "react"
import Footer from "../Footer"
import Header from "../Header"

const Layout = ({ children }:PropsWithChildren) => {
  return (
    <div className="from-background">
        <Header />
        <main className="min-h-screen container mx-auto py-8">
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout