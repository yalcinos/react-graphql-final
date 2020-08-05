import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ARTISTS, GET_INSTRUMENTS_ARTISTS } from "../../queries";

import { List } from "antd";

import Artist from "../listItems/Artist";
import Instrument from "../listItems/Instrument";
const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Artists = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_INSTRUMENTS_ARTISTS);
  // const instrument = useQuery(GET_INSTRUMENTS);
  // console.log(instrument.data);
  console.log(data);
  if (loading) return "Loading...";
  if (error) return `Errror! ${error.message}`;
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.artists.map(({ id, firstName, lastName, instruments }) => (
        <List.Item key={id}>
          <Artist key={id} id={id} firstName={firstName} lastName={lastName} />
          {instruments.map((inst) => {
            {
              return (
                <Instrument
                  key={inst.id}
                  id={inst.id}
                  brand={inst.brand}
                  price={inst.price}
                  year={inst.year}
                  model={inst.type}
                />
              );
            }
          })}
        </List.Item>
      ))}
    </List>
  );
};

export default Artists;
