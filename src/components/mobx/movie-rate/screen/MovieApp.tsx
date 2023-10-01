import Row from "@/components/mobx/movie-rate/components/Row.tsx";
import Card from "@/components/mobx/movie-rate/components/Card.tsx";
import { useStores } from "@/components/mobx/movie-rate/Context.tsx";
import { observer } from "mobx-react";
import { useState } from "react";

const MovieApp = observer(() => {
  const [newRate, setNewRate] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { movieStore } = useStores();

  const onModalOk = () => {
    movieStore.createMovie(newTitle, newRate);
    setNewRate(0);
    setNewTitle("");
    setIsModalOpen(false);
  };

  const onRateChange = (value: number) => {
    setNewRate(value);
  };
  const onDelete = (id: number) => {
    movieStore.deleteMovie(id);
  };
  const onExistingRateChange = (id: number, rate: number) => {
    movieStore.changeRate(id, rate);
  };
  const getIsNewTitleEmpty = () => {
    return newTitle === "";
  };

  return (
    <div>
      <button
        className="rounded bg-sky-300 px-4 py-2 hover:bg-sky-500"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Modal toggle
      </button>
      {isModalOpen && (
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-black"
          />
          <label>Rate</label>
          <input
            type="number"
            value={newRate}
            onChange={(e) => onRateChange(Number(e.target.value))}
            className="text-black"
          />
        </div>
      )}
      <div className="flex w-full flex-col items-center">
        <div className="p-4">
          <button
            className="rounded bg-pink-300 px-4 py-2 hover:bg-pink-500"
            onClick={() => {
              if (getIsNewTitleEmpty()) return;
              onModalOk();
            }}
          >
            Add
          </button>
        </div>
      </div>
      {/* Virtual Model */}
      {movieStore.movies.map((movie) => (
        <>
          <Row className="flex w-full flex-col items-center gap-5 p-4">
            <Card
              className="flex min-w-[200px] flex-row justify-between gap-5 rounded bg-gray-500 p-3"
              key={movie.id}
              title={movie.title}
              rate={movie.rate}
              onChange={(value) => onExistingRateChange(movie.id, value)}
              onDelete={() => onDelete(movie.id)}
            />
          </Row>
        </>
      ))}
    </div>
  );
});

export default MovieApp;
