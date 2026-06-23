import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaColumns, FaFolder, FaPuzzlePiece, FaImage, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaColumns className="w-4 h-4" /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FaFolder className="w-4 h-4" /> },
    { name: "Templates", path: "/dashboard/templates", icon: <FaPuzzlePiece className="w-4 h-4" /> },
    { name: "Assets", path: "/dashboard/assets", icon: <FaImage className="w-4 h-4" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog className="w-4 h-4" /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <aside className="w-64 border-r border-border/40 bg-card/30 flex flex-col h-screen">
      <div className="p-6 border-b border-border/40 flex items-center gap-2">

        <span className="font-bold text-lg tracking-tight">SiteBuilder</span>
      </div>

      <div className="p-4 flex-1">
        <Button className="w-full bg-white text-black hover:bg-neutral-200 mb-6 justify-start">
            <FaPlus className="w-4 h-4 text-white" /> New Project
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.name} to={item.path}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border/40">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
