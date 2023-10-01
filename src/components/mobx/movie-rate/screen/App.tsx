import Row from "@/components/mobx/movie-rate/components/Row.tsx";
import Card from "@/components/mobx/movie-rate/components/Card.tsx";
import { useStores } from "@/components/mobx/movie-rate/Context.tsx";
import { observable } from "mobx";
import { useState } from "react";

export default observable(() => {
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

  return (
    <>
      {movieStore.movies.map((movie) => (
        <>
          <Row>
            <Card
              key={movie.id}
              title={movie.title}
              rate={movie.rate}
              onChange={(e) => onExistingRateChange(movie.id, e.target.value)}
              onDelete={() => onDelete(movie.id)}
            />
          </Row>
        </>
      ))}
    </>
  );
});
