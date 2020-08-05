import React, { useState } from "react";
import { Card, List, Button } from "antd";

import { EditOutlined } from "@ant-design/icons";
import UpdateArtist from "../forms/UpdateArtist";
import LearnMore from "../layout/LearnMore";
import RemoveArtist from "../buttons/RemoveArtist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Artist = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const fullName = () => {
    return `${props.firstName} ${props.lastName}`;
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <Router>
      <List.Item key={props.id}>
        {editMode ? (
          <UpdateArtist
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleButtonClick}
            updateStateVariable={updateStateVariable}
          />
        ) : (
          <Card
            actions={[
              <EditOutlined key="edit" onClick={handleButtonClick} />,
              <RemoveArtist
                id={id}
                firstName={firstName}
                lastName={lastName}
              />,
            ]}
            style={styles.card}
          >
            {fullName()}
            <div>
              <Link to="/learnMore">Learn More</Link>
            </div>
          </Card>
        )}
      </List.Item>
      {/* <Switch>
        <Route path="/learnMore">
          <LearnMore />
        </Route>
      </Switch> */}
    </Router>
  );
};

export default Artist;
