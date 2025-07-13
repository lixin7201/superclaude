'use client';

import React from 'react';
import { Persona } from '@/types';
import { personas } from '@/data/commands';

interface PersonaSelectorProps {
  selectedPersona: Persona | null;
  onPersonaSelect: (persona: Persona | null) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ selectedPersona, onPersonaSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">选择认知人格角色</h2>
      <p className="text-sm text-gray-600 mb-6">
        选择一个专业角色来获得特定领域的专业建议。每个角色都有其独特的思维方式和专业知识。
      </p>
      
      <div className="mb-4">
        <button
          onClick={() => onPersonaSelect(null)}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
            selectedPersona === null
              ? 'border-gray-500 bg-gray-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="font-semibold text-gray-800 mb-2">无特定角色</div>
          <div className="text-sm text-gray-600">使用默认的通用AI助手，不启用特定专业角色</div>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personas.map(persona => (
          <button
            key={persona.id}
            onClick={() => onPersonaSelect(persona)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedPersona?.id === persona.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold text-gray-800 mb-2">{persona.name}</div>
            <div className="text-sm text-gray-600 mb-2">{persona.description}</div>
            <div className="text-xs text-gray-500 mb-2">
              <strong>专业领域:</strong> {persona.expertise}
            </div>
            <div className="text-xs text-gray-500">
              <strong>最适合:</strong> {persona.bestFor}
            </div>
            <div className="text-xs text-blue-600 mt-2 font-mono">{persona.flag}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;