import React from 'react'

interface RadioButtonCircleProps {
    checked: boolean;
}
const RadioButtonCircle: React.FC<RadioButtonCircleProps> = ({ checked }) => {
    return (
        <div>
            <div className="flex items-center cursor-pointer">
                <div className="relative w-5 h-5 mr-2 flex items-center justify-center">
                    <div className={`w-full h-full border-2 rounded-full ${checked ? 'border-black' : 'border-gray-400'}`}></div>
                    {checked && (
                        <div className="absolute w-3 h-3 bg-black rounded-full"></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RadioButtonCircle
