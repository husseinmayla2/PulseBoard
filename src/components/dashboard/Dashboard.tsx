import { mockProjects, mockActivities, tasks } from '@/lib/mockData';
import { Card } from '../ui/Card';

export const Dashboard = () => {
  const activeProjects = mockProjects.filter((p) => p.status === 'active').length;
  const totalProgress = Math.round(
    mockProjects.reduce((acc, curr) => acc + curr.progress, 0) / mockProjects.length
  );
  const totalTasks = tasks.length;

  return (
    <div className="p-8 space-y-8 min-h-screen bg-slate-900">
      <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-white/70 text-sm font-medium">Active Projects</h3>
          <p className="text-3xl font-bold text-white mt-1">{activeProjects}</p>
        </Card>
        <Card>
          <h3 className="text-white/70 text-sm font-medium">Avg Progress</h3>
          <p className="text-3xl font-bold text-white mt-1">{totalProgress}%</p>
        </Card>
        <Card>
          <h3 className="text-white/70 text-sm font-medium">Total Tasks</h3>
          <p className="text-3xl font-bold text-white mt-1">{totalTasks}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id}>
              <h2 className="text-lg font-semibold text-white">{project.name}</h2>
              <p className="text-white/60 text-sm mt-1">Status: {project.status}</p>
              <div className="w-full bg-white/10 h-2 rounded-full mt-4">
                <div
                  className="bg-sky-400 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <ul className="mt-4 space-y-4">
            {mockActivities.map((activity) => (
              <li key={activity.id} className="text-white/80 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <p className="text-sm">{activity.description}</p>
                <span className="text-xs text-white/40">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
