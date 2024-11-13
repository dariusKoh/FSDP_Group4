import React from 'react';

const ProjectOverview = ({ projectId, projectName = `Project ${projectId}`, description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis" }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Project information section */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Circle with image container */}
        <div className="relative w-48 h-48 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img 
            src="/api/placeholder/192/192"
            alt="Project thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow">
          {/* Description text */}
          <p className="text-lg mb-6">{description}</p>
          
          {/* Gray rectangle area */}
          <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default function ViewProject({ projectId, onClose }) {
    return (
        <div className="p-6">
            {/* Header section */}
            <div className="mb-6">
                <button 
                    onClick={onClose}
                    className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                    Back to Projects
                </button>
                <h1 className="text-4xl font-bold">Project Overview</h1>
                <h2 className="text-xl text-gray-600">Viewing Project {projectId}</h2>
            </div>

            {/* Project Overview Component */}
            <ProjectOverview projectId={projectId} />
        </div>
    );
}