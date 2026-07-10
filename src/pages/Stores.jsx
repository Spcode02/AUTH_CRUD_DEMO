import { initialStores } from "@/assets/storeData"
import AddStoreModal from "@/components/AddStoreModal"
import { PageHeading } from "@/components/common/page-heading"
import RDSVG from "@/components/common/svg"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const Stores = () => {
    const [stores, setStores] = useState(initialStores)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingStore, setEditingStore] = useState(null)
    const handleAddStore = (newStore) => {
        console.log([...stores, newStore])

        setStores([...stores, newStore])
    }
    const deleteStore = (store) => {
        const remainStores = stores.filter((item) => item.id !== store.id)
        setStores(remainStores)
    }
    const updateStore = (selectedRow) => {
        console.log("selected Store", selectedRow);
        setModalOpen(true)
        setEditingStore(selectedRow)
    }
    const handleUpdateStore = (updatedStore) => {
        const modifiedStore = stores.map((store) => store.id === updatedStore.id ? updatedStore : store)
        console.log(modifiedStore);
        setStores(modifiedStore)
        setEditingStore(null)
    }
    return (
        <>
            <div className="flex justify-between mb-2">
                <PageHeading title={'Store Management'} />
                <Button variant="default" size="sm"
                    onClick={() => setModalOpen(true)}
                >
                    <RDSVG id={"ic_plus"} /> Add New Store
                </Button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Store Name</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Address</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stores.map((store) => {
                            return <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td>{store.status}</td>
                                <td>
                                    <button className="action-btn edit-btn blue-btn sm-btn"
                                        onClick={() => updateStore(store)}
                                    >
                                        <RDSVG id={'ic_edit'} />
                                    </button>
                                    <button className="action-btn delete-btn gray-btn sm-btn"
                                        onClick={() => deleteStore(store)}
                                    >
                                        <RDSVG id={'ic_trash'} />
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <AddStoreModal
                open={modalOpen}
                onOpenChange={(isOpen) => {
                    setModalOpen(isOpen);
                    if (!isOpen) setEditingStore(null)
                }}
                onAddStore={handleAddStore}
                onUpdateStore={handleUpdateStore}
                editingStore={editingStore}
            />
        </>
    )
}

export default Stores