// types.ts
export interface HierarchyNode {
    key: string;
    type: 'object' | 'array';
    children?: HierarchyNode[];
    values?: string[];
}
