import * as React from "react";
import { RiSearchLine } from "react-icons/ri";

// import { cn } from "@ui/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({type, ...props }, ref) => {

        return (
            <div className={`w-full relative rounded-full`}>
                <input
                    type={type}
                    className=
                    "flex  w-60 h-11 rounded-full border border-input bg-background text-base py-2 px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black focus-visible:border-2"
                    ref={ref}
                    {...props}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <RiSearchLine size={28} className='' />

                </div>
            </div>
        );
    }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
