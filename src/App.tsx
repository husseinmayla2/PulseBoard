import { DataProvider } from './lib/DataContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { useState } from 'react';

type View = 'dashboard' | 'kanban';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <DataProvider>
      <div className="flex min-h-screen bg-neutral-950">
        {/* Sidebar */}
        <nav className="w-64 border-r border-white/10 p-6 flex flex-col gap-8">
          <h1 className="text-xl font-bold text-white px-2">Project Manager</h1>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-3 rounded-xl text-left transition-colors ${
                activeView === 'dashboard' 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('kanban')}
              className={`px-4 py-3 rounded-xl text-left transition-colors ${
                activeView === 'kanban' 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Kanban
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeView === 'dashboard' ? <Dashboard /> : <KanbanBoard />}
        </main>
      </div>
    </DataProvider>
  );
}
