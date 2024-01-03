'use client'
import {Pagination as PaginationComponent} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
    pages: number,
    currentPage: number
}

const Pagination = ({pages, currentPage}: PaginationProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChangePage = (page: number) => {
        const urlSearchParams = new URLSearchParams(searchParams)
        urlSearchParams.set("page", String(page))
        router.push(`${pathname}?${urlSearchParams.toString()}`)
    }

    return <PaginationComponent showControls onChange={(page) => handleChangePage(page)} className="mx-auto mb-4" total={pages} page={currentPage} />
}

export default Pagination