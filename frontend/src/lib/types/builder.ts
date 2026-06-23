export type ComponentType = 'Page' | 'Section' | 'Container' | 'Text' | 'Heading' | 'Button' | 'Image' | 'Navbar' | 'Footer' | 'Paragraph' | 'Shape' | 'Link';

export interface StyleProperties {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  display?: string;
  flexDirection?: 'row' | 'column';
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  [key: string]: any;
}

export interface ComponentProps {
  style?: StyleProperties;
  text?: string;
  src?: string;
  alt?: string;
  href?: string;
  className?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  target?: string;
  shapeType?: 'rectangle' | 'circle' | 'pill';
  [key: string]: any;
}

export interface ComponentNode {
  id: string;
  type: ComponentType;
  name: string;
  props: ComponentProps;
  children: ComponentNode[];
}

export interface Page {
  id: string;
  name: string;
  path: string;
  tree: ComponentNode;
}
