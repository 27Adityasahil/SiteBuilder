import { FaColumns, FaFont, FaSquare, FaImage, FaBox, FaChevronRight, FaChevronDown, FaTrash, FaPlus, FaFileAlt } from "react-icons/fa"
import { useBuilderStore } from "@/store/builderStore"
import type { ComponentType, ComponentNode } from "@/lib/types/builder"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export const LeftSidebar = () => {
  const { pages, currentPageId, setCurrentPageId, createPage, deletePage, selectedId, setSelectedId, addComponent, deleteComponent } = useBuilderStore()
  
  const tree = pages.find(p => p.id === currentPageId)?.tree || null;
  const [newPageName, setNewPageName] = useState("")

  const components = [
    { icon: <FaBox className="w-4 h-4" />, label: "Navbar", type: "Navbar" },
    { icon: <FaBox className="w-4 h-4" />, label: "Footer", type: "Footer" },
    { icon: <FaBox className="w-4 h-4" />, label: "Section", type: "Section" },
    { icon: <FaColumns className="w-4 h-4" />, label: "Container", type: "Container" },
    { icon: <FaFont className="w-4 h-4" />, label: "Heading", type: "Heading" },
    { icon: <FaFont className="w-4 h-4" />, label: "Paragraph", type: "Paragraph" },
    { icon: <FaSquare className="w-4 h-4" />, label: "Button", type: "Button" },
    { icon: <FaImage className="w-4 h-4" />, label: "Image", type: "Image" },
    { icon: <FaSquare className="w-4 h-4 text-purple-400" />, label: "Shape", type: "Shape" },
  ] as const

  const handleAddComponent = (type: ComponentType) => {
    if (!tree) return;
    const targetId = selectedId || tree.id;
    addComponent(targetId, type);
  }

  const handleCreatePage = () => {
    if (newPageName.trim()) {
      createPage(newPageName, `/${newPageName.toLowerCase().replace(/\s+/g, '-')}`)
      setNewPageName("")
    }
  }

  // Recursive Tree View Component
  const LayerNode = ({ node, level = 0 }: { node: ComponentNode, level?: number }) => {
    const [expanded, setExpanded] = useState(true);
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col group">
        <div 
          className={`flex items-center gap-1 py-1 px-2 text-xs cursor-pointer hover:bg-muted/50 rounded-sm transition-colors ${isSelected ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground'}`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => setSelectedId(node.id)}
        >
          <div onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }} className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-muted rounded">
            {hasChildren ? (expanded ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />) : <div className="w-3 h-3" />}
          </div>
          <span className="flex-1 truncate">{node.name}</span>
          
          {isSelected && node.type !== 'Page' && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-5 h-5 hocus:bg-destructive/20 hocus:text-destructive text-muted-foreground opacity-0 group-hover:opacity-100"
              onClick={(e) => { e.stopPropagation(); deleteComponent(node.id); }}
            >
              <FaTrash className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        {expanded && hasChildren && (
          <div className="flex flex-col">
            {node.children.map(child => (
              <LayerNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="w-64 border-r border-border/40 bg-card/20 flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="components" className="w-full flex flex-col h-full">
        <div className="px-4 pt-4 border-b border-border/40 shrink-0">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="components">Build</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="components" className="flex-1 flex flex-col m-0 p-0 overflow-hidden">
          <div className="p-4 border-b border-border/40 shrink-0 h-[300px] overflow-y-auto">
            <h3 className="font-semibold text-sm mb-4 text-muted-foreground">Components</h3>
            <div className="grid grid-cols-2 gap-2">
              {components.map((c) => (
                <div 
                  key={c.type} 
                  className="flex flex-col items-center justify-center p-3 rounded-md border border-border/40 bg-card/40 hover:bg-primary/10 hover:border-primary/30 cursor-pointer active:scale-95 transition-all"
                  onClick={() => handleAddComponent(c.type as ComponentType)}
                >
                  <div className="text-muted-foreground mb-2">{c.icon}</div>
                  <span className="text-xs font-medium">{c.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-3">Click to add to selected container</p>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <h3 className="font-semibold text-sm p-4 pb-2 text-muted-foreground shrink-0">Layers</h3>
            <div className="flex-1 overflow-y-auto px-2 pb-4">
              {tree ? <LayerNode node={tree} /> : (
                <div className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-md">
                  No layers found
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="flex-1 overflow-y-auto p-4 m-0">
          <h3 className="font-semibold text-sm mb-4 text-muted-foreground">Project Pages</h3>
          <div className="space-y-2 mb-6">
            {pages.map(page => (
              <div 
                key={page.id}
                onClick={() => setCurrentPageId(page.id)}
                className={`flex items-center justify-between p-2 rounded-md border text-sm cursor-pointer transition-colors ${currentPageId === page.id ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-card/40 border-border/40 hover:bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FaFileAlt className="w-3 h-3 opacity-70" />
                  <span className="truncate">{page.name}</span>
                </div>
                {pages.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6 hover:text-destructive opacity-50 hover:opacity-100"
                    onClick={(e) => { e.stopPropagation(); deletePage(page.id) }}
                  >
                    <FaTrash className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/40">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Create New Page</h4>
            <div className="flex gap-2">
              <Input 
                value={newPageName} 
                onChange={e => setNewPageName(e.target.value)} 
                placeholder="Page Name (e.g. About)" 
                className="h-8 text-xs"
                onKeyDown={e => e.key === 'Enter' && handleCreatePage()}
              />
              <Button size="icon" className="h-8 w-8 shrink-0" onClick={handleCreatePage}>
                <FaPlus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
