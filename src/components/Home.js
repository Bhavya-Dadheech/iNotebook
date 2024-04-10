import React from "react";
import Notes from "./Notes";

export default function Home({ showAlert }) {
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
}
