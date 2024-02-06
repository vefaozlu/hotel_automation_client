import { useState } from "react";
import "./Reservations.scss";
import DatePicker from "react-datepicker";
import axios from "axios";
import qs from "qs";

import "react-datepicker/dist/react-datepicker.css";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [email, setEmail] = useState("");

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  return (
    <div className="Reservations">
      <h1>Reservations</h1>
      <div className="form-group">
        <label htmlFor="name">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={() => getReservations()}>Search</button>
      </div>
      <div className="reservation-cards">
        {reservations.map((reservation: any, index: number) => {
          return (
            <ReservationCard
              _startDate={reservation.startDate}
              _endDate={reservation.endDate}
              roomId={reservation.roomId}
              id={reservation.id}
              status={reservation.status}
              total={reservation.total}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );

  async function getReservations() {
    console.log("getReservations");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://192.168.0.21:3000/api/reservations/?visitor_email=" + email,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setReservations(response.data);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message)
      });
  }
}

function ReservationCard({
  _startDate,
  _endDate,
  id,
  roomId,
  status,
  total,
}: any) {
  const [startDate, setStartDate] = useState(new Date(_startDate));
  const [endDate, setEndDate] = useState(new Date(_endDate));
  return (
    <div className="ReservationCard">
      <div className="info-col">
        <h3>Status: {status}</h3>
        <h3>Total: {total}</h3>
      </div>
      <div className="date-group">
        <h4>Start Date</h4>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date!);
          }}
        />
      </div>
      <div className="date-group">
        <h4>End Date</h4>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date!);
          }}
        />
      </div>
      <button onClick={() => updateReservation()}>Update</button>
      <button onClick={() => cancelReservation()}>Cancel</button>
    </div>
  );

  async function updateReservation() {
    let data = qs.stringify({
      room_id: roomId,
      start_date: startDate,
      end_date: endDate,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://192.168.0.21:3000/api/reservations/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }

  async function cancelReservation() {
    let data = qs.stringify({
      room_id: roomId,
      status: "cancelled",
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://192.168.0.21:3000/api/reservations/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {})
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }
}

export default Reservations;
