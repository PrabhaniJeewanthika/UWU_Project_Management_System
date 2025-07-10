import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

type LaneType = 'TODO' | 'In Progress' | 'Testing' | 'Done';

interface Task {
  id: string;
  title: string;
  description: string;
  profileImg: string;
}

const cardStyles: Record<LaneType, { bg: string; border: string }> = {
  TODO: { bg: 'bg-yellow-50', border: 'border-l-yellow-400' },
  'In Progress': { bg: 'bg-blue-50', border: 'border-l-blue-500' },
  Testing: { bg: 'bg-purple-50', border: 'border-l-purple-500' },
  Done: { bg: 'bg-green-50', border: 'border-l-green-500' },
};

const initialTasks: Record<LaneType, Task[]> = {
  TODO: [
    { id: '1', title: 'Design UI', description: 'Create UI in Figma', profileImg: 'https://i.pravatar.cc/30?img=1' },
    { id: '2', title: 'Setup Project', description: 'Frontend and Backend Init', profileImg: 'https://i.pravatar.cc/30?img=2' },
  ],
  'In Progress': [
    { id: '3', title: 'Auth Module', description: 'JWT-based login', profileImg: 'https://i.pravatar.cc/30?img=3' },
  ],
  Testing: [
    { id: '4', title: 'Write Tests', description: 'Unit testing tasks', profileImg: 'https://i.pravatar.cc/30?img=4' },
  ],
  Done: [
    { id: '5', title: 'Create DB', description: 'Schema finalized', profileImg: 'https://i.pravatar.cc/30?img=5' },
  ],
};

const HomePageKanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialTasks);
  const lanes: LaneType[] = ['TODO', 'In Progress', 'Testing', 'Done'];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId as LaneType];
    const destColumn = columns[destination.droppableId as LaneType];
    const sourceTasks = [...sourceColumn];
    const destTasks = [...destColumn];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {lanes.map((lane) => (
          <Droppable droppableId={lane} key={lane}>
            {(provided) => (
              <div
                className="rounded-md shadow min-h-[300px] flex flex-col bg-gray-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="p-3 font-semibold text-sm text-white bg-cyan-600 rounded-t-md text-center">
                  {lane}
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {columns[lane].map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          className={`border-l-4 ${cardStyles[lane].bg} ${cardStyles[lane].border} rounded-md p-2 shadow text-xs flex items-start justify-between gap-2`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex-1">
                            <div className="font-bold text-sm">{task.title}</div>
                            <div className="text-gray-500 text-[11px]">{task.description}</div>
                          </div>
                          <img
                            src={task.profileImg}
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover mt-1"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default HomePageKanbanBoard;