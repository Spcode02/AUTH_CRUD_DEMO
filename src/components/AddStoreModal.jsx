
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
const AddStoreModal = ({ open, onOpenChange, onAddStore, editingStore, onUpdateStore }) => {
    const Statusitems = ["Active", "InActive"]
    const [formData, setFormData] = useState({ name: '', address: '', status: '' })
    useEffect(() => {
        if (editingStore) {
            setFormData({
                name: editingStore.name,
                address: editingStore.address,
                status: editingStore.status
            })
        }
        else {
            setFormData({
                name: '', address: '', status: ''
            })
        }
    }, [editingStore])

    const handleSubmit = (e) => {
        e.preventDefault()
        // setFormData({
        //     name: e.target.name,
        //     address: e.target.addrees,
        //     status: e.target.status
        // })
        const finalStore = {
            name: formData.name,
            address: formData.address,
            status: formData.status
        }
        if (editingStore) {
            onUpdateStore({
                ...finalStore,
                id: editingStore.id,
            })
        }
        else {
            onAddStore({
                ...finalStore,
                id: Date.now()
            })

        }
        console.log(formData);
        onOpenChange(false)

    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {editingStore ? "Edit Store" : "Add Store"}</DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="storename">Store name</FieldLabel>
                            <Input id="storename"
                                type={"text"}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Input id="address"
                                type={"text"}
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Select Statusitems={Statusitems}
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        {Statusitems.map((item) => (
                                            <SelectItem
                                                key={item}
                                                value={item} >
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit"> {editingStore ? "Update Store" : "Save Store"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>

    )
}

export default AddStoreModal