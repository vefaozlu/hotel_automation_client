import "./Slider.scss";
import slider from "../../assets/img/slide_1.jpg";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import "react-datepicker/dist/react-datepicker.css";

function Slider() {
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchData(startDate: Number, endDate: Number) {
    setLoading(true);

    let data = qs.stringify({
      hotel_id: "14",
      start_date: startDate,
      end_date: endDate,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://192.168.0.21:3000/api/reservations/rooms",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        navigate("/rooms", {
          state: {
            data: response.data,
            startDate: startDate,
            endDate: endDate,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="Slider">
      <img src={slider} alt="hotel-slider-image" />
      <div className="search-container">
        <div className="date-container">
          <div className="date">
            <p>Start Date</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date!);
              }}
            />
          </div>
          <span className="divider"> </span>
          <div className="date">
            <p>End Date</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
            />
          </div>
        </div>
        <div className="guest_count-container">
          <p>Guest count: {count}</p>
          <div className="buttons">
            <div className="count-button" onClick={() => setCount(count + 1)}>
              <p>+</p>
            </div>
            <div className="count-button" onClick={() => setCount(count - 1)}>
              <p>-</p>
            </div>
          </div>
        </div>
        <button
          className="search-button"
          onClick={async () =>
            fetchData(startDate.getTime(), endDate.getTime())
          }
        >
          <svg
            className="svg-inline--fa fa-magnifying-glass "
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="magnifying-glass"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ fontSize: "24px", maxWidth: "24px", maxHeight: "24px" }}
          >
            <path
              fill="currentColor"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date!)} />
  );
};

export default Slider;
