import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

type Breach = {
  id: number;
  date: string;
  target: string;
  description: string;
  usefulness: boolean;
};

export const BreachList: React.FC = () => {
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreaches = async () => {
      const q = query(collection(db, "filtered_messages"), orderBy("id", "desc"));
      const querySnapshot = await getDocs(q);
      const data: Breach[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as Breach);
      });
      setBreaches(data);
      setLoading(false);
    };
    fetchBreaches();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Breach List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Target</th>
            <th>Description</th>
            <th>Usefulness</th>
          </tr>
        </thead>
        <tbody>
          {breaches.map((b, i) => (
            <tr key={i}>
              <td>{b.id}</td>
              <td>{b.date}</td>
              <td>{b.target}</td>
              <td>{b.description}</td>
              <td>{b.usefulness ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
