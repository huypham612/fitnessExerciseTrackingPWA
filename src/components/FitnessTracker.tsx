import { useState, useEffect } from 'react';
import { Edit3, X } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  date: string | null;
  weight: number | null;
  note: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const FitnessTracker = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load exercises from localStorage on component mount
  useEffect(() => {
    try {
      const savedExercises = localStorage.getItem('fitnessExerciseTracker.exercises');
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      }
    } catch (error) {
      console.error('Error loading exercises from localStorage:', error);
    } finally {
      // Mark as loaded regardless of success/failure
      setIsLoaded(true);
    }
  }, []);

  // Save exercises to localStorage whenever exercises change (after initial load)
  useEffect(() => {
    if (!isLoaded) return; // Don't save until we've loaded from localStorage
    
    try {
      localStorage.setItem('fitnessExerciseTracker.exercises', JSON.stringify(exercises));
    } catch (error) {
      console.error('Error saving exercises to localStorage:', error);
    }
  }, [exercises, isLoaded]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    weight: '',
    note: ''
  });

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      weight: '',
      note: ''
    });
    setShowAddForm(false);
    setEditingExercise(null);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    const exerciseData = {
      id: editingExercise ? editingExercise.id : generateId(),
      name: formData.name.trim(),
      date: formData.date || null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      note: formData.note.trim() || null,
      order: editingExercise ? editingExercise.order : Date.now(),
      createdAt: editingExercise ? editingExercise.createdAt : new Date().toISOString(),
      updatedAt: editingExercise && editingExercise.date === (formData.date || null) ? editingExercise.updatedAt : new Date().toISOString()
    };

    if (editingExercise) {
      setExercises(prev => prev.map(ex => ex.id === editingExercise.id ? exerciseData : ex));
    } else {
      setExercises(prev => [...prev, exerciseData]);
    }
    resetForm();
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setFormData({
      name: exercise.name,
      date: exercise.date || '',
      weight: exercise.weight?.toString() || '',
      note: exercise.note || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const matchingExercises = exercises.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingExercises.length === 0) {
        const newExercise = {
          id: generateId(),
          name: searchTerm.trim(),
          date: null,
          weight: null,
          note: null,
          order: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setExercises(prev => [...prev, newExercise]);
        setSearchTerm('');
      }
    }
  };


  const groupedExercises = () => {
    const sorted = sortedExercises();
    const groups: Array<{date: string; displayDate: string; exercises: Exercise[]}> = [];
    let currentGroup: {date: string; displayDate: string; exercises: Exercise[]} | null = null;

    sorted.forEach(exercise => {
      const dateKey = exercise.date || 'no-date';
      
      if (!currentGroup || currentGroup.date !== dateKey) {
        currentGroup = {
          date: dateKey,
          displayDate: exercise.date ? formatDate(exercise.date) : 'No Date',
          exercises: []
        };
        groups.push(currentGroup);
      }
      
      currentGroup.exercises.push(exercise);
    });

    return groups;
  };

  const sortedExercises = () => {
    let filtered = exercises;
    
    if (searchTerm.trim()) {
      filtered = exercises.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const hasDateA = !!a.date;
      const hasDateB = !!b.date;

      if (hasDateA && !hasDateB) return -1;
      if (!hasDateA && hasDateB) return 1;

      if (hasDateA && hasDateB) {
        const dateComparison = new Date(b.date!).getTime() - new Date(a.date!).getTime();
        if (dateComparison !== 0) return dateComparison;
        
        // Sort by when added to this date (older first)
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }

      // Sort by when added to this date (older first)
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            placeholder="Search exercises or type to add new..."
            className="w-full px-4 py-3 pr-10 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {searchTerm.trim() && sortedExercises().length === 0 && (
          <div className="mt-2 text-sm text-gray-500">
            Press Enter to add "{searchTerm}" as a new exercise
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Push-ups, Squats, Planks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes <span className="text-xs text-gray-500">({formData.note.length}/30)</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quick note..."
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {editingExercise ? 'Update Exercise' : 'Add Exercise'}
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              {editingExercise && (
                <button
                  onClick={() => {
                    handleDelete(editingExercise.id);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Exercise
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {sortedExercises().length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-2">
              {searchTerm.trim() ? 'No exercises found' : 'No exercises yet'}
            </div>
            <p className="text-gray-400 text-sm">
              {searchTerm.trim() 
                ? `Press Enter to add "${searchTerm}" as a new exercise`
                : 'Type in the search box to add your first exercise'
              }
            </p>
          </div>
        ) : (
          groupedExercises().map(group => (
            <div key={group.date} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 px-2">
                {group.displayDate}
              </h3>
              <div className="space-y-1">
                {group.exercises.map((exercise: Exercise) => (
                  <div key={exercise.id} className="bg-white rounded-lg shadow-xs py-2 px-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h4 className="font-semibold text-base text-gray-900">{exercise.name}</h4>
                          {exercise.weight && (
                            <span className="text-sm sm:text-base font-medium text-gray-600">{exercise.weight}lbs</span>
                          )}
                          {exercise.note && (
                            <span className="text-sm sm:text-base text-gray-500 italic">{exercise.note}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-1 items-center">
                        <button
                          onClick={() => handleEdit(exercise)}
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          title="Edit exercise"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FitnessTracker;