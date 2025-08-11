import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import Board from './components/Board';

function App() {
  const { boards, fetchBoards, addBoard } = useStore();
  const [newBoardTitle, setNewBoardTitle] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const onAddBoard = () => {
    if (newBoardTitle.trim() === '') return;
    addBoard(newBoardTitle);
    setNewBoardTitle('');
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mini Focalboard</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New board title"
          className="border rounded p-2 flex-grow"
        />
        <button
          onClick={onAddBoard}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Board
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto">
        {boards.length === 0 ? (
          <p>No boards yet.</p>
        ) : (
          boards.map((board) => <Board key={board.id} board={board} />)
        )}
      </div>
    </div>
  );
}

export default App;
