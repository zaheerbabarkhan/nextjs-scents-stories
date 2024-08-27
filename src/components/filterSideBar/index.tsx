import { useGetCategoriesQuery } from '@/provider/redux/query';
import { Categpories } from '@/types/categories';
import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

export interface FilterSideBarProps {
    changeCategory: (category: string) => void
}
const FilterSideBar: React.FC<FilterSideBarProps> = ({ changeCategory }) => {
    const { data, error, isLoading } = useGetCategoriesQuery({});
    const [categories, setCategories] = useState([] as Categpories[]);

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading categories</p>;

    return (
        <div>
            {categories.map((category) => (
                <div key={category.categoryGenre} className='mb-3'>
                    <h3 className='text-lg font-bold'>{category.categoryGenre}</h3>
                    <Separator />
                    <RadioGroup
                        onValueChange={(value) => {
                            changeCategory(value)
                        }}
                        name={category.categoryGenre}>
                        <div className='flex flex-col gap-2 items-start text-lg'>
                            {category.uniqueCategories.map((item) => (
                                <div key={item} className='flex gap-1 mt-1'>
                                    <RadioGroupItem value={item} id={item} key={item} />
                                    <Label htmlFor="r1" className='uppercase'>{item}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
}

export default FilterSideBar
