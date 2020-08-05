import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Button } from "antd";
import { UPDATE_INSTRUMENTS } from "../../queries";

const UpdateInstruments = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [type, setType] = useState(props.type);
  const [brand, setBrand] = useState(props.brand);
  const [price, setPrice] = useState(props.price);
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENTS);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, type, brand, price } = values;
    updateInstrument({
      variables: {
        id,
        year,
        type,
        brand,
        price,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateInstrument: {
          __typename: "Instruments",
          id,
          year,
          type,
          brand,
          price,
        },
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        props.updateStateVariable("year", value);
        setYear(value);
        break;
      case "brand":
        props.updateStateVariable("brand", value);
        setBrand(value);
        break;
      case "price":
        props.updateStateVariable("price", value);
        setPrice(value);
        break;
      case "type":
        props.updateStateVariable("type", value);
        setType(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-artist-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        type: type,
        price: price,
        brand: brand,
      }}
      size="large"
    >
      <Form.Item
        name="year"
        label="year"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          placeholder="i.e. John"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="price"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          placeholder="i.e. John"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="type"
        label="type"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          placeholder="i.e. John"
          onChange={(e) => updateStateVariable("type", e.target.value)}
        />
        <Form.Item
          name="brand"
          label="brand"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input
            placeholder="i.e. John"
            onChange={(e) => updateStateVariable("brand", e.target.value)}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Instruments
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateInstruments;
