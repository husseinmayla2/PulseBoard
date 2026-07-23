import { Dashboard } from './components/dashboard/Dashboard';
import { KanbanBoard } from './components/kanban/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Dashboard />
      <KanbanBoard />
    </div>
  );
}

export default App;
