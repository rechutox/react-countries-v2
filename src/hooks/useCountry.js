import { useReducer } from "react";
import API from "../common/RestCountriesAPI";

// INITIAL STATE

const initialState = {
  data: null,
  isFetching: false,
  hasError: false,
  error: "",
};

// ACTION TYPES

const FETCH_COUNTRY_START = "FETCH_COUNTRY_START";
const FETCH_COUNTRY_SUCCESS = "FETCH_COUNTRY_SUCCESS";
const FETCH_COUNTRY_ERROR = "FETCH_COUNTRY_ERROR";

// REDUCER

function reducer(state, { type, data }) {
  switch (type) {
    case FETCH_COUNTRY_START:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        data: null,
        error: "",
      };

    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        data,
        error: "",
      };

    case FETCH_COUNTRY_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        data: null,
        error: data,
      };

    default:
      return state;
  }
}

// ACTION CREATORS

const fetchCountryStart = dispatch => dispatch({ type: FETCH_COUNTRY_START });

const fetchCountrySuccess = (dispatch, data) =>
  dispatch({ type: FETCH_COUNTRY_SUCCESS, data });

const fetchCountryError = (dispatch, error) =>
  dispatch({ type: FETCH_COUNTRY_ERROR, data: error });

// HOOK

function useCountry() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async countryCode => {
    if (countryCode === null) return;
    fetchCountryStart(dispatch);
    try {
      const data = await API.getByCode(countryCode);
      fetchCountrySuccess(dispatch, data);
    } catch (error) {
      console.log(error);
      fetchCountryError(dispatch, error);
    }
  };

  return [state, fetchData];
}

// EXPORTS

export default useCountry;
