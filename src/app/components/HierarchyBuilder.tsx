'use client'
import React, { useState } from 'react';
import HierarchyNode from './HierarchyNode';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';

const HierarchyBuilder: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<HierarchyNodeType[]>([]);

  const addChild = (parent: HierarchyNodeType, type: 'object' | 'array') => {
    if (type === 'object') {
      const newChild: HierarchyNodeType = { key: '', children: [], type: 'object' };
      parent.children = parent.children || [];
      parent.children.push(newChild);
    } else if (type === 'array') {
      parent.type = 'array';
      parent.values = parent.values || [];
    }
    setHierarchy([...hierarchy]);
  };

  const removeNode = (node: HierarchyNodeType) => {
    const findAndRemoveNode = (nodes: HierarchyNodeType[], nodeToRemove: HierarchyNodeType): HierarchyNodeType[] => {
      return nodes.filter(n => n !== nodeToRemove).map(n => {
        if (n.children) {
          n.children = findAndRemoveNode(n.children, nodeToRemove);
        }
        return n;
      });
    };
    setHierarchy(findAndRemoveNode(hierarchy, node));
  };

  const removeValue = (parent: HierarchyNodeType, index: number) => {
    parent.values?.splice(index, 1);
    setHierarchy([...hierarchy]);
  };

  const addRootNode = () => {
    setHierarchy([...hierarchy, { key: '', children: [], type: 'object' }]);
  };

  const convertToObject = (nodes: HierarchyNodeType[]): Record<string, any> => {
    const result: Record<string, any> = {};
    nodes.forEach((node) => {
      if (node.type === 'object') {
        result[node.key] = convertToObject(node.children || []);
      } else if (node.type === 'array') {
        result[node.key] = node.values || [];
      }
    });
    return result;
  };

  const saveHierarchy = () => {
    const json = JSON.stringify(convertToObject(hierarchy), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <button onClick={addRootNode} className="bg-green-500 text-white px-4 py-2 rounded">
          Adicionar nó raiz
        </button>
      </div>
      <div className="mt-4 flex items-center flex-col">
        {hierarchy.map((node, index) => (
          <HierarchyNode
            key={index}
            node={node}
            addChild={addChild}
            removeNode={removeNode}
            removeValue={removeValue}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={saveHierarchy} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Salvar como JSON
        </button>
      </div>
    </div>
  );
};

export default HierarchyBuilder;
