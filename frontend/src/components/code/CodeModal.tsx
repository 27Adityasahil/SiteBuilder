import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { FaTimes, FaCopy, FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuilderStore } from "@/store/builderStore";
import { generateHTML, generateReact, generateCSS } from "@/lib/codeGen";

export const CodeModal = ({ onClose }: { onClose: () => void }) => {
  const { pages } = useBuilderStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("react");

  const reactCode = generateReact(pages);
  const htmlCode = generateHTML(pages);
  const cssCode = generateCSS(pages);

  const getActiveCode = () => {
    if (activeTab === "react") return reactCode;
    if (activeTab === "html") return htmlCode;
    return cssCode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[80vh] glass-card border border-border/50 rounded-xl overflow-hidden flex flex-col shadow-2xl">
        <div className="h-14 border-b border-border/40 flex items-center justify-between px-4 bg-card/50">
          <h2 className="font-semibold">Code Export</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <FaCheck className="w-4 h-4 mr-2" /> : <FaCopy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <FaTimes className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 bg-zinc-950">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-zinc-900 border-b border-zinc-800 rounded-none justify-start px-4 h-12">
              <TabsTrigger value="react" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">React / JSX</TabsTrigger>
              <TabsTrigger value="html" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">HTML</TabsTrigger>
              <TabsTrigger value="css" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">CSS</TabsTrigger>
            </TabsList>

            <TabsContent value="react" className="flex-1 m-0">
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={reactCode}
                options={{ readOnly: true, minimap: { enabled: false } }}
              />
            </TabsContent>
            
            <TabsContent value="html" className="flex-1 m-0">
              <Editor
                height="100%"
                language="html"
                theme="vs-dark"
                value={htmlCode}
                options={{ readOnly: true, minimap: { enabled: false } }}
              />
            </TabsContent>

            <TabsContent value="css" className="flex-1 m-0">
              <Editor
                height="100%"
                language="css"
                theme="vs-dark"
                value={cssCode}
                options={{ readOnly: true, minimap: { enabled: false } }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
