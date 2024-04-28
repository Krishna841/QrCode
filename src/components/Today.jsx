import { useState, useEffect } from "react";
import Meals from "./Meals";
import QrImg from "./QrImg";
import moment from "moment";

function Today({ setType, type, passId }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://pos-api.effortsnode.srmd.org/v1/items/getMyPasses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        param: passId,
        startDate: moment(new Date()).format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.data);
      });
  }, [passId]);

  return (
    <>
      <Meals setType={setType} />
      <div className="flex items-center justify-start mt-5 overflow-x-scroll no-scrollbar px-5 gap-5">
        {data && Object.keys(data).length ? (
          data
            ?.filter((item) => !type || item.type === type)
            .map((item) => <QrImg data={item} key={item.id} />)
        ) : (
          <div className="flex items-center">
            No passes available for today.
          </div>
        )}
      </div>
    </>
  );
}

export default Today;
