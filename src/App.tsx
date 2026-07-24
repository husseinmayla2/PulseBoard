import { DataProvider } from './lib/DataContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { KanbanBoard } from './components/kanban/KanbanBoard';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-900">
        <Dashboard />
        <KanbanBoard />
      </div>
    </DataProvider>
  );
}

export default App;
