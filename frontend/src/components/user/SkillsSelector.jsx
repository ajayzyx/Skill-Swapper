import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Search } from 'lucide-react';

const SkillsSelector = ({ 
  label, 
  skills = [], 
  onChange, 
  placeholder, 
  color = 'blue',
  maxSkills = 10,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Popular skills suggestions
  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'HTML/CSS',
    'Machine Learning', 'Data Science', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
    'Vue.js', 'Angular', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'PHP',
    'Swift', 'Kotlin', 'React Native', 'Flutter', 'iOS Development', 'Android Development',
    'DevOps', 'CI/CD', 'Git', 'Linux', 'Bash', 'PowerShell', 'Terraform', 'Jenkins',
    'Photoshop', 'Illustrator', 'Figma', 'Sketch', 'UI/UX Design', 'Graphic Design',
    'Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Public Speaking',
    'Digital Marketing', 'SEO', 'Content Writing', 'Social Media', 'Analytics', 'Excel'
  ];

  const colorClasses = {
    blue: {
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      tagHover: 'hover:bg-blue-200',
      removeBtn: 'hover:bg-blue-200 text-blue-600',
      input: 'focus:border-blue-500 focus:ring-blue-500/10',
      suggestion: 'hover:bg-blue-50'
    },
    purple: {
      tag: 'bg-purple-100 text-purple-800 border-purple-200',
      tagHover: 'hover:bg-purple-200',
      removeBtn: 'hover:bg-purple-200 text-purple-600',
      input: 'focus:border-purple-500 focus:ring-purple-500/10',
      suggestion: 'hover:bg-purple-50'
    },
    green: {
      tag: 'bg-green-100 text-green-800 border-green-200',
      tagHover: 'hover:bg-green-200',
      removeBtn: 'hover:bg-green-200 text-green-600',
      input: 'focus:border-green-500 focus:ring-green-500/10',
      suggestion: 'hover:bg-green-50'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = popularSkills
        .filter(skill => 
          skill.toLowerCase().includes(inputValue.toLowerCase()) &&
          !skills.includes(skill)
        )
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, skills]);

  const addSkill = (skill) => {
    if (skill.trim() && !skills.includes(skill) && skills.length < maxSkills) {
      onChange([...skills, skill]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addSkill(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
    inputRef.current?.focus();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <span className="text-gray-500 ml-2">
            ({skills.length}/{maxSkills})
          </span>
        </label>
      )}

      {/* Skills Container */}
      <div className="relative">
        <div
          className={`
            min-h-[3rem] p-3 border rounded-xl bg-white/50 backdrop-blur-sm
            transition-all duration-200 cursor-text
            ${isInputFocused
              ? colors.input
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Selected Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                  border transition-all duration-200 group
                  ${colors.tag} ${colors.tagHover}
                `}
              >
                <span>{skill}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkill(skill);
                  }}
                  className={`
                    w-4 h-4 rounded-full flex items-center justify-center
                    transition-colors duration-200 ${colors.removeBtn}
                  `}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Input Field */}
          {skills.length < maxSkills && (
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  setIsInputFocused(false);
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder={skills.length === 0 ? placeholder : 'Add another skill...'}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
              />
              {inputValue && (
                <button
                  onClick={() => addSkill(inputValue.trim())}
                  className="p-1 rounded-md transition-colors duration-200 text-blue-600 hover:bg-blue-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-48 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                Suggested Skills
              </div>
              {suggestions.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(skill)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm
                    transition-colors duration-200 ${colors.suggestion}
                    text-gray-700 hover:text-gray-900
                  `}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {skills.length === 0 
            ? 'Start typing to add skills or select from suggestions'
            : `${maxSkills - skills.length} more skills can be added`
          }
        </span>
        {skills.length >= maxSkills && (
          <span className="text-amber-600">Maximum skills reached</span>
        )}
      </div>
    </div>
  );
};

export default SkillsSelector;
