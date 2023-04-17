import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon, Text } from "@rneui/base";
import { map } from "lodash";
import { Modal } from "../../components";
import { ChangeDisplayNameForm } from "./ChangeDisplayNameForm";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function AccountOptions({ onReload }) {
  const [showModal, setShowModal] = useState(false);

  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderComponent(
        <ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }
    if (key === "email") {
      setRenderComponent(
        <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }
    if (key === "password") {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
    }
    onCloseOpenModal();
  };
  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Edit Name and Surname",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#cccccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#cccccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Edit Em@il",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#cccccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#cccccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Edit Password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#cccccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#cccccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}
