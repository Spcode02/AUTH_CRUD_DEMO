const Sidebar = () => {
    return (
        <div
            id="mySidebar"
            className="sidebar bg-gray-800 navHide"

        >
            <div className="hidden lg:block brand-logo">
                <a className="full-logo" href="/">
                    <img
                        alt="ROS"
                        title="ROS"
                        loading="eager"
                        width={60}
                        height={60}
                        decoding="async"
                        data-nimg={1}
                        className="mx-auto w-auto"
                        src="/img/logo-white.svg"
                        style={{ color: "transparent" }}
                    />
                </a>
            </div>
            <div className="menu d-flex flex-column">
                <ul className="ps-0">
                    <li className="active">
                        <a href="/">
                            <svg className="ic ">
                                <use xlinkHref="#ic-dashboard" />
                            </svg>
                            <span className="nav-text">Order Dashboard</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/past-orders">
                            <svg className="ic ">
                                <use xlinkHref="#ic-clipboard-list" />
                            </svg>
                            <span className="nav-text">Past Orders</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/manage-store">
                            <svg className="ic ">
                                <use xlinkHref="#ic-building-store" />
                            </svg>
                            <span className="nav-text">Store Information</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/reports">
                            <svg className="ic ">
                                <use xlinkHref="#ic-report" />
                            </svg>
                            <span className="nav-text">Reports</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Sidebar