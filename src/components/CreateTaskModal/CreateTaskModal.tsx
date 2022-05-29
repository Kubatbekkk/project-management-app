/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import { createRef, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createTask from '../../api/createTask';
import { AppContext } from '../../App';
import { FORM_INVALID_MESSAGE, titleRegex } from '../../data/constants';
import './CreateTaskModal.scss';

function CreateTaskModal({
  columnId,
  boardId,
  loadBoard,
  setIsTaskCreateOpen,
}: {
  columnId: string;
  boardId: string;
  loadBoard: () => Promise<void>;
  setIsTaskCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Container = document.getElementById('modal') as HTMLElement;
  const { logoutUser, setSpinner } = useContext(AppContext);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const taskTitle = createRef<HTMLInputElement>();
  const taskDesc = createRef<HTMLInputElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle.current && taskDesc.current) {
      const isTitleValid = titleRegex.test(taskTitle.current.value);

      if (!isTitleValid) {
        setHasError(true);
      } else if (!hasError) {
        setIsDisabled(true);
        const title = taskTitle.current.value.replace(/\s+/g, ' ').trim();
        const desc = taskDesc.current.value ? taskDesc.current.value.replace(/\s+/g, ' ') : ' ';

        const res = await createTask(boardId, columnId, title, desc, logoutUser, setSpinner);
        if (res) {
          loadBoard();
        }
        setIsTaskCreateOpen(false);
        setIsDisabled(false);
      }
    }
  };

  useEffect(() => {
    if (taskTitle.current) {
      taskTitle.current.focus();
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTaskCreateOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      role="button"
      tabIndex={0}
      onMouseDown={() => setIsTaskCreateOpen(false)}
    >
      <div className="create-board" role="presentation" onMouseDown={(e) => e.stopPropagation()}>
        <h3>Add task</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsTaskCreateOpen(false)}
        ></button>
        <form onSubmit={handleSubmit} className="create-board__form">
          <div className="create-board__field">
            <label htmlFor="task-title">
              {hasError ? (
                <span className="create-board__invalid">{FORM_INVALID_MESSAGE}</span>
              ) : (
                <span>Task title:</span>
              )}

              <input
                className="create-board__input"
                name="task-title"
                placeholder="To learn React"
                ref={taskTitle}
                onChange={() => setHasError(false)}
              />
            </label>
          </div>
          <div className="create-board__field">
            <label htmlFor="desc-title">
              <span>Task description:</span>

              <input
                className="create-board__input"
                name="task-description"
                placeholder="Reactjs.org"
                ref={taskDesc}
              />
            </label>
          </div>
          <button
            className="create-board__create-btn"
            type="submit"
            disabled={isDisabled || hasError}
          >
            Add
          </button>
        </form>
      </div>
    </div>,
    Container
  );
}

export default CreateTaskModal;
