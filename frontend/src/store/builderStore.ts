import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ComponentNode, ComponentType, Page } from '@/lib/types/builder'

interface BuilderState {
  pages: Page[];
  currentPageId: string | null;
  selectedId: string | null;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  history: Page[][];
  historyIndex: number;
  
  setPages: (pages: Page[]) => void;
  setCurrentPageId: (id: string) => void;
  createPage: (name: string, path: string) => void;
  deletePage: (id: string) => void;

  setSelectedId: (id: string | null) => void;
  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  updateNodeProps: (id: string, props: any) => void;
  addComponent: (parentId: string, type: ComponentType) => void;
  deleteComponent: (id: string) => void;
  
  undo: () => void;
  redo: () => void;
  saveHistory: (newPages: Page[]) => void;
}

// Helper to update a node immutably
const updateNodeInTree = (node: ComponentNode, id: string, newProps: any): ComponentNode => {
  if (node.id === id) {
    return { ...node, props: { ...node.props, ...newProps } };
  }
  return {
    ...node,
    children: node.children.map(child => updateNodeInTree(child, id, newProps))
  };
}

const addNodeToTree = (node: ComponentNode, parentId: string, newNode: ComponentNode): ComponentNode => {
  if (node.id === parentId) {
    return { ...node, children: [...node.children, newNode] };
  }
  return {
    ...node,
    children: node.children.map(child => addNodeToTree(child, parentId, newNode))
  };
}

const deleteNodeFromTree = (node: ComponentNode, id: string): ComponentNode | null => {
  if (node.id === id) return null;
  return {
    ...node,
    children: node.children.map(child => deleteNodeFromTree(child, id)).filter(Boolean) as ComponentNode[]
  };
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      pages: [],
      currentPageId: null,
      selectedId: null,
      deviceMode: 'desktop',
      history: [],
      historyIndex: -1,

      setPages: (pages: Page[]) => {
        set({ pages });
        get().saveHistory(pages);
      },
      
      setCurrentPageId: (id: string) => set({ currentPageId: id, selectedId: null }),
      
      createPage: (name: string, path: string) => {
        const newPage: Page = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          path,
          tree: {
            id: 'root',
            type: 'Page',
            name: 'Page',
            props: { style: { minHeight: '100vh', backgroundColor: '#ffffff' } },
            children: []
          }
        };
        const newPages = [...get().pages, newPage];
        set({ currentPageId: newPage.id });
        get().saveHistory(newPages);
      },
      
      deletePage: (id: string) => {
        const { pages, currentPageId } = get();
        if (pages.length <= 1) return; // Cannot delete last page
        const newPages = pages.filter(p => p.id !== id);
        let newCurrentId = currentPageId;
        if (currentPageId === id) {
          newCurrentId = newPages[0].id;
        }
        set({ currentPageId: newCurrentId });
        get().saveHistory(newPages);
      },

      setSelectedId: (id: string | null) => set({ selectedId: id }),
      
      setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => set({ deviceMode: mode }),

      saveHistory: (newPages: Page[]) => {
        const { history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPages);
        
        if (newHistory.length > 50) {
          newHistory.shift();
        }
        
        set({ history: newHistory, historyIndex: newHistory.length - 1, pages: newPages });
      },

      updateNodeProps: (id: string, props: any) => {
        const { pages, currentPageId, saveHistory } = get();
        const pageIndex = pages.findIndex(p => p.id === currentPageId);
        if (pageIndex === -1) return;
        
        const newTree = updateNodeInTree(pages[pageIndex].tree, id, props);
        const newPages = [...pages];
        newPages[pageIndex] = { ...newPages[pageIndex], tree: newTree };
        saveHistory(newPages);
      },

      addComponent: (parentId: string, type: ComponentType) => {
        const { pages, currentPageId, saveHistory, setSelectedId } = get();
        const pageIndex = pages.findIndex(p => p.id === currentPageId);
        if (pageIndex === -1) return;

        const newNode: ComponentNode = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          name: type,
          props: { style: {} },
          children: []
        };

        const newTree = addNodeToTree(pages[pageIndex].tree, parentId, newNode);
        const newPages = [...pages];
        newPages[pageIndex] = { ...newPages[pageIndex], tree: newTree };
        
        saveHistory(newPages);
        setSelectedId(newNode.id);
      },

      deleteComponent: (id: string) => {
        const { pages, currentPageId, saveHistory, setSelectedId, selectedId } = get();
        const pageIndex = pages.findIndex(p => p.id === currentPageId);
        if (pageIndex === -1) return;
        
        if (pages[pageIndex].tree.id === id) return; // Cannot delete root

        const newTree = deleteNodeFromTree(pages[pageIndex].tree, id);
        if (newTree) {
          const newPages = [...pages];
          newPages[pageIndex] = { ...newPages[pageIndex], tree: newTree };
          saveHistory(newPages);
          if (selectedId === id) setSelectedId(null);
        }
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({ pages: history[newIndex], historyIndex: newIndex });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({ pages: history[newIndex], historyIndex: newIndex });
        }
      }
    }),
    {
      name: 'sitebuilder-builder-storage',
    }
  )
)
