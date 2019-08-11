import { useReducer } from "react";
import API from "../common/RestCountriesAPI";

// INITIAL STATE

const initialState = {
  countries: [],
  error: "",
  isFetching: false,
  hasError: false,
};

// ACTION TYPES

const FETCH_COUNTRIES_START = "FETCH_COUNTRIES_START";
const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
const FETCH_COUNTRIES_ERROR = "FETCH_COUNTRIES_ERROR";

// REDUCER

function reducer(state, { type, data }) {
  switch (type) {
    case FETCH_COUNTRIES_START:
      return {
        ...state,
        hasError: false,
        isFetching: true,
        countries: [],
        error: "",
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        countries: data.countries,
        error: "",
      };

    case FETCH_COUNTRIES_ERROR:
      return {
        ...state,
        hasError: true,
        isFetching: false,
        countries: [],
        error: data.error,
      };

    default:
      return state;
  }
}

// ACTION CREATORS

const fetchCountriesStart = dispatch =>
  dispatch({ type: FETCH_COUNTRIES_START });

const fetchCountriesSuccess = (dispatch, countries) =>
  dispatch({ type: FETCH_COUNTRIES_SUCCESS, data: { countries } });

const fetchCountriesError = (dispatch, error) =>
  dispatch({ type: FETCH_COUNTRIES_ERROR, data: { error } });

// HOOK DEFINITION

function useCountries(fields = []) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCountries = async () => {
    fetchCountriesStart(dispatch);
    try {
      const data = await API.getAll(fields);
      fetchCountriesSuccess(dispatch, data);
    } catch (error) {
      console.error(error);
      fetchCountriesError(dispatch, error);
    }
  };

  return [state, fetchCountries];
}

// EXPORTS

export default useCountries;
