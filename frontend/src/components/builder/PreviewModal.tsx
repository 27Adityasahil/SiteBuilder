import { useState } from "react"
import { FaTimes, FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/store/builderStore"
import { generateHTML } from "@/lib/codeGen"

export const PreviewModal = ({ onClose }: { onClose: () => void }) => {
  const { pages, currentPageId } = useBuilderStore();
  const [mode, setMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const activePage = pages.find(p => p.id === currentPageId);
  const rawHtml = activePage ? generateHTML([activePage]) : "";
  
  // Wrap the HTML in a basic document structure to reset margins and add basic styles
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
          }
          * {
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        ${rawHtml}
      </body>
    </html>
  `;

  const getWidth = () => {
    switch (mode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="h-14 border-b border-border/40 flex items-center justify-between px-4 bg-card/50">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold">Live Preview</h2>
          <div className="flex bg-muted/50 p-1 rounded-md border border-border/40">
            <Button variant="ghost" size="icon" className={`w-8 h-8 rounded ${mode==='desktop'?'bg-background shadow-sm':''}`} onClick={() => setMode('desktop')}><FaDesktop className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className={`w-8 h-8 rounded ${mode==='tablet'?'bg-background shadow-sm':''}`} onClick={() => setMode('tablet')}><FaTabletAlt className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className={`w-8 h-8 rounded ${mode==='mobile'?'bg-background shadow-sm':''}`} onClick={() => setMode('mobile')}><FaMobileAlt className="w-4 h-4" /></Button>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><FaTimes className="w-4 h-4" /></Button>
      </div>
      <div className="flex-1 bg-neutral-900 flex justify-center items-center overflow-hidden p-8">
        <iframe 
          srcDoc={html} 
          className="bg-white shadow-2xl transition-all duration-300 rounded-md"
          style={{ width: getWidth(), height: '100%', border: 'none' }}
        />
      </div>
    </div>
  )
}
