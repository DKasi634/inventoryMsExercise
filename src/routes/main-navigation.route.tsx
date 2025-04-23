import { Outlet } from "react-router-dom"
import Header from "../components/header.component"
import Footer from "../components/footer.component"


const MainNavigation = () => {
    return (
        <div className="w-full min-h-screen ">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainNavigation