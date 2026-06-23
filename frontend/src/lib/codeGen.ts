import type { ComponentNode, Page } from "./types/builder";

const styleObjToCssStr = (style: any) => {
  if (!style) return "";
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(" ");
};

const styleObjToReactStr = (style: any) => {
  if (!style) return "{}";
  return JSON.stringify(style);
};

export const generateHTML = (pages: Page[]): string => {
  if (!pages || pages.length === 0) return "";
  const renderNode = (node: ComponentNode): string => {
    const styleStr = styleObjToCssStr(node.props.style);
    const styleAttr = styleStr ? ` style="${styleStr}"` : "";

    let childrenHTML = "";
    if (node.children && node.children.length > 0) {
      childrenHTML = node.children.map(renderNode).join("\n");
    }

    switch (node.type) {
      case "Page":
      case "Section":
        return `<section${styleAttr}>\n${childrenHTML}\n</section>`;
      case "Navbar":
        return `<nav${styleAttr}>\n${childrenHTML}\n</nav>`;
      case "Footer":
        return `<footer${styleAttr}>\n${childrenHTML}\n</footer>`;
      case "Container":
        return `<div${styleAttr}>\n${childrenHTML}\n</div>`;
      case "Heading":
        const level = node.props.headingLevel || 2;
        return `<h${level}${styleAttr}>${node.props.text || "Heading"}</h${level}>`;
      case "Text":
      case "Paragraph":
        return `<p${styleAttr}>${node.props.text || "Text block"}</p>`;
      case "Button":
        if (node.props.href) {
          return `<a href="${node.props.href}"${styleAttr}>${node.props.text || "Button"}</a>`;
        }
        return `<button${styleAttr}>${node.props.text || "Button"}</button>`;
      case "Link":
        return `<a href="${node.props.href || "#"}"${styleAttr}>${node.props.text || "Link"}</a>`;
      case "Shape":
        let borderRadius = '0';
        if (node.props.shapeType === 'circle') borderRadius = '50%';
        if (node.props.shapeType === 'pill') borderRadius = '9999px';
        const mergedStyleAttr = styleStr ? ` style="${styleStr} border-radius: ${borderRadius};"` : ` style="border-radius: ${borderRadius};"`;
        return `<div${mergedStyleAttr}>\n${childrenHTML}\n</div>`;
      case "Image":
        return `<img src="${node.props.src || "https://via.placeholder.com/150"}" alt="${node.props.alt || "image"}"${styleAttr} />`;
      default:
        return `<div${styleAttr}>\n${childrenHTML}\n</div>`;
    }
  };

  return pages.map(page => `<!-- ============================== -->\n<!-- PAGE: ${page.name} (${page.path}) -->\n<!-- ============================== -->\n${renderNode(page.tree)}`).join('\n\n');
};

export const generateReact = (pages: Page[]): string => {
  if (!pages || pages.length === 0) return "";

  const renderNode = (n: ComponentNode, indentLevel: number): string => {
    const indent = "  ".repeat(indentLevel);
    const styleStr = styleObjToReactStr(n.props.style);
    const styleAttr = styleStr !== "{}" ? ` style={${styleStr}}` : "";

    let childrenJSX = "";
    if (n.children && n.children.length > 0) {
      childrenJSX = "\n" + n.children.map(child => renderNode(child, indentLevel + 1)).join("\n") + `\n${indent}`;
    }

    switch (n.type) {
      case "Page":
      case "Section":
        return `${indent}<section${styleAttr}>${childrenJSX}</section>`;
      case "Navbar":
        return `${indent}<nav${styleAttr}>${childrenJSX}</nav>`;
      case "Footer":
        return `${indent}<footer${styleAttr}>${childrenJSX}</footer>`;
      case "Container":
        return `${indent}<div${styleAttr}>${childrenJSX}</div>`;
      case "Heading":
        const level = n.props.headingLevel || 2;
        return `${indent}<h${level}${styleAttr}>${n.props.text || "Heading"}</h${level}>`;
      case "Text":
      case "Paragraph":
        return `${indent}<p${styleAttr}>${n.props.text || "Text block"}</p>`;
      case "Button":
        if (n.props.href) {
          return `${indent}<a href="${n.props.href}"${styleAttr}>${n.props.text || "Button"}</a>`;
        }
        return `${indent}<button${styleAttr}>${n.props.text || "Button"}</button>`;
      case "Link":
        return `${indent}<a href="${n.props.href || "#"}"${styleAttr}>${n.props.text || "Link"}</a>`;
      case "Shape":
        let borderRadius = '0';
        if (n.props.shapeType === 'circle') borderRadius = '50%';
        if (n.props.shapeType === 'pill') borderRadius = '9999px';
        const shapeStyleStr = styleStr !== "{}" ? `{{...${styleStr}, borderRadius: '${borderRadius}'}}` : `{{ borderRadius: '${borderRadius}' }}`;
        return `${indent}<div style=${shapeStyleStr}>${childrenJSX}</div>`;
      case "Image":
        return `${indent}<img src="${n.props.src || "https://via.placeholder.com/150"}" alt="${n.props.alt || "image"}"${styleAttr} />`;
      default:
        return `${indent}<div${styleAttr}>${childrenJSX}</div>`;
    }
  };

  const pagesCode = pages.map(page => {
    const componentName = page.name.replace(/[^a-zA-Z0-9]/g, '');
    return `export function ${componentName}Page() {\n  return (\n${renderNode(page.tree, 2)}\n  );\n}`;
  }).join('\n\n');

  return `import React from 'react';\n\n${pagesCode}`;
};

export const generateCSS = (_pages?: Page[]): string => {
  return `/* 
  Styles are currently generated inline. 
  In a complete implementation, this engine would parse the component tree,
  generate unique class names, and output the corresponding CSS here.
*/
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`;
};
