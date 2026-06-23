import { Button } from "@/components/ui/button"
import { FaArrowLeft, FaSave, FaCode, FaDesktop, FaTabletAlt, FaMobileAlt, FaPlay, FaUndo, FaRedo } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useBuilderStore } from "@/store/builderStore"
import { useServiceStatus } from "@/contexts/HealthContext"

export const TopBar = ({ 
  project, 
  onShowCode, 
  onShowPreview,
  onSave 
}: { 
  project: any, 
  onShowCode: () => void, 
  onShowPreview: () => void,
  onSave: () => void 
}) => {
  const navigate = useNavigate()
  const { undo, redo, historyIndex, history, deviceMode, setDeviceMode } = useBuilderStore()
  const { status } = useServiceStatus()

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <header className="h-14 border-b border-border/40 bg-card/30 flex items-center justify-between px-4 z-20 relative">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="w-8 h-8">
          <FaArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{project?.title || "Untitled Project"}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">Draft</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded" onClick={undo} disabled={!canUndo}>
            <FaUndo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded" onClick={redo} disabled={!canRedo}>
            <FaRedo className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md border border-border/40">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`w-8 h-8 rounded ${deviceMode === 'desktop' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setDeviceMode('desktop')}
          >
            <FaDesktop className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`w-8 h-8 rounded ${deviceMode === 'tablet' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setDeviceMode('tablet')}
          >
            <FaTabletAlt className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`w-8 h-8 rounded ${deviceMode === 'mobile' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setDeviceMode('mobile')}
          >
            <FaMobileAlt className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={onShowPreview}>
          <FaPlay className="w-4 h-4 mr-2" /> Preview
        </Button>
        <Button variant="outline" size="sm" className="border-border/50 disabled:opacity-50" onClick={onShowCode} disabled={status !== 'online'} title={status !== 'online' ? "Service offline" : ""}>
          <FaCode className="w-4 h-4 mr-2" /> Code
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50" onClick={onSave} disabled={status !== 'online'} title={status !== 'online' ? "Service offline" : ""}>
          <FaSave className="w-4 h-4 mr-2" /> Save
        </Button>
      </div>
    </header>
  )
}
