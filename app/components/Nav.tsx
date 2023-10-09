import Link from "next/link";


export default async function Nav() {

    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={'/'}>
                <h1 className="font-bold text-base md:text-lg">AdventureWorks Database 2022</h1>
            </Link>
            <ul className="flex items-center gap-12">
            <Link href={'/dashboard'}>
                <h1 className="font-bold text-base md:text-lg">Products</h1>
            </Link>
            <Link href={'/create'}>
                <h1 className="font-bold text-base md:text-lg">Create Product</h1>
            </Link>
            </ul>
        </nav>
    )
}