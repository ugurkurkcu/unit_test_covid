import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import Detail from "./index";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";

const mockStore = configureStore([thunk]);

it("Renders right components while did mount", () => {
  const store = mockStore({
    isloading: true,
    error: null,
    data: null,
  });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("Renders error components when it throws error", () => {
  const store = mockStore({
    isloading: false,
    error: "Server responded with status code of 404 (undefined)",
    data: null,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  screen.getByText(/Server responded with/i);
});

it("Renders card components when it responses with data", () => {
  const store = mockStore(storeData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  const flag = screen.getByRole("img");
  expect(flag).toHaveProperty("src", storeData.data.country.flags.png);

  const countryName = screen.getByTestId("country-name");
  expect(countryName).toHaveTextContent(storeData.data.country.altSpellings[1]);

  const covidArr = Object.entries(storeData.data.covid);
  covidArr.forEach((i) => {
    screen.getAllByText(i[0].split("_").join(" "));

    screen.getAllByText(i[1]);
  });
});
