import React, { useEffect, useState } from 'react'
import {
  getAccountByAccountName,
  getProjetByAccountId,
  getAccountByUserId,
} from '@/data/user'
import { useRouter } from 'next/navigation'
import ProjectCard from './ProjectCard'
import { AuthProvider } from '@/hooks/AuthProvider'

interface projects {
  projectId: string
  projectName: string
  projectDescription: string
  projectType: string
  created_at: Date
  updated_at: Date
  creator: string
}

interface ProjectProps {
  username?: string
}

const Projects: React.FC<ProjectProps> = ({ username }) => {
  const [account, setAccount] = useState<any>()
  const [projects, setProjects] = useState<Array<projects>>([])
  const router = useRouter()
  const id = AuthProvider()

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        if (username) {
          const response = await getAccountByAccountName(username)
          setAccount(response)
        } else if (id) {
          const response = await getAccountByUserId(id)
          setAccount(response)
        }
      } catch (error) {
        console.error('Error fetching account:', error)
      }
    }

    fetchAccount()
  }, [username, id])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (account?.id) {
          const response = await getProjetByAccountId(account.id)
          setProjects(response)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProject()
  }, [account])

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid items-start justify-center gap-4">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects?.length === 0 ? (
              <div>No Projects have been created</div>
            ) : (
              projects?.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Projects
