import { useState, useMemo } from 'react';
import { DndContext, closestCenter, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../lib/mockData';
import { TaskDetailPanel } from './TaskDetailPanel';
import { useData } from '../../lib/DataContext';

const Column = ({ title, status, tasks, onTaskClick }: { title: string; status: Task['status']; tasks: Task[], onTaskClick: (t: Task) => void }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col gap-4 w-80 transition-all ${isOver ? 'bg-white/10 border-indigo-500/50' : ''}`}
    >
      <h2 className="text-white/90 font-bold text-lg px-2 tracking-tight">{title}</h2>
      <div className="flex flex-col gap-3 min-h-[100px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const TaskCard = ({ task, isOverlay, onClick }: { task: Task; isOverlay?: boolean; onClick?: () => void }) => {
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
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl text-white shadow-lg cursor-grab active:cursor-grabbing touch-none hover:bg-white/10 transition-all ${isOverlay ? 'rotate-2 cursor-grabbing shadow-2xl' : ''}`}
    >
      <p className="font-semibold text-white/90">{task.title}</p>
      <div className="text-xs text-white/50 mt-2 font-medium">{task.priority.toUpperCase()} | {task.deadline}</div>
    </div>
  );
};

export const KanbanBoard = () => {
  const { tasks, updateTask } = useData();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sort, setSort] = useState<'none' | 'deadline-asc' | 'deadline-desc'>('none');

  const sensors = useSensors(useSensor(PointerSensor));

  const filteredSortedTasks = useMemo(() => {
    let result = [...tasks];
    if (filter !== 'all') {
      result = result.filter(t => t.priority === filter);
    }
    if (sort !== 'none') {
      result.sort((a, b) => {
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
        return sort === 'deadline-asc' ? dateA - dateB : dateB - dateA;
      });
    }
    return result;
  }, [tasks, filter, sort]);

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

    if (['todo', 'in-progress', 'done'].includes(overId)) {
        const task = tasks.find(t => t.id === activeId);
        if (task && task.status !== overId) {
            updateTask({ ...task, status: overId as Task['status'] });
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
      <div className="flex gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg">
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="bg-neutral-900 text-white p-2 rounded-lg border border-white/10">
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-neutral-900 text-white p-2 rounded-lg border border-white/10">
          <option value="none">Sort by Deadline</option>
          <option value="deadline-asc">Earliest Deadline</option>
          <option value="deadline-desc">Latest Deadline</option>
        </select>
      </div>

      <div className="flex gap-8 p-4">
        <Column title="To Do" status="todo" tasks={filteredSortedTasks.filter(t => t.status === 'todo')} onTaskClick={setSelectedTask} />
        <Column title="In Progress" status="in-progress" tasks={filteredSortedTasks.filter(t => t.status === 'in-progress')} onTaskClick={setSelectedTask} />
        <Column title="Done" status="done" tasks={filteredSortedTasks.filter(t => t.status === 'done')} onTaskClick={setSelectedTask} />
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
      {selectedTask && (
        <TaskDetailPanel 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={(updatedTask) => {
            updateTask(updatedTask);
            setSelectedTask(updatedTask);
          }}
        />
      )}
    </DndContext>
  );
};
