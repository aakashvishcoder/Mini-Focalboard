import React, { useState } from 'react';
import List from './List';
import { useStore } from '../store';

export default function Board({ board }) {
  const { addList } = useStore();
  const [newListTitle, setNewListTitle] = useState('');

  const onAddList = () => {
    if (newListTitle.trim() === '') return;
    addList(board.id, newListTitle);
    setNewListTitle('');
  };

  return (
    <div className="bg-white rounded p-4 shadow-md min-w-[300px] flex flex-col">
      <h2 className="text-xl font-semibold mb-4">{board.title}</h2>

      <div className="flex-grow overflow-y-auto space-y-4">
        {board.lists.map((list) => (
          <List key={list.id} boardId={board.id} list={list} />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="New list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          className="border rounded p-1 flex-grow"
        />
        <button
          onClick={onAddList}
          className="bg-green-600 text-white px-3 rounded"
        >
          Add List
        </button>
      </div>
    </div>
  );
}
