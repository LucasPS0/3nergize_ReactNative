import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  backgroundContainer: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-evenly",
    position: "relative",
    top: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  inputContainer: {
    padding: 17,
  },

  titleElement: {
    fontSize: 20,
    fontWeight: "bold",
  },

  datelTitleElement: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },

  textInputElement: {
    borderBottomWidth: 1,
    textAlign: "left",
    padding: 5,
    marginTop: 12,
    marginBottom: 12,
  },

  outputContainer: {
    padding: 17,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  outputElement: {
    fontSize: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    lineHeight: 30,
    fontWeight: "bold",
  },

  styledButtonContainer: {
    marginLeft: 24,
    marginRight: 24,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#06a37c",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  }
});
