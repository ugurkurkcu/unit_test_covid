import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getCountryData } from "../../redux/actions";
import Loader from "../../components/Loader";
import InfoCard from "../../components/InfoCard";
import Error from "../../components/error";

const Detail = () => {
  const [params] = useSearchParams();
  const countryCode = params.get("code");
  const query = params.get("q");
  const { data, error, isloading } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryData({ code: countryCode, query }));
  }, [params]);

  const covidArr = Object.entries(data?.covid || {});

  return (
    <div className="min-h-[calc(100vh-74px)] md:min-h-[calc(100vh-80px)] bg-zinc-700 flex-1 text-white grid place-items-center">
      <div className=" min-h-[80vh] bg-white rounded-lg shadow-lg p-8 md:w-[768px] max-md:w-full">
        <div className=" flex gap-5 justify-between items-center mb-6">
          <Link
            to="/"
            className="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-800"
          >
            Back
          </Link>

          <div className=" flex items-center space-x-2">
            {isloading ? (
              <Loader type="header" />
            ) : (
              !error && (
                <>
                  <img
                    className=" w-24 rounded-md"
                    src={data?.country.flags.png}
                    alt={data?.country.flags.alt}
                  />

                  <h1
                    data-testid="country-name"
                    className="text-gray-700 font-bold text-3xl"
                  >
                    {data?.country.altSpellings[1]}
                  </h1>
                </>
              )
            )}
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-3">
          {isloading ? (
            <Loader />
          ) : error ? (
            <Error
              message={error}
              retry={() =>
                dispatch(getCountryData({ code: countryCode, query }))
              }
            />
          ) : (
            covidArr.map((item, key) => <InfoCard item={item} key={key} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
