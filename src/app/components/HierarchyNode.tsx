'use client';

import React, { useState } from 'react';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';
import { removeNode } from '../utils/removeNode';
import { replaceNodeInTree } from '../utils/replaceNodeInTree';

interface HierarchyNodeProps {
  node: HierarchyNodeType;
  hierarchy: HierarchyNodeType[]
  setHierarchy: React.Dispatch<React.SetStateAction<HierarchyNodeType[]>>
}

const HierarchyNode: React.FC<HierarchyNodeProps> = ({ 
  node: thisNode,
  hierarchy,
  setHierarchy
}) => {
  const [addingNodeChild, setAddingNodeChild] = useState(false);
  const [addingListItem, setAddingListItem] = useState(false);
  const [childRootKeyName, setChildRootKeyName] = useState('')
  const [listItem, setListItem] = useState('')

  const [key, setKey] = useState(thisNode.key);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    thisNode.key = e.target.value;
  };

  const addRootChild = () => {
    thisNode.children.push({ key: childRootKeyName, children: [] })
    const hierarchyUpdated = hierarchy.map(node => {
      if (node.key === thisNode.key) {
        return thisNode
      }

      return node
    })
    setHierarchy(hierarchyUpdated)
    setAddingNodeChild(false)
    setChildRootKeyName('')
  }
  
  const addRootItemList = () => {
    thisNode.children.push(listItem)
    const hierarchyUpdated = hierarchy.map(node => {
      if (node.key === thisNode.key) {
        return thisNode
      }

      return node
    })
    setHierarchy(hierarchyUpdated)
    setAddingListItem(false)
    setListItem('')
  }

  const removeNodeItem = (nodeKeyToRemove: string) => {
    const hierarchyUpdated = removeNode(hierarchy, nodeKeyToRemove);
    setHierarchy(hierarchyUpdated)
  }

  const removeListItem = (node: HierarchyNodeType, itemToRemove: string) => {
    node.children = node.children.filter(item => typeof item === 'string' && item !== itemToRemove);
    const updatedTree = replaceNodeInTree(hierarchy, node)
    setHierarchy(updatedTree)
  }

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
          onClick={() => setAddingNodeChild(true)}
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Adicionar nó filho
        </button>
        <button
          onClick={() => setAddingListItem(true)}
          className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
        >
          Adicionar Item (Lista)
        </button>
        <button
          onClick={() => removeNodeItem(thisNode.key)}
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Remover
        </button>
      </div>
      {addingNodeChild &&
        <div className='mt-4'>
          <input
            type="text"
            placeholder="Digite uma categoria"
            className="border p-1 rounded"
            value={childRootKeyName}
            onChange={(e) => setChildRootKeyName(e.target.value)}
          />
          <button
            onClick={addRootChild}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Adicionar
          </button>
          <button
            onClick={() => setAddingNodeChild(false)}
            className="ml-2  bg-red-500 text-white px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      }
      {addingListItem &&
        <div className='mt-4'>
          <input
            type="text"
            placeholder="Digite o nome do item"
            className="border p-1 rounded"
            value={listItem}
            onChange={(e) => setListItem(e.target.value)}
          />
          <button
            onClick={addRootItemList}
            className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
          >
            Adicionar Item
          </button>
          <button
            onClick={() => setAddingListItem(false)}
            className="ml-2  bg-red-500 text-white px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      }

      {thisNode.children && thisNode.children.length > 0 && (
        <div className="ml-4 mt-2">
          {thisNode.children.map((child, index) => {
            if (typeof child === 'object') {
              return (
                <HierarchyNode
                  key={index}
                  node={child}
                  hierarchy={hierarchy}
                  setHierarchy={setHierarchy}
                />
              )
            } else if(typeof child == 'string') {
              return (
                <div key={child} className='flex justify-center items-center mt-2'>
                  <li>{child}</li>
                  <button
                    onClick={() => removeListItem(thisNode, child)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remover
                  </button>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  );
};

export default HierarchyNode;
