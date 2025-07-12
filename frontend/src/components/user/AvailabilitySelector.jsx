import React from 'react';
import { Sun, Sunset, Moon, Calendar, Clock, Zap } from 'lucide-react';

const AvailabilitySelector = ({ selected = [], onChange, className = '' }) => {
  const availabilityOptions = [
    {
      id: 'morning',
      label: 'Morning',
      description: '9AM - 12PM',
      icon: Sun,
      color: 'yellow'
    },
    {
      id: 'afternoon',
      label: 'Afternoon',
      description: '12PM - 5PM',
      icon: Sunset,
      color: 'orange'
    },
    {
      id: 'evening',
      label: 'Evening',
      description: '5PM - 8PM',
      icon: Moon,
      color: 'indigo'
    },
    {
      id: 'weekends',
      label: 'Weekends',
      description: 'Sat & Sun',
      icon: Calendar,
      color: 'green'
    },
    {
      id: 'fulltime',
      label: 'Full-time',
      description: 'Available all day',
      icon: Clock,
      color: 'blue'
    },
    {
      id: 'flexible',
      label: 'Flexible',
      description: 'Varies by week',
      icon: Zap,
      color: 'purple'
    }
  ];

  const colorClasses = {
    yellow: {
      selected: 'bg-yellow-500 text-white border-yellow-500 shadow-yellow-500/25',
      unselected: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300',
      icon: 'text-yellow-600'
    },
    orange: {
      selected: 'bg-orange-500 text-white border-orange-500 shadow-orange-500/25',
      unselected: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:border-orange-300',
      icon: 'text-orange-600'
    },
    indigo: {
      selected: 'bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/25',
      unselected: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300',
      icon: 'text-indigo-600'
    },
    green: {
      selected: 'bg-green-500 text-white border-green-500 shadow-green-500/25',
      unselected: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300',
      icon: 'text-green-600'
    },
    blue: {
      selected: 'bg-blue-500 text-white border-blue-500 shadow-blue-500/25',
      unselected: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
      icon: 'text-blue-600'
    },
    purple: {
      selected: 'bg-purple-500 text-white border-purple-500 shadow-purple-500/25',
      unselected: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
      icon: 'text-purple-600'
    }
  };

  const toggleAvailability = (optionId) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter(id => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Time-based Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Preferred Time Slots
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {availabilityOptions.slice(0, 3).map((option) => {
            const isSelected = selected.includes(option.id);
            const colors = colorClasses[option.color];
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                onClick={() => toggleAvailability(option.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  transform hover:scale-105 active:scale-95
                  ${isSelected 
                    ? `${colors.selected} shadow-lg` 
                    : `${colors.unselected} shadow-sm hover:shadow-md`
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-lg transition-colors duration-200
                    ${isSelected 
                      ? 'bg-white/20' 
                      : 'bg-white'
                    }
                  `}>
                    <Icon className={`
                      w-5 h-5 transition-colors duration-200
                      ${isSelected ? 'text-white' : colors.icon}
                    `} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {option.label}
                    </div>
                    <div className={`
                      text-xs transition-colors duration-200
                      ${isSelected ? 'text-white/80' : 'text-gray-500'}
                    `}>
                      {option.description}
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Type Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Schedule Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {availabilityOptions.slice(3).map((option) => {
            const isSelected = selected.includes(option.id);
            const colors = colorClasses[option.color];
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                onClick={() => toggleAvailability(option.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  transform hover:scale-105 active:scale-95
                  ${isSelected 
                    ? `${colors.selected} shadow-lg` 
                    : `${colors.unselected} shadow-sm hover:shadow-md`
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-lg transition-colors duration-200
                    ${isSelected 
                      ? 'bg-white/20' 
                      : 'bg-white'
                    }
                  `}>
                    <Icon className={`
                      w-5 h-5 transition-colors duration-200
                      ${isSelected ? 'text-white' : colors.icon}
                    `} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {option.label}
                    </div>
                    <div className={`
                      text-xs transition-colors duration-200
                      ${isSelected ? 'text-white/80' : 'text-gray-500'}
                    `}>
                      {option.description}
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {selected.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50/50 rounded-xl border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Your Availability Summary
          </h4>
          <div className="flex flex-wrap gap-2">
            {selected.map((optionId) => {
              const option = availabilityOptions.find(opt => opt.id === optionId);
              if (!option) return null;
              
              return (
                <span
                  key={optionId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {option.label}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This helps others know when you're typically available for skill exchanges.
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySelector;
