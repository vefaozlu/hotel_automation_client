import RoomCards from "../Components/RoomCard/RoomCard";
import { useLocation } from "react-router-dom";

function Rooms() {
  const location = useLocation();

  return (
    <div>
      <RoomCards
        rooms={location.state.data}
        startDate={location.state.startDate}
        endDate={location.state.endDate}
      />
    </div>
  );
}

export default Rooms;
