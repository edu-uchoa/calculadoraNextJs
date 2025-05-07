
'use client'; 

import { useReducer } from 'react';


type CalculatorState = {
  currentValue: string;
  previousValue: string | null;
  operation: string | null;
  overwrite: boolean;
};

// Define action types
type CalculatorAction =
  | { type: 'ADD_DIGIT'; payload: string }
  | { type: 'CHOOSE_OPERATION'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'DELETE_DIGIT' }
  | { type: 'EVALUATE' };

// Initial state
const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: null,
  operation: null,
  overwrite: false,
};

// Reducer function
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'ADD_DIGIT':
      if (state.overwrite) {
        return {
          ...state,
          currentValue: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === '0' && state.currentValue === '0') {
        return state;
      }
      if (action.payload === '.' && state.currentValue.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentValue: `${state.currentValue === '0' ? '' : state.currentValue}${action.payload}`,
      };

    case 'CHOOSE_OPERATION':
      if (state.currentValue === '0' && state.previousValue === null) {
        return state;
      }
      if (state.previousValue === null) {
        return {
          ...state,
          operation: action.payload,
          previousValue: state.currentValue,
          currentValue: '0',
        };
      }
      return {
        ...state,
        previousValue: calculate(state),
        operation: action.payload,
        currentValue: '0',
      };

    case 'CLEAR':
      return initialState;

    case 'DELETE_DIGIT':
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: '0',
        };
      }
      if (state.currentValue.length === 1) {
        return {
          ...state,
          currentValue: '0',
        };
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };

    case 'EVALUATE':
      if (state.operation === null || state.previousValue === null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operation: null,
        currentValue: calculate(state),
      };

    default:
      return state;
  }
}

// Helper function to perform calculations
function calculate({ currentValue, previousValue, operation }: CalculatorState): string {
  const prev = parseFloat(previousValue || '0');
  const current = parseFloat(currentValue);
  if (isNaN(prev)) return currentValue;
  if (isNaN(current)) return previousValue || '0';

  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return currentValue;
  }

  return computation.toString();
}

// Format number for display
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null) {
  if (operand === null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

export default function Calculator() {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(
    calculatorReducer,
    initialState
  );

  return (
    <div className="h-screen grid place-items-center bg-gradient-to-t from-sky-200 to-sky-900">
      <div className="grid grid-cols-5 gap-4 bg-white p-3 rounded-lg shadow-lg w-full max-w-md">
        

        <button onClick={() => dispatch({ type: 'CLEAR' })} className="bg-sky-900 p-4 rounded text-white col-span-5 hover:bg-sky-800 active:bg-sky-700 transition-colors duration-200">CLEAR</button>

        {/* Botões */}
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '7' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">7</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '8' })} className="bg-blue-200 p- rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">8</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '9' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">9</button>
        <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '÷' })} className="bg-sky-500 p-4 rounded text-white col-span-2 hover:bg-sky-700 active:bg-sky-800 transition-colors duration-200 ">DIVIDE</button>

        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '4' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">4</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '5' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">5</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '6' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">6</button>
        <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '*' })} className="bg-sky-500 p-4 rounded text-white col-span-2 hover:bg-sky-700 active:bg-sky-800 transition-colors duration-200 ">MULTIPLICA</button>

        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '1' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">1</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '2' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">2</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '3' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">3</button>
        <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '-' })} className="bg-sky-500 p-4 rounded text-white col-span-2 hover:bg-sky-700 active:bg-sky-800 transition-colors duration-200 ">SUBTRAI</button>

        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '0' })} className="bg-blue-200 p-4 rounded col-span-2 hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">0</button>
        <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '.' })} className="bg-blue-200 p-4 rounded hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ">.</button>
        <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '+' })} className="bg-sky-500 p-4 rounded text-white col-span-2 hover:bg-sky-700 active:bg-sky-800 transition-colors duration-200 ">SOMA</button>

        <button onClick={() => dispatch({ type: 'EVALUATE' })} className="bg-sky-900 p-4 rounded text-white col-span-4 hover:bg-sky-800 active:bg-sky-700 transition-colors duration-200">IGUAL</button>
        <button onClick={() => dispatch({ type: 'DELETE_DIGIT' })} className="bg-red-800 p-4 rounded text-white col-span-1 hover:bg-red-700 active:bg-red-600 transition-colors duration-200">DEL</button>


        {/* Display */}
        <div className="col-span-5 bg-gray-300 p-4 rounded text-right text-xl mb-2">
        {formatOperand(previousValue)} {operation}
        </div>
        <div className="col-span-5 bg-gray-100 p-4 rounded text-right text-xl mb-2">
        {formatOperand(currentValue)}
        </div>
      </div>


    </div>
  )
}
