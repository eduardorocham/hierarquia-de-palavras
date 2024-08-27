'use client'

import React, { useState } from 'react';
import HierarchyNode from './HierarchyNode';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';
import { convertArrayToTree } from '../utils/convertToObject';

const HierarchyBuilder: React.FC = () => {
  const [nodeRootKeyName, setNodeRootKeyName] = useState('')
  const [hierarchy, setHierarchy] = useState<HierarchyNodeType[]>([]);

  const addRootNode = () => {
    setHierarchy([...hierarchy, { key: nodeRootKeyName, children: [] }]);
    setNodeRootKeyName('')
  };

  const saveHierarchy = () => {
    const json = JSON.stringify(convertArrayToTree(hierarchy), null, 2);
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
      <div className="flex justify-center gap-2">
        <input 
          className='border p-1 rounded'
          placeholder='Digite uma categoria'
          value={nodeRootKeyName}
          onChange={(e) => setNodeRootKeyName(e.target.value)}
        />
        <button onClick={addRootNode} className="bg-green-500 text-white px-4 py-2 rounded">
          Adicionar nó raiz
        </button>
      </div>
      <div className="mt-4 flex items-center flex-col">
        {hierarchy.map((node, index) => (
          <HierarchyNode
            key={node.key}
            node={node}
            hierarchy={hierarchy}
            setHierarchy={setHierarchy}
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
