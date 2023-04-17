import React from "react";
import { Overlay } from "@rneui/base";
import { styles } from "./Modal.styles";

export function Modal({ show, close, children }) {
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}
