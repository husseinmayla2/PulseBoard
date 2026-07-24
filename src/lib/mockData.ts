export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  team: string[];
  deadline: string;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

export const tasks: Task[] = [
  { id: '1', projectId: '1', title: 'Design System', status: 'todo', priority: 'high', deadline: '2026-08-01' },
  { id: '2', projectId: '2', title: 'API Integration', status: 'in-progress', priority: 'medium', deadline: '2026-08-05' },
  { id: '3', projectId: '1', title: 'Dashboard UI', status: 'done', priority: 'low', deadline: '2026-07-25' },
];

export const mockProjects: Project[] = [
  { id: '1', name: 'Website Redesign', status: 'active', progress: 75, team: ['Alice', 'Bob'], deadline: '2026-08-15' },
  { id: '2', name: 'Mobile App API', status: 'active', progress: 40, team: ['Charlie'], deadline: '2026-09-01' },
  { id: '3', name: 'Security Audit', status: 'on-hold', progress: 10, team: ['Alice', 'Dave'], deadline: '2026-10-12' },
];

export const mockActivities: Activity[] = [
  { id: '1', description: 'Updated design assets', timestamp: '2 mins ago' },
  { id: '2', description: 'API endpoint deployment', timestamp: '1 hour ago' },
];
