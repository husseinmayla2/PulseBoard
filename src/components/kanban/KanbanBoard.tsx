import { useState } from 'react';
import { DndContext, closestCenter, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
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
      className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex flex-col gap-4 w-80 transition-all ${isOver ? 'bg-white/10 border-indigo-500/50' : ''}`}
    >
      <h2 className="text-white font-bold text-lg px-2">{title}</h2>
      <div className="flex flex-col gap-2 min-h-[100px]">
        <SortableContext items={tasks.filter(t => t.status === status).map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.filter(t => t.status === status).map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const TaskCard = ({ task, isOverlay }: { task: Task; isOverlay?: boolean }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = { 
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white/10 p-4 rounded-lg text-white shadow-lg border border-white/5 cursor-grab active:cursor-grabbing touch-none hover:bg-white/20 transition-colors ${isOverlay ? 'rotate-2 cursor-grabbing shadow-2xl' : ''}`}
    >
      <p className="font-semibold">{task.title}</p>
      <div className="text-xs text-white/50 mt-2">{task.priority.toUpperCase()} | {task.deadline}</div>
    </div>
  );
};

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveTask(tasks.find(t => t.id === active.id) || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveTask(null);
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTaskIndex = tasks.findIndex(t => t.id === activeId);
    
    // Check if dropped in a different status
    if (['todo', 'in-progress', 'done'].includes(overId)) {
        setTasks(tasks => tasks.map(task => {
            if (task.id === activeId) {
                return { ...task, status: overId as Task['status'] };
            }
            return task;
        }));
    } else {
        // Reordering logic
        const overTaskIndex = tasks.findIndex(t => t.id === overId);
        if (activeTaskIndex !== overTaskIndex) {
            setTasks((items) => arrayMove(items, activeTaskIndex, overTaskIndex));
        }
    }
  };

  return (
    <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-6">
        <Column title="To Do" status="todo" tasks={tasks} />
        <Column title="In Progress" status="in-progress" tasks={tasks} />
        <Column title="Done" status="done" tasks={tasks} />
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};
