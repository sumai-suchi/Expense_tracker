import React, { useState } from 'react';
import { 
  Plus, 
  Coffee, 
  Car, 
  Zap, 
  Gamepad2, 
  Briefcase,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  Activity,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';

type TransactionType = 'expense' | 'income';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

const QuickActionConsole: React.FC = () => {
  const navigate = useNavigate();
  const [txType, setTxType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const categories: Category[] = [
    { id: 'food', label: 'Food & Dining', icon: Coffee, description: 'Groceries, restaurants, coffee runs' },
    { id: 'transport', label: 'Transport', icon: Car, description: 'Fuel, public transit, ride shares' },
    { id: 'utilities', label: 'Utilities/Bills', icon: Zap, description: 'Electricity, water, internet, subscriptions' },
    { id: 'entertainment', label: 'Entertainment', icon: Gamepad2, description: 'Movies, gaming, concerts, hobbies' },
    { id: 'salary', label: 'Salary/Pay', icon: Briefcase, description: 'Primary income, freelance, bonuses' },
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !selectedCategory) return;

    console.log({
      type: txType,
      amount: parseFloat(amount),
      category: selectedCategory,
      
   
    });


//     {id: 'cmq1gnkhz0001acvp01xwoih9', title: 'income', amount: 10000, category: 'salary', createdAt: '2026-06-05T21:53:10.535Z', …}


    // Send the transaction data to the backend API here using fetch or axios

          try{
                const response = await API.post('/expenses', {
                  title: txType,
                  amount: parseFloat(amount),
                  category: selectedCategory,
                  
                });

                console.log('Transaction submitted successfully:', response.data);
          }
          catch(error){
            console.error("Error submitting transaction:", error);
          }
    

    // Clear and navigate back to overview
    setAmount('');
    setSelectedCategory('');
    setNote('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col relative overflow-x-hidden font-sans antialiased selection:bg-cyan-500/30">
      
      {/* Dynamic Ambient Core Glow - Swaps dynamically across the background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] right-[-10%] h-[600px] w-[800px] rounded-full blur-[160px] transition-all duration-700 ease-in-out ${
          txType === 'expense' ? 'bg-rose-500/10' : 'bg-cyan-500/10'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-5%] h-[500px] w-[700px] rounded-full blur-[140px] transition-all duration-700 ease-in-out ${
          txType === 'expense' ? 'bg-orange-500/5' : 'bg-teal-500/5'
        }`} />
        {/* Architectural Cyber Grid Layout Line Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#091124_1px,transparent_1px),linear-gradient(to_bottom,#091124_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      {/* Main Container Wrapper */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col relative z-10 justify-center">
        
        {/* --- Top Workspace Interactive Utility Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-xl bg-[#061024]/40 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800 transition-all flex items-center justify-center cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  Terminal Mode
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-1">Transaction Ledger Sync</h1>
            </div>
          </div>

          {/* Secure pipeline confirmation banner */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-400 font-mono self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-BIT ENCRYPTED QUANTUM FLOW</span>
          </div>
        </div>

        {/* --- Core Expansive Page Interface Grid Layout --- */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT COLUMN: Numerical Entry and Meta Specs (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Component Box 1: Flow Selector Switch */}
            <div className="p-6 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl space-y-3 shadow-xl">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Accounting Flow Direction
              </label>
              <div className="grid grid-cols-2 p-1.5 bg-slate-950 rounded-xl border border-slate-900">
                <button
                  type="button"
                  onClick={() => { setTxType('expense'); setSelectedCategory(''); }}
                  className={`py-3 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    txType === 'expense'
                      ? 'bg-rose-500 text-slate-950 shadow-[0_4px_20px_rgba(244,63,94,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Negative Flow (-)
                </button>
                <button
                  type="button"
                  onClick={() => { setTxType('income'); setSelectedCategory(''); }}
                  className={`py-3 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    txType === 'income'
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_4px_20px_rgba(34,211,238,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Positive Flow (+)
                </button>
              </div>
            </div>

            {/* Component Box 2: Huge Fluid Amount Input Card */}
            <div className="p-6 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl space-y-4 shadow-xl relative overflow-hidden">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Amount Matrix Input
              </label>
              <div className={`flex items-center gap-3 px-5 py-6 bg-slate-950/80 border-2 rounded-2xl transition-all ${
                txType === 'expense' 
                  ? 'focus-within:border-rose-500/40 focus-within:shadow-[0_0_25px_rgba(244,63,94,0.08)] border-slate-900' 
                  : 'focus-within:border-cyan-500/40 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.08)] border-slate-900'
              }`}>
                <span className={`text-4xl font-black font-mono tracking-tight transition-colors duration-300 ${
                  txType === 'expense' ? 'text-rose-400' : 'text-cyan-400'
                }`}>
                  {txType === 'expense' ? '-' : '+'}
                </span>
                <div className="text-2xl font-bold text-slate-600 font-mono">$</div>
                <input
                  type="number"
                  step="0.01"
                  autoFocus
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-4xl sm:text-5xl font-black text-white placeholder-slate-900 focus:outline-none tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Component Box 3: Additional Transaction Metadata Notes */}
            <div className="p-6 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl space-y-3 shadow-xl">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Memo / Ledger Note <span className="text-slate-600">(Optional)</span>
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Weekly marketplace grocery haul..."
                className="w-full bg-slate-950/60 border border-slate-900 focus:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none transition-all"
              />
            </div>

          </div>

          {/* RIGHT CONTENT COLUMN: Full Scale Category Badges (Spans 7 Columns) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-between space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl shadow-xl flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                    Select System Tag Assignment
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">Map this record stream to its precise database index cluster.</p>
                </div>
                <Activity className="w-4 h-4 text-slate-700 hidden sm:block" />
              </div>

              {/* Expansive Responsive Full Grid Layer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-300 group cursor-pointer relative ${
                        isSelected
                          ? txType === 'expense'
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 shadow-[0_4px_25px_rgba(244,63,94,0.05)]'
                            : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_4px_25px_rgba(34,211,238,0.05)]'
                          : 'bg-slate-950/40 border-slate-900/80 text-slate-400 hover:border-slate-800 hover:bg-slate-950/80 hover:text-white'
                      }`}
                    >
                      {/* Interactive Selection Dot Indicator */}
                      {isSelected && (
                        <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full shadow-lg ${
                          txType === 'expense' ? 'bg-rose-400 shadow-rose-500' : 'bg-cyan-400 shadow-cyan-500'
                        }`} />
                      )}

                      <div className={`p-3 rounded-xl border transition-all duration-300 flex-shrink-0 ${
                        isSelected 
                          ? txType === 'expense' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                          : 'bg-slate-900 border-slate-900 text-slate-500 group-hover:text-slate-300 group-hover:border-slate-800'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <span className="text-sm font-bold tracking-wide block">{cat.label}</span>
                        <span className="text-xs text-slate-500 font-normal line-clamp-2 mt-0.5 leading-relaxed">
                          {cat.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Giant High-End Action Execution Button */}
            <button
              type="submit"
              disabled={!amount || !selectedCategory}
              className={`w-full py-4.5 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:active:scale-100 ${
                txType === 'expense'
                  ? 'bg-gradient-to-r from-rose-400 via-rose-500 to-orange-400 text-slate-950 shadow-[0_4px_25px_rgba(244,63,94,0.2)] hover:shadow-[0_4px_35px_rgba(244,63,94,0.35)]'
                  : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400 text-slate-950 shadow-[0_4px_25px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_35px_rgba(34,211,238,0.35)]'
              }`}
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Commit Sync to Ledger Database</span>
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default QuickActionConsole;