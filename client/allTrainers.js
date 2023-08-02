import React, { useState, useEffect } from 'react';

const trainerList = () => {
  const [trainerList, settrainerList] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await fetch('/server/db');
        const data = await response.json();
        settrainerList(data);
      } catch (error) {
        console.error('Error fetching Trainer:', error);
      }
    };

    fetchTrainer();
  }, []);

  return (
    <div>
      <h1>Trainers List</h1>
      <ul>
        {trainerList.map((Trainer) => (
          <li key={Trainer.id}>
            {Trainer.name} - {Trainer.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default trainerList;