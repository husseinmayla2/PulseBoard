import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { tasks as initialTasks, Task } from '@/lib/mockData';

const Column = ({ title, status, tasks }: { title: string; status: Task['status']; tasks: Task[] }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg flex flex-col gap-4 w-80">
      <h2 className="text-white font-bold text-lg">{title}</h2>
      <div className="flex flex-col gap-2">
        {tasks.filter(t => t.status === status).map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
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
      className="bg-slate-700 p-3 rounded text-white cursor-grab shadow hover:bg-slate-600"
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
    if (!over) return;
    
    const taskIndex = tasks.findIndex(t => t.id === active.id);
    const newStatus = over.id as Task['status'];

    if (tasks[taskIndex].status !== newStatus) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].status = newStatus;
      setTasks(updatedTasks);
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
