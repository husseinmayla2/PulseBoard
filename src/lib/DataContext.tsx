import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Task, Project, Activity, tasks as defaultTasks, mockProjects, mockActivities } from './mockData';

interface DataContextType {
  tasks: Task[];
  projects: Project[];
  activities: Activity[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateProject: (project: Project) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : defaultTasks;
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('projects');
    return stored ? JSON.parse(stored) : mockProjects;
  });
  const [activities] = useState<Activity[]>(() => {
    const stored = localStorage.getItem('activities');
    return stored ? JSON.parse(stored) : mockActivities;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const updateTask = (task: Task) => setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  const deleteTask = (taskId: string) => setTasks(tasks.filter((t) => t.id !== taskId));
  const updateProject = (project: Project) => setProjects(projects.map((p) => (p.id === project.id ? project : p)));

  return (
    <DataContext.Provider value={{ tasks, projects, activities, addTask, updateTask, deleteTask, updateProject }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
