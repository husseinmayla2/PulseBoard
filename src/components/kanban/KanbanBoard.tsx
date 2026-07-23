import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { tasks as initialTasks, Task } from '../../lib/mockData';

const Column = ({ title, status, tasks }: { title: string; status: Task['status']; tasks: Task[] }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`bg-slate-800 p-4 rounded-lg flex flex-col gap-4 w-80 transition-colors ${isOver ? 'bg-slate-700/80 border-2 border-indigo-500' : ''}`}
    >
      <h2 className="text-white font-bold text-lg">{title}</h2>
      <div className="flex flex-col gap-2">
        <SortableContext items={tasks.filter(t => t.status === status).map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.filter(t => t.status === status).map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-slate-700 p-3 rounded text-white cursor-grab shadow hover:bg-slate-600 touch-none"
    >
      <p className="font-semibold">{task.title}</p>
      <div className="text-xs text-slate-400 mt-2">{task.priority} | {task.deadline}</div>
    </div>
  );
};

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    // Check if dropped over a column
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // If dropped over a column (id matches status)
    if (['todo', 'in-progress', 'done'].includes(overId)) {
      setTasks(tasks => tasks.map(task => {
        if (task.id === activeId) {
          return { ...task, status: overId as Task['status'] };
        }
        return task;
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-6">
        <Column title="To Do" status="todo" tasks={tasks} />
        <Column title="In Progress" status="in-progress" tasks={tasks} />
        <Column title="Done" status="done" tasks={tasks} />
      </div>
    </DndContext>
  );
};
