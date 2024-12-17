import ScreenUI from "./components/HomeScreen";
import NavBar from "./components/NavBar";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <ScreenUI />
      {/* <SearchCity /> */}
    </div>
  );
}
