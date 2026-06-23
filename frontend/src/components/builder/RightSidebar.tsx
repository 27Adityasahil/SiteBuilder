import { useRef, useState } from "react"
import axios from "axios"
import type { ComponentNode } from "@/lib/types/builder"
import { FaMagic, FaUpload } from "react-icons/fa"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBuilderStore } from "@/store/builderStore"
import { Button } from "@/components/ui/button"
import { useServiceStatus } from "@/contexts/HealthContext"

export const RightSidebar = () => {
  const { pages, currentPageId, selectedId, updateNodeProps } = useBuilderStore()
  const tree = pages.find(p => p.id === currentPageId)?.tree || null;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { status } = useServiceStatus();
  
  // Helper to find a node by ID in the tree
  const findNode = (node: ComponentNode, id: string): ComponentNode | null => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  }

  const selectedNode = tree && selectedId ? findNode(tree, selectedId) : null;

  const handleStyleChange = (key: string, value: string) => {
    if (!selectedId || !selectedNode) return;
    updateNodeProps(selectedId, {
      style: { ...selectedNode.props.style, [key]: value }
    });
  }

  const handlePropChange = (key: string, value: string | number) => {
    if (!selectedId || !selectedNode) return;
    updateNodeProps(selectedId, { [key]: value });
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)

    const token = localStorage.getItem("token")
    if (!token) {
      alert("You must be logged in to upload images.")
      setUploading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:5000/api/assets", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      })
      handlePropChange('src', response.data.url)
    } catch (error) {
      console.error("Upload failed", error)
      alert("Failed to upload asset")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  if (!selectedNode) {
    return (
      <aside className="w-72 border-l border-border/40 bg-card/20 flex flex-col h-full p-6 items-center justify-center text-center z-10 relative">
        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <span className="text-muted-foreground text-sm"><FaMagic className="inline-block text-yellow-400" /></span>
        </div>
        <p className="text-muted-foreground text-sm">Select an element on the canvas to edit its properties.</p>
      </aside>
    )
  }

  return (
    <aside className="w-72 border-l border-border/40 bg-card/20 flex flex-col h-full overflow-y-auto z-10 relative">
      <div className="p-4 border-b border-border/40 flex items-center justify-between sticky top-0 bg-card/90 backdrop-blur z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="font-semibold text-sm">{selectedNode.type}</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">#{selectedNode.id.substring(0, 4)}</span>
      </div>

      <Tabs defaultValue="style" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-border/40 bg-transparent h-12 p-0">
          <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Style</TabsTrigger>
          <TabsTrigger value="props" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Props</TabsTrigger>
        </TabsList>
        
        <TabsContent value="style" className="p-0 m-0">
          <div className="p-4 space-y-6">
            
            {/* Dimensions */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dimensions</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input 
                    className="h-8 text-xs bg-background/50" 
                    value={selectedNode.props.style?.width || ''} 
                    onChange={(e) => handleStyleChange('width', e.target.value)}
                    placeholder="auto, 100%, 200px" 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Input 
                    className="h-8 text-xs bg-background/50" 
                    value={selectedNode.props.style?.height || ''} 
                    onChange={(e) => handleStyleChange('height', e.target.value)}
                    placeholder="auto, 100vh, 200px" 
                  />
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typography</h4>
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <Input 
                    className="h-8 text-xs bg-background/50" 
                    value={selectedNode.props.style?.color || ''} 
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    placeholder="#000000, red, etc." 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Font Size</Label>
                    <Input 
                      className="h-8 text-xs bg-background/50" 
                      value={selectedNode.props.style?.fontSize || ''} 
                      onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                      placeholder="16px, 1rem" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Weight</Label>
                    <Input 
                      className="h-8 text-xs bg-background/50" 
                      value={selectedNode.props.style?.fontWeight || ''} 
                      onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                      placeholder="400, bold" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Background & Border */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Appearance</h4>
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Background Color</Label>
                  <Input 
                    className="h-8 text-xs bg-background/50" 
                    value={selectedNode.props.style?.backgroundColor || ''} 
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    placeholder="#ffffff, transparent" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Border Radius</Label>
                    <Input 
                      className="h-8 text-xs bg-background/50" 
                      value={selectedNode.props.style?.borderRadius || ''} 
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      placeholder="4px, 50%" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Padding</Label>
                    <Input 
                      className="h-8 text-xs bg-background/50" 
                      value={selectedNode.props.style?.padding || ''} 
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="1rem, 10px 20px" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </TabsContent>
        
        <TabsContent value="props" className="p-0 m-0">
          <div className="p-4 space-y-4">
            {(selectedNode.type === 'Text' || selectedNode.type === 'Heading' || selectedNode.type === 'Button' || selectedNode.type === 'Paragraph' || selectedNode.type === 'Link') && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Text Content</Label>
                <Input 
                  className="h-8 text-xs bg-background/50" 
                  value={selectedNode.props.text || ''} 
                  onChange={(e) => handlePropChange('text', e.target.value)}
                />
              </div>
            )}
            
            {selectedNode.type === 'Heading' && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Heading Level (1-6)</Label>
                <select 
                  className="w-full h-8 px-3 text-xs bg-background/50 border border-input rounded-md"
                  value={selectedNode.props.headingLevel || 2}
                  onChange={(e) => handlePropChange('headingLevel', parseInt(e.target.value))}
                >
                  {[1,2,3,4,5,6].map(level => (
                    <option key={level} value={level}>H{level}</option>
                  ))}
                </select>
              </div>
            )}

            {(selectedNode.type === 'Button' || selectedNode.type === 'Link') && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Link URL (href)</Label>
                <Input 
                  className="h-8 text-xs bg-background/50" 
                  value={selectedNode.props.href || ''} 
                  onChange={(e) => handlePropChange('href', e.target.value)}
                  placeholder="https://... or /page"
                />
              </div>
            )}

            {selectedNode.type === 'Shape' && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Shape Type</Label>
                <select 
                  className="w-full h-8 px-3 text-xs bg-background/50 border border-input rounded-md"
                  value={selectedNode.props.shapeType || 'rectangle'}
                  onChange={(e) => handlePropChange('shapeType', e.target.value)}
                >
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="pill">Pill</option>
                </select>
              </div>
            )}
            
            {selectedNode.type === 'Image' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Image Source (URL)</Label>
                  <Input 
                    className="h-8 text-xs bg-background/50" 
                    value={selectedNode.props.src || ''} 
                    onChange={(e) => handlePropChange('src', e.target.value)}
                  />
                </div>
                
                <div className="space-y-1.5 border-t border-border/40 pt-4">
                  <Label className="text-xs text-muted-foreground mb-2 block">Or Upload from Device</Label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                  />
                  <Button 
                    variant="outline"
                    className="w-full text-xs h-8 bg-card/50 disabled:opacity-50"
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={uploading || status !== 'online'}
                    title={status !== 'online' ? "Service offline" : ""}
                  >
                    <FaUpload className="mr-2 w-3 h-3" /> 
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
