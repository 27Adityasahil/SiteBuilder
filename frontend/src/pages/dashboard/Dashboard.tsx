import { Sidebar } from "@/components/dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaCopy, FaFolderOpen, FaDesktop } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useServiceStatus } from "@/contexts/HealthContext"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Project {
  _id: string
  title: string
  updatedAt: string
  thumbnail?: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { status } = useServiceStatus()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProjects(response.data)
      } catch (error) {
        console.error("Failed to fetch projects", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [navigate])

  const handleCreateProject = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post("http://localhost:5000/api/projects", { title: "New Project" }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate(`/builder/${response.data._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProjects(projects.filter(p => p._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your websites and assets.</p>
            </div>
            <Button onClick={handleCreateProject} className="bg-white text-black hover:bg-neutral-200 disabled:opacity-50" disabled={status !== 'online'} title={status !== 'online' ? "Service offline" : ""}>
              <FaPlus className="mr-2 w-4 h-4" /> New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{projects.length}</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12 MB</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Custom Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">Pro</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold tracking-tight mb-6">Recent Projects</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-64 rounded-xl bg-card/30 animate-pulse border border-border/40" />
               ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/50 rounded-xl bg-card/20">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <FaFolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">Create your first project to start building.</p>
              <Button onClick={handleCreateProject} disabled={status !== 'online'} title={status !== 'online' ? "Service offline" : ""}>Create Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="group relative rounded-xl overflow-hidden glass-card border border-border/50 flex flex-col bg-card/40 hover:border-primary/50 transition-colors">
                  <div 
                    className="aspect-video bg-muted relative cursor-pointer"
                    onClick={() => navigate(`/builder/${project._id}`)}
                  >
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                        <FaDesktop className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <Button variant="secondary" className="font-medium">Open Builder</Button>
                    </div>
                  </div>
                  <div className="p-4 flex items-start justify-between bg-card/50">
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Edited {new Date(project.updatedAt).toLocaleDateString()}</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <FaEllipsisV className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => navigate(`/builder/${project._id}`)}>
                          <FaEdit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/builder/${project._id}`)}>
                          <FaCopy className="mr-2 h-4 w-4" /> Open Builder
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => handleDelete(project._id)}>
                          <FaTrash className="mr-2 h-4 w-4" /> Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
