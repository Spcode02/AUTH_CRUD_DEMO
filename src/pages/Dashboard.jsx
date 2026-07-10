import { PageHeading } from "@/components/common/page-heading";
import { restaurantMenu } from "../assets/menuData";
const Dashboard = () => {
    const menuItems = restaurantMenu
    return (
        <>
            <PageHeading title={"Dashboard"} />
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }} className="table">
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Dish Name</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Category</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menuItems.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>

    )
}
export default Dashboard