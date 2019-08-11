import React, { useEffect } from "react";
import useCountry from "../hooks/useCountry";
import CountryMap from "./CountryMap";
import Message from "./Message";

function plural(str = "") {
  if (str === "") return "folks";
  const last = str[-1];
  if (last === "s") return str + "es";
  return str + "s";
}

function View({ data }) {
  return (
    <section className="CountryView__View">
      <header>
        <figure>
          <img src={data.flag} alt={data.name} />
        </figure>
        <h1>{data.name}</h1>
      </header>
      <main>
        <h4>General</h4>
        <table>
          <thead />
          <tbody>
            <tr>
              <th>Native Name</th>
              <td>{data.nativeName}</td>
            </tr>
            <tr>
              <th>Capital</th>
              <td>{data.capital}</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>
                {data.population} {plural(data.demonym)}
              </td>
            </tr>
            <tr>
              <th>Area</th>
              <td>{data.area} km&sup2;</td>
            </tr>
            <tr>
              <th>Calling Codes</th>
              <td>{data.callingCodes.join(", ")}</td>
            </tr>
            <tr>
              <th>Alpha 2 Code</th>
              <td>{data.alpha2Code}</td>
            </tr>
            <tr>
              <th>Alpha 3 Code</th>
              <td>{data.alpha3Code}</td>
            </tr>
          </tbody>
        </table>

        <h4>Currencies</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {data.currencies.map(x => (
              <tr key={x.code}>
                <td>{x.name}</td>
                <td>{x.code}</td>
                <td>{x.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Languages</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Native Name</th>
              <th>ISO-639-1</th>
              <th>ISO-639-2</th>
            </tr>
          </thead>
          <tbody>
            {data.languages.map(x => (
              <tr key={x.name}>
                <td>{x.name}</td>
                <td>{x.nativeName}</td>
                <td>{x.iso639_1}</td>
                <td>{x.iso639_2}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Map</h4>
        <CountryMap lat={data.latlng[0]} lng={data.latlng[1]} />
      </main>
    </section>
  );
}

function CountryView({ code }) {
  const [state, getData] = useCountry();

  useEffect(() => {
    getData(code);
  }, [code]);

  return (
    <article className="CountryView">
      {state.isFetching && (
        <Message type="info">Fetching data... Please wait!</Message>
      )}

      {state.hasError && <Message type="error">Error: {state.error}</Message>}

      {state.data && <View data={state.data} />}
    </article>
  );
}

export default CountryView;
