import './CreateBoardBar.scss';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constants';
import getBoards from '../../api/getBoards';
import createBoard from '../../api/createBoard';

function CreateBoardBar() {
  const { boards, dispatchBoards } = useContext(AppContext);
  const [boardName, setBoardName] = useState('');
  const [boardIsCreating, setBoardIsCreating] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);

  const loadBoards = async () => {
    const data = await getBoards();
    dispatchBoards({ type: SET_BOARDS, payload: data });
  };

  useEffect(() => {
    if (!boards.length) {
      loadBoards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    if (!boardName) {
      setIsValidationError(true);
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
    setIsValidationError(false);
  };

  const handleCreateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid && !boardIsCreating) {
      setBoardIsCreating(true);
      await createBoard(boardName);
      loadBoards();
      setBoardName('');
      setBoardIsCreating(false);
    }
  };

  return (
    <form className="create-board" onSubmit={handleCreateBoard}>
      <label htmlFor="create-board">
        Create new board:
        <input
          name="create-board"
          className="create-board__input"
          type="text"
          placeholder="Homework"
          disabled={boardIsCreating}
          value={boardName}
          onChange={handleChange}
        />
      </label>
      <button className="create-board__create-btn" type="submit">
        Create
      </button>
      {isValidationError && (
        <span className="create-board__invalid">Board name must not be empty</span>
      )}
    </form>
  );
}

export default CreateBoardBar;