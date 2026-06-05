import React, { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, PieChart as PieChartIcon, Coffee, Utensils, ShoppingCart, Zap, ArrowRight } from 'lucide-react';

interface Expense {
  id: string;
  label: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
  categoryColor: string;
}

interface CategoryData {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

const InteractivePlayground: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', label: 'Coffee Shop', amount: 50, icon: <Coffee className="w-4 h-4" />, color: 'from-orange-400 to-red-500', categoryColor: '#f97316' },
    { id: '2', label: 'Lunch', amount: 85, icon: <Utensils className="w-4 h-4" />, color: 'from-amber-400 to-orange-500', categoryColor: '#fbbf24' },
    { id: '3', label: 'Groceries', amount: 120, icon: <ShoppingCart className="w-4 h-4" />, color: 'from-green-400 to-emerald-500', categoryColor: '#10b981' },
  ]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const quickAddOptions = [
    { label: '$30 Coffee', amount: 30, icon: <Coffee className="w-5 h-5" />, color: 'from-orange-400 to-red-500' },
    { label: '$50 Lunch', amount: 50, icon: <Utensils className="w-5 h-5" />, color: 'from-amber-400 to-orange-500' },
    { label: '$75 Shopping', amount: 75, icon: <ShoppingCart className="w-5 h-5" />, color: 'from-pink-400 to-rose-500' },
    { label: '$40 Electricity', amount: 40, icon: <Zap className="w-5 h-5" />, color: 'from-yellow-400 to-amber-500' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };

  const addExpense = (label: string, amount: number, icon: React.ReactNode, color: string) => {
    const newId = Date.now().toString();
    setExpenses([...expenses, { id: newId, label, amount, icon, color, categoryColor: color }]);
    setAnimatingId(newId);
    setTimeout(() => setAnimatingId(null), 600);
  };

  const removeExpense = (id: string) => {
    setAnimatingId(id);
    setTimeout(() => {
      setExpenses(expenses.filter(e => e.id !== id));
    }, 300);
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Generate pie chart data
  const categoryMap: { [key: string]: CategoryData } = {};
  expenses.forEach(expense => {
    const key = expense.label;
    if (!categoryMap[key]) {
      categoryMap[key] = { category: key, amount: 0, color: expense.categoryColor, percentage: 0 };
    }
    categoryMap[key].amount += expense.amount;
  });

  Object.values(categoryMap).forEach(cat => {
    cat.percentage = (cat.amount / totalAmount) * 100;
  });

  const chartData = Object.values(categoryMap);

  // Generate SVG pie chart
  const generatePieChart = () => {
    let currentAngle = -90;
    const slices: React.ReactNode[] = [];
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    chartData.forEach((item, index) => {
      const sliceAngle = (item.percentage / 100) * 360;
      const endAngle = currentAngle + sliceAngle;

      const startRad = (currentAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      slices.push(
        <path
          key={index}
          d={pathData}
          fill={item.color}
          className="transition-all duration-500 hover:opacity-80 cursor-pointer"
          onClick={() => setSelectedCategory(item.category)}
          opacity={selectedCategory === null || selectedCategory === item.category ? 1 : 0.4}
          style={{
            filter: selectedCategory === item.category ? `drop-shadow(0 0 15px ${item.color})` : 'none',
          }}
        />
      );

      currentAngle = endAngle;
    });

    return slices;
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* CUSTOM CURSOR */}
      {showCursor && (
        <>
          {/* Main Cursor Ring */}
          <div
            className="fixed w-10 h-10 rounded-full border-2 border-emerald-400/70 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 20 + 'px',
              top: mousePos.y - 20 + 'px',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.08s ease-out',
            }}
          />

          {/* Outer Pulsing Ring */}
          <div
            className="fixed w-16 h-16 rounded-full border border-emerald-400/40 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 32 + 'px',
              top: mousePos.y - 32 + 'px',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)',
              animation: 'pulse-ring 1.5s ease-in-out infinite',
            }}
          />

          {/* Rotating Outer Ring */}
          <div
            className="fixed w-20 h-20 rounded-full border border-transparent pointer-events-none z-50"
            style={{
              left: mousePos.x - 40 + 'px',
              top: mousePos.y - 40 + 'px',
              borderTopColor: 'rgba(16, 185, 129, 0.5)',
              borderRightColor: 'rgba(16, 185, 129, 0.3)',
              animation: 'spin 2s linear infinite',
            }}
          />

          {/* Trailing Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="fixed rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 pointer-events-none z-40"
              style={{
                width: (6 - i) + 'px',
                height: (6 - i) + 'px',
                left: mousePos.x - (6 - i) / 2 + 'px',
                top: mousePos.y - (6 - i) / 2 + 'px',
                opacity: (6 - i) / 12,
                transform: `translate(${Math.cos(i * Math.PI / 3) * (i + 1) * 12}px, ${Math.sin(i * Math.PI / 3) * (i + 1) * 12}px)`,
                transition: 'all 0.15s ease-out',
                boxShadow: `0 0 ${8 + i * 2}px rgba(16, 185, 129, 0.4)`,
              }}
            />
          ))}

          {/* Center Dot */}
          <div
            className="fixed w-2 h-2 rounded-full bg-emerald-300 pointer-events-none z-50"
            style={{
              left: mousePos.x - 4 + 'px',
              top: mousePos.y - 4 + 'px',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)',
            }}
          />
        </>
      )}

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl [animation-delay:2s] animate-pulse" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl [animation-delay:4s] animate-pulse" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </div>
            <span>Try It Out</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-white mb-4">Experience the Magic</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-3xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                In Real-Time
              </span>
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Add expenses and watch your spending dashboard update instantly. See how CentWise brings clarity to your finances.
          </p>
        </div>

        {/* MAIN PLAYGROUND */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* LEFT SIDE - EXPENSE TRACKER */}
          <div className="space-y-6">
            {/* Add Expense Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Quick Add</p>
              <div className="grid grid-cols-2 gap-3">
                {quickAddOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => addExpense(option.label, option.amount, option.icon, option.color)}
                    className="group relative p-4 rounded-xl border border-slate-700/50 bg-slate-900/40 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden hover:border-slate-600/50 active:scale-95"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 transition-all duration-300`} />
                    <div className="relative flex flex-col items-center gap-2 text-center">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color} text-white transition-all duration-300 group-hover:scale-110`}>
                        {option.icon}
                      </div>
                      <span className="text-sm font-bold text-white">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* EXPENSE LIST */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Recent Expenses</p>
                <span className="text-xs font-bold text-slate-400">{expenses.length} items</span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {expenses.length === 0 ? (
                  <div className="p-8 text-center border border-slate-700/30 rounded-xl bg-slate-900/20 backdrop-blur-sm">
                    <p className="text-slate-400 text-sm">Add an expense to get started!</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className={`group relative p-4 rounded-xl border border-slate-700/40 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-300 overflow-hidden ${
                        animatingId === expense.id ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                      }`}
                      style={{
                        animation: animatingId === null ? `slideInExpense 0.4s ease-out` : undefined,
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${expense.color} opacity-0 group-hover:opacity-5 transition-all duration-300`} />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`p-2.5 rounded-lg bg-gradient-to-br ${expense.color} text-white transition-all duration-300 group-hover:scale-110`}>
                            {expense.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{expense.label}</p>
                            <p className="text-xs text-slate-400">Just now</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-black bg-gradient-to-r ${expense.color} bg-clip-text text-transparent`}>
                            ${expense.amount}
                          </span>
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-300">Total Spending</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    ${totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - VISUAL DASHBOARD */}
          <div className="space-y-6">
            {/* PIE CHART */}
            <div className="p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-xl hover:border-slate-600/60 transition-all duration-300">
              <div className="flex items-center gap-2 mb-8">
                <PieChartIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Spending Breakdown</h3>
              </div>

              {totalAmount === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-slate-400 text-center">Add expenses to see your breakdown</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="w-64 h-64">
                    {generatePieChart()}
                  </svg>
                </div>
              )}
            </div>

            {/* CATEGORY BREAKDOWN */}
            <div className="p-6 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-4">Category Details</h3>
              <div className="space-y-3">
                {chartData.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-4">No expenses yet</p>
                ) : (
                  chartData.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCategory(selectedCategory === item.category ? null : item.category)}
                      className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                        selectedCategory === null || selectedCategory === item.category
                          ? 'border-slate-600 bg-slate-800/50'
                          : 'border-slate-700/30 bg-slate-900/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-semibold text-white text-sm">{item.category}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-300">${item.amount}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{item.percentage.toFixed(1)}% of total</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <button className="group relative px-10 py-4 rounded-xl font-bold text-base text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative flex items-center justify-center gap-2">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          <p className="text-slate-400 max-w-xl mx-auto">
            No credit card required. Get instant access to all features.
          </p>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        @keyframes slideInExpense {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </section>
  );
};

export default InteractivePlayground;
