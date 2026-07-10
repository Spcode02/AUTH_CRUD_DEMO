import { useEffect, useState } from "react";
import { restaurantMenu } from "../assets/menuData";
import RDSVG from "./common/svg";
// import DialogDemo from "./Modal";
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import AddDishModal from "./AddDishModal";
import { PageHeading } from "./common/page-heading";


const MenuManager = () => {
    const [menuItems, setMenuItems] = useState(restaurantMenu)
    console.log(menuItems);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDish, setEditingDish] = useState(null)
    const handleAddDish = (newDish) => {
        console.log(newDish);
        setMenuItems([...menuItems, newDish]);
        console.log(menuItems);
    }
    const updateItem = (selectedRow) => {
        console.log("selectedRow", selectedRow)
        setEditingDish(selectedRow)
        // const updatingItem = menuItems.find((item) => item.id == itemId)
        setIsModalOpen(true)
        // console.log(updatingItem);
        // return updatingItem
    }
    const handleUpdateDish = (updatedDish => {
        const modifiedMenu = menuItems.map((item) =>
            item.id === updatedDish.id ? updatedDish : item
        );

        // Update master state to instantly reflect the change on screen
        setMenuItems(modifiedMenu);
        setEditingDish(null);
    })
    const deleteItem = (Deleteitem => {
        const remainedMenu = menuItems.filter(item => item.id !== Deleteitem.id)
        setMenuItems(remainedMenu)
    })
    return (
        <>
            <div className="flex justify-between mb-2">
                <PageHeading title={'Menu Management'} />
                {/* <button className="btn btn-primary" onClick={() => addNewDish}>
                    + Add New Dish
                </button> */}
                <Button variant="default" size="sm" onClick={() => setIsModalOpen(true)}>
                    <IconPlus /> Add New Dish
                </Button>

            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Dish Name</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Category</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Price</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menuItems.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="action-btn edit-btn blue-btn sm-btn"
                                        onClick={() => updateItem(item)}
                                    >
                                        <RDSVG id={'ic_edit'} />
                                    </button>
                                    <button className="action-btn delete-btn gray-btn sm-btn"
                                        onClick={() => deleteItem(item)}
                                    >
                                        <RDSVG id={'ic_trash'} />
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <AddDishModal
                open={isModalOpen}
                onOpenChange={(isOpen) => {
                    setIsModalOpen(isOpen);
                    if (!isOpen) setEditingDish(null); // Clear editing state when modal closes
                }}
                whenAddNewDish={handleAddDish}
                editingDish={editingDish}
                onUpdateDish={handleUpdateDish}
            />
            {/* <UpdateDishModal open={isModalOpen} onOpenChange={setIsModalOpen} whenEditDish={handleUpdateDish} /> */}

        </>
    )
}

export default MenuManager
