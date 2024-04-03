import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'
import { useEffect, useState } from 'react'
import { BellIcon, Router, SettingsIcon } from 'lucide-react'
import { RiUserFollowFill } from 'react-icons/ri'
import { GrProjects } from 'react-icons/gr'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from '../auth/logout-button'
import { getAccountByUserId } from '@/data/user'
import { AuthProvider } from '@/hooks/AuthProvider'
import { redirect, useRouter } from 'next/navigation'
import { HoverEffect } from './hoverCard'
import { Dialog, DialogContent, DialogTrigger } from './dialog'
import { FaPlus } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { FaLinkedinIn } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import LanguagesDropdown from '../project/languageDropdown'
import { languageOptions } from '@/constants/languageOptions'
import { SetStateAction } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './input'
import { useForm } from 'react-hook-form'
import { ProjectSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import Header from './BHeader'

interface ProfileProps {
  id: string
}

interface account {
  access_token: string
  banner: string
  created_at: Date
  expires_at: number
  githubLink: string
  id: string
  id_token: string | null
  linkedinLink: string
  profileImage: string
  provider: string
  providerAccountId: string
  refresh_token: string
  scope: string | null
  session_state: string | null
  token_type: string | null
  type: string
  updated_at: Date
  userId: string
  username: string
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [account, setAccount] = useState<unknown>(null)
  const [open, setOpen] = useState<boolean | undefined>(false)
  const [language, setLanguage] = useState(languageOptions[0])
  const router = useRouter()
  const onSelectChange = (
    sl: SetStateAction<{
      id: number
      name: string
      label: string
      value: string
    }>
  ) => {
    console.log('selected Option...', sl)
    setLanguage(sl)
  }
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getAccountByUserId(id)
        setAccount(response)
      } catch (error) {
        console.error('Error fetching account:', error)
      }
    }

    fetchAccount()
  }, [id])
  const [isPending, startTransition] = useTransition()
  // const [error, setError] = useState<string | undefined>('')
  // const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      lang: '',
      pname: '',
      pdescp: '',
      extension: '',
      accountId: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
    values.lang = language.value
    values.accountId = account?.id
    console.log(values)
    switch (values.lang) {
      case 'python':
        values.extension = 'py'
        break
      case 'cpp':
        values.extension = 'cpp'
        break
      case 'c':
        values.extension = 'c'
        break
      case 'javascript':
        values.extension = 'js'
        break
      case 'typescript':
        values.extension = 'ts'
        break
    }

    axios.post("/api/project",values)
    .then((response)=>{
        console.log(response)
        const projectId = response.data.project.projectId;
        router.push(`/editor?projectId=${projectId}`)
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
      <div className="hidden  lg:block bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-[60px] items-center  px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <span className="text-xl">Relay</span>
            </Link>
            <Button
              className="ml-auto h-10 w-10 rounded-full "
              size="icon"
              variant="ghost"
            >
              <IoIosNotifications size={30} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-clip py-2">
            <nav className="grid items-start pl-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg  py-2  transition-all  text-gray-400 hover:text-gray-50"
                href="#"
              >
                Home
              </Link>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex items-center gap-3 rounded-lg py-2 transition-all  text-gray-400 hover:text-gray-50">
                  <FaPlus />
                  Create Project
                </DialogTrigger>
                <DialogContent className="w-50 flex flex-col justify-center items-center text-black">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2 text-black"
                    >
                      <LanguagesDropdown onSelectChange={onSelectChange} />
                      <div className=" space-y-6 m-2">
                        <FormField
                          control={form.control}
                          name="pname"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Project Name:</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder=""
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="pdescp"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Project description:</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Interactive project"
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                      <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Link
                className="flex items-center gap-3 rounded-lg  py-2 transition-all text-gray-400 hover:text-gray-50"
                href="#"
              >
                <GrProjects />
                Projects
              </Link>

              <Link
                className="flex items-center gap-3 rounded-lg py-2 transition-all text-gray-400 hover:text-gray-50"
                href="#"
              >
                <RiUserFollowFill />
                Follow
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg  py-2 transition-all text-gray-400 hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col">
        <Header imgUrl={account?.profileImage} />
        <div className="w-full  bg-grid-white/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
          <div className="relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-green-600">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <div className="grid items-start justify-center gap-4">
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                    <Image
                      alt="Avatar"
                      className="rounded-full"
                      height="150"
                      src={account?.profileImage || '/placeholder.svg'}
                      style={{
                        aspectRatio: '150/150',
                        objectFit: 'cover',
                      }}
                      width="150"
                    />
                    <div className="grid items-center gap-1 text-center md:flex md:gap-1 md:text-left">
                      <h1 className="text-xl font-medium">
                        @{account?.username}
                      </h1>
                      {/* <Button className="rounded-full" size="icon">
                  <span className="sr-only">Edit</span>
                </Button> */}
                    </div>
                    <div className="flex gap-5 items-center">
                      <p className="text-xl ml-3 text-gray-500 dark:text-gray-400">
                        <Link href="#">
                          <FaLinkedinIn size={30} />
                        </Link>
                      </p>
                      <p className="text-xl text-gray-500 dark:text-gray-400">
                        <Link href="#">
                          <FaGithub size={30} />
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center max-w-5xl mx-auto px-8">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="w-full flex flex-col justify-center items-center max-w-5xl mx-auto px-8">
                    <HoverEffect items={projects} />
                  </DialogTrigger>
                  <DialogContent className="w-50 flex flex-col justify-center items-center">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <LanguagesDropdown onSelectChange={onSelectChange} />
                        <div className=" space-y-6 m-2">
                          <FormField
                            control={form.control}
                            name="pname"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel className='text-black'>Project Name:</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      disabled={isPending}
                                      placeholder=""
                                      type="text"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="pdescp"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel className="text-black">
                                    Project description:
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      disabled={isPending}
                                      placeholder="Interactive project"
                                      type="text"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <Button
                          disabled={isPending}
                          type="submit"
                          className="w-full"
                        >
                          Submit
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

export const projects = [
  {
    title: 'Start Relay',
    description:
      'A technology company that builds economic infrastructure for the internet.',
  },
  {
    title: 'Import from Github',
    description:
      'A streaming service that offers a wide variety of award-winning',
  },
]
