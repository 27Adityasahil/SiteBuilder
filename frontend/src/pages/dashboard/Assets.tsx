import { Sidebar } from "@/components/dashboard/Sidebar"
import { Button } from "@/components/ui/button"
import { FaUpload, FaTrash, FaCopy, FaImage } from "react-icons/fa"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface Asset {
  _id: string
  url: string
  type: string
  createdAt: string
}

export default function Assets() {
  const navigate = useNavigate()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    fetchAssets(token)
  }, [navigate])

  const fetchAssets = async (token: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/assets`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAssets(response.data)
    } catch (error) {
      console.error("Failed to fetch assets", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file) // backend expects 'image'

    const token = localStorage.getItem("token")
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/assets`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      })
      fetchAssets(token!)
    } catch (error) {
      console.error("Upload failed", error)
      alert("Failed to upload asset")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this asset permanently?")) return
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAssets(assets.filter(a => a._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // could use a toast here
    alert("URL copied to clipboard")
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
              <p className="text-muted-foreground mt-1">Manage your images and media.</p>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-white text-black hover:bg-neutral-200"
              disabled={uploading}
            >
              <FaUpload className="mr-2 w-4 h-4" /> 
              {uploading ? "Uploading..." : "Upload Asset"}
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="aspect-square rounded-xl bg-card/30 animate-pulse border border-border/40" />
               ))}
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/50 rounded-xl bg-card/20">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <FaImage className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No assets uploaded</h3>
              <p className="text-muted-foreground mb-6">Upload images to use them in your projects.</p>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">Upload Image</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {assets.map((asset) => (
                <div key={asset._id} className="group relative rounded-xl overflow-hidden glass-card border border-border/50 bg-card/40 hover:border-primary/50 transition-colors aspect-square">
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-10">
                    <Button variant="secondary" size="sm" onClick={() => copyUrl(asset.url)}>
                      <FaCopy className="w-4 h-4 mr-2" /> Copy URL
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(asset._id)}>
                      <FaTrash className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                  {asset.type.includes('image') ? (
                    <img src={asset.url} alt="asset" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <FaImage className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
