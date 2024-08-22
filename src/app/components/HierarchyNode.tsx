'use client';

import React, { useState } from 'react';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';

interface HierarchyNodeProps {
  node: HierarchyNodeType;
  addChild: (parent: HierarchyNodeType, type: 'object' | 'array') => void;
  removeNode: (node: HierarchyNodeType) => void;
  removeValue: (parent: HierarchyNodeType, index: number) => void;
}

const HierarchyNode: React.FC<HierarchyNodeProps> = ({ node, addChild, removeNode, removeValue }) => {
  const [key, setKey] = useState(node.key);
  const [values, setValues] = useState<string[]>(node.values || []);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    node.key = e.target.value;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
    node.values = newValues;
  };

  const addValue = () => {
    setValues([...values, '']);
    node.values = [...values, ''];
  };

  return (
    <div className="ml-4 mb-2">
      <div className="flex items-center">
        <input
          type="text"
          value={key}
          onChange={handleKeyChange}
          placeholder="Digite uma categoria"
          className="border p-1 rounded"
        />
        <button
          onClick={() => addChild(node, 'object')}
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Adicionar filho
        </button>
        <button
          onClick={() => addChild(node, 'array')}
          className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
        >
          Adicionar lista
        </button>
        <button
          onClick={() => removeNode(node)}
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Remover
        </button>
      </div>

      {node.type === 'array' && (
        <div className="ml-4 mt-2">
          {values.map((value, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="text"
                value={value}
                onChange={(e) => handleValueChange(e, index)}
                placeholder="Digite um item"
                className="border p-1 rounded"
              />
              <button
                onClick={() => removeValue(node, index)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            onClick={addValue}
            className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
          >
            Adicionar Item
          </button>
        </div>
      )}

      {node.children && node.children.length > 0 && (
        <div className="ml-4 mt-2">
          {node.children.map((child, index) => (
            <HierarchyNode
              key={index}
              node={child}
              addChild={addChild}
              removeNode={removeNode}
              removeValue={removeValue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HierarchyNode;
