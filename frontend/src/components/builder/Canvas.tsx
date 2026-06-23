import type { ComponentNode } from "@/lib/types/builder"
import React from "react"
import { useBuilderStore } from "@/store/builderStore"

export const Canvas = ({ 
  tree, 
  selectedId, 
  setSelectedId 
}: { 
  tree: ComponentNode | null, 
  selectedId: string | null,
  setSelectedId: (id: string | null) => void
}) => {
  const { deviceMode } = useBuilderStore()

  const renderNode = (node: ComponentNode) => {
    const isSelected = selectedId === node.id;
    const commonClasses = `transition-all outline-1 outline-offset-[-1px] ${isSelected ? 'outline outline-blue-500 z-10' : 'outline-dashed outline-border/30 hover:outline-blue-400/50'}`;
    
    const handleSelect = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedId(node.id);
    };

    if (node.type === 'Page') {
      return (
        <div 
          key={node.id} 
          onClick={handleSelect}
          className={`w-full min-h-full bg-white relative flex flex-col ${commonClasses}`}
          style={{ ...node.props.style }}
        >
          {node.children.map(renderNode)}
        </div>
      )
    }

    if (node.type === 'Navbar') {
      return (
        <nav 
          key={node.id} 
          onClick={handleSelect}
          className={`w-full min-h-[60px] p-4 flex items-center ${commonClasses}`}
          style={{ ...node.props.style }}
        >
          {node.children && node.children.length > 0 ? (
            node.children.map(renderNode)
          ) : (
            <div className="w-full h-full text-muted-foreground/50 text-xs font-mono text-center">Empty Navbar</div>
          )}
        </nav>
      )
    }

    if (node.type === 'Footer') {
      return (
        <footer 
          key={node.id} 
          onClick={handleSelect}
          className={`w-full min-h-[100px] p-6 mt-auto ${commonClasses}`}
          style={{ ...node.props.style }}
        >
          {node.children && node.children.length > 0 ? (
            node.children.map(renderNode)
          ) : (
            <div className="w-full h-full text-muted-foreground/50 text-xs font-mono text-center">Empty Footer</div>
          )}
        </footer>
      )
    }

    if (node.type === 'Section' || node.type === 'Container') {
      return (
        <div 
          key={node.id} 
          onClick={handleSelect}
          className={`min-h-[50px] p-4 ${commonClasses}`}
          style={{ ...node.props.style }}
        >
          {node.children && node.children.length > 0 ? (
            node.children.map(renderNode)
          ) : (
            <div className="w-full h-full min-h-[50px] border border-dashed border-border/50 bg-muted/10 flex items-center justify-center text-muted-foreground/50 text-xs font-mono">
              Drop components here
            </div>
          )}
        </div>
      )
    }

    if (node.type === 'Heading') {
      const level = node.props.headingLevel || 2;
      const Tag = `h${level}` as any;
      return (
        <Tag 
          key={node.id}
          onClick={handleSelect}
          className={commonClasses}
          style={{ margin: 0, ...node.props.style }}
        >
          {node.props.text || `Heading ${level}`}
        </Tag>
      )
    }

    if (node.type === 'Paragraph' || node.type === 'Text') {
      return (
        <p 
          key={node.id}
          onClick={handleSelect}
          className={commonClasses}
          style={{ margin: 0, ...node.props.style }}
        >
          {node.props.text || 'Paragraph text...'}
        </p>
      )
    }

    if (node.type === 'Button') {
      const content = node.props.text || 'Button';
      const style = { ...node.props.style };
      const className = `px-4 py-2 bg-blue-600 text-white rounded-md inline-block ${commonClasses}`;
      
      if (node.props.href) {
        return (
          <a 
            key={node.id}
            href={node.props.href}
            onClick={handleSelect}
            className={className}
            style={style}
          >
            {content}
          </a>
        )
      }
      return (
        <button 
          key={node.id}
          onClick={handleSelect}
          className={className}
          style={style}
        >
          {content}
        </button>
      )
    }
    
    if (node.type === 'Link') {
      return (
        <a 
          key={node.id}
          href={node.props.href || '#'}
          onClick={handleSelect}
          className={`text-blue-600 underline ${commonClasses}`}
          style={{ ...node.props.style }}
        >
          {node.props.text || 'Link Text'}
        </a>
      )
    }

    if (node.type === 'Shape') {
      let borderRadius = '0';
      if (node.props.shapeType === 'circle') borderRadius = '50%';
      if (node.props.shapeType === 'pill') borderRadius = '9999px';
      
      return (
        <div 
          key={node.id}
          onClick={handleSelect}
          className={`min-w-[50px] min-h-[50px] bg-neutral-200 ${commonClasses}`}
          style={{ borderRadius, ...node.props.style }}
        >
           {node.children && node.children.map(renderNode)}
        </div>
      )
    }

    if (node.type === 'Image') {
      return (
        <img 
          key={node.id}
          onClick={handleSelect}
          className={commonClasses}
          src={node.props.src || 'https://via.placeholder.com/150'}
          alt={node.props.alt || 'placeholder'}
          style={{ maxWidth: '100%', ...node.props.style }}
        />
      )
    }

    return null;
  }

  const getCanvasWidthClass = () => {
    switch (deviceMode) {
      case 'tablet': return 'max-w-[768px]';
      case 'mobile': return 'max-w-[375px]';
      case 'desktop': 
      default: return 'max-w-[1200px]';
    }
  }

  return (
    <main className="flex-1 overflow-auto bg-neutral-900/50 p-8 relative flex justify-center" onClick={() => setSelectedId(null)}>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className={`w-full min-h-[800px] shadow-2xl rounded-sm overflow-hidden relative transition-all duration-300 ease-in-out ${getCanvasWidthClass()}`}>
        {tree ? renderNode(tree) : (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center text-muted-foreground">
            <p>No component tree found.</p>
            <p className="text-sm">Create a page in the Left Sidebar to start.</p>
          </div>
        )}
      </div>
    </main>
  )
}
