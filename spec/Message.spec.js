import React from "react";
import { mount, configure } from "../node_modules/enzyme";
import Message from "../src/react-components/message.js/index.js.js";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("test suite", () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Message
        id="message-10"
        input="here is some text"
        timePosted="9:57:56 AM"
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it("all initial states", () => {
    let stateVal = {
      content: "here is some text",
      render: true,
      editMode: false,
      timePosted: "9:57:56 AM",
      edited: false
    };
    let state = component.state();
    Object.keys(state).forEach(k => expect(state[k]).toBe(stateVal[k]));
  });
  it("should be able to delete", () => {
    component.instance().deletePost();
    expect(component.state("render")).toBe(false);
  });
  it("should update state on edited post", () => {
    component.setState({
      content: "a whole new message",
      editMode: true,
      timePosted: "10:10:10 PM",
      edited: false
    });
    component.instance().submitEditedPost();

    expect(component.state("content")).toBe("a whole new message");
  });
  it("should show edit mode options", () => {
    component.instance().toggleEditMode();

    expect(component.state("editMode")).toBe(true);
  });
});
