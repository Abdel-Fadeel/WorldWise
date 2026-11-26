import { createContext, useEffect, useCallback, useReducer } from 'react';
import { City } from '../types';
import { sampleCities } from '../data/cities';

const STORAGE_KEY = 'worldwise-cities';

const loadCities = (): City[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as City[]) : sampleCities;
  } catch {
    return sampleCities;
  }
};

// Cities Context
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  currentCity: City | null;
  getCity: (id: number) => void;
  createCity: (city: Omit<City, 'id'>) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

export const CitiesContext = createContext({} as CitiesContextType);

// Cities Reducer Initial State
type CitiesState = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
};

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

// Actions Types
type LoadingAction = {
  type: 'loading';
};

type RejectedAction = {
  type: 'rejected';
  payload: string;
};

type LoadCitiesAction = {
  type: 'cities/loaded';
  payload: City[];
};

type LoadCityAction = {
  type: 'city/loaded';
  payload: City;
};

type CreateCityAction = {
  type: 'city/created';
  payload: City;
};

type DeleteCityAction = {
  type: 'city/deleted';
  payload: number;
};

// Cities Reducer
const reducer = (
  state: CitiesState,
  action:
    | LoadingAction
    | RejectedAction
    | LoadCitiesAction
    | LoadCityAction
    | CreateCityAction
    | DeleteCityAction
): CitiesState => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity?.id === action.payload ? null : state.currentCity,
      };
    default:
      return state;
  }
};

// Cities Provider
type CitiesProviderProps = {
  children: React.ReactNode;
};

export const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Load Cities (from localStorage, falling back to the sample trips)
  useEffect(() => {
    dispatch({ type: 'cities/loaded', payload: loadCities() });
  }, []);

  // Persist Cities
  useEffect(() => {
    if (isLoading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } catch {
      // Storage unavailable (e.g. private mode) - keep data in memory only
    }
  }, [cities, isLoading]);

  // Get City
  const getCity = useCallback(
    (id: number) => {
      if (id === currentCity?.id) return;
      const city = cities.find((city) => city.id === id);
      if (city) dispatch({ type: 'city/loaded', payload: city });
      else dispatch({ type: 'rejected', payload: 'City not found' });
    },
    [currentCity?.id, cities]
  );

  // Create City
  const createCity = async (city: Omit<City, 'id'>) => {
    dispatch({ type: 'city/created', payload: { ...city, id: Date.now() } });
  };

  // Delete City
  const deleteCity = async (id: number) => {
    dispatch({ type: 'city/deleted', payload: id });
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
