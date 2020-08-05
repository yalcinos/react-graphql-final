import React, { useState } from "react";
import { Card, List } from "antd";

import { EditOutlined } from "@ant-design/icons";
import UpdateInstruments from "../forms/UpdateInstruments";
import RemoveArtist from "../buttons/RemoveArtist";

const getStyles = () => ({
  card: {
    width: "80%",
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Instrument = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [model, setModel] = useState(props.model);
  const [brand, setBrand] = useState(props.brand);
  const [price, setPrice] = useState(props.price);
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const fullName = () => {
    return ` ${props.brand} ${props.model} ${props.year} ${props.price}`;
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;

      case "brand":
        setBrand(value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdateInstruments
          id={id}
          year={year}
          brand={brand}
          type={model}
          year={year}
          price={price}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveArtist id={id} year={year} brand={brand} model />,
          ]}
          type="inner"
          style={styles.card}
        >
          {fullName()}
        </Card>
      )}
    </List.Item>
  );
};

export default Instrument;
