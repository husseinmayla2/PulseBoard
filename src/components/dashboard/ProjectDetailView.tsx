import { Card } from '../ui/Card';
import { useData } from '../../lib/DataContext';

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
}

export const ProjectDetailView = ({ projectId, onBack }: ProjectDetailViewProps) => {
  const { projects, tasks } = useData();
  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  if (!project) {
    return (
      <div className="p-10 text-white/50">
        <button onClick={onBack} className="mb-4 text-sky-400 hover:text-sky-300">← Back</button>
        Project not found.
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10 min-h-screen bg-neutral-950 text-white">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white/90">{project.name}</h1>
          <p className="text-white/50 mt-1 capitalize">{project.status} Project</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02]">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Progress</h2>
          <div className="w-full bg-white/5 h-4 rounded-full">
            <div
              className="bg-sky-500/80 h-4 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <p className="text-right text-white/70 mt-2 font-medium">{project.progress}% Complete</p>
        </Card>

        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02]">
          <h2 className="text-xl font-semibold text-white/90 mb-4">Project Tasks</h2>
          {projectTasks.length === 0 ? (
            <p className="text-white/40 italic">No tasks assigned to this project.</p>
          ) : (
            <ul className="space-y-3">
              {projectTasks.map((task) => (
                <li key={task.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-white/90">{task.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                      task.status === 'in-progress' ? 'bg-sky-500/20 text-sky-400' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};
