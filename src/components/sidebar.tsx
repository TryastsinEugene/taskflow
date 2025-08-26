import Image from "next/image"
import Link from "next/link"
import { Separator } from "./ui/separator"
import {Navigation} from "./navigation"

export const Sidebar = () =>{
    return(
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <Image src="/globe.svg" alt="logo" width={164} height={48} color="blue"/>
            </Link>
            <Separator className="my-4"/>
            <Navigation />
        </aside>
    )
}