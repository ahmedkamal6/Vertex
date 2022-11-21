import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Client from "../Client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import {searchQuery} from "../Utils/data";
import {feedQuery}  from "../Utils/data";

function Feed() {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      Client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      Client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if(!pins?.length) return <h2>No Pins available</h2>
  if (loading)
    return <Spinner message="we are adding new ideas to your feed!!" />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
