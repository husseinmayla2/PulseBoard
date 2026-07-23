import { mockProjects, mockActivities, tasks } from '../../lib/mockData';
import { Card } from '../ui/Card';

export const Dashboard = () => {
  const activeProjects = mockProjects.filter((p) => p.status === 'active').length;
  const totalProgress = Math.round(
    mockProjects.reduce((acc, curr) => acc + curr.progress, 0) / mockProjects.length
  );
  const totalTasks = tasks.length;

  return (
    <div className="p-10 space-y-10 min-h-screen bg-neutral-950 text-white">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-white/90">Project Dashboard</h1>
        <p className="text-white/50 mt-2">Overview of your ongoing initiatives.</p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02]">
          <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">Active Projects</h3>
          <p className="text-4xl font-bold text-white mt-3">{activeProjects}</p>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02]">
          <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">Avg Progress</h3>
          <p className="text-4xl font-bold text-white mt-3">{totalProgress}%</p>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02]">
          <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">Total Tasks</h3>
          <p className="text-4xl font-bold text-white mt-3">{totalTasks}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="group hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg font-semibold text-white/90">{project.name}</h2>
              <p className="text-white/50 text-sm mt-1 capitalize">{project.status}</p>
              <div className="w-full bg-white/5 h-2 rounded-full mt-6">
                <div
                  className="bg-sky-500/80 h-2 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-white/90 mb-6">Recent Activity</h2>
          <ul className="space-y-6">
            {mockActivities.map((activity) => (
              <li key={activity.id} className="group border-l border-white/10 pl-4 py-1 hover:border-sky-500/50 transition-colors">
                <p className="text-sm text-white/80">{activity.description}</p>
                <span className="text-xs text-white/40 mt-1 block">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
