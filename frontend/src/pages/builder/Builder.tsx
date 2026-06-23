import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { TopBar } from "@/components/builder/TopBar"
import { LeftSidebar } from "@/components/builder/LeftSidebar"
import { RightSidebar } from "@/components/builder/RightSidebar"
import { Canvas } from "@/components/builder/Canvas"
import { CodeModal } from "@/components/code/CodeModal"
import { PreviewModal } from "@/components/builder/PreviewModal"
import axios from "axios"
import { useBuilderStore } from "@/store/builderStore"

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const { pages, currentPageId, setPages, setCurrentPageId, createPage, selectedId, setSelectedId } = useBuilderStore()
  const tree = pages.find(p => p.id === currentPageId)?.tree || null;

  useEffect(() => {
    const isPlayground = !id;
    const token = localStorage.getItem("token")
    
    if (!token && !isPlayground) {
      navigate("/login")
      return
    }

    if (isPlayground) {
      if (pages.length === 0) {
        // Initialize an empty playground page
        createPage("Home", "/")
      }
      setLoading(false)
      return
    }

    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProject(response.data)
        
        if (response.data.pages && response.data.pages.length > 0) {
          setPages(response.data.pages)
          setCurrentPageId(response.data.defaultPageId || response.data.pages[0].id)
        } else {
          // Fallback if empty
          createPage("Home", "/")
        }
      } catch (error) {
        console.error("Failed to fetch project", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, navigate])

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/register")
      return
    }
    
    if (!id) {
      alert("Please create a project from the dashboard to save.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/projects/${id}`, { pages, defaultPageId: currentPageId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Project saved!")
    } catch (error) {
      console.error(error)
      alert("Failed to save project")
    }
  }

  const handleShowCode = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/register")
      return
    }
    setShowCode(true)
  }

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-background">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      <TopBar 
        project={project} 
        onShowCode={handleShowCode} 
        onShowPreview={() => setShowPreview(true)}
        onSave={handleSave} 
      />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <Canvas tree={tree} selectedId={selectedId} setSelectedId={setSelectedId} />
        <RightSidebar />
      </div>

      {showCode && <CodeModal onClose={() => setShowCode(false)} />}
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} />}
    </div>
  )
}
