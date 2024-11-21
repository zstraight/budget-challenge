import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Option {
  label: string;
  cost: number;
}

// Only keep interfaces we're actually using
interface Question {
  id: number;
  category: string;
  options: Option[];
}

const BudgetApp = () => {
  // App states
  const [currentPage, setCurrentPage] = useState('welcome');
  const [budget, setBudget] = useState(700);

  // Complete questions data structure
  const questions: Question[] = [
    {
      id: 1,
      category: "Since you're undocumented, you can't risk getting caught driving without a license.\n How would you get to work for the week?",
      options: [
        { label: "Ubering", cost: 100 },
        { label: "Bike to work (but you have to repair a flat tire)", cost: 25 },
        { label: "Public Transportation", cost: 30 },
        { label: "Risk driving anyways (and get a ticket)", cost: 75 }
      ]
    },
    {
      id: 2,
      category: "How would you handle child care for while you're at work?",
      options: [
        { label: "Daycare", cost: 200 },
        { label: "Partner Looks After Them (and lose the income they provide):", cost: 300 },
        { label: "Personal Babysitter", cost: 250 },
        { label: "Pre-School", cost: 350 }
      ]
    },
    {
      id: 3,
      category: "Where would you get groceries for the week?",
      options: [
        { label: "Trader Joes", cost: 110 },  // Fixed apostrophe
        { label: "Stop & Shop", cost: 100 },
        { label: "Whole Foods", cost: 220 },
        { label: "Grocery Clearance Section & Food Bank", cost: 60 }
      ]
    },
    {
      id: 5,
      category: "You can only afford to pick one item of child supplies this week. Which do you choose?",
      options: [
        { label: "Diapers", cost: 20 },
        { label: "Formula", cost: 30 },
        { label: "New Crib", cost: 80 },
        { label: "Baby Monitor", cost: 40 }
      ]
    },
    {
      id: 7,
      category: "It's date night, where do you go?",
      options: [
        { label: "Movie Theater", cost: 35 },
        { label: "Concert", cost: 70 },
        { label: "Picnic", cost: 25 },
        { label: "Their Favorite Restaurant", cost: 50 }
      ]
    },
    {
      id: 6,
      category: "You wanted to do a family activity this weekend, what do you choose?",
      options: [
        { label: "Water Park", cost: 65 },
        { label: "Six Flags", cost: 80 },
        { label: "Hiking Trail & Camping", cost: 30 },
        { label: "Go To The Park & Ice Cream", cost: 15 }
      ]
    },
    {
      id: 4,
      category: "Since you are only able to afford low-income housing, multiple \nthings in your home require repair that your landlord refuses to fix. \nPick one to fix yourself:",
      options: [
        { label: "Dirty Water Coming From Sink", cost: 70 },
        { label: "Leaking Roof", cost: 150 },
        { label: "Cracked Window", cost: 45 },
        { label: "Broken Outlets", cost: 30 }
      ]
    },
    {
      id: 9,
      category: "Your child is growing and needs new clothes, where do you get them?",
      options: [
        { label: "2nd hand store", cost: 40 },
        { label: "Hand-Me-Downs From Neighbor (need material to patch up worn holes)", cost: 15 },
        { label: "Go To The Mall", cost: 70 },
        { label: "Order Name Brand Clothes Online", cost: 120 }
      ]
    },
    {
      id: 8,
      category: "Your child gets sick with a bad fever, you must bring them to the doctor.",
      options: [
        { label: "", cost: 80 }
      ]
    },
    {
      id: 10,
      category: "Your child's 4th birthday is coming up this week, what present do you get?",
      options: [
        { label: "New Lego Set", cost: 50 },
        { label: "PS5", cost: 500 },
        { label: "Cake & A Donation From The Toy Drive", cost: 30 },
        { label: "No Present; Have To Explain Why They Didn't Get A Gift", cost: 0 }
      ]
    },
    {
      id: 11,
      category: "Your boss skips out part of your paycheck this week. \nHe's threatening to call immigration services if you complain.",
      options: [
        { label: "", cost: 45 }
      ]
    },
    {
      id: 12,
      category: "Dont forget, gotta pay rent for that 1 bedroom apartment.",
      options: [
        { label: "", cost: 300 }
      ]
    }
  ];

  const handleSelection = (questionId: number, optionCost: number): void => {
    setBudget(prev => prev - optionCost);
  };

  // Render welcome page
  const renderWelcome = () => (
    <Card className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Budget Challenge</h1>
      {/* Changed the nested structure to use a div with individual p tags */}
      <div className="mb-6 space-y-4">
        <p>As an undocumented person, you have a weekly income of $400.
          Your partner works part time, bringing in an additional $300 per week.</p>
        <p>Attempt to manage a weeks worth of expenses as a parent within your $700 budget.</p>
        <p>Choose wisely as each decision affects your remaining amount.</p>
      </div>
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
            <span style={{ whiteSpace: 'pre-line' }}>
              {question.category}
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleSelection(question.id, option.cost);
                  // Show next button after selection
                  if (questionNumber < 12) {
                    setCurrentPage(`question-${questionNumber + 1}`);
                  } else {
                    setCurrentPage('results');
                  }
                }}
                className="p-4 border rounded hover:bg-gray-50 text-left"
              >
                <div className="font-medium"
                  dangerouslySetInnerHTML={{ __html: option.label }}>
                </div>
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
          <p></p>
          Started with: $700.00
        </div>
        <div className="p-4 bg-gray-50 rounded">
          Total spent: ${(700 - budget).toFixed(2)}
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p></p>
          {budget >= 0 ? '✅ Under Budget! ✅' : '❌ Over Budget! ❌'}
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