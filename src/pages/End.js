import bg from "../assets/description.jpg";

export default function End() {
  return (
    <div
      onClick={() => window.location.href = "/"}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f3e9ef",
        width: "100vw",
        height: "100vh",
        cursor: "pointer"
      }}
    />
  );
}