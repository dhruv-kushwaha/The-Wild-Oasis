import axios from "axios";
import { useMemo, useState } from "react";
import getURL from "../utils/globalConstants";
import Button from "../ui/Button";

function Uploader() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const URL = useMemo(() => getURL(), []);
  function uploadAll() {
    async function upload() {
      setIsLoading(true);
      axios.delete(`${URL}/upload/bookings`);
      axios.delete(`${URL}/upload/guests`);
      axios.delete(`${URL}/upload/cabins`);

      axios.post(`${URL}/upload/guests`);
      axios.post(`${URL}/upload/cabins`);
      axios.post(`${URL}/upload/bookings`);
      setIsLoading(false);
    }
    upload();
  }

  function uploadBookings() {
    async function upload() {
      setIsLoading(true);
      axios.delete(`${URL}/upload/bookings`);

      axios.post(`${URL}/upload/bookings`);
      setIsLoading(false);
    }
    upload();
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
