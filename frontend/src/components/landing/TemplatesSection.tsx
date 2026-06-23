import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { templatesData, type Template } from "@/lib/templatesData"
import axios from "axios"
import { useState } from "react"
import { useServiceStatus } from "@/contexts/HealthContext"

export const TemplatesSection = () => {
  const navigate = useNavigate();
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);
  const { status } = useServiceStatus();

  const handleUseTemplate = async (template: Template) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in! Redirect to register, passing a redirect intent
      navigate("/register", { state: { from: "/templates" } });
      return;
    }

    setLoadingTemplateId(template.id);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { 
          title: template.name,
          pages: template.pages,
          defaultPageId: template.defaultPageId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Successfully created a new project from the template!
      // Navigate to the builder to start editing it.
      navigate(`/builder/${response.data._id}`);
    } catch (error) {
      console.error("Failed to create project from template:", error);
      alert("Failed to create project from template. Please try again.");
      setLoadingTemplateId(null);
    }
  };

  return (
    <section id="templates" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Start with a Template</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Don't start from scratch. Choose a professionally designed template and customize it in the visual builder instantly.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/templates')}>View All Templates</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesData.map((template) => (
            <div key={template.id} className="group relative rounded-xl overflow-hidden glass-card border border-border/50 aspect-[4/3] flex flex-col">
              <div className="absolute inset-0 bg-muted flex items-center justify-center overflow-hidden">
                 <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <Button 
                  className="bg-white text-black hover:bg-neutral-200 disabled:opacity-50" 
                  onClick={() => handleUseTemplate(template)}
                  disabled={loadingTemplateId === template.id || status !== 'online'}
                  title={status !== 'online' ? "Service offline" : ""}
                >
                  {loadingTemplateId === template.id ? "Creating Project..." : "Use Template"}
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/80 z-0">
                <h4 className="text-xl font-bold text-white mb-1">{template.name}</h4>
                <p className="text-sm text-neutral-300 line-clamp-2">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
