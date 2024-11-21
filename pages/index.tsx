import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Option {
  label: string;
  cost: number;
}

interface Question {
  id: number;
  category: string;
  options: Option[];
}

const BudgetApp = () => {
  // App states
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, question-1 through question-5, results
  const [budget, setBudget] = useState(400);
  const [selections, setSelections] = useState({});
  
  // Complete questions data structure
  const questions = [
    {
      id: 1,
      category: "Repairs",
      options: [
        { label: "Car", cost: 130 },
        { label: "Sink", cost: 70 },
        { label: "Bike", cost: 40 },
        { label: "Roof", cost: 110 }
      ]
    },
    {
      id: 2,
      category: "Child Care",
      options: [
        { label: "Clothes", cost: 50 },
        { label: "Diapers", cost: 20 },
        { label: "New Toy", cost: 25 },
        { label: "Backpack", cost: 35 }
      ]
    },
    {
      id: 3,
      category: "Groceries",
      options: [
        { label: "Trader Joe's", cost: 110 },
        { label: "Stop & Shop", cost: 100 },
        { label: "Whole Foods", cost: 220 },
        { label: "Grocery Clearance Section", cost: 60 }
      ]
    },
    {
      id: 4,
      category: "Date",
      options: [
        { label: "Movie", cost: 45 },
        { label: "Concert", cost: 70 },
        { label: "Picnic", cost: 35 },
        { label: "Restaurant", cost: 90 }
      ]
    },
    {
      id: 5,
      category: "Family Activity",
      options: [
        { label: "Water Park", cost: 65 },
        { label: "Six Flags", cost: 80 },
        { label: "Hiking Trail and Camping", cost: 30 },
        { label: "PS5 Pro", cost: 700 }
      ]
    }
  ];

  const handleSelection = (questionId: number, optionCost: number): void => {
    setSelections(prev => ({
      ...prev,
      [questionId]: optionCost
    }));
    setBudget(prev => prev - optionCost);
  };

  // Render welcome page
  const renderWelcome = () => (
    <Card className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Budget Challenge</h1>
      <p className="mb-6">
        You'll start with $400 and make choices across 5 different categories.
        Choose wisely as each decision affects your remaining budget!
      </p>
      <button 
        onClick={() => setCurrentPage('question-1')}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Begin Challenge
      </button>
    </Card>
  );

  // Render question page
  const renderQuestion = (questionNumber: number) => {
    const question = questions[questionNumber - 1];
    
    // Add error handling for undefined question
    if (!question) {
      return (
        <Card className="p-6 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-red-500">Error Loading Question</h2>
          <p>Please try again later.</p>
        </Card>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* Budget display */}
        <div className="absolute top-4 right-4">
          <Card className="p-4 text-center">
            <div className="text-sm font-semibold">Current Budget</div>
            <div className={`text-xl ${budget < 0 ? 'text-red-500' : 'text-green-500'}`}>
              ${budget.toFixed(2)}
            </div>
          </Card>
        </div>

        {/* Question content */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">
            Question {questionNumber}: {question.category}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleSelection(question.id, option.cost);
                  // Show next button after selection
                  if (questionNumber < 5) {
                    setCurrentPage(`question-${questionNumber + 1}`);
                  } else {
                    setCurrentPage('results');
                  }
                }}
                className="p-4 border rounded hover:bg-gray-50 text-left"
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">Cost: ${option.cost}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Render results page
  const renderResults = () => (
    <Card className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Final Results</h1>
      <div className={`text-4xl mb-8 ${budget < 0 ? 'text-red-500' : 'text-green-500'}`}>
        Remaining Budget: ${budget.toFixed(2)}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-gray-50 rounded">
          {Object.entries(selections).length} choices made
        </div>
        <div className="p-4 bg-gray-50 rounded">
          Started with: $400.00
        </div>
        <div className="p-4 bg-gray-50 rounded">
          Total spent: ${(400 - budget).toFixed(2)}
        </div>
        <div className="p-4 bg-gray-50 rounded">
          {budget >= 0 ? 'Under budget! 🎉' : 'Over budget! 😬'}
        </div>
      </div>
    </Card>
  );

  // Main render logic
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {currentPage === 'welcome' && renderWelcome()}
      {currentPage.startsWith('question-') && 
        renderQuestion(parseInt(currentPage.split('-')[1]))}
      {currentPage === 'results' && renderResults()}
    </div>
  );
};

export default BudgetApp;