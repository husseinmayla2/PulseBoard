import { mockProjects, mockActivities } from '@/lib/mockData';
import { Card } from '../ui/Card';

export const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <Card key={project.id}>
            <h2 className="text-xl font-semibold text-white">{project.name}</h2>
            <p className="text-gray-300 mt-2">Progress: {project.progress}%</p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <ul className="mt-4 space-y-2">
          {mockActivities.map(activity => (
            <li key={activity.id} className="text-gray-300 border-b border-white/10 pb-2">
              {activity.description} <span className="text-sm text-gray-500">({activity.timestamp})</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
