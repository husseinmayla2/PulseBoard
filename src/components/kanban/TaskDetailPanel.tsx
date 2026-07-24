import { Task } from '../../lib/mockData';

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export const TaskDetailPanel = ({ task, onClose, onUpdate }: TaskDetailPanelProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900/90 border-l border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Edit Task</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-white/50 text-sm mb-1">Title</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => onUpdate({ ...task, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/50 text-sm mb-1">Priority</label>
            <select
              value={task.priority}
              onChange={(e) => onUpdate({ ...task, priority: e.target.value as any })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-white/50 text-sm mb-1">Deadline</label>
            <input
              type="date"
              value={task.deadline}
              onChange={(e) => onUpdate({ ...task, deadline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
