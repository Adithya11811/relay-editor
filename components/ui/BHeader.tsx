import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"
import Image from "next/image"
import { LogoutButton } from "../auth/logout-button"
interface profileProps {
    imgUrl: string
}

const Header: React.FC<profileProps> = ({imgUrl}) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 px-6 bg-gray-800/40">
      <Link
        className="lg:hidden flex items-center gap-2 font-semibold"
        href="#"
      >
        <span className="">Relay Editor</span>
      </Link>
      <nav className=" flex flex-1 gap-2 lg:gap-4 justify-center text-sm">
        <Link
          className=" hidden lg:flex items-center gap-2 rounded-lg hover:scale-105 px-3 py-2 bg-slate-800 tracking-wide transition-all text-gray-400 hover:text-gray-50"
          href="#"
        >
          Profile
        </Link>
        <Link
          className="flex items-center gap-2 rounded-lg hover:scale-105  px-3 py-2 tracking-wide transition-all text-gray-400 hover:text-gray-50"
          href="#"
        >
          Projects
        </Link>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border-2 border-green-600 w-8 h-8 dark:border-gray-800"
            id="user-menu"
            size="icon"
            variant="ghost"
          >
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={imgUrl || '/hsec1.jpg'}
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-slate-800/20  text-gray-400"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:text-gray-50 focus:bg-slate-800/20">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-50 focus:bg-slate-800/20">
            Support
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="focus:text-gray-50 focus:bg-slate-800/60">
            <LogoutButton>Logout</LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
export default Header