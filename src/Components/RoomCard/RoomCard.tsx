import "./RoomCard.scss";
import thumb from "../../assets/img/thumb.jpg";
import axios from "axios";
import qs from "qs";
import { useState } from "react";

function RoomCards({ rooms, startDate, endDate }: any) {
  console.log(rooms);
  const fSD = new Intl.DateTimeFormat("en-US").format(startDate);
  const fED = new Intl.DateTimeFormat("en-US").format(endDate);

  return (
    <div className="RoomCards">
      <h1>
        Avaliable Rooms Between {`${fSD}`} - {`${fED}`}
      </h1>
      {rooms.map((room: any, index: Number) => {
        return (
          <RoomCard
            startDate={startDate}
            endDate={endDate}
            id={room.id}
            roomName={room.name}
            price={room.price}
            key={index}
          />
        );
      })}
    </div>
  );
}

function RoomCard({ id, startDate, endDate, hotelName, roomName, price }: any) {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  return (
    <div className="RoomCard">
      <div className="room-image">
        <img src={thumb} alt="room" />
      </div>
      <div className="room-info">
        <h3>{roomName}</h3>
      </div>
      {show && <input value={email} onChange={handleEmailChange} type="email" placeholder="Enter your email"/>}
      <div className="price-info">
        <p>{`${price}`}$</p>
        <button onClick={async () => await makeReservation()}>
          Make Reservation
        </button>
      </div>
    </div>
  );

  async function makeReservation() {
    if (!show || email === "") {
      setShow(true);
      return;
    }

    let data = qs.stringify({
      start_date: startDate,
      end_date: endDate,
      room_id: id,
      visitor_email: email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://192.168.0.21:3000/api/reservations/create",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data.message));
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }
}

export default RoomCards;
