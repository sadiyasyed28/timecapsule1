import img from "../assets/description.jpg";

export default function End(){
  return(
    <div style={{
      background:"#6b0015",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <img src={img} style={{ maxWidth:"90%", height:"auto" }} />
    </div>
  );
}