import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface QuantityButtonProps {
    quantity: number
    addQuanHandler: () => void
    removeQuantHandler: () => void
    small?: boolean
}
const QuantityButton: React.FC<QuantityButtonProps> = ({ quantity, addQuanHandler, removeQuantHandler}) => {
    return (
        <div>
            <Card className="border-none shadow-none m-0">
                <CardContent className=" flex items-center p-0 h-7">
                    <div className='border flex items-center text-sm h-9'>
                        <Button variant="ghost" size="icon" className="text-black text-xl rounded-none" onClick={() => removeQuantHandler()}>
                            -
                        </Button>
                        <span className="text-black">{quantity}</span>
                        <Button variant="ghost" size="icon" className="text-black text-xl rounded-none" onClick={() => addQuanHandler()}>
                            +
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuantityButton
