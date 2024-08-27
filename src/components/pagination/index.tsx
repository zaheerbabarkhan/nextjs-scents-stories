import React, { useEffect } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}


const Pagintaion: React.FC<PaginationProps> = ({ currentPage, setPage, totalPages }) => {
    const handlePrevious = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const handleNext = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    };

    useEffect(() => {
    }, [totalPages])
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={handlePrevious}
                            className={`px-3 py-2 border rounded ${prevDisabled
                                ? " cursor-not-allowed bg-gray-400 text-white"
                                : ""
                                }`}
                            aria-disabled={prevDisabled}
                        >
                            Previous
                        </PaginationPrevious>
                    </PaginationItem>

                    <PaginationItem>
                        <div className='w-44 flex justify-center'>Page {currentPage} of {totalPages}</div>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={handleNext}
                            className={`px-3 py-2 border rounded ${nextDisabled
                                ? " cursor-not-allowed bg-gray-400 text-white"
                                : ""
                                }`}
                            aria-disabled={nextDisabled}
                        >
                            Next
                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div >
    )
}

export default Pagintaion
