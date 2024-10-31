import Header from "./components/header/Header";
import WeatherBord from "./components/weather/WeatherBord";

export default function App() {
  return (
    <div className="grid justify-center items-center h-screen mt-20">
      <Header />
      <main>
        <section>
          <WeatherBord />
        </section>
      </main>
    </div>
  );
}
