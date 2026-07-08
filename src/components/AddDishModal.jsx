import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useEffect, useState } from "react"

const AddDishModal = ({ open, onOpenChange, whenAddNewDish, editingDish, onUpdateDish }) => {
    const [formData, setFormData] = useState({ name: "", price: "", category: "Main" });
    useEffect(() => {
        if (editingDish) {
            // 📝 If editingRow has data (User clicked "Edit"), pre-fill the form inputs!
            setFormData({
                name: editingDish.name,
                price: editingDish.price,
                category: editingDish.category
            });
        } else {
            // ➕ If editingRow is null (User clicked "+ Add New Dish"), clear the form inputs!
            setFormData({ name: "", price: "", category: "Main" });
        }
    }, [editingDish]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        const packagedDish = {
            name: formData.name,
            price: parseFloat(formData.price) || 0,
            category: formData.category
        };
        if (editingDish) {
            onUpdateDish({ ...packagedDish, id: editingDish.id })
        }
        else {
            whenAddNewDish({ ...packagedDish, id: Date.now() });
        }
        // here calling onAddDish function and passing object as an argument
        // whenAddNewDish({
        //     id: Date.now(),
        //     name: formData.name,
        //     price: formData.price,
        //     category: formData.category
        // })
        // setFormData({ name: "", price: "", category: "Main" })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add New Dish</DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit} >
                    {/* <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-sm font-medium'>Dish Name</label>
                                    <Label htmlFor="email">Your email address</Label>

                                    <input type="text" className='form-control' />
                                </div> */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="dishname">Dish Name</FieldLabel>
                            <Input
                                type={'text'}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="dishname">Price($)</FieldLabel>
                            <Input
                                type={'number'}
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Dish</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default AddDishModal