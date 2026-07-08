import { Link, useNavigate } from "react-router-dom"
import Sidebar from "./sidebarOld"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../context/themeContext"
import { AuthContext } from "../../context/authContext"
import { SidebarTrigger } from "../ui/sidebar"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { Button } from "../ui/button"

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { userCred, logout } = useContext(AuthContext)
    console.log("on dashboard", userCred)
    const navigate = useNavigate()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        console.log(userData);
        if (userData === null) {
            navigate('/')
        }
    }, [navigate])

    // const handleLogout = (e) => {
    //     e.stoppropagation()
    //     localStorage.clear('userData')
    //     navigate('/')
    // }
    return (
        <>
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger />
                <div
                    className="relative flex flex-wrap items-center justify-between h-[50px] ms-auto">
                    <div className="user-drop relative">
                        <button
                            type="button"
                            className="flex items-center py-2 px-3 border rounded-lg dropdown-toggle font-semibold cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <img
                                alt=""
                                title=""
                                loading="eager"
                                width={36}
                                height={36}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto lg:w-[36px] rounded-full w-[30px] h-[30px] lg:min-w-[36px] lg:min-h-[36px] object-cover"
                                srcSet="/img/profile-pic.png 2x"
                                src="/img/profile-pic.png"
                                style={{ color: "transparent" }}
                            />
                            <div className="ps-2">{userCred.username}</div>
                        </button>
                        {
                            isOpen && <div className="user-menu-content flex flex-col gap-2 min-w-[100px] absolute right-0 border border-gray-300 p-2">
                                <Link className="px-1" to={'/account'}>My Account</Link>
                                <Link className="px-1" to={'/'} onClick={logout}>Logout</Link>
                            </div>
                        }

                    </div>
                    <div onClick={toggleTheme}>
                        {theme === 'light' ?
                            <Button variant='outline' size="icon" className='cursor-pointer'>
                                <IconMoon />
                            </Button>
                            : <Button variant='outline' size="icon" className='cursor-pointer'><IconSun /></Button>
                        }
                    </div>
                </div>
            </header>
            {/* <div className={`topbar lg:ms-[70px] px-5 lg:px-[30px] border-b fixed top-0 right-0 left-0 h-[50px] ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray border-gray-700'}`}>
                <div
                    className="relative flex flex-wrap items-center justify-between h-[50px]">
                    <div
                        id="navbarToggler"
                        className="navbar-toggler lg:hidden !me-2 md:me-0">
                        <span className="icon-bar top-bar" />
                        <span className="icon-bar middle-bar" />
                        <span className="icon-bar bottom-bar" />
                    </div> 
                    <SidebarTrigger />

                    <div>
                        <button className="p-2 md:p-2.5 badge badge-danger badge-notification">
                            <svg className="ic ">
                                <use xlinkHref="#ic-bell" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div> */}
            {/* <Sidebar /> */}
        </>
    )
}
export default Header
